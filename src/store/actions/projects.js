import * as actionTypes from './actionTypes';
import * as auth from './authSettings';

export const loadingStart = () => {
  return {
    type: actionTypes.LOAD_PROJECTS_START
  };
};

export const addProjectSuccess = (item) => {
  return {
    type: actionTypes.ADD_PROJECT_SUCCESS,
    project: item
  };
};

export const addProjectFail = (error) => {
  return {
    type: actionTypes.ADD_PROJECT_FAIL,
    error: error
  };
};

export const addProjectItem = (title) => {
  return dispatch => {
    dispatch(loadingStart());
    auth.instanceAxios().post('/projects', { title: title })
      .then(response => {
        console.log(response);
        auth.setHeadersStore(response);
        dispatch(addProjectSuccess(response.data));
      })
      .catch(err => {
        dispatch(addProjectFail(err));
      });
    };
};

export const fetchProjects = () => {
  return dispatch => {
    dispatch(loadingStart());
    auth.instanceAxios().get('/projects')
      .then(response => {
        console.log(response);
        auth.setHeadersStore(response);
        dispatch(fetchProjectsSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchProjectsFail(err));
      });
    };
};

export const fetchProjectsSuccess = (items) => {
  return {
    type: actionTypes.FETCH_PROJECTS_SUCCESS,
    projects: items
  };
};

export const fetchProjectsFail = (error) => {
  return {
    type: actionTypes.FETCH_PROJECTS_FAIL,
    error: error
  };
};

export const deleteProjectSuccess = (id) => {
  return {
    type: actionTypes.DELETE_PROJECT_SUCCESS,
    id: id
  };
};

export const deleteProjectFail = (error) => {
  return {
    type: actionTypes.DELETE_PROJECT_FAIL,
    error: error
  };
};

export const deleteProjectItem = (id) => {
  return dispatch => {
    dispatch(loadingStart());
    auth.instanceAxios().delete('projects/' + id)
      .then(response => {
        console.log(response);
        auth.setHeadersStore(response);
        dispatch(deleteProjectSuccess(id));
      })
      .catch(err => {
        dispatch(deleteProjectFail(err));
      });
    };
};

export const editProjectSuccess = (title, id) => {
  return {
    type: actionTypes.EDIT_PROJECT_SUCCESS,
    title: title,
    id: id
  };
};

export const editProjectItem = (id, title) => {
  return dispatch => {
    dispatch(loadingStart());
    auth.instanceAxios().put('projects/' + id, { title: title })
    .then(response => {
      console.log(response);
      auth.setHeadersStore(response);
      dispatch(editProjectSuccess(title, id));
    })
    .catch(err => {
      console.log(err);
    });
  };
};