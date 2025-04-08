import { ChooseProductModal, Container, PizzaImage, Title } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";


export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {

    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            Ingredients: true,
            items: true,
        }
    });

    if (!product) {
        return notFound();
    }

    return <ChooseProductModal product={product} />

}