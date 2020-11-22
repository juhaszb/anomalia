import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CORE_FEATURE_KEY, CoreState } from './core.reducer';

const getCoreState = createFeatureSelector<CoreState>(CORE_FEATURE_KEY);
const getCredentials = createSelector(
	getCoreState,
	(state: CoreState) => state.credentials
);
const getAcceptToken = createSelector(
	getCoreState,
	(state: CoreState) => state?.credentials?.access
);

const getCurrentUserType = createSelector(getCoreState, (state: CoreState) => {
	return state?.credentials?.decodedToken.usertype;
});
const isLoggedIn = createSelector(getCoreState, (state: CoreState) => {
	return !!state?.credentials?.access;
});
const getRefresh = createSelector(getCoreState, (state: CoreState) => {
	console.log(state?.credentials?.refresh ?? '');
	return state?.credentials?.refresh ?? '';
});
const deleteCredentials = createSelector(getCoreState, (state: CoreState) => {
	if (state != null) {
		state.credentials = undefined;
	}
});

export const CoreQuery = {
	getCredentials,
	getAcceptToken,
	getCurrentUserType,
	isLoggedIn,
	deleteCredentials,
	getRefresh,
};
