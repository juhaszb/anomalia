import { AnimationListAction } from './animation-list.acions';

export interface Animation {
  id: string;
  url: string;
  bought: boolean;
}

export const ANIMATIONLIST_FEATURE_KEY = 'AnimationList';

export interface AnimationListState {
  animationList: Animation[];
  isRequesting: boolean;
  isDeleteRequesting: boolean;
  deleteId: string;
}

export interface AnimationListPartialState {
  readonly [ANIMATIONLIST_FEATURE_KEY]: AnimationListState;
}

export const AnimationListInitialState: AnimationListState = {
  isRequesting: false,
  isDeleteRequesting: false,
  deleteId: '',
  animationList: [],
};

export function AnimationListReducer(
  state: AnimationListState = AnimationListInitialState,
  action: AnimationListAction
): AnimationListState {
  switch (action.type) {
  }
  return state;
}
