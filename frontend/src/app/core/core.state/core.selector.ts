import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CORE_FEATURE_KEY, CoreState } from './core.reducer';

const getCoreState = createFeatureSelector<CoreState>(CORE_FEATURE_KEY);
const getCredentials = createSelector(
  getCoreState,
  (state: CoreState) => state.credentials
);
const getAcceptToken = createSelector(
  getCoreState,
  (state: CoreState) => state.credentials?.acceptToken
);

export const CoreQuery = {
  getCredentials,
  getAcceptToken,
};
