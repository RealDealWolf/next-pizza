import { Cart, CartItem, Ingredient, Product, ProductItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product;
    };
    ingredients: Ingredient[];
}

export interface CartDTO extends Cart {
    items: CartItemDTO[];
}

export interface CreateCartItemValues {
    productItemId: number;
    // pizzaSize?: number; я так понял в productItemId уже зашиты вариации, включающие в себя pizzaSize и pizzaType.
    // pizzaType?: number;
    ingredients?: number[];
}