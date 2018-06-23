import * as actionTypes from './actionTypes';
import * as auth from './authSettings';

export const fetchComments = (projectID, taskID) => {
  return dispatch => {
    dispatch(clearComments());
    dispatch(fetchCommentsStart());
    auth.instanceAxios().get('/projects/' + projectID + '/tasks/' + taskID + '/comments')
      .then(response => {
        console.log(response.data);
        auth.setHeadersStore(response);
        dispatch(fetchCommentsSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchCommentsFail(err));
      });
  };
};

export const clearComments = () => {
  return {
    type: actionTypes.CLEAR_COMMENTS
  };
};

export const fetchCommentsStart = () => {
  return {
    type: actionTypes.FETCH_COMMENTS_START
  };
};

export const fetchCommentsSuccess = (items) => {
  return {
    type: actionTypes.FETCH_COMMENTS_SUCCESS,
    items: items
  };
};

export const fetchCommentsFail = (error) => {
  return {
    type: actionTypes.FETCH_COMMENTS_FAIL,
    error: error
  };
};

export const deleteCommentItem = (projectID, taskID, commentID, items) => {
  return dispatch => {
    dispatch(fetchCommentsStart());
    auth.instanceAxios().delete('/projects/' + projectID + '/tasks/' + taskID + '/comments/' + commentID)
      .then(response => {
        console.log(response);
        auth.setHeadersStore(response);
        dispatch(deleteCommentSuccess(items));
      })
      .catch(err => {
        console.log(err);
        dispatch(deleteCommentFail(err));
      });
    };
};

export const deleteCommentSuccess = (items) => {
  return {
    type: actionTypes.DELETE_COMMENT_SUCCESS,
    items: items
  };
};

export const deleteCommentFail = (error) => {
  return {
    type: actionTypes.DELETE_COMMENT_FAIL,
    error: error
  };
};

export const addComment = (projectID, taskID, data) => {
  return dispatch => {
    dispatch(fetchCommentsStart());
    auth.instanceAxios().post('/projects/' + projectID + '/tasks/' + taskID + '/comments', data)
      .then(response => {
        console.log(response.data);
        auth.setHeadersStore(response);
        dispatch(addCommentSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(addCommentFail(err));
      });
    };
};

export const addCommentSuccess = (item) => {
  return {
    type: actionTypes.ADD_COMMENT_SUCCESS,
    item: item
  };
};

export const addCommentFail = (error) => {
  return {
    type: actionTypes.ADD_COMMENT_FAIL,
    error: error
  };
};