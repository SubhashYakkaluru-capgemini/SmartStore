import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProductsList = createSelector(selectProductsState, (s) => s.list);
export const selectProductsLoading = createSelector(selectProductsState, (s) => s.loading);
export const selectProductsError = createSelector(selectProductsState, (s) => s.error);
export const selectSelectedProductId = createSelector(selectProductsState, (s) => s.selectedId);
export const selectSelectedProduct = createSelector(selectProductsList, selectSelectedProductId, (list, id) => list.find((p) => p.id === id) ?? null);
