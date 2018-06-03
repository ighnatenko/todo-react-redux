import * as actionTypes from './actionTypes';
import * as auth from './authSettings';

export const fetchTasks = (projectID) => {
  return dispatch => {
    // dispatch(requestStart());
    // auth.instanceAxios().post('/projects', { title: title })
    //   .then(response => {
    //     console.log(response);
    //     auth.setHeadersStore(response);
    //     dispatch(addTodoSuccess(response.data));
    //   })
    //   .catch(err => {
    //     dispatch(addTodoFail(err));
    //   });
    };
};

// export const fetchTodosSuccess = (todos) => {
//   return {
//     type: actionTypes.FETCH_TODOS_SUCCESS,
//     todos: todos
//   };
// };

// export const fetchTodosFail = (error) => {
//   return {
//     type: actionTypes.FETCH_TODOS_FAIL,
//     error: error
//   };
// };