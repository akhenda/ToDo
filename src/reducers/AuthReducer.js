import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  AUTH_LOADING,
  LOGIN_USER_SUCCESSFUL,
  LOGIN_USER_FAILED,
  SIGNUP_USER_SUCCESSFUL,
  SIGNUP_USER_FAILED,
  AUTH_STATE_CHECK,
  SIGN_OUT_USER_SUCCESS,
} from '../actions/Types';

const INITIAL_STATE = {
  authenticated: false,
  email: '',
  password: '',
  loading: false,
  error: {},
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case AUTH_LOADING:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESSFUL:
      return { ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAILED:
      return { ...state, loading: false, error: action.payload };
    case SIGNUP_USER_SUCCESSFUL:
      return { ...INITIAL_STATE, user: action.payload };
    case SIGNUP_USER_FAILED:
      return { ...state, loading: false, error: action.payload };
    case AUTH_STATE_CHECK:
      return {
        ...state,
        user: action.payload.user,
        authenticated: action.payload.authenticated,
      };
    case SIGN_OUT_USER_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
