import { HttpResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { AnimationInfo, CommentInfo } from './animation-list.reducer';

export enum AnimationListActionTypes {
	AnimationListRequest = '[AnimationList] AnimationList Request',
	AnimationListResponse = '[AnimationList] AnimationList Response',
	AnimationListError = '[AnimationList] AnimationList Error',

	AnimationDeleteRequest = '[AnimationDelete] AnimationDelete Request',
	AnimationDeleteResponse = '[AnimationDelete] AnimationDelete Response',
	AnimationDeleteError = '[AnimationDelete] AnimationDelete Error',

	AnimationDownloadRequest = '[AnimationDownload] AnimationDownload Request',
	AnimationDownloadResponse = '[AnimationDownload] AnimationDownload Response',
	AnimationDownloadError = '[AnimationDownload] AnimationDownload Error',

	AnimationUploadRequest = '[AnimationUpload] AnimationUpload Request',
	AnimationUploadResponse = '[AnimationUpload] AnimationUpload Response',
	AnimationUploadError = '[AnimationUpload] AnimationUpload Error',

	AnimationGetCommentRequest = '[AnimationGetComment] AnimationGetComment Request',
	AnimationGetCommentResponse = '[AnimationGetComment] AnimationGetComment Response',
	AnimationGetCommentError = '[AnimationGetComment] AnimationGetComment Error',

	AnimationPostCommentRequest = '[AnimationPostComment] AnimationPostComment Request',
	AnimationPostCommentResponse = '[AnimationPostComment] AnimationPostComment Response',
	AnimationPostCommentError = '[AnimationPostComment] AnimationPostComment Error',

	AnimationPostCommentChange = '[AnimationPostComment] AnimationPostComment Change',

	AnimationBuyRequest = '[AnimationBuy] AnimationBuy Request',
	AnimationBuyResponse = '[AnimationBuy] AnimationBuy Response',
	AnimationBuyError = '[AnimationBuy] AnimationBuy Error',
}

export class AnimationListRequest implements Action {
	readonly type = AnimationListActionTypes.AnimationListRequest;
}
export class AnimationPostCommentChange implements Action {
	readonly type = AnimationListActionTypes.AnimationPostCommentChange;
	constructor(public payload: string) {}
}
export class AnimationListResponse implements Action {
	readonly type = AnimationListActionTypes.AnimationListResponse;
	constructor(public payload: AnimationInfo[]) {}
}
export class AnimationListError implements Action {
	readonly type = AnimationListActionTypes.AnimationListError;
}

export class AnimationDeleteRequest implements Action {
	readonly type = AnimationListActionTypes.AnimationDeleteRequest;
	constructor(public payload: string) {}
}
export class AnimationDeleteResponse implements Action {
	readonly type = AnimationListActionTypes.AnimationDeleteResponse;
}
export class AnimationDeleteError implements Action {
	readonly type = AnimationListActionTypes.AnimationDeleteError;
}

export class AnimationDownloadRequest implements Action {
	readonly type = AnimationListActionTypes.AnimationDownloadRequest;
	constructor(public payload: string) {}
}
export class AnimationDownloadResponse implements Action {
	readonly type = AnimationListActionTypes.AnimationDownloadResponse;
	constructor(public payload: HttpResponse<Blob>) {}
}
export class AnimationDownloadError implements Action {
	readonly type = AnimationListActionTypes.AnimationDownloadError;
}
export class AnimationUploadRequest implements Action {
	readonly type = AnimationListActionTypes.AnimationUploadRequest;
	constructor(public payload: File) {}
}
export class AnimationUploadResponse implements Action {
	readonly type = AnimationListActionTypes.AnimationUploadResponse;
}
export class AnimationUploadError implements Action {
	readonly type = AnimationListActionTypes.AnimationUploadError;
}
export class AnimationGetCommentRequest implements Action {
	readonly type = AnimationListActionTypes.AnimationGetCommentRequest;
	constructor(public payload: string) {}
}
export class AnimationGetCommentResponse implements Action {
	readonly type = AnimationListActionTypes.AnimationGetCommentResponse;
	constructor(public payload: CommentInfo[]) {}
}
export class AnimationGetCommentError implements Action {
	readonly type = AnimationListActionTypes.AnimationGetCommentError;
}
export class AnimationPostCommentRequest implements Action {
	readonly type = AnimationListActionTypes.AnimationPostCommentRequest;
	constructor(public payload: { animationId: string; comment: string }) {}
}
export class AnimationPostCommentResponse implements Action {
	readonly type = AnimationListActionTypes.AnimationPostCommentResponse;
}
export class AnimationPostCommentError implements Action {
	readonly type = AnimationListActionTypes.AnimationPostCommentError;
}

export class AnimationBuyRequest implements Action {
	readonly type = AnimationListActionTypes.AnimationBuyRequest;
	constructor(public payload: string) {}
}
export class AnimationBuyResponse implements Action {
	readonly type = AnimationListActionTypes.AnimationBuyResponse;
}
export class AnimationBuyError implements Action {
	readonly type = AnimationListActionTypes.AnimationBuyError;
}

export type AnimationListAction =
	| AnimationListRequest
	| AnimationListResponse
	| AnimationListError
	| AnimationDeleteRequest
	| AnimationDeleteResponse
	| AnimationDeleteError
	| AnimationDownloadRequest
	| AnimationDownloadResponse
	| AnimationDownloadError
	| AnimationUploadRequest
	| AnimationUploadResponse
	| AnimationUploadError
	| AnimationGetCommentRequest
	| AnimationGetCommentResponse
	| AnimationGetCommentError
	| AnimationPostCommentRequest
	| AnimationPostCommentResponse
	| AnimationPostCommentError
	| AnimationBuyRequest
	| AnimationBuyResponse
	| AnimationBuyError
	| AnimationPostCommentChange;

export const fromAnimationListActions = {
	AnimationListRequest,
	AnimationListResponse,
	AnimationListError,
	AnimationDeleteRequest,
	AnimationDeleteResponse,
	AnimationDeleteError,
	AnimationDownloadRequest,
	AnimationDownloadResponse,
	AnimationDownloadError,
	AnimationUploadRequest,
	AnimationUploadResponse,
	AnimationUploadError,
	AnimationGetCommentRequest,
	AnimationGetCommentResponse,
	AnimationGetCommentError,
	AnimationPostCommentRequest,
	AnimationPostCommentResponse,
	AnimationPostCommentError,
	AnimationBuyRequest,
	AnimationBuyResponse,
	AnimationBuyError,
	AnimationPostCommentChange,
};
