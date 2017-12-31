import { NOTE_CHANGED } from './Types';
import { addToDo, fetchToDos, updateToDo, removeToDo } from '../models/ToDo';

export const noteChanged = (text) => {
  return {
    type: NOTE_CHANGED,
    payload: text,
  };
};

export const saveToDo = ({ todo, completed, starred }) => {
  return (dispatch) => {
    addToDo(dispatch, todo, completed, starred);
  };
};

export const toDosFetch = () => {
  return (dispatch) => {
    fetchToDos(dispatch);
  };
};

export const editToDo = ({
  id, todo, completed, starred,
}) => {
  return (dispatch) => {
    updateToDo(dispatch, id, todo, completed, starred);
  };
};

export const deleteToDo = (id) => {
  return (dispatch) => {
    removeToDo(dispatch, id);
  };
};
