import ACTIONS from '../../constants/ACTIONS';

const initialState = {
  callsInProgress: [],
  error: undefined,
  lastCompletedCall: undefined,
  history: [],
};

export default (state = initialState, action) => {
  const callsInProgress = [ ...state.callsInProgress ];
  const history = [ ...state.history ];


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
    history.unshift(`${action.callName}_ERROR`);
    return {
      ...state,
      callsInProgress,
      error: action.error,
      history,
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
    history.unshift(`${action.callName}_SUCCESS`);
    return {
      ...state,
      callsInProgress,
      lastCompletedCall: action.callName,
      history,
    }
  }

  // Return unchanged state
  return state;
}
