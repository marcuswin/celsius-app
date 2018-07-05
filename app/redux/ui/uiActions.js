import ACTIONS from '../../config/constants/ACTIONS';
import * as navActions from '../nav/navActions';

export {
  showMessage,
  clearMessage,
  setInternetConnectivity,
  setHeaderHeight,
  takeCameraPhoto,
  flipCamera,
  activateCamera,
  retakePhoto,
  // submitForm,
  initForm,
  clearForm,
  updateFormField,
  updatePortfolioFormData,
  setKeyboardHeight,
  setInputLayout,
  clearInputLayouts,
  scrollTo,
}

let msgTimeout;

function showMessage(msgType, text, disableClear) {
  return dispatch => {
    clearTimeout(msgTimeout);

    msgTimeout = setTimeout(() => {
      if (!disableClear) {
        dispatch(clearMessage());
      }
      clearTimeout(msgTimeout);
    }, 5000);

    dispatch({
      type: ACTIONS.SHOW_MESSAGE,
      msgType,
      text,
    })
  }
}

function setInternetConnectivity(connected) {
  return {
    type: ACTIONS.SET_INTERNET_CONNECTIVITY,
    internetConnected: connected,
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

function takeCameraPhoto(photo) {
  return {
    type: ACTIONS.TAKE_CAMERA_PHOTO,
    photo,
  }
}

function retakePhoto() {
  return {
    type: ACTIONS.RETAKE_PHOTO,
  }
}

function flipCamera() {
  return {
    type: ACTIONS.FLIP_CAMERA,
  }
}

function activateCamera(cameraProps) {
  return dispatch => {
    dispatch({
      type: ACTIONS.ACTIVATE_CAMERA,
      ...cameraProps,
    });
    dispatch(navActions.navigateTo('Camera'));
  }
}

function updateFormField(field, value) {
  return {
    type: ACTIONS.UPDATE_FORM_FIELD,
    field,
    value,
  }
}

function initForm(formData) {
  return {
    type: ACTIONS.INIT_FORM,
    formData,
  }
}

function clearForm() {
  return {
    type: ACTIONS.CLEAR_FORM,
  }
}

function updatePortfolioFormData(data) {
  return {
    type: ACTIONS.UPDATE_PORTFOLIO_FORM_DATA,
    data,
  };
}

function setKeyboardHeight(keyboardHeight) {
  return {
    type: ACTIONS.SET_KEYBOARD_HEIGHT,
    keyboardHeight,
  };
}

function setInputLayout(field, layout) {
  return {
    type: ACTIONS.SET_INPUT_LAYOUT,
    field,
    layout,
  };
}

function clearInputLayouts() {
  return {
    type: ACTIONS.CLEAR_INPUT_LAYOUTS,
  };
}

function scrollTo(scrollOptions = {}) {
  const { field } = scrollOptions;

  return (dispatch, getState) => {
    const { screenHeight } = getState().ui.dimensions;
    const { keyboardHeight, scrollTo: scrollToY } = getState().ui;

    if (!field && !scrollToY) return;
    if (!field && scrollToY) return dispatch({ type: ACTIONS.SCROLL_TO });

    let newY;

    // scroll to input field
    const fieldLayout = field ? getState().ui.formInputLayouts[field] : undefined;
    if (field && fieldLayout) {
      if (keyboardHeight) {
        newY = fieldLayout.y - (screenHeight - keyboardHeight - 40);
        newY = newY < 0 ? 0 : newY;
        dispatch({ type: ACTIONS.SCROLL_TO, scrollTo: Math.round(newY) });
      } else {
        // wait for keyboard to open
        const keyboardInterval = setInterval(() => {
          const kHeight = getState().ui.keyboardHeight;
          if (kHeight) {
            newY = fieldLayout.y - (screenHeight - kHeight - 40);
            newY = newY < 0 ? 0 : newY;

            clearInterval(keyboardInterval);
            dispatch({ type: ACTIONS.SCROLL_TO, scrollTo: Math.round(newY) });
          }
        }, 50)
      }
    }

  }
}
