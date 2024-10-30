import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ProductService } from "./product.service";
import { ProductsActions } from "./product.actions";

@Injectable()
export class ProductsEffects {
    private actions$ = inject(Actions);
    private productsService = inject(ProductService);
    
    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsActions.loadProducts),
        switchMap(() => this.productsService.getProducts().pipe(
            map(products => ProductsActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductsActions.loadProductsFailure({ error })))
        ))
    ));
} 