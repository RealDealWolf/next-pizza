import React from 'react';
import { WhiteBlock } from './white-block';
import CheckoutItemDetails from './checkout-item-details';
import { ArrowRight, Percent, Truck, Wallet } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { cn } from '@/shared/lib/utils';

interface Props {
    totalAmount: number;
    loading?: boolean;
    className?: string;
}

const VAT = 15;
const DELIVERY_PRICE = 350;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, className, loading }) => {

    const vatPrice = Math.round((totalAmount * VAT) / 100);
    const CheckoutTotalAmount = totalAmount + vatPrice + DELIVERY_PRICE;

    return (
        <WhiteBlock className={cn("p-6 sticky top-4", className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl h-11">Итого:</span>
                {
                    loading ? <Skeleton className='w-[144px] h-11' /> : <span className="text-[34px] h-11 font-extrabold">{CheckoutTotalAmount} ₽</span>
                }
            </div>

            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Wallet size={20} className="mr-2 text-gray-400" />
                    Стоимость корзины
                </div>
            } value={loading ? <Skeleton className='w-16 h-6 rounded-md' /> : `${totalAmount} ₽`} />
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Percent size={20} className="mr-2 text-gray-400" />
                    Налоги
                </div>
            } value={loading ? <Skeleton className='w-16 h-6 rounded-md' /> : `${vatPrice} ₽`} />
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Truck size={20} className="mr-2 text-gray-400" />
                    Доставка
                </div>
            } value={loading ? <Skeleton className='w-16 h-6 rounded-md' /> : `${DELIVERY_PRICE} ₽`} />


            <Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    );
};

export default CheckoutSidebar;