import axios from "axios/index";

export default {
  logme,
}

function logme(payload) {
  axios.post('https://api.staging.celsius.network/api/v1/logme', payload);
}
