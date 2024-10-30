import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './products/product.effects';
import { productsFeature } from './products/product.feature';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore(), provideState({ name: productsFeature.name, reducer: productsFeature.reducer }), provideHttpClient(), provideEffects(ProductsEffects), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
