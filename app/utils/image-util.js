import isBase64 from "is-base64";
import {Platform} from 'react-native';

const isiOS = Platform.OS === 'ios';

export default {
  getSource,
  isBase64: isBase64Image,
}

function getSource(image) {
  // check if base64
  if (isBase64Image(image)) return { uri: `data:image/png;base64,${image}` };

  // check if url
  if (image && (image.includes('https://') || image.includes('http://'))) return { uri: image.replace('files', 'file-uploads') };

  // check image is in the projet and fetched through require
  if (!isNaN(image)) return image ;
}

// NOTE(fj): isBase64 returns false on android, wtf?
function isBase64Image(image) {
  return (isBase64(image) || (image && isNaN(image) && !isiOS && image.length > 10000));
}
