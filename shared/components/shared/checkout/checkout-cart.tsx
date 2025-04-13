import React from 'react';
import { WhiteBlock } from '../white-block';
import { getCartItemDetails } from '@/shared/lib';
import { CheckoutItem } from '../checkout-item';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
    items: CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    removeCartItem: (id: number) => void;
    className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ items, onClickCountButton, removeCartItem, className }) => {
    return (
        <WhiteBlock title="1. Корзина" className={className}>
            <div className="flex flex-col gap-5">
                {
                    items.map((item) => (
                        <CheckoutItem
                            id={item.id}
                            imageUrl={item.imageUrl}
                            name={item.name}
                            details={getCartItemDetails(
                                item.ingredients,
                                item.pizzaType as PizzaType,
                                item.pizzaSize as PizzaSize,
                            )}
                            price={item.price}
                            quantity={item.quantity}
                            disabled={item.disabled}
                            onClickCountButton={(type) => { onClickCountButton(item.id, item.quantity, type) }}
                            onClickRemove={() => { removeCartItem(item.id) }}
                        />
                    ))
                }
            </div>
        </WhiteBlock>
    );
};

export default CheckoutCart;