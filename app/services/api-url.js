import {API_V1_URL_PRODUCTION, API_V1_URL_DEVELOP, API_V1_URL_STAGING} from 'react-native-dotenv'
import {Constants} from 'expo';

function getApiUrl(releaseChannel) {
  if (releaseChannel === undefined) return API_V1_URL_DEVELOP; // since releaseChannels are undefined in dev, return your default.
  if (releaseChannel.indexOf('staging') !== -1) return API_V1_URL_STAGING;
  if (releaseChannel.indexOf('production') !== -1) return API_V1_URL_PRODUCTION;
}

const releaseChanel = Constants.manifest.releaseChannel;
const baseUrl = getApiUrl(releaseChanel);

export default baseUrl;
