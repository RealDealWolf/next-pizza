'use client';

import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetTrigger, } from '@/shared/components/ui/sheet';
import { Button } from '../ui';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CartDrawerItem from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import React from 'react';
import { PizzaType, PizzaSize } from '@/shared/constants/pizza';
import { useCartStore } from '@/shared/store';

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {

    const [totalAmount, fetchCartItems, updateItemQuantity, removeCartItem, items] = useCartStore(state => [
        state.totalAmount,
        state.fetchCartItems,
        state.updateItemQuantity,
        state.removeCartItem,
        state.items,
    ]);

    React.useEffect(() => {
        fetchCartItems();
    }, []);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className='flex flex-col justify-between pb-0 bg-[#f4f1ee]'>
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className='font-bold'>{items.length} товар</span>
                    </SheetTitle>
                </SheetHeader>
                <div className='-mx-6 mt-5 overflow-auto scrollbar flex-1'>

                    {items.map((item) => (
                        <div key={item.id} className='mb-2'>
                            <CartDrawerItem
                                id={item.id}
                                imageUrl={item.imageUrl}
                                details={item.pizzaSize && item.pizzaType
                                    ? getCartItemDetails(
                                        item.ingredients,
                                        item.pizzaType as PizzaType,
                                        item.pizzaSize as PizzaSize,
                                    )
                                    : ''}
                                disabled={item.disabled}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                onClickCountButton={(type) => { onClickCountButton(item.id, item.quantity, type) }}
                                onClickRemove={() => { removeCartItem(item.id) }}
                            />
                        </div>
                    ))}

                </div>
                {/* Items */}
                <SheetFooter className='-mx-6 bg-white p-8'>
                    <div className='w-full'>
                        <div className='flex mb-4'>
                            <span className='flex flex-1 text-lg text-neutral-500'>
                                Итого
                                <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
                            </span>

                            <span className='font-bold text-lg'>{totalAmount} ₽ </span>
                        </div>

                        <Link href='/cart'>
                            <Button type='submit' className='w-full h-12 text-base'>
                                Оформить заказ
                                <ArrowRight className='w-5 ml-2' />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default CartDrawer;

function fetchCartItems() {
    throw new Error('Function not implemented.');
}
