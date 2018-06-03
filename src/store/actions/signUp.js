import axios from 'axios';
import * as actionTypes from './actionTypes';

export const signUpStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const signUpSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const signUpFail = (error) => {
  return {
      type: actionTypes.AUTH_FAIL,
      error: error
  };
};

export const signUp = (email, password) => {
  return dispatch => {
    dispatch(signUpStart());
    const authData = {
      email: email,
      password: password,
      password_confirmation: password
    };
    let url = 'https://todox-api.herokuapp.com/api/auth';

    axios.post(url, authData)
      .then(response => {
        localStorage.setItem('access-token', response.headers['access-token']);
        localStorage.setItem('client', response.headers['client']);
        localStorage.setItem('expiry', response.headers['expiry']);
        localStorage.setItem('uid', response.headers['uid']);
        localStorage.setItem('token-type', response.headers['token-type']);
      
        dispatch(signUpSuccess(response.headers['access-token']));
      })
      .catch(err => {
        dispatch(signUpFail('Error: status ' + err.response.status));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};