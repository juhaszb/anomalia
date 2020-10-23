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
  RegisterFormActionTypes,
  RegisterFormError,
  RegisterFormResponse,
} from './register.acions';
import { registerFormQuery } from './register.selector';

@Injectable()
export class RegisterFormEffects {
  @Effect() register$ = this.actions$.pipe(
    ofType(RegisterFormActionTypes.RegisterFormRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.register(registerFormQuery.getRegisterForm(storeState)).pipe(
        delay(100),
        map(() => new RegisterFormResponse()),
        catchError(async () => new RegisterFormError())
      )
    )
  );
  @Effect({ dispatch: false }) registered$ = this.actions$.pipe(
    ofType(RegisterFormActionTypes.RegisterFormResponse),
    map(() => this.router.navigateByUrl('public/login'))
  );

  constructor(
    private service: PublicServiceService,
    private router: Router,
    private store: Store<{}>,
    private actions$: Actions
  ) {}
}
