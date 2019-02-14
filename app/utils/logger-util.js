import axios from "axios/index";
import { Constants } from "expo";
import apiUrl from "../services/api-url";
import store from "../redux/store";

const { ENV } = Constants.manifest.extra;

export default {
  logme,
  log,
  warn,
  info,
  err
}

function log(content) {
  if (['STAGING', 'PREPROD', 'DEVELOPMENT'].indexOf(ENV) !== -1) console.log(content)
}

function info(content) {
  if (['STAGING', 'PREPROD', 'DEVELOPMENT'].indexOf(ENV) !== -1) console.info(content)
}

function warn(content) {
  if (['STAGING', 'PREPROD', 'DEVELOPMENT'].indexOf(ENV) !== -1) console.warn(content)
}

function logme(payload) {
  axios.post('https://api.staging.celsius.network/api/v1/logme', payload);
}

function err(e, isFatal = false) {

  const { revisionId } = Constants.manifest;

  const state = store.getState();
  const { user } = state.users;
  const userData = user && { user_id: user.id, email: user.email };

  const { nav } = state;
  const activeScreen = nav.routes[nav.index].routeName;

  const error = {
    name: e.name,
    stack: e.stack,
    message: e.message,
  }

  const errorObject = {
    err: error,
    user: userData,
    active_screen: activeScreen,
    is_fatal: isFatal && (typeof isFatal === 'string') && isFatal === 'true',
    app_version: revisionId,
    platform: Constants.platform
  }

  axios.post(`${apiUrl}/graylog`, errorObject)
}