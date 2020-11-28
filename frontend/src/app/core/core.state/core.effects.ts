import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import { CoreActionTypes, LogoutError, LogoutResponse } from './core.actions';
import { CoreQuery } from './core.selector';
import { CoreService } from './core.service';

@Injectable()
export class CoreEffects {
	@Effect() logout$ = this.actions$.pipe(
		ofType(CoreActionTypes.LogoutRequest),
		withLatestFrom(this.store),
		mergeMap(([action, storeState]) =>
			this.coreService
				.logout({ refresh: CoreQuery.getRefresh(storeState) })
				.pipe(
					map(() => new LogoutResponse()),
					catchError(async () => new LogoutError())
				)
		)
	);

	@Effect({ dispatch: false }) clearStore$ = this.actions$.pipe(
		ofType(CoreActionTypes.LogoutResponse),
		tap(() => this.store.dispatch({ type: 'SET_ROOT_STATE' }))
	);
	@Effect({ dispatch: false }) loggedout$ = this.actions$.pipe(
		ofType(CoreActionTypes.LogoutResponse),
		tap(() => this.router.navigateByUrl(''))
	);
	constructor(
		private coreService: CoreService,
		private actions$: Actions,
		private router: Router,
		private store: Store<{}>
	) {}
}
