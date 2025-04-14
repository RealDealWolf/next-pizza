'use client';

import { useCart } from "@/shared/hooks";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutSidebar, Container, Title, } from "@/shared/components/shared";
import { CheckoutCart, CheckoutPersonalForm, CheckoutAddressForm } from '@/shared/components';
import { checkoutFormSchema, CheckoutFormSValues } from "@/shared/constants";
import { createOrder } from "@/app/actions";

export default function CheckoutLayout() {

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

    const onSubmit = (data: CheckoutFormSValues) => {
        console.log(data);
        createOrder(data);
    }

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

            <FormProvider {...form}>
                <form action="" onSubmit={form.handleSubmit(onSubmit)}>
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
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
                        </div>

                    </div>
                </form>
            </FormProvider>
        </Container>
    )
};