import ACTIONS from '../../config/constants/ACTIONS';

export {
  startApiCall,
  apiError,
}

function startApiCall(callName) {
  return {
    type: ACTIONS.START_API_CALL,
    callName,
  }
}

function apiError(callName, error) {
  return dispatch => {

    const errTimeout = setTimeout(() => {
      dispatch(clearApiError());
      clearTimeout(errTimeout);
    }, 5000);

    dispatch({
      type: ACTIONS.API_ERROR,
      callName,
      error,
    })
  }
}

function clearApiError() {
  return {
    type: ACTIONS.CLEAR_API_ERROR,
  }
}
