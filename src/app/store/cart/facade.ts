import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CartActions from './actions';
import * as CartSelectors from './selectors';
import { Observable } from 'rxjs';
import { CartItem } from './reducer';

@Injectable({ providedIn: 'root' })
export class CartFacade {
  readonly items$: Observable<CartItem[]> = this.store.select(CartSelectors.selectCartItems);
  readonly total$ = this.store.select(CartSelectors.selectCartTotal);
  readonly count$ = this.store.select(CartSelectors.selectCartCount);

  constructor(private store: Store) {}

  addToCart(product: any, quantity = 1) {
    this.store.dispatch(CartActions.addToCart({ product, quantity }));
  }

  removeFromCart(productId: string) {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }
}
