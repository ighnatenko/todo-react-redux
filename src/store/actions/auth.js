import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authCheckState = () => {
  return dispatch => {
    const authData = {
      'access-token': localStorage.getItem('access-token'),
      'client': localStorage.getItem('client'),
      'expiry': localStorage.getItem('expiry'),
      'token-type': localStorage.getItem('token-type'),
      'uid': localStorage.getItem('uid')
    } 

    let url = 'https://todox-api.herokuapp.com/api/auth/validate_token';

    axios.get(url, authData)
      .then(response => {
        console.log('auth SUCCESS' + response);
      })
      .catch(err => {
        console.log('auth FAIL' + err);
      });
  };
};