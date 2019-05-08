import axios from 'axios';
import apiUrl from './api-url';

const communityService = {
  getCommunityStatistics,
};

function getCommunityStatistics() {
  return axios.get(`${apiUrl}/community`);
}


export default communityService;
