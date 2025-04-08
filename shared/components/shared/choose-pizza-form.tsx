'use client'

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import GroupVatiants from './group-vatiants';
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { usePizzaOptions } from '@/shared/hooks';
import { getPizzaDetails } from '@/shared/lib';

interface Props {

    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAddCart?: VoidFunction;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
    imageUrl,
    name,
    items,
    ingredients,
    onClickAddCart,
    className,
}) => {


    const { size, type, selectedIngredients, availableSizes, setSize, setType, addIngredient } =
        usePizzaOptions(items);

    const { totalPrice, textDetails } = getPizzaDetails(
        type,
        size,
        items,
        ingredients,
        selectedIngredients,
    );

    const handleClickAdd = () => {
        onClickAddCart?.();
        console.log({
            size, type, ingredients: selectedIngredients,
        })
    }

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className='w-[490px] bg-[#f7f6f5] p-7'>
                <Title text={name} size='md' className='font-extrabold mb-1' />

                <p className='text-gray-400'>{textDetails}</p>

                <div className='flex flex-col gap-4 mt-5'>
                    <GroupVatiants
                        items={availableSizes}
                        value={String(size)}
                        onClick={value => setSize(Number(value) as PizzaSize)} />

                    <GroupVatiants
                        items={pizzaTypes}
                        value={String(type)}
                        onClick={value => setType(Number(value) as PizzaType)} />
                </div>


                <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>

                    <div className='grid grid-cols-3 gap-3'>
                        {ingredients.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.imageUrl}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button onClick={handleClickAdd} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
                    Добавить в корзину за {totalPrice} ₽
                </Button>

            </div>
        </div>
    );
};

export default ChoosePizzaForm; 