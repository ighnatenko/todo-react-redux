import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  comments: [],
  error: null,
  loading: false,
  success: null
};

const clearComments = (state, action) => {
  return updateObject(state, {
    comments: []
  });
};

const fetchCommentsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchCommentsSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    comments: action.items
  });
};

const fetchCommentsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const deleteCommentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    comments: action.items
  });
};

const deleteCommentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const addCommentSuccess = (state, action) => {
  const comments = [...state.comments];
  comments.unshift(action.item);
  return updateObject(state, {
    loading: false,
    comments: comments
  });
};

const addCommentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMMENTS_START: return fetchCommentsStart(state, action);
    case actionTypes.FETCH_COMMENTS_SUCCESS: return fetchCommentsSuccess(state, action);
    case actionTypes.FETCH_COMMENTS_FAIL: return fetchCommentsFail(state, action);
    case actionTypes.DELETE_COMMENT_SUCCESS: return deleteCommentSuccess(state, action);
    case actionTypes.DELETE_COMMENT_FAIL: return deleteCommentFail(state, action);
    case actionTypes.ADD_COMMENT_SUCCESS: return addCommentSuccess(state, action);
    case actionTypes.ADD_COMMENT_FAIL: return addCommentFail(state, action);
    case actionTypes.CLEAR_COMMENTS: return clearComments(state, action);
    default: return state;
  }
};

export default reducer;