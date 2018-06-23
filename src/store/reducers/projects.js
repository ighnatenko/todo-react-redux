import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  projects: [],
  error: null,
  loading: false
};

const requestStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const addProjectSuccess = (state, action) => {
  let projects = [...state.projects];
  projects.push(action.project)
  return updateObject(state, {
    projects: projects,
    loading: false
  });
};

const addProjectFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const fetchProjectsSuccess = (state, action) => {
  return updateObject(state, {
    projects: state.projects.concat(action.projects),
    loading: false
  });
};

const fetchProjectsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const deleteProjectSuccess = (state, action) => {
  let items = [...state.projects];
  items = items.filter(item => item.id !== action.id);
  return updateObject(state, {
    projects: items
  });
};

const deleteProjectFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const editProjectSuccess = (state, action) => {
  const newProjects = [...state.projects];
  const index = newProjects.findIndex(item => item.id === action.id);
  newProjects[index].title = action.title;
  return updateObject(state, {
    projects: newProjects
  });
};

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case actionTypes.LOAD_PROJECTS_START: return requestStart(state, action);
    case actionTypes.ADD_PROJECT_SUCCESS: return addProjectSuccess(state, action);
    case actionTypes.ADD_PROJECT_FAIL: return addProjectFail(state, action);
    case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_FAIL: return fetchProjectsFail(state, action);
    case actionTypes.DELETE_PROJECT_SUCCESS: return deleteProjectSuccess(state, action);
    case actionTypes.DELETE_PROJECT_FAIL: return deleteProjectFail(state, action);
    case actionTypes.EDIT_PROJECT_SUCCESS: return editProjectSuccess(state, action);
    default: return state;
  }
};

export default reducer;