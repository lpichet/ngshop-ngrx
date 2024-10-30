import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "./product.model";

export const ProductsActions = createActionGroup({
    source: 'Products',
    events: {
        loadProducts: emptyProps(),
        loadProductsSuccess: props<{ products: Product[] }>(),
        loadProductsFailure: props<{ error: any }>(),
        addProductToCart: props<{ product: Product }>(),
        selectCategory: props<{ category: string | null }>(),
    }
})