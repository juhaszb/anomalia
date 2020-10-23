import { LoginFormAction, LoginFormActionTypes } from './login.acions';

export interface LoginForm {
  username: string;
  password: string;
}
export interface LoginResponse {
  acceptToken: string;
  refreshToken: string;
}
export const LOGINFORM_FEATURE_KEY = 'LoginForm';

export interface LoginFormState {
  form: LoginForm;
  isRequeting: boolean;
}

export interface LoginFormPartialState {
  readonly [LOGINFORM_FEATURE_KEY]: LoginFormState;
}

export const loginFormInitialState: LoginFormState = {
  form: { password: '', username: '' },
  isRequeting: false,
};

export function LoginFormReducer(
  state: LoginFormState = loginFormInitialState,
  action: LoginFormAction
): LoginFormState {
  switch (action.type) {
    case LoginFormActionTypes.ChangeLoginForm: {
      state = {
        ...state,
        form: action.payload,
      };
      break;
    }
    case LoginFormActionTypes.LoginFormRequest: {
      state = {
        ...state,
        isRequeting: true,
      };
      break;
    }
    case LoginFormActionTypes.LoginFormResponse:
    case LoginFormActionTypes.LoginFormError: {
      state = {
        ...state,
        isRequeting: false,
      };
      break;
    }
  }
  return state;
}
