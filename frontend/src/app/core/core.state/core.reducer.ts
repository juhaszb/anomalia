import { CoreAction } from './core.acions';

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
  action: CoreAction
): CoreState {
  // switch (action.type) {

  // }
  return state;
}
