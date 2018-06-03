import axios from 'axios';
import * as constants from '../../constants';

export const setHeadersStore = (response) => {
  if (response.headers['access-token'] != '') {
    localStorage.setItem('access-token', response.headers['access-token']);
  }
  localStorage.setItem('client', response.headers['client']);
  localStorage.setItem('expiry', response.headers['expiry']);
  localStorage.setItem('uid', response.headers['uid']);
  localStorage.setItem('token-type', response.headers['token-type']);
}

export const instanceAxios = () => {
  const headers = {
    'access-token': localStorage.getItem('access-token'),
    'client': localStorage.getItem('client'),
    'expiry': localStorage.getItem('expiry'),
    'token-type': localStorage.getItem('token-type'),
    'uid': localStorage.getItem('uid')
  } 

  const instance = axios.create({
    baseURL: constants.BASE_URL,
    headers: headers
  });

  return instance;
}