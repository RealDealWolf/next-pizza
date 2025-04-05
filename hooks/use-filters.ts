import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';


interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setIngredients: (value: string) => void;
    setSizes: (value: string) => void;
    setPizzaTypes: (value: string) => void;
    setPrices: (name: keyof PriceProps, value: number) => void;
}

export const useFilters = (): ReturnProps => {

    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    /* Фильтр ингридиентов */
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get('ingredients')?.split(','))
    );

    /* Фильтр размеров */
    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []));

    /* Фильтр типа пиццы */
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []));

    /* Фильтр стоиомсти */
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    })

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return {
        sizes,
        pizzaTypes,
        selectedIngredients,
        prices,
        setIngredients: toggleIngredients,
        setSizes: toggleSizes,
        setPizzaTypes: togglePizzaTypes,
        setPrices: updatePrice,
    }

}