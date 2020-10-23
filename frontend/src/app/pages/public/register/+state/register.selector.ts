import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  REGISTERFORM_FEATURE_KEY,
  RegisterFormState,
} from './register.reducer';

const getRegisterFormState = createFeatureSelector<RegisterFormState>(
  REGISTERFORM_FEATURE_KEY
);
const getRegisterForm = createSelector(
  getRegisterFormState,
  (state: RegisterFormState) => state.form
);
const getRegisterFormRequesting = createSelector(
  getRegisterFormState,
  (state: RegisterFormState) => state.isRequeting
);

export const registerFormQuery = {
  getRegisterForm,
  getRegisterFormRequesting,
};
