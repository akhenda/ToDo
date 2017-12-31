import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import {
  ADD_NOTE_SUCCESS,
  FETCH_NOTES_SUCCESS,
} from '../actions/Types';


export const fetchToDos = (dispatch) => {
  const { currentUser } = firebase.auth();

  if (currentUser) {
    firebase.database().ref(`todos/${currentUser.uid}`)
      .on('value', (snapshot) => {
        dispatch({ type: FETCH_NOTES_SUCCESS, payload: snapshot.val() });
      });
  }
};

export const addToDo = (dispatch, todo, completed, starred) => {
  const { currentUser } = firebase.auth();

  if (currentUser) {
    firebase.database()
      .ref(`todos/${currentUser.uid}`)
      .push({ todo, completed, starred })
      .then(() => {
        dispatch({ type: ADD_NOTE_SUCCESS });
        Actions.pop();
      });
  }
};

export const updateToDo = (dispatch, id, todo, completed, starred) => {
  const { currentUser } = firebase.auth();

  if (currentUser) {
    firebase.database()
      .ref(`todos/${currentUser.uid}/${id}`)
      .update({ todo, completed, starred });
  }
};

export const removeToDo = (dispatch, id) => {
  const { currentUser } = firebase.auth();

  if (currentUser) {
    firebase.database()
      .ref(`todos/${currentUser.uid}/${id}`)
      .remove();
  }
};
