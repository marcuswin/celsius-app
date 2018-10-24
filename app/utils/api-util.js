import axios from 'axios';
import qs from "qs";
import {Constants} from 'expo';

import {getSecureStoreKey} from '../utils/expo-storage';

import store from '../redux/store';
import * as actions from '../redux/actions';

const {SECURITY_STORAGE_AUTH_KEY, CLIENT_VERSION, ENV} = Constants.manifest.extra;
let token;

export default {
  initInterceptors,
  areCallsInProgress,
  parseValidationErrors,
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
        const storageToken = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
        if (token !== storageToken) token = storageToken;

        if (token != null) {
          newRequest.headers = {
            ...newRequest.headers,
            authorization: `Bearer ${token}`
          };
        }
      } catch (err) {
        console.log(err);
      }

      if (ENV === 'PRODUCTION') {
        newRequest.headers['X-Client-Version'] = CLIENT_VERSION;
      } else {
        newRequest.headers['X-Client-Version'] = ENV;
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
    async error => {
      const defaultMsg = 'Oops, it looks like something went wrong.';
      const err = error.response ? error.response.data : {
        type: 'Unknown Server Error',
        msg: defaultMsg,
        raw_error: error,
      };

      if (!err.msg) err.msg = defaultMsg;

      if (err.status === 401 && err.slug === "SESSION_EXPIRED") {
        store.dispatch(actions.expireSession());
      }

      /* eslint-disable no-underscore-dangle */
      console.log({API_ERROR: err});
      /* eslint-enable no-underscore-dangle */

      return Promise.reject(err);
    });
}

function areCallsInProgress(callsToCheck, callsInProgress = []) {
  return !!(callsInProgress.filter(cip => callsToCheck.indexOf(cip) !== -1).length);
}

function parseValidationErrors(serverError) {
  const errKeys = Object.keys(serverError.raw_error);
  const validationErrors = {};

  errKeys.forEach(ek => {
    validationErrors[ek] = serverError.raw_error[ek].msg;
  })

  return validationErrors;
}
