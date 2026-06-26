import { Product } from './models';
import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './actions';

export interface ProductsState {
  list: Product[];
  loading: boolean;
  error?: string | null;
  selectedId?: string | null;
}

export const initialProductsState: ProductsState = {
  list: [],
  loading: false,
  error: null,
  selectedId: null,
};

export const productsFeatureKey = 'products';

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductsActions.loadProducts, (state) => ({ ...state, loading: true, error: null })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({ ...state, loading: false, list: products })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(ProductsActions.selectProduct, (state, { productId }) => ({ ...state, selectedId: productId }))
);
