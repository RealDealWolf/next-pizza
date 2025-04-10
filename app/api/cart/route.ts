import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

export async function GET(req: NextRequest) {

    try {

        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token,
                    },
                ],
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                        ingredients: true,
                    },
                },
            }
        });

        return NextResponse.json(userCart);
    } catch (error) {

        console.log('[CART_GET] Server error', error);
        console.log(error);
        return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
    }

}

export async function POST(req: NextRequest) {

    try {

        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

    } catch (error) {

        console.log('[CART_POST] Server error', error);
        console.log(error);
        return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
    }
}