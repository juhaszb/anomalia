import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
	ANIMATIONLIST_FEATURE_KEY,
	AnimationListState,
} from './animation-list.reducer';

const getAnimationListState = createFeatureSelector<AnimationListState>(
	ANIMATIONLIST_FEATURE_KEY
);
const getAnimationList = createSelector(
	getAnimationListState,
	(state: AnimationListState) => state.animationList
);
const getAnimationListRequesting = createSelector(
	getAnimationListState,
	(state: AnimationListState) => state.isRequesting
);

const getDeletePostBuyRequesting = createSelector(
	getAnimationListState,
	(state: AnimationListState) => state.isDeletePostBuyRequesting
);
const getDeleteOrBuyId = createSelector(
	getAnimationListState,
	(state: AnimationListState) => state.deleteOrBuyId
);
const getCommentList = createSelector(
	getAnimationListState,
	(state: AnimationListState) => state.commentList
);
const getCommentRequesting = createSelector(
	getAnimationListState,
	(state: AnimationListState) => state.isCommentRequesting
);

const getCurrentAnimationId = createSelector(
	getAnimationListState,
	(state: AnimationListState) => state.currentAnimationId
);
const getPostCommentText = createSelector(
	getAnimationListState,
	(state: AnimationListState) => state.postCommentText
);

export const AnimationListQuery = {
	getAnimationList,
	getAnimationListRequesting,
	getDeletePostBuyRequesting,
	getDeleteOrBuyId,
	getCommentList,
	getCommentRequesting,
	getCurrentAnimationId,
	getPostCommentText,
};
