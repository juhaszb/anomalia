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

const getAnimationDeleteRequesting = createSelector(
  getAnimationListState,
  (state: AnimationListState) => state.isDeleteRequesting
);
const getDeleteId = createSelector(
  getAnimationListState,
  (state: AnimationListState) => state.deleteId
);

export const AnimationListQuery = {
  getAnimationList,
  getAnimationListRequesting,
  getAnimationDeleteRequesting,
  getDeleteId,
};
