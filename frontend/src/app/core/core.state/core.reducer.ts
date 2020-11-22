import jwt_decode from 'jwt-decode';
import {
	LoginFormAction,
	LoginFormActionTypes,
} from 'src/app/pages/public/login/+state/login.acions';

import { CoreAction, CoreActionTypes } from './core.actions';

export const CORE_FEATURE_KEY = 'Core';

export enum UserType {
	Admin = 'admin',
	User = 'user',
}
export interface Logout {
	refresh: string;
}
export interface DecodedToken {
	iat: string;
	exp: string;
	username: string;
	usertype: string;
}
export interface CoreState {
	credentials?: {
		access: string;
		refresh: string;
		decodedToken: DecodedToken;
	};
}

export interface CorePartialState {
	readonly [CORE_FEATURE_KEY]: CoreState;
}

export const CoreInitialState: CoreState = {};

export function CoreReducer(
	state: CoreState = CoreInitialState,
	action: LoginFormAction | CoreAction
): CoreState {
	switch (action.type) {
		case LoginFormActionTypes.LoginFormResponse: {
			const decodedToken: DecodedToken = jwt_decode(
				action.payload.access
			) as DecodedToken;
			state = {
				...state,
				credentials: {
					...action.payload,
					decodedToken,
				},
			};
			break;
		}
		case CoreActionTypes.LogoutError:
		case CoreActionTypes.LogoutResponse: {
			state = CoreInitialState;

			break;
		}
	}
	return state;
}
