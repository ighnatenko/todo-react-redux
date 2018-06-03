import * as actionTypes from './actionTypes';
import * as auth from './authSettings';

export const requestStart = () => {
  return {
    type: actionTypes.REQUEST_START
  };
};

export const addTodoSuccess = (todoItem) => {
  return {
    type: actionTypes.ADD_TODO_SUCCESS,
    todoItem: todoItem
  };
};

export const addTodoFail = (error) => {
  return {
    type: actionTypes.ADD_TODO_FAIL,
    error: error
  };
};

export const addTodo = (title) => {
  return dispatch => {
    dispatch(requestStart());
    auth.instanceAxios().post('/projects', { title: title })
      .then(response => {
        console.log(response);
        auth.setHeadersStore(response);
        dispatch(addTodoSuccess(response.data));
      })
      .catch(err => {
        dispatch(addTodoFail(err));
      });
    };
};

export const fetchTodosSuccess = (todos) => {
  return {
    type: actionTypes.FETCH_TODOS_SUCCESS,
    todos: todos
  };
};

export const fetchTodosFail = (error) => {
  return {
    type: actionTypes.FETCH_TODOS_FAIL,
    error: error
  };
};

export const fetchTodos = () => {
  return dispatch => {
    auth.instanceAxios().get('/projects')
      .then(response => {
        console.log(response);
        auth.setHeadersStore(response);
        dispatch(fetchTodosSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchTodosFail(err));
      });
    };
};

export const deleteTodoSuccess = (items) => {
  return {
    type: actionTypes.DELETE_TODO_SUCCESS,
    todos: items
  };
};

export const deleteTodoFail = (error) => {
  return {
    type: actionTypes.DELETE_TODO_FAIL,
    error: error
  };
};

export const deleteTodoItem = (id, items) => {
  return dispatch => {
    auth.instanceAxios().delete('projects/' + id)
      .then(response => {
        console.log(response);
        auth.setHeadersStore(response);
        dispatch(deleteTodoSuccess(items));
      })
      .catch(err => {
        dispatch(deleteTodoFail(err));
      });
    };
};

export const editTodoSuccess = (index, title) => {
  return {
    type: actionTypes.EDIT_TODO_SUCCESS,
    index: index,
    title: title
  };
};

export const editTodoItem = (id, title, index) => {
  return dispatch => {
    auth.instanceAxios().put('projects/' + id, { title: title })
    .then(response => {
      console.log(response);
      auth.setHeadersStore(response);
      dispatch(editTodoSuccess(index, title));
    })
    .catch(err => {
      console.log(err);
    });
  };
};