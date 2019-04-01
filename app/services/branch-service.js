import { Constants } from 'expo';
import axios from 'axios';
import apiUrl from './api-url';

const { BRANCH_KEY } = Constants.manifest.extra

const branchService = {
  create,
  get,
  createEvent,
  getIndividualLink,
  getByUrl,
  submitProfileCode,
  submitRegistrationCode
};


/**
 * Creates a branch link in db
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#7ffbc5c2-e7d5-4696-a783-623c3724b20a
 * @deprecated
 *
 * @returns {Promise}
 */
function create(branchLink) {
  return axios.post(`${apiUrl}/branch`, branchLink);
}

/**
 * Gets branch link from db
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#20cb5db0-21fe-4628-ac33-0fc155430036
 * @deprecated
 *
 * @returns {Promise}
 */
function get(id) {
  return axios.get(`${apiUrl}/branch/${id}`);
}

/**
 * Gets or creates individual referral link for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#7f82a302-881e-4a64-8d1d-bbcb0354beda
 *
 * @returns {Promise}
 */
function getIndividualLink() {
  return axios.get(`${apiUrl}/branch/individual`);
}

/**
 * Creates an analytics event on Branch
 * @returns {Promise}
 */
function createEvent(event) {
  return axios.post(`https://api2.branch.io/v1/event`, {
    ...event,
    branch_key: BRANCH_KEY,
  });
}

/**
<<<<<<< HEAD
 * Get an analytics event on Branch by URL
 * @returns {Promise}
 */
function getByUrl(url) {
  return axios.get(`${apiUrl}/branch?url=${url}`);
}

/**
 *
 * @param promoCode
 * @returns {Promise}
 */

function submitProfileCode(promoCode) {
  return axios.post(`${apiUrl}/branch/check_code/profile`, { slug: promoCode });
}

/**
 *
 * @param promoCode
 * @returns {Promise}
 */

function submitRegistrationCode(promoCode) {
  return axios.post(`${apiUrl}/branch/check_code/registration`, { slug: promoCode });
}


export default branchService;
