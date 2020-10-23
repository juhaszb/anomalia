import jwt_decode from 'jwt-decode';

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
  credentials?: {
    acceptToken: string;
    refreshToken: string;
    decodedToken: {
      iat: string;
      exp: string;
      username: string;
      userType: string;
    };
  };
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
    case LoginFormActionTypes.LoginFormError: {
      state = {
        ...state,
        isRequeting: false,
      };
      break;
    }
    case LoginFormActionTypes.LoginFormResponse: {
      const decodedToken: {
        iat: string;
        exp: string;
        username: string;
        userType: string;
      } = jwt_decode(action.payload.acceptToken);
      localStorage.setItem('acceptToken', action.payload.acceptToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      state = {
        ...state,
        isRequeting: false,
        credentials: {
          ...action.payload,
          decodedToken,
        },
      };
      break;
    }
  }
  return state;
}
