import axios from 'axios';
import qs from "qs";
import {SECURITY_STORAGE_AUTH_KEY} from 'react-native-dotenv'

import {getSecureStoreKey} from '../utils/expo-storage';

let token;

export default {
  initInterceptors,
  areCallsInProgress,
}

function initInterceptors() {
  axios.interceptors.request.use(
    async req => {
      const newRequest = {...req};

      // set x-www-form-urlencoded -> https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format
      if (req.method === 'post') {
        newRequest.data = qs.stringify(req.data);
        newRequest.headers = {
          ...newRequest.headers,
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        };
      }

      // get token from secure store
      try {
        token = token || await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);

        if (token != null) {
          newRequest.headers = {
            ...newRequest.headers,
            authorization: `Bearer ${token}`
          };
        }
      } catch (err) {
        console.log(err);
      }

      /* eslint-disable no-underscore-dangle */
      console.log({[req.method.toUpperCase()]: newRequest});
      /* eslint-enable no-underscore-dangle */

      return newRequest;
    },
    error => Promise.reject(error)
  );

  axios.interceptors.response.use(
    res => {
      /* eslint-disable no-underscore-dangle */
      console.log({RESPONSE: res});
      /* eslint-enable no-underscore-dangle */

      return res;
    },
    error => {
      const defaultMsg = 'Oops, it looks like something went wrong.';
      const err = error.response ? error.response.data : {
        type: 'Unknown Server Error',
        msg: defaultMsg,
        raw_error: error,
      };

      if (!err.msg) err.msg = defaultMsg;

      /* eslint-disable no-underscore-dangle */
      console.log({API_ERROR: err});
      /* eslint-enable no-underscore-dangle */

      return Promise.reject(err);
    });
}

function areCallsInProgress(callsToCheck, callsInProgress) {
  return !!(callsInProgress.filter(cip => callsToCheck.indexOf(cip) !== -1).length);
}
