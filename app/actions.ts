'use server';

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormSValues } from "@/shared/constants";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment, sendEmail } from '@/shared/lib';
import { PayOrderTemplate } from '@/shared/components';

export async function createOrder(data: CheckoutFormSValues) {

    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get('cartToken')?.value;

        if (!cartToken) {
            throw new Error('Cart token not found')
        }

        //Находим корзину по токену
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            },
        })

        //Если корзина не найдена, выводим ошибку
        if (!userCart) {
            throw new Error('Cart not found');
        };

        //Если корзина пустая, выводим ошибку
        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        };

        //Создаём заказ
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                adress: data.adress,
                comment: data.comment,
                totalAmount: 1500,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart?.items),
            }
        });

        //Очищаем корзину
        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            }
        })

        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: 'Оплата заказа #' + order.id,
        });

        if (!paymentData) {
            throw new Error('Payment data not found');
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        const paymentUrl = paymentData.confirmation.confirmation_url;

        await sendEmail(
            data.email,
            'Next Pizza / Оплатите Заказ #' + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl,

            }));

        return paymentUrl;

    } catch (error) {
        console.error('[CreateOrder] Server error', error);
    }
}


