'use client'

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {

    const router = useRouter()
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);
    const addCartItem = useCartStore(state => state.addCartItem);

    const onAddProduct = () => {
        addCartItem({
            productItemId: firstItem.id,
        });
    };

    const onAddPizza = () => { };

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className={cn(
                'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                className,
            )}>
                {
                    isPizzaForm ? (
                        <ChoosePizzaForm
                            imageUrl={product.imageUrl}
                            name={product.name}
                            ingredients={product.Ingredients}
                            items={product.items}
                        />
                    ) : (
                        <ChooseProductForm
                            imageUrl={product.imageUrl}
                            name={product.name} />
                    )}
            </DialogContent>
        </Dialog>
    );
};

export default ChooseProductModal;