import { Container, ProductImage, Title } from "@/components/shared";
import GroupVatiants from "@/components/shared/group-vatiants";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";


export default async function ProductPage({ params: { id } }: { params: { id: string } }) {

    const product = await prisma.product.findFirst({ where: { id: Number(id) } });

    if (!product) {
        return notFound()
    }

    return (
        <Container className='flex flex-col my-10'>
            <div className='flex flex-1'>
                <ProductImage imageUrl={product.imageUrl} size={40} />
                <div className='w-[490px] bg-[#f8f8f8] p-7'>
                    <Title className='font-extrabold mb-1' text={product.name} size='md' />
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                    <GroupVatiants
                        selectedValue='2'
                        items={[
                            {
                                name: 'Маленькая',
                                value: '1',
                            },
                            {
                                name: 'Средняя',
                                value: '2',
                            },
                            {
                                name: 'Большая',
                                value: '3',
                                disabled: true,
                            },
                        ]} />
                </div>
            </div>
        </Container>
    );

}