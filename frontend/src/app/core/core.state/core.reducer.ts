import jwt_decode from 'jwt-decode';
import {
  LoginFormAction,
  LoginFormActionTypes,
} from 'src/app/pages/public/login/+state/login.acions';

export const CORE_FEATURE_KEY = 'Core';

export interface CoreState {
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

export interface CorePartialState {
  readonly [CORE_FEATURE_KEY]: CoreState;
}

export const CoreInitialState: CoreState = {};

export function CoreReducer(
  state: CoreState = CoreInitialState,
  action: LoginFormAction
): CoreState {
  switch (action.type) {
    case LoginFormActionTypes.LoginFormResponse: {
      const decodedToken: {
        iat: string;
        exp: string;
        username: string;
        userType: string;
      } = jwt_decode(action.payload.acceptToken);
      state = {
        ...state,
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
