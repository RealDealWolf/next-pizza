import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функция для подсчёта стоимости пиццы
 * ```typescript
 * @expampe calcTotalPizzaPrice(1, 20, items, ingerdients, selectedIngredients)
 * @param type тип теста выбранной пиццы
 * @param size размер выбранной пиццы
 * @param items список вариаций
 * @param ingredients список доступных для добавления ингридиентов
 * @param selectedIngredients выбранные ингдредиенты
 * 
 * @returns {number} общая стоиомсть
 */

export const calcTotalPizzaPrice = (

    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<Number>,

) => {

    const pizzaPrice =
        items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;

    const totalIngredientsPrice = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return pizzaPrice + totalIngredientsPrice;
}