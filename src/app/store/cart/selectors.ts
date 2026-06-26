import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCartItems = createSelector(selectCartState, (s) => s.items);
export const selectCartTotal = createSelector(selectCartItems, (items) => items.reduce((sum, it) => sum + it.product.price * it.quantity, 0));
export const selectCartCount = createSelector(selectCartItems, (items) => items.reduce((sum, it) => sum + it.quantity, 0));
