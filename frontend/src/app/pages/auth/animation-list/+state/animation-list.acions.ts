import { Action } from '@ngrx/store';

export enum AnimationListActionTypes {
  AnimationListRequest = '[AnimationList] AnimationList Request',
  AnimationListResponse = '[AnimationList] AnimationList Response',
  AnimationListError = '[AnimationList] AnimationList Error',
}

export class AnimationListRequest implements Action {
  readonly type = AnimationListActionTypes.AnimationListRequest;
}
export class AnimationListResponse implements Action {
  readonly type = AnimationListActionTypes.AnimationListResponse;
}
export class AnimationListError implements Action {
  readonly type = AnimationListActionTypes.AnimationListError;
}

export type AnimationListAction =
  | AnimationListRequest
  | AnimationListResponse
  | AnimationListError;

export const fromAnimationListActions = {
  AnimationListRequest,
  AnimationListResponse,
  AnimationListError,
};
