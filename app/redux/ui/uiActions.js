import ACTIONS from '../../constants/ACTIONS';
import { MODALS } from "../../config/constants/common";
import { screens } from '../../config/Navigator';


export {
  setAppTheme,
  openFabMenu,
  closeFabMenu,
  showMessage,
  clearMessage,
  openInitialModal,
  openModal,
  closeModal,
  toggleKeypad,
  setKeypadInput,

  // TODO(fj): scrolling - try to remove
  setKeyboardHeight,
  setInputLayout,
  clearInputLayouts,
  scrollTo,
  setScrollElementLayout,
  setScrollPosition,
}

let msgTimeout;


/**
 * Shows a flash message
 * @param {string} msgType - one of warning|info|success|error
 * @param {string} text - text to show
 * @param {boolean} disableClear - should the message stay forever
 */
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


// Custom celsius keypad actions
/**
 * Sets the keypad input ref
 * @param {Object} input - input ref
 */
let _keypadInputRef = null;
function setKeypadInput(input) {
  return (dispatch, getState) => {
    const { isKeypadOpen } = getState().ui;
    if (input === false) {
      // close keypad
      if (isKeypadOpen) dispatch({
        type: ACTIONS.TOGGLE_KEYPAD,
        isKeypadOpen: false
      });

      _keypadInputRef = null
    }

    if (!_keypadInputRef && input) {
      _keypadInputRef = input
    }
  }
}


/**
 * Toggles the native device keypad
 */
function toggleKeypad() {
  return (dispatch) => {
    if (_keypadInputRef) {
      const isFocused = _keypadInputRef.isFocused()
      if (isFocused) {
        _keypadInputRef.blur()
      } else {
        const timeout = setTimeout(() => {
          _keypadInputRef.focus()
          clearTimeout(timeout)
        }, 5)
      }

      dispatch({
        type: ACTIONS.TOGGLE_KEYPAD,
        isKeypadOpen: !isFocused,
      });
    }
  }
}


/**
 * Clears flash message
 * @returns {Object} - Action
 */
function clearMessage() {
  return {
    type: ACTIONS.CLEAR_MESSAGE,
  }
}


/**
 * @deprecated
 */
function setKeyboardHeight(keyboardHeight) {
  return {
    type: ACTIONS.SET_KEYBOARD_HEIGHT,
    keyboardHeight,
  };
}

/**
 * @deprecated
 */
function setInputLayout(field, layout) {
  return {
    type: ACTIONS.SET_INPUT_LAYOUT,
    field,
    layout,
  };
}

/**
 * @deprecated
 */
function clearInputLayouts() {
  return {
    type: ACTIONS.CLEAR_INPUT_LAYOUTS,
  };
}

/**
 * @deprecated
 */
function scrollTo(scrollOptions = {}) {
  const { field, accordion } = scrollOptions;

  return (dispatch, getState) => {

    const { screenHeight, bottomNavigation } = getState().ui.dimensions;
    const activeScreen = getState().nav.routes[getState().nav.index].routeName
    const scrollBottomOffset = screens[activeScreen].bottomNavigation ? 40 : bottomNavigation.height + 10;
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

/**
 * @deprecated
 */
function setScrollElementLayout(element, layout) {
  return {
    type: ACTIONS.SET_SCROLL_ELEMENT_LAYOUT,
    element,
    layout,
  };
}

/**
 * @deprecated
 */
function setScrollPosition(scrollPosition) {
  return {
    type: ACTIONS.SET_SCROLL_POSITION,
    scrollPosition,
  };
}

/**
 * Open initial modal on app opening
 * @todo: refactor for v3
 */
function openInitialModal() {
  return (dispatch, getState) => {
    const openedModal = getState().ui.openedModal;
    const appSettings = getState().user.appSettings;
    const user = getState().user.profile;
    const branchHashes = getState().transfers.branchHashes;
    const kyc = getState().user.profile.kyc.realStatus;

    if (branchHashes && branchHashes.length) {
      return dispatch(openModal(MODALS.TRANSFER_RECEIVED))
    }

    if (user && user.kyc.status === "passed") {
      if (user.blocked_at || kyc === "ico_passed") return dispatch(openModal(MODALS.NYC_BLACKOUT));
      if ((!user.street && !user.zip && !user.city) || (((user.country === "United States" || user.citizenship === "United States") && !user.ssn))) {
        return dispatch(openModal(MODALS.NYC_BLACKOUT));
      }
    }

    if (user && appSettings.showTodayRatesModal && !openedModal) {
      return dispatch(openModal(MODALS.TODAY_RATES_MODAL))
    }
  }
}


/**
 * Opens a modal
 * @param {string} modalName - one of the modals from MODALS in UI.js
 * @returns {Object} - Action
 */
function openModal(modalName) {
  return {
    type: ACTIONS.OPEN_MODAL,
    modal: modalName,
  };
}

/**
 * Closes the opened modal
 * @returns {Object} - Action
 */
function closeModal() {
  return {
    type: ACTIONS.CLOSE_MODAL,
  };
}


/**
 * Sets the theme of the app
 * @param {string} msgType - one of THEMES
 * @returns {Object} - Action
 */
function setAppTheme(theme) {
  return {
    type: ACTIONS.SET_APP_THEME,
    theme,
  };
}


/**
 * Opens App Menu
 * @returns {Object} - Action
 */
function openFabMenu() {
  return {
    type: ACTIONS.OPEN_FAB_MENU
  };
}

/**
 * Closes App Menu
 * @returns {Object} - Action
 */
function closeFabMenu() {
  return {
    type: ACTIONS.CLOSE_FAB_MENU
  };
}
