import { createAction, props } from '@ngrx/store';
import { Product } from '../products/models';

export const addToCart = createAction('[Cart] Add To Cart', props<{ product: Product; quantity?: number }>());
export const removeFromCart = createAction('[Cart] Remove From Cart', props<{ productId: string }>());
export const clearCart = createAction('[Cart] Clear Cart');
