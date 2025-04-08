import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<Number>,
) => {

    const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;
    const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);

    return { totalPrice, textDetails };
}