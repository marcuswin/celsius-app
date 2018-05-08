import {API_V1_URL_PRODUCTION, API_V1_URL_DEVELOP} from 'react-native-dotenv'

const { BACKEND } = process.env;
let apiV1;

if (!BACKEND || BACKEND === 'STAGING') {
  apiV1 = API_V1_URL_DEVELOP;
}

if (BACKEND === 'PRODUCTION') {
  // TODO
}

if (BACKEND === 'DEVELOPMENT') {
  apiV1 = API_V1_URL_DEVELOP;
}

const baseUrl = apiV1;

export default baseUrl;
