import {
  NOTE_CHANGED, ADD_NOTE_SUCCESS, FETCH_NOTES_SUCCESS,
} from '../actions/Types';

const INITIAL_STATE = {
  note: '',
  notes: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTE_CHANGED:
      return { ...state, note: action.payload };
    case ADD_NOTE_SUCCESS:
      return { ...state, note: INITIAL_STATE.note };
    case FETCH_NOTES_SUCCESS:
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};
