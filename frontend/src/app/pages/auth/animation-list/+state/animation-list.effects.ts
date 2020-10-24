import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { AuthService } from '../../auth.service';
import {
  AnimationBuyError,
  AnimationBuyRequest,
  AnimationBuyResponse,
  AnimationDeleteError,
  AnimationDeleteRequest,
  AnimationDeleteResponse,
  AnimationDownloadError,
  AnimationDownloadRequest,
  AnimationDownloadResponse,
  AnimationGetCommentError,
  AnimationGetCommentRequest,
  AnimationGetCommentResponse,
  AnimationListActionTypes,
  AnimationListError,
  AnimationListRequest,
  AnimationListResponse,
  AnimationPostCommentError,
  AnimationPostCommentRequest,
  AnimationPostCommentResponse,
  AnimationUploadError,
  AnimationUploadRequest,
  AnimationUploadResponse,
} from './animation-list.actions';

@Injectable()
export class AnimationListEffects {
  @Effect() getAnimationList$ = this.actions$.pipe(
    ofType(AnimationListActionTypes.AnimationListRequest),
    mergeMap((action) =>
      this.service.getAnimationList().pipe(
        map((x) => new AnimationListResponse(x)),
        catchError(async () => new AnimationListError())
      )
    )
  );
  @Effect() deleteAnimation$ = this.actions$.pipe(
    ofType(AnimationListActionTypes.AnimationDeleteRequest),
    switchMap((action: AnimationDeleteRequest) =>
      this.service.deleteAnimation(action.payload).pipe(
        map(() => new AnimationDeleteResponse()),
        catchError(async () => new AnimationDeleteError())
      )
    )
  );
  @Effect() buyAnimation$ = this.actions$.pipe(
    ofType(AnimationListActionTypes.AnimationBuyRequest),
    switchMap((action: AnimationBuyRequest) =>
      this.service.buyAnimation(action.payload).pipe(
        map(() => new AnimationBuyResponse()),
        catchError(async () => new AnimationBuyError())
      )
    )
  );
  @Effect() downloadAnimation$ = this.actions$.pipe(
    ofType(AnimationListActionTypes.AnimationDownloadRequest),
    switchMap((action: AnimationDownloadRequest) =>
      this.service.downloadAnimation(action.payload).pipe(
        map((x) => new AnimationDownloadResponse(x)),
        catchError(async () => new AnimationDownloadError())
      )
    )
  );
  @Effect() uploadAnimation$ = this.actions$.pipe(
    ofType(AnimationListActionTypes.AnimationUploadRequest),
    switchMap((action: AnimationUploadRequest) =>
      this.service.uploadAnimation(action.payload).pipe(
        map(() => new AnimationUploadResponse()),
        catchError(async () => new AnimationUploadError())
      )
    )
  );
  @Effect() getAnimationComments$ = this.actions$.pipe(
    ofType(AnimationListActionTypes.AnimationGetCommentRequest),
    switchMap((action: AnimationGetCommentRequest) =>
      this.service.getCommentList(action.payload).pipe(
        map((x) => new AnimationGetCommentResponse(x)),
        catchError(async () => new AnimationGetCommentError())
      )
    )
  );

  @Effect() postAnimationComment$ = this.actions$.pipe(
    ofType(AnimationListActionTypes.AnimationPostCommentRequest),
    switchMap((action: AnimationPostCommentRequest) =>
      this.service.postComment(action.payload).pipe(
        map(() => new AnimationPostCommentResponse()),
        catchError(async () => new AnimationPostCommentError())
      )
    )
  );
  @Effect() getAnimationListAfterUpdate$ = this.actions$.pipe(
    ofType(
      AnimationListActionTypes.AnimationDeleteResponse,
      AnimationListActionTypes.AnimationBuyResponse,
      AnimationListActionTypes.AnimationUploadResponse
    ),
    map(() => new AnimationListRequest())
  );

  constructor(private service: AuthService, private actions$: Actions) {}
}
