import { Constants } from 'expo';
import axios from 'axios';
import apiUrl from './api-url';

const { BRANCH_KEY } = Constants.manifest.extra

const branchService = {
  create,
  get,
  getByUrl,
  getBySlug,
  createEvent,
  getIndividualLink,
  submitPromoCodeByRegister,
  submitPromoCode
  // createBranchEvent,
};


// Celsius endpoints
function create(branchLink) {
  return axios.post(`${apiUrl}/branch`, branchLink);
}

function get(id) {
  return axios.get(`${apiUrl}/branch/${id}`);
}

function getByUrl(url) {
  return axios.get(`${apiUrl}/branch?url=${url}`);
}

function getBySlug(slug) {
  return axios.get(`${apiUrl}/branch?slug=${slug}`);
}

function getIndividualLink() {
  return axios.get(`${apiUrl}/branch/individual`);
}

// Branch endpoints
function createEvent(event) {
  return axios.post(`https://api2.branch.io/v1/event`, {
    ...event,
    branch_key: BRANCH_KEY,
  });
}

function submitPromoCodeByRegister(promoCode) {
  return axios.post(`${apiUrl}/branch/check_code/registration`, { promo_code: promoCode });
}

function submitPromoCode(promoCode) {
  return axios.post(`${apiUrl}/branch/check_code/profile`, { promo_code: promoCode });
}

// function createBranchEvent(event) {
//   return axios.post(`https://api.branch.io/v2/event/standard`, {
//     ...event,
//     branch_key: BRANCH_KEY,
//   });
// }

export default branchService;
