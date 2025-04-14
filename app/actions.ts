'use server';

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormSValues } from "@/shared/constants";
import { OrderStatus } from "@prisma/client";

export async function createOrder(data: CheckoutFormSValues) {
    console.log(data);

    const token = '123';

    await prisma.order.create({
        data: {
            token,
            totalAmount: 1500,
            status: OrderStatus.PENDING,
            items: [],
            fullName: data.firstName + ' ' + data.lastName,
            email: data.email,
            phone: data.phone,
            adress: data.adress,
            comment: data.comment,
        },
    });
}  