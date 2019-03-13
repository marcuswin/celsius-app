import isBase64 from "is-base64";
import {Platform, ImageEditor, ImageStore} from 'react-native';
import logger from './logger-util';

const isiOS = Platform.OS === 'ios';

export default {
  getSource,
  isBase64: isBase64Image,
  convertCameraRollToB64,
}


/**
 * Returns source of the image depending if it is required, a url or base64
 *
 * @param {number|string} image
 * @returns {string}
 */
function getSource(image) {
  // check if base64
  if (isBase64Image(image)) return { uri: `data:image/png;base64,${image}` };

  // check if url
  if (image && (image.includes('https://') || image.includes('http://'))) return { uri: image.replace('files', 'file-uploads') };

  // check image is in the project and fetched through require
  if (!isNaN(image)) return image ;
}


/**
 * Package isBase64 returns false on android, wtf?
 *
 * @param {string} image - base64 string to check
 * @returns {boolean}
 */
function isBase64Image(image) {
  return (isBase64(image) || (image && isNaN(image) && !isiOS && image.length > 10000));
}


/**
 * Converts and crops camera roll image to base64
 *
 * @param {Object} cameraRollImage
 * @param {function} onSuccess - callback
 */
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
        (failure) => logger.log(failure),
      )
    },
    (failure) => logger.log(failure)
  );
}
