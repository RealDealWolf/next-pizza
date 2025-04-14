'use client';

import React from "react";
import { useCart } from "@/shared/hooks";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutSidebar, Container, Title, } from "@/shared/components/shared";
import { CheckoutCart, CheckoutPersonalForm, CheckoutAddressForm } from '@/shared/components';
import { checkoutFormSchema, CheckoutFormSValues } from "@/shared/constants";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";

export default function CheckoutLayout() {
    const [submiting, setSubmiting] = React.useState(false);
    const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();

    const form = useForm({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            adress: '',
            comment: '',
        }
    });

    const onSubmit = async (data: CheckoutFormSValues) => {

        try {
            setSubmiting(true);
            const url = await createOrder(data);
            toast.success(
                <span className="items-center">
                    Заказ успешно создан! 📝<br />
                    Переход на оплату...
                </span>,
                {
                    icon: '✅',
                }
            );

            if (url) {
                location.href = url;
            }

        } catch (error) {
            console.error(error)
            setSubmiting(false);
            toast.error('Не удалось создать заказ', {
                icon: '❌',
            });
        }

    }

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/*Левая часть*/}
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />
                            <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

                            <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
                        </div>
                        {/*Правая часть*/}
                        <div className="w-[450px]">
                            <CheckoutSidebar
                                totalAmount={totalAmount}
                                loading={loading || submiting} />
                        </div>

                    </div>
                </form>
            </FormProvider>
        </Container>
    )
};