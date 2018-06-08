import axios from 'axios';
import apiUrl from './api-url';

const meService = {
  sendVerificationSMS,
  verifySMS,
  startKYC,
  createKYCDocuments,
  getKYCDocuments,
};

// Docs: https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#76d35f2e-d523-4f2a-858e-ca33cc173f55
function sendVerificationSMS() {
  return axios.get(`${apiUrl}/me/sms/send`);
}

// Docs: https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#55e40ec1-a2c0-485a-9442-3a12b8eebbbb
function verifySMS(verificationCode) {
  return axios.post(`${apiUrl}/me/sms/verify`, {
    verification_code: verificationCode,
  });
}

function startKYC() {
  return axios.post(`${apiUrl}/me/kyc/start`);
}

// Docs: https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#9dfb9269-c3af-4723-8ec9-f62b380b3892
function getKYCDocuments() {
  return axios.get(`${apiUrl}/me/documents`);
}

// Docs: https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#10e4b34c-ebc6-4b0f-a0d0-c2fcf97d74c4
function createKYCDocuments(documents) {
  return axios.put(`${apiUrl}/me/documents`, documents);
}

export default meService;
