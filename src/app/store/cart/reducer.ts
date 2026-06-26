import { createReducer, on } from '@ngrx/store';
import * as CartActions from './actions';
import { Product } from '../products/models';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};

export const cartFeatureKey = 'cart';

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.addToCart, (state, { product, quantity = 1 }) => {
    const existing = state.items.find((i) => i.product.id === product.id);
    let items;
    if (existing) {
      items = state.items.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i));
    } else {
      items = [...state.items, { product, quantity }];
    }
    return { ...state, items };
  }),
  on(CartActions.removeFromCart, (state, { productId }) => ({ ...state, items: state.items.filter((i) => i.product.id !== productId) })),
  on(CartActions.clearCart, (state) => ({ ...state, items: [] }))
);
