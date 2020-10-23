import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, delay, map, mergeMap, switchMap } from 'rxjs/operators';

import { AuthService } from '../../auth.service';
import {
  UserListActionTypes,
  UserListDeleteError,
  UserListDeleteRequest,
  UserListDeleteResponse,
  UserListError,
  UserListRequest,
  UserListResponse,
} from './user-list.acions';

@Injectable()
export class UserListEffects {
  @Effect() getUsers$ = this.actions$.pipe(
    ofType(UserListActionTypes.UserListRequest),
    mergeMap(() =>
      this.service.getUserList().pipe(
        delay(100),
        map((x) => new UserListResponse(x)),
        catchError(async () => new UserListError())
      )
    )
  );
  @Effect() deleteUser$ = this.actions$.pipe(
    ofType(UserListActionTypes.UserListDeleteRequest),
    switchMap((action: UserListDeleteRequest) =>
      this.service.deleteUser(action.payload).pipe(
        delay(100),
        map(() => new UserListDeleteResponse()),
        catchError(async () => new UserListDeleteError())
      )
    )
  );
  @Effect() getUsersAfterDelete$ = this.actions$.pipe(
    ofType(UserListActionTypes.UserListDeleteResponse),
    map(() => new UserListRequest())
  );
  constructor(private service: AuthService, private actions$: Actions) {}
}
