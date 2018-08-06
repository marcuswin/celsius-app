import axios from 'axios';
import apiUrl from './api-url';

const kycService = {
  getKYCDocTypes,
};


function getKYCDocTypes() {
  return axios.get(`${apiUrl}/kyc/countries`);
}

export default kycService;
