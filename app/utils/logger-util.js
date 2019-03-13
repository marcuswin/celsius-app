import axios from "axios/index";
import { Constants } from "expo";

const { ENV } = Constants.manifest.extra;

export default {
  logme,
  log,
  warn,
  info,
}


/**
 * Blocks console.log in production
 *
 * @param {any} content
 */
function log(content) {
  // eslint-disable-next-line no-console
  if (['PREPROD', 'DEVELOPMENT'].indexOf(ENV) !== -1) console.log(content)
}


/**
 * Blocks console.info in production
 *
 * @param {any} content
 */
function info(content) {
  // eslint-disable-next-line no-console
  if (['STAGING', 'PREPROD', 'DEVELOPMENT'].indexOf(ENV) !== -1) console.info(content)
}


/**
 * Blocks console.warn in production
 *
 * @param {any} content
 */
function warn(content) {
  // eslint-disable-next-line no-console
  if (['STAGING', 'PREPROD', 'DEVELOPMENT'].indexOf(ENV) !== -1) console.warn(content)
}


/**
 * Logs stuff on graylog, used for debugging standalone applications
 *
 * @param {any} payload
 */
function logme(payload) {
  axios.post('https://api.staging.celsius.network/api/v1/logme', payload);
}
