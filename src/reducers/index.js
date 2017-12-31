import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ToDoReducer from './ToDoReducer';

export default combineReducers({
  auth: AuthReducer,
  todos: ToDoReducer,
});
