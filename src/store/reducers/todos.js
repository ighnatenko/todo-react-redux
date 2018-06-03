import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  todos: [],
  error: null,
  loading: false
};

const requestStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const addTodoSuccess = (state, action) => {
  [...state.todos.unshift(action.todoItem)];
  return updateObject(state, {
    todos: state.todos,
    loading: false
  });
};

const addTodoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const fetchTodosSuccess = (state, action) => {
  return updateObject(state, {
    todos: state.todos.concat(action.todos),
    loading: false
  });
};

const fetchTodosFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const deleteTodoSuccess = (state, action) => {
  return updateObject(state, {
    todos: action.todos
  });
};

const deleteTodoFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const editTodoSuccess = (state, action) => {
  return updateObject(state, {
    todos: state.todos
  });
};

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case actionTypes.REQUEST_START: return requestStart(state, action);
    case actionTypes.ADD_TODO_SUCCESS: return addTodoSuccess(state, action);
    case actionTypes.ADD_TODO_FAIL: return addTodoFail(state, action);
    case actionTypes.FETCH_TODOS_SUCCESS: return fetchTodosSuccess(state, action);
    case actionTypes.FETCH_TODOS_FAIL: return fetchTodosFail(state, action);
    case actionTypes.DELETE_TODO_SUCCESS: return deleteTodoSuccess(state, action);
    case actionTypes.DELETE_TODO_FAIL: return deleteTodoFail(state, action);
    case actionTypes.EDIT_TODO_SUCCESS: return editTodoSuccess(state, action);
    default: return state;
  }
};

export default reducer;