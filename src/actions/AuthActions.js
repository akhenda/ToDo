import { EMAIL_CHANGED, PASSWORD_CHANGED, AUTH_LOADING } from './Types';
import {
  isUserAuthenticated,
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  signOutUser,
} from '../models/User';


export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const isUserSignedIn = () => dispatch => isUserAuthenticated(dispatch);

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    signInWithEmailAndPassword(dispatch, email, password);
  };
};

export const signupUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    signUpWithEmailAndPassword(dispatch, email, password);
  };
};

export const signOut = () => dispatch => signOutUser(dispatch);
