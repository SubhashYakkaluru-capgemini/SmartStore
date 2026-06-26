import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from './actions';
import * as ProductsSelectors from './selectors';
import { Observable } from 'rxjs';
import { Product } from './models';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  readonly products$: Observable<Product[]> = this.store.select(ProductsSelectors.selectProductsList);
  readonly loading$ = this.store.select(ProductsSelectors.selectProductsLoading);
  readonly error$ = this.store.select(ProductsSelectors.selectProductsError);
  readonly selectedProduct$ = this.store.select(ProductsSelectors.selectSelectedProduct);

  constructor(private store: Store) {}

  loadProducts() {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  selectProduct(id: string) {
    this.store.dispatch(ProductsActions.selectProduct({ productId: id }));
  }
}
