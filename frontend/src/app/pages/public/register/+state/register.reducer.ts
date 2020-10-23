import { RegisterFormAction, RegisterFormActionTypes } from './register.acions';

export interface RegisterForm {
  username: string;
  password: string;
}

export const REGISTERFORM_FEATURE_KEY = 'RegisterForm';

export interface RegisterFormState {
  form: RegisterForm;
  isRequeting: boolean;
}

export interface RegisterFormPartialState {
  readonly [REGISTERFORM_FEATURE_KEY]: RegisterFormState;
}

export const registerFormInitialState: RegisterFormState = {
  form: { password: '', username: '' },
  isRequeting: false,
};

export function RegisterFormReducer(
  state: RegisterFormState = registerFormInitialState,
  action: RegisterFormAction
): RegisterFormState {
  switch (action.type) {
    case RegisterFormActionTypes.ChangeRegisterForm: {
      state = {
        ...state,
        form: action.payload,
      };
      break;
    }
    case RegisterFormActionTypes.RegisterFormRequest: {
      state = {
        ...state,
        isRequeting: true,
      };
      break;
    }
    case RegisterFormActionTypes.RegisterFormError:
    case RegisterFormActionTypes.RegisterFormResponse: {
      state = {
        ...state,
        isRequeting: false,
      };
      break;
    }
  }
  return state;
}
