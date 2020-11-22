import { LoginFormAction, LoginFormActionTypes } from './login.acions';

export interface LoginForm {
	username: string;
	password: string;
}
export interface LoginResponse {
	access: string;
	refresh: string;
}
export const LOGINFORM_FEATURE_KEY = 'LoginForm';

export interface LoginFormState {
	form: LoginForm;
	isRequesting: boolean;
}

export interface LoginFormPartialState {
	readonly [LOGINFORM_FEATURE_KEY]: LoginFormState;
}

export const loginFormInitialState: LoginFormState = {
	form: { password: '', username: '' },
	isRequesting: false,
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
				isRequesting: true,
			};
			break;
		}
		case LoginFormActionTypes.LoginFormResponse:
		case LoginFormActionTypes.LoginFormError: {
			state = {
				...state,
				isRequesting: false,
			};
			break;
		}
	}
	return state;
}
