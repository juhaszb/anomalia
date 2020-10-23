import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  delay,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';

import { PublicServiceService } from '../../public.service';
import {
  LoginFormActionTypes,
  LoginFormError,
  LoginFormResponse,
} from './login.acions';
import { LoginFormQuery } from './login.selector';

@Injectable()
export class LoginFormEffects {
  @Effect() Login$ = this.actions$.pipe(
    ofType(LoginFormActionTypes.LoginFormRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.login(LoginFormQuery.getLoginForm(storeState)).pipe(
        delay(100),
        map((x) => new LoginFormResponse(x)),
        catchError(async () => new LoginFormError())
      )
    )
  );
  // @Effect() LoggedIn$ = this.actions$.pipe(
  //   ofType(LoginFormActionTypes.LoginFormResponse),
  //   map(() => this.router.navigateByUrl('public/register'))
  // );

  constructor(
    private service: PublicServiceService,
    private router: Router,
    private store: Store<{}>,
    private actions$: Actions
  ) {}
}
