import React from "react";
import { Variant } from "../components/shared/group-vatiants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { ProductItem } from "@prisma/client";
import { getAvailablePizzaSizes } from "../lib";


interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
    availableSizes: Variant[];
    setSize: (size: PizzaSize) => void;
    setType: (size: PizzaType) => void;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {

    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
    const availableSizes = getAvailablePizzaSizes(type, items);

    React.useEffect(() => {
        const isAvailableSize = availableSizes?.find(
            (item) => Number(item.value) === size && !item.disabled,
        );
        const availableSize = availableSizes?.find((item) => !item.disabled);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize)
        }
    }, [type]);

    return {
        size,
        type,
        selectedIngredients,
        setSize,
        setType,
        addIngredient,
        availableSizes,
    };
}