import { Action } from '@ngrx/store';

export enum CoreActionTypes {
	LogoutRequest = '[Logout] Logout Request',
	LogoutResponse = '[Logout] Logout Response',
	LogoutError = '[Logout] Logout Error',
}

export class LogoutRequest implements Action {
	readonly type = CoreActionTypes.LogoutRequest;
}
export class LogoutResponse implements Action {
	readonly type = CoreActionTypes.LogoutResponse;
}
export class LogoutError implements Action {
	readonly type = CoreActionTypes.LogoutError;
}

export type CoreAction = LogoutRequest | LogoutResponse | LogoutError;

export const fromCoreActions = {
	LogoutRequest,
	LogoutResponse,
	LogoutError,
};
