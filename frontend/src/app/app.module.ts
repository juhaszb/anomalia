import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeHu from '@angular/common/locales/hu';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
	NavigationActionTiming,
	routerReducer,
	StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { Action, ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreEffects } from './core/core.state/core.effects';
import {
	CORE_FEATURE_KEY,
	CoreInitialState,
	CoreReducer,
} from './core/core.state/core.reducer';
import { CoreService } from './core/core.state/core.service';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { SnackbarInterceptor } from './core/interceptors/snackbar.interceptor';
import { SuccessInterceptor } from './core/interceptors/success.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { SharedUiModule } from './shared-ui.module';

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
		HttpClientModule,
		SharedUiModule,
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
		EffectsModule.forRoot([CoreEffects]),
		StoreModule.forFeature(CORE_FEATURE_KEY, CoreReducer, {
			initialState: CoreInitialState,
		}),
		// Instrumentation must be imported after importing StoreModule (config is optional)
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		BrowserAnimationsModule,
	],
	providers: [
		CoreService,
		{ provide: LOCALE_ID, useValue: 'hu-HU' },
		{ provide: MAT_DATE_LOCALE, useValue: 'hu-HU' },
		{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: SnackbarInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: SuccessInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private title: Title
	) {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => {
					let child = this.activatedRoute.firstChild;
					while (child) {
						if (child.firstChild) {
							child = child.firstChild;
						} else if (child.snapshot.data && child.snapshot.data.title) {
							return child.snapshot.data.title;
						} else {
							return null;
						}
					}
					return null;
				})
			)
			.subscribe((data) => {
				this.title.setTitle(data ?? 'Anomália');
			});
	}
}
