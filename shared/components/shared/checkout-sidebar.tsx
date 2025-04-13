import React from 'react';
import { WhiteBlock } from './white-block';
import CheckoutItemDetails from './checkout-item-details';
import { ArrowRight, Percent, Truck, Wallet } from 'lucide-react';
import { Button } from '../ui';

interface Props {
    totalAmount: number;
    className?: string;
}

const VAT = 15;
const DELIVITY_PRICE = 350;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, className }) => {

    const vatPrice = (totalAmount * VAT) / 100;
    const CheckoutTotalAmount = totalAmount + vatPrice + DELIVITY_PRICE;

    return (
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                <span className="text-[34px] font-extrabold">{CheckoutTotalAmount} ₽</span>
            </div>

            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Wallet size={20} className="mr-2 text-gray-400" />
                    Стоимость корзины
                </div>
            } value={`${totalAmount} ₽`} />
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Percent size={20} className="mr-2 text-gray-400" />
                    Налоги
                </div>
            } value={`${vatPrice} ₽`} />
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Truck size={20} className="mr-2 text-gray-400" />
                    Доставка
                </div>
            } value={`${DELIVITY_PRICE} ₽`} />


            <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Перейти к оплате
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    );
};

export default CheckoutSidebar;