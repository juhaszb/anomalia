import { Action } from '@ngrx/store';

import { User } from './user-list.reducer';

export enum UserListActionTypes {
  UserListRequest = '[UserList] UserList Request',
  UserListResponse = '[UserList] UserList Response',
  UserListError = '[UserList] UserList Error',

  UserListDeleteRequest = '[UserList] UserListDelete Request',
  UserListDeleteResponse = '[UserList] UserListDelete Response',
  UserListDeleteError = '[UserList] UserListDelete Error',
}

export class UserListRequest implements Action {
  readonly type = UserListActionTypes.UserListRequest;
}
export class UserListResponse implements Action {
  readonly type = UserListActionTypes.UserListResponse;
  constructor(public payload: User[]) {}
}
export class UserListError implements Action {
  readonly type = UserListActionTypes.UserListError;
}
export class UserListDeleteRequest implements Action {
  readonly type = UserListActionTypes.UserListDeleteRequest;
  constructor(public payload: string) {}
}
export class UserListDeleteResponse implements Action {
  readonly type = UserListActionTypes.UserListDeleteResponse;
}
export class UserListDeleteError implements Action {
  readonly type = UserListActionTypes.UserListDeleteError;
}

export type UserListAction =
  | UserListRequest
  | UserListResponse
  | UserListError
  | UserListDeleteRequest
  | UserListDeleteResponse
  | UserListDeleteError;

export const fromUserListActions = {
  UserListRequest,
  UserListResponse,
  UserListError,
  UserListDeleteRequest,
  UserListDeleteResponse,
  UserListDeleteError,
};
