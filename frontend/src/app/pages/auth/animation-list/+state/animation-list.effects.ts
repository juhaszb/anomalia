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

import { AuthService } from '../../auth.service';
import {
  AnimationListActionTypes,
  AnimationListError,
  AnimationListResponse,
} from './animation-list.acions';

@Injectable()
export class AnimationListEffects {
  @Effect() Login$ = this.actions$.pipe(
    ofType(AnimationListActionTypes.AnimationListRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.getAnimationList().pipe(
        delay(100),
        map((x) => new AnimationListResponse(x)),
        catchError(async () => new AnimationListError())
      )
    )
  );
  // @Effect() LoggedIn$ = this.actions$.pipe(
  //   ofType(AnimationListActionTypes.AnimationListResponse),
  //   map(() => this.router.navigateByUrl('public/register'))
  // );

  constructor(
    private service: AuthService,
    private router: Router,
    private store: Store<{}>,
    private actions$: Actions
  ) {}
}
