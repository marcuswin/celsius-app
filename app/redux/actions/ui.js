import ACTIONS from '../../config/constants/ACTIONS';

export {
  showMessage,
  clearMessage,
  setHeaderHeight,
  toggleCamera,
  takeCameraPhoto,
  flipCamera,
}

function showMessage(msgType, text) {
  return dispatch => {
    const msgTiemout = setTimeout(() => {
      dispatch(clearMessage());
      clearTimeout(msgTiemout);
    }, 5000);

    dispatch({
      type: ACTIONS.SHOW_MESSAGE,
      msgType,
      text,
    })
  }
}

function clearMessage() {
  return {
    type: ACTIONS.CLEAR_MESSAGE,
  }
}

function setHeaderHeight(height, isAnimatedHeader = false) {
  return {
    type: ACTIONS.SET_HEADER_HEIGHT,
    header: height,
    isAnimatedHeader,
  }
}

function takeCameraPhoto(photoName, base64Image) {
  return {
    type: ACTIONS.TAKE_CAMERA_PHOTO,
    photoName,
    base64Image
  }
}

function toggleCamera(photoName) {
  return {
    type: ACTIONS.TOGGLE_CAMERA,
    photoName,
  }
}

function flipCamera() {
  return {
    type: ACTIONS.FLIP_CAMERA,
  }
}
