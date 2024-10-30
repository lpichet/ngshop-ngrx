import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { ProductsActions } from "./product.actions";
import { Product } from "./product.model";
import { Cart } from "./cart";
import { state } from "@angular/animations";

interface State {
    products: Product[];
    cart: Cart;
    category: string | null;
    error: any | null;
}

const initialState: State = {
    products: [],
    cart: { id: 0, items: [] },
    category: '',
    error: null,
}

export const productsFeature = createFeature({
    name: 'products',
    reducer: createReducer(
        initialState,
        on(ProductsActions.loadProductsSuccess, (state, { products }) => ({ ...state, products, error: null })),
        on(ProductsActions.loadProductsFailure, (state, { error }) => ({ ...state, error })),
        on(ProductsActions.addProductToCart, (state, { product }) => {
            const cart = structuredClone(state.cart);
            const existingItem = cart.items.find(i => i.product.id === product.id);
            if(existingItem) {
                existingItem.quantity++;
            } else {
                cart.items.push({ product, quantity: 1});
            }
            return {...state, cart }
        }),
        on(ProductsActions.selectCategory, (state, { category }) => ({ ...state, category })),
    ),
    extraSelectors: ({selectProducts, selectCategory}) => ({
        selectFilteredProducts: createSelector(
            selectProducts,
            selectCategory,
            (products, category) => products.filter(p => category ? p.category === category : true)
        )
    })
});

export const {
    name,
    reducer,
    selectProductsState,
    selectProducts,
    selectFilteredProducts,
    selectCart,
    selectCategory,
} = productsFeature;