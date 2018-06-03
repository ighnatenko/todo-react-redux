import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
      type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
      type: actionTypes.AUTH_SUCCESS,
      token: token
  };
};

export const authFail = (error) => {
  return {
      type: actionTypes.AUTH_FAIL,
      error: error
  };
};

export const signIn = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
        email: email,
        password: password
    };
    let url = 'https://todox-api.herokuapp.com/api/auth/sign_in';

    axios.post(url, authData)
      .then(response => {
        localStorage.setItem('access-token', response.headers['access-token']);
        localStorage.setItem('client', response.headers['client']);
        localStorage.setItem('expiry', response.headers['expiry']);
        localStorage.setItem('uid', response.headers['uid']);
        localStorage.setItem('token-type', response.headers['token-type']);

        dispatch(authSuccess(response.headers['access-token']));
      })
      .catch(err => {
        dispatch(authFail('Error: status ' + err.response.status));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      path: path
  };
};