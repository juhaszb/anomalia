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
			localStorage.setItem('access', action.payload.access);
			localStorage.setItem('refresh', action.payload.refresh);
			state = {
				...state,
				credentials: {
					...action.payload,
					decodedToken,
				},
			};
			break;
		}
		case CoreActionTypes.LogoutResponse: {
			state = CoreInitialState;

			break;
		}

		case CoreActionTypes.SetToken: {
			let decodedToken;
			try {
				decodedToken = jwt_decode(
					localStorage.getItem('access') ?? ''
				) as DecodedToken;
			} catch {
				console.error('Invalid token');
			}

			localStorage.getItem('refresh');
			state = {
				...state,
				credentials: {
					access: localStorage.getItem('access') ?? '',
					refresh: localStorage.getItem('refresh') ?? '',
					decodedToken: decodedToken ?? {},
				},
			};
			break;
		}
	}
	return state;
}

export const IsAuthenticated = () => {
	try {
		const access = localStorage.getItem('access');
		const refresh = localStorage.getItem('refresh');
		if (!access || !refresh) {
			return false;
		}
		const decodedToken: DecodedToken = jwt_decode(access) as DecodedToken;
		if (typeof decodedToken === 'object') {
			return true;
		} else {
			return false;
		}
	} catch {
		return false;
	}
};
