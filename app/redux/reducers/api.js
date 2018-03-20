import ACTIONS from '../../config/constants/ACTIONS';

const initialState = {
  callsInProgress: [],
  error: undefined,
};

export default (state = initialState, action) => {
  const callsInProgress = [ ...state.callsInProgress ];

  if (action.type === ACTIONS.START_API_CALL) {
    callsInProgress.push(action.callName);
    return {
      ...state,
      callsInProgress,
    }
  }

  // Finish api call and attach an error
  if (action.type === ACTIONS.API_ERROR) {
    callsInProgress.splice(callsInProgress.indexOf(action.callName), 1);
    return {
      ...state,
      callsInProgress,
      error: action.error,
    }
  }

  // Clear Api errors
  if (action.type === ACTIONS.CLEAR_API_ERROR) {
    return {
      ...state,
      error: undefined,
    }
  }

  // Finish successful api call
  if (action.type.includes('_SUCCESS')) {
    callsInProgress.splice(callsInProgress.indexOf(action.callName), 1);
    return {
      ...state,
      callsInProgress,
    }
  }

  // Return unchanged state
  return { ...state };
}
