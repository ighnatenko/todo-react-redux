import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  tasks: {},
  error: null,
  loading: false,
};

const fetchTasksFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const fetchTasksSuccess = (state, action) => {
  state.tasks[action.projectID] = action.tasks;
  return updateObject(state, {
    tasks: state.tasks,
    loading: false
  });
};

const fetchTasksStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  });
};

const addTaskItemSuccess = (state, action) => {
  state.tasks[action.projectID].push(action.task);
  return updateObject(state, {
    tasks: state.tasks,
    loading: false
  });
};

const addTaskItemFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const removeTaskItemSuccess = (state, action) => {
  let tasks = state.tasks;
  let items = [...tasks[action.projectID]];
  let index = items.findIndex(item => item.id === action.taskID);
  items.splice(index, 1);
  tasks[action.projectID] = items;

  return updateObject(state, {
    tasks: tasks,
    loading: false
  });
};

const removeTaskItemFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const editTaskItemSuccess = (state, action) => {
  let tasks = state.tasks;
  let items = [...tasks[action.projectID]];
  let index = items.findIndex(item => item.id === action.taskID);
  items[index] = action.item
  tasks[action.projectID] = items;

  return updateObject(state, {
    tasks: tasks,
    loading: false
  });
};

const editTaskItemFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const sortingTaskItemSuccess = (state, action) => {
  return updateObject(state, {
    tasks: action.tasks,
    loading: false
  });
};

const sortingTaskItemFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TASKS_START: return fetchTasksStart(state, action);
    case actionTypes.FETCH_TASKS_SUCCESS: return fetchTasksSuccess(state, action);
    case actionTypes.FETCH_TASKS_FAIL: return fetchTasksFail(state, action);
    case actionTypes.ADD_TASK_ITEM_SUCCESS: return addTaskItemSuccess(state, action);
    case actionTypes.ADD_TASK_ITEM_FAIL: return addTaskItemFail(state, action);
    case actionTypes.REMOVE_TASK_ITEM_SUCCESS: return removeTaskItemSuccess(state, action);
    case actionTypes.REMOVE_TASK_ITEM_FAIL: return removeTaskItemFail(state, action);
    case actionTypes.EDIT_TASK_ITEM_SUCCESS: return editTaskItemSuccess(state, action);
    case actionTypes.EDIT_TASK_ITEM_FAIL: return editTaskItemFail(state, action);
    case actionTypes.SORT_TASK_ITEM_SUCCESS: return sortingTaskItemSuccess(state, action);
    case actionTypes.SORT_TASK_ITEM_FAIL: return sortingTaskItemFail(state, action);
    default: return state;
  }
};

export default reducer;