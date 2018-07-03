import * as actionTypes from './actionTypes';
import * as auth from './authSettings';

export const fetchTasks = (projectID) => {
  return dispatch => {
    dispatch(fetchTasksStart());
    auth.instanceAxios().get('/projects/' + projectID + '/tasks')
      .then(response => {
        auth.setHeadersStore(response);
        dispatch(fetchTasksSuccess(response.data, projectID));
      })
      .catch(err => {
        dispatch(fetchTasksFail(err));
      });
    };
};

export const fetchTasksStart = () => {
  return {
    type: actionTypes.FETCH_TASKS_START
  };
};

export const fetchTasksSuccess = (tasks, projectID) => {
  return {
    type: actionTypes.FETCH_TASKS_SUCCESS,
    tasks: tasks,
    projectID: projectID
  };
};

export const fetchTasksFail = (error) => {
  return {
    type: actionTypes.FETCH_TASKS_FAIL,
    error: error
  };
};

export const addTaskItem = (title, position, projectID) => {
  return dispatch => {
    dispatch(fetchTasksStart());
    auth.instanceAxios().post('/projects/' + projectID + '/tasks', {title: title, index: position})
      .then(response => {
        auth.setHeadersStore(response);
        dispatch(addTaskItemSuccess(response.data, projectID));
      })
      .catch(err => {
        dispatch(addTaskItemFail(err));
      });
  };
};

export const addTaskItemSuccess = (task, projectID) => {
  return {
    type: actionTypes.ADD_TASK_ITEM_SUCCESS,
    task: task,
    projectID: projectID
  };
};

export const addTaskItemFail = (error) => {
  return {
    type: actionTypes.ADD_TASK_ITEM_FAIL,
    error: error
  };
};

export const deleteTaskItem = (taskID, projectID) => {
  return dispatch => {
    dispatch(fetchTasksStart());
    auth.instanceAxios().delete('/projects/' + projectID + '/tasks/' + taskID)
      .then(response => {
        auth.setHeadersStore(response);
        dispatch(removeTaskItemSuccess(projectID, taskID));
      })
      .catch(err => {
        dispatch(removeTaskItemFail(err));
      });
  };
};

export const removeTaskItemSuccess = (projectID, taskID) => {
  return {
    type: actionTypes.REMOVE_TASK_ITEM_SUCCESS,
    projectID: projectID,
    taskID: taskID
  };
};

export const removeTaskItemFail = (error) => {
  return {
    type: actionTypes.REMOVE_TASK_ITEM_FAIL,
    error: error
  };
};

export const editTaskItem = (taskID, projectID, data) => {
  return dispatch => {
    dispatch(fetchTasksStart());
    auth.instanceAxios().put('/projects/' + projectID + '/tasks/' + taskID, data)
      .then(response => {
        auth.setHeadersStore(response);
        dispatch(editTaskItemSuccess(projectID, taskID, response.data));
      })
      .catch(err => {
        dispatch(editTaskItemFail(err));
      });
  };
};

export const editTaskItemSuccess = (projectID, taskID, item) => {
  return {
    type: actionTypes.EDIT_TASK_ITEM_SUCCESS,
    projectID: projectID,
    taskID: taskID,
    item: item
  };
};

export const editTaskItemFail = (error) => {
  return {
    type: actionTypes.EDIT_TASK_ITEM_FAIL,
    error: error
  };
};

export const sortingTaskItems = (projectID, items, tasks) => {
  return dispatch => {
    dispatch(fetchTasksStart());
    auth.instanceAxios().post('/projects/' + projectID + '/sorting', {tasks: items})
      .then(response => {
        auth.setHeadersStore(response);
        dispatch(sortingTaskItemSuccess(tasks));
      })
      .catch(err => {
        dispatch(sortingTaskItemFail(err));
      });
  };
};

export const sortingTaskItemSuccess = (tasks) => {
  return {
    type: actionTypes.SORT_TASK_ITEM_SUCCESS,
    tasks: tasks
  };
};

export const sortingTaskItemFail = (error) => {
  return {
    type: actionTypes.SORT_TASK_ITEM_FAIL,
    error: error
  };
};