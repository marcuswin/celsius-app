import ACTIONS from '../../config/constants/ACTIONS';

export {
  showMessage,
  clearMessage,
  setHeaderHeight,
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
