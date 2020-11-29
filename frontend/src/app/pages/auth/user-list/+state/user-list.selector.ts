import { createFeatureSelector, createSelector } from '@ngrx/store';

import { USERLIST_FEATURE_KEY, UserListState } from './user-list.reducer';

const getUserListState = createFeatureSelector<UserListState>(
  USERLIST_FEATURE_KEY
);
const getUserList = createSelector(
  getUserListState,
  (state: UserListState) => state.userList
);
const getUserListRequesting = createSelector(
  getUserListState,
  (state: UserListState) => state.isRequesting
);

const getUserDeleteRequesting = createSelector(
  getUserListState,
  (state: UserListState) => state.isDeleteRequesting
);
const getDeleteId = createSelector(
  getUserListState,
  (state: UserListState) => state.deleteId
);

export const UserListQuery = {
  getUserList,
  getUserListRequesting,
  getUserDeleteRequesting,
  getDeleteId,
};
