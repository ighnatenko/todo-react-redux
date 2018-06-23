import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as constants from '../../constants';
import * as auth from './authSettings';

export const authCheckState = () => {
  return dispatch => {
    dispatch(loadAuthStart());

    axios.get(constants.VALIDATE_TOKEN_URL, {headers: headers()})
      .then(response => {
        console.log('============== SUCCESS ================');
        console.log(response);
        auth.setHeadersStore(response);
        
        dispatch(authSuccess(response.headers['access-token']));
      })
      .catch(err => {
        console.log('============== ERROR ================');
        console.log('auth FAIL = ' + err);
        // dispatch(authFail(err.toString()));
      });
  };
};

export const loadAuthStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token) => {
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
    dispatch(loadAuthStart());

    const authData = {
        email: email,
        password: password
    };
   
    axios.post(constants.SIGN_IN_URL, authData)
      .then(response => {
        setHeaders(response);
        dispatch(authSuccess(response.headers['access-token']));
      })
      .catch(err => {
        dispatch(authFail(err.toString()));
      });
  };
};

export const signUp = (email, password) => {
  return dispatch => {
    dispatch(loadAuthStart());

    const authData = {
      email: email,
      password: password,
      password_confirmation: password
    };

    axios.post(constants.SIGN_UP_URL, authData)
      .then(response => {
        setHeaders(response);
        dispatch(authSuccess(response.headers['access-token']));
      })
      .catch(err => {
        dispatch(authFail(err.toString()));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
      type: actionTypes.AUTH_REDIRECT_PATH,
      path: path
  };
};

export const setHeaders = (response) => {
  localStorage.setItem('access-token', response.headers['access-token']);
  localStorage.setItem('client', response.headers['client']);
  localStorage.setItem('expiry', response.headers['expiry']);
  localStorage.setItem('uid', response.headers['uid']);
  localStorage.setItem('token-type', response.headers['token-type']);
}

export const headers = () => {
  const authData = {
    'access-token': localStorage.getItem('access-token'),
    'client': localStorage.getItem('client'),
    'expiry': localStorage.getItem('expiry'),
    'token-type': localStorage.getItem('token-type'),
    'uid': localStorage.getItem('uid')
  }
  return authData;
}