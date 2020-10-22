import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NavigationActionTiming,
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { Action, ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

// tslint:disable-next-line: no-any
export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  // tslint:disable-next-line: no-any
  return (state: any, action: any) => {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<{}, Action>[] = [stateSetter];

registerLocaleData(localeHu);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    // Connects RouterModule with StoreModule, uses MinimalRouterStateSerializer by default
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'hu-HU' },
    { provide: MAT_DATE_LOCALE, useValue: 'hu-HU' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
