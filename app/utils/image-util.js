import isBase64 from "is-base64";
import {Platform} from 'react-native';

const isiOS = Platform.OS === 'ios';

export default {
  getSource,
}

function getSource(image) {
  // check if base64
  // NOTE(fj): isBase64 returns false on android, wtf?
  if (isBase64(image) ||
      (image && isNaN(image) && !isiOS && image.length > 10000)) {

    return { uri: `data:image/png;base64,${image}` };
  }

  // check if url
  if (image && image.includes('https://')) return { uri: image };

  // check image is in the projet and fetched through require
  if (!isNaN(image)) return image ;
}
