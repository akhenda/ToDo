import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import {
  LOGIN_USER_SUCCESSFUL,
  LOGIN_USER_FAILED,
  SIGNUP_USER_SUCCESSFUL,
  SIGNUP_USER_FAILED,
  AUTH_STATE_CHECK,
  SIGN_OUT_USER_SUCCESS,
} from '../actions/Types';


export const isUserAuthenticated = (dispatch) => {  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: AUTH_STATE_CHECK,
        payload: { authenticated: true, user },
      });
    } else {
      dispatch({
        type: AUTH_STATE_CHECK,
        payload: { authenticated: false, user: {} },
      });
    }
  });
};

export const signUpWithEmailAndPassword = (dispatch, email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({ type: SIGNUP_USER_SUCCESSFUL, payload: user });
      Actions.main({ type: 'reset' });
    })
    .catch((error) => {
      dispatch({ type: SIGNUP_USER_FAILED, payload: error });
    });
};

export const signInWithEmailAndPassword = (dispatch, email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({ type: LOGIN_USER_SUCCESSFUL, payload: user });
      Actions.main({ type: 'reset' });
    })
    .catch((error) => {
      dispatch({ type: LOGIN_USER_FAILED, payload: error });
    });
};

export const signOutUser = (dispatch) => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    dispatch({ type: SIGN_OUT_USER_SUCCESS });
    Actions.auth({ type: 'reset' });
  }).catch(() => {
    // An error happened.
  });
};
