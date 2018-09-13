import ACTIONS from '../../config/constants/ACTIONS';
import * as navActions from '../nav/navActions';
import { MODALS } from "../../config/constants/common";

// TODO(fj): maybe split into 3 action/reducers: ui/camera/forms(scrolling) ?

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
  setFormErrors,
  updateFormField,
  updatePortfolioFormData,
  setKeyboardHeight,
  setInputLayout,
  clearInputLayouts,
  scrollTo,
  setScrollElementLayout,
  setScrollPosition,
  openInitialModal,
  openModal,
  closeModal,
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
    }, 4000);

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
    dispatch(navActions.navigateTo('Camera', { onSave: cameraProps.onSave }));
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

function setFormErrors(formErrors) {
  return dispatch => {
    const timeout = setTimeout(() => {
      dispatch({ type: ACTIONS.CLEAR_FORM_ERRORS })
      clearTimeout(timeout)
    }, 5000)
    dispatch({
      type: ACTIONS.SET_FORM_ERRORS,
      formErrors,
    })
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
  const { field, accordion } = scrollOptions;

  return (dispatch, getState) => {

    const { screenHeight, bottomNavigation } = getState().ui.dimensions;
    const { displayBottomNavigation } = getState().nav;
    const scrollBottomOffset = displayBottomNavigation ? 40 : bottomNavigation.height + 10;
    const { keyboardHeight, scrollTo: scrollToY } = getState().ui;

    if (!field && !accordion) {
      return scrollToY ? dispatch({ type: ACTIONS.SCROLL_TO }) : null;
    }

    let newY;

    // scroll to input field
    const fieldLayout = field ? getState().ui.formInputLayouts[field] : undefined;
    if (field && fieldLayout) {
      if (keyboardHeight) {
        newY = fieldLayout.y - (screenHeight - keyboardHeight - scrollBottomOffset);
        newY = newY < 0 ? 0 : newY;
        dispatch({ type: ACTIONS.SCROLL_TO, scrollTo: Math.round(newY) });
      } else {
        // wait for keyboard to open
        const keyboardInterval = setInterval(() => {
          const kHeight = getState().ui.keyboardHeight;
          if (kHeight) {
            newY = fieldLayout.y - (screenHeight - kHeight - scrollBottomOffset);
            newY = newY < 0 ? 0 : newY;

            clearInterval(keyboardInterval);
            dispatch({ type: ACTIONS.SCROLL_TO, scrollTo: Math.round(newY) });
          }
        }, 50)
      }
    }

    // scroll accordion into view
    const accordionLayout = accordion ? getState().ui.scrollLayouts[`${accordion}Accordion`] : undefined;
    if (accordion && accordionLayout) {
      newY = accordionLayout.y - 0.3 * screenHeight;
      newY = newY < 0 ? 0 : newY;
      dispatch({ type: ACTIONS.SCROLL_TO, scrollTo: Math.round(newY) });
    }
  }
}

function setScrollElementLayout(element, layout) {
  return {
    type: ACTIONS.SET_SCROLL_ELEMENT_LAYOUT,
    element,
    layout,
  };
}

function setScrollPosition(scrollPosition) {
  return {
    type: ACTIONS.SET_SCROLL_POSITION,
    scrollPosition,
  };
}

function openInitialModal() {
  return (dispatch, getState) => {
    const openedModal = getState().ui.openedModal;
    const appSettings = getState().users.appSettings;
    const branchHashes = getState().transfers.branchHashes;

    if (branchHashes && branchHashes.length) {
      return dispatch(openModal(MODALS.TRANSFER_RECEIVED))
    }

    if (appSettings.showTodayRatesModal && !openedModal) {
      return dispatch(openModal(MODALS.TODAY_RATES_MODAL))
    }
  };
}

function openModal(modalName) {
  return {
    type: ACTIONS.OPEN_MODAL,
    modal: modalName,
  };
}

function closeModal() {
  return {
    type: ACTIONS.CLOSE_MODAL,
  };
}

