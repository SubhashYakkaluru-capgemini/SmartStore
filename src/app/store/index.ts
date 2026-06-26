import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { productsReducer } from './products/reducer';
import { cartReducer } from './cart/reducer';
import { ProductsEffects } from './products/effects';

/**
 * Exportable provider array you can spread into your main.ts providers.
 * Example in main.ts (Angular 16+):
 *   bootstrapApplication(AppComponent, {
 *     providers: [
 *       ...storeProviders,
 *       // other providers
 *     ]
 *   });
 */
export const storeProviders = [
  provideStore({
    products: productsReducer,
    cart: cartReducer,
  } as any),
  provideEffects([ProductsEffects]),
];
