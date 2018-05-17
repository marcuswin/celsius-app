import { Dimensions } from 'react-native';
import { Constants } from 'expo';

const { width, height } = Dimensions.get('window');
const platform = Object.keys(Constants.platform)[0];

const sizes = {
  iPhoneX: { width: 375, height: 812 },
}

export default {
  isiPhoneX,
}

function isiPhoneX() {
  console.log({ width, height, platform });
  return (platform === 'ios' && width === sizes.iPhoneX.width && height === sizes.iPhoneX.height );
}
