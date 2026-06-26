# NgRx store (products + cart)

This folder adds a small NgRx-based store to the SmartStore app on branch feature/ngrx-store.

What was added
- src/app/store/index.ts — storeProviders you can import into main.ts
- src/app/store/products/* — actions, reducer, selectors, effects, facade, models
- src/app/store/cart/* — actions, reducer, selectors, facade
- src/app/services/products.service.ts — simple ProductsService (mocked responses for now)
- src/app/features/products/ — example ProductsList standalone component

How to enable the store
1. Open src/main.ts and spread the providers from the store into bootstrapApplication (Angular 16+):

  import { storeProviders } from './app/store';

  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(BrowserModule, HttpClientModule),
      ...storeProviders,
    ],
  });

If your project uses NgModule bootstrap, instead register the reducers/effects in your AppModule providers.

Notes
- ProductsService currently returns mocked data; replace with real HTTP calls (uncomment the HttpClient request) and update the base URL to your environment settings.
- I kept the implementation framework-agnostic (no @ngrx/entity) so it works without adding extra dependencies; if you'd like entity support I can refactor to use @ngrx/entity.

Next steps I can take
- Wire real backend endpoints (provide API base URL / env variables)
- Add unit tests for reducers/effects/selectors
- Add an Auth slice and Orders slice
- Create a small demo route that shows the ProductsList in the app

