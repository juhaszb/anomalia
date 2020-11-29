import {
	AnimationListAction,
	AnimationListActionTypes,
} from './animation-list.actions';

export interface AnimationInfo {
	id: string;
	url: string;
	bought: boolean;
}
export interface CommentInfo {
	id: string;
	text: string;
}
export const ANIMATIONLIST_FEATURE_KEY = 'AnimationList';

export interface AnimationListState {
	animationList: AnimationInfo[];
	isRequesting: boolean;
	isDeletePostBuyRequesting: boolean;
	deleteOrBuyId: string;
	commentList: CommentInfo[];
	isCommentRequesting: boolean;
	postCommentText: string;
	currentAnimationId: string;
}

export interface AnimationListPartialState {
	readonly [ANIMATIONLIST_FEATURE_KEY]: AnimationListState;
}

export const AnimationListInitialState: AnimationListState = {
	isRequesting: false,
	isDeletePostBuyRequesting: false,
	deleteOrBuyId: '',
	animationList: [],
	commentList: [],
	isCommentRequesting: false,
	postCommentText: '',
	currentAnimationId: '',
};

export function AnimationListReducer(
	state: AnimationListState = AnimationListInitialState,
	action: AnimationListAction
): AnimationListState {
	switch (action.type) {
		case AnimationListActionTypes.AnimationListRequest: {
			state = {
				...state,
				isRequesting: true,
			};
			break;
		}
		case AnimationListActionTypes.AnimationListResponse: {
			state = {
				...state,
				isRequesting: false,
				animationList: action.payload,
			};
			break;
		}

		case AnimationListActionTypes.AnimationListError: {
			state = {
				...state,
				isRequesting: false,
			};
			break;
		}
		case AnimationListActionTypes.AnimationBuyRequest:
		case AnimationListActionTypes.AnimationDeleteRequest: {
			state = {
				...state,
				isDeletePostBuyRequesting: true,
				deleteOrBuyId: action.payload,
			};
			break;
		}

		case AnimationListActionTypes.AnimationBuyResponse:
		case AnimationListActionTypes.AnimationBuyError:
		case AnimationListActionTypes.AnimationUploadResponse:
		case AnimationListActionTypes.AnimationUploadError:
		case AnimationListActionTypes.AnimationDeleteError:
		case AnimationListActionTypes.AnimationDeleteResponse: {
			state = {
				...state,
				isDeletePostBuyRequesting: false,
				deleteOrBuyId: '',
			};
			break;
		}
		case AnimationListActionTypes.AnimationGetCommentResponse: {
			state = {
				...state,
				isCommentRequesting: false,
				commentList: action.payload,
			};
			break;
		}
		case AnimationListActionTypes.AnimationGetCommentRequest: {
			state = {
				...state,
				currentAnimationId: action.payload,
				isCommentRequesting: true,
			};
			break;
		}
		case AnimationListActionTypes.AnimationGetCommentError: {
			state = {
				...state,
				isCommentRequesting: false,
			};
			break;
		}
		case AnimationListActionTypes.AnimationPostCommentRequest: {
			state = {
				...state,
				isDeletePostBuyRequesting: true,
			};
			break;
		}
		case AnimationListActionTypes.AnimationPostCommentResponse: {
			state = {
				...state,
				isDeletePostBuyRequesting: false,
				postCommentText: AnimationListInitialState.postCommentText,
			};
			break;
		}
		case AnimationListActionTypes.AnimationPostCommentChange: {
			state = {
				...state,
				postCommentText: action.payload,
			};
			break;
		}
	}
	return state;
}
