import { Constants } from 'expo';
import axios from 'axios';
import apiUrl from './api-url';

const { BRANCH_KEY } = Constants.manifest.extra

const branchService = {
  create,
  get,
  createEvent,
  // createBranchEvent,
};


// Celsius endpoints
function create(branchLink) {
  return axios.post(`${apiUrl}/branch`, branchLink);
}

function get(id) {
  return axios.get(`${apiUrl}/branch/${id}`);
}

// Branch endpoints
function createEvent(event) {
  return axios.post(`https://api2.branch.io/v1/event`, {
    ...event,
    branch_key: BRANCH_KEY,
  });
}

// function createBranchEvent(event) {
//   return axios.post(`https://api.branch.io/v2/event/standard`, {
//     ...event,
//     branch_key: BRANCH_KEY,
//   });
// }

export default branchService;
