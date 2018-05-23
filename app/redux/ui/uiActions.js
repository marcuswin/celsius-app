import ACTIONS from '../../config/constants/ACTIONS';

export {
  showMessage,
  clearMessage,
  setHeaderHeight,
  toggleCamera,
  takeCameraPhoto,
  flipCamera,
  submitForm,
  updateFormField,
}

let msgTimeout;

function showMessage(msgType, text) {
  return dispatch => {
    clearTimeout(msgTimeout);

    msgTimeout = setTimeout(() => {
      dispatch(clearMessage());
      clearTimeout(msgTimeout);
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

function takeCameraPhoto(photoName, photo) {
  return {
    type: ACTIONS.TAKE_CAMERA_PHOTO,
    photoName,
    photo,
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

// function clearForm() {
//   return {}
// }

function submitForm(formName, formData) {
  console.log({ formName, formData });
  return {
    type: ACTIONS[`SUBMIT_${formName}`],
    formData,
  }
}

function updateFormField(field, value) {
  console.log({ field, value });

  return {
    type: ACTIONS.UPDATE_FORM_FIELD,
    field,
    value,
  }
}
