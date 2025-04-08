'use client';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
} from '@/shared/components/ui/sheet';
import { Button } from '../ui';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CartDrawerItem from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className='flex flex-col justify-between pb-0 bg-[#f4f1ee]'>
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className='font-bold'>3 товара</span>
                    </SheetTitle>
                </SheetHeader>
                <CartDrawerItem
                    id={1}
                    imageUrl={'https://media.dodostatic.net/image/r:584x584/11ee7d61706d472f9a5d71eb94149304.avif'}
                    details={getCartItemDetails(2, 30, [{ name: 'Цыплёнок' }, { name: 'Сыр' }])}
                    name={'Чоризо фреш'}
                    price={437}
                    quantity={1} />
                {/* Items */}
                <SheetFooter className='-mx-6 bg-white p-8'>
                    <div className='w-full'>
                        <div className='flex mb-4'>
                            <span className='flex flex-1 text-lg text-neutral-500'>
                                Итого
                                <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
                            </span>

                            <span className='font-bold text-lg'>500 ₽ </span>
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