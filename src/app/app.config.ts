import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { createReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { counterReducer } from './store/counter.reducer';
import { FormsModule } from '@angular/forms';
import { counterHistoryReducer } from './store/counter-history.reducer';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ count: counterReducer, history: counterHistoryReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    FormsModule,
    provideEffects()
],
};
