import { UserListAction, UserListActionTypes } from './user-list.acions';

export interface User {
	id: string;
	username: string;
}

export const USERLIST_FEATURE_KEY = 'UserList';

export interface UserListState {
	userList: User[];
	isRequesting: boolean;
	isDeleteRequesting: boolean;
	deleteId: string;
}

export interface UserListPartialState {
	readonly [USERLIST_FEATURE_KEY]: UserListState;
}

export const UserListInitialState: UserListState = {
	userList: [],
	isRequesting: false,
	isDeleteRequesting: false,
	deleteId: '',
};

export function UserListReducer(
	state: UserListState = UserListInitialState,
	action: UserListAction
): UserListState {
	switch (action.type) {
		case UserListActionTypes.UserListRequest: {
			state = {
				...state,
				isRequesting: true,
			};
			break;
		}
		case UserListActionTypes.UserListError: {
			state = {
				...state,
				isRequesting: false,
			};
			break;
		}
		case UserListActionTypes.UserListResponse: {
			state = {
				...state,
				isRequesting: false,
				userList: action.payload,
			};
			break;
		}

		case UserListActionTypes.UserListDeleteRequest: {
			state = {
				...state,
				isDeleteRequesting: true,
				deleteId: action.payload,
			};
			break;
		}
		case UserListActionTypes.UserListDeleteError:
		case UserListActionTypes.UserListDeleteResponse: {
			state = {
				...state,
				isDeleteRequesting: false,
				deleteId: '',
			};
			break;
		}
	}
	return state;
}
