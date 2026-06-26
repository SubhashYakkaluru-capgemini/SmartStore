import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './actions';
import { ProductsService } from '../../services/products.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.productsService.getProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((err) => of(ProductsActions.loadProductsFailure({ error: err?.message ?? String(err) })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productsService: ProductsService) {}
}
