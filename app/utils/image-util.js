import isBase64 from "is-base64";
import {Platform, ImageEditor, ImageStore} from 'react-native';

const isiOS = Platform.OS === 'ios';

export default {
  getSource,
  isBase64: isBase64Image,
  convertCameraRollToB64,
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

function convertCameraRollToB64(cameraRollImage, onSuccess) {
  const { height, uri, width } = cameraRollImage.node.image

  ImageEditor.cropImage(
    uri,
    {
      offset: { x: 0, y: 0 },
      size: { width, height },
    },
    (res) => {
      ImageStore.getBase64ForTag(res,
        (base64) => onSuccess({ base64 }),
        (failure) => console.log(failure),
      )
    },
    (failure) => console.log(failure)
  );
}
