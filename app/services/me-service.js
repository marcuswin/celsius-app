import axios from 'axios';
import apiUrl from './api-url';

const meService = {
  sendVerificationSMS,
  verifySMS,
};

// https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#76d35f2e-d523-4f2a-858e-ca33cc173f55
function sendVerificationSMS() {
  return axios.get(`${apiUrl}/me/sms/send`);
}

// https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#55e40ec1-a2c0-485a-9442-3a12b8eebbbb
function verifySMS(verificationCode) {
  return axios.post(`${apiUrl}/me/sms/verify`, {
    verification_code: verificationCode,
  });
}

export default meService;
