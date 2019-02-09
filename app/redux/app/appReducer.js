import ACTIONS from "../../constants/ACTIONS";

function initialState() {
  return {
    appInitialized: false,
    appInitializing: false,

    // App states: active|inactive|background
    appState: "active",
    internetConnected: true,
    assetsLoaded: false
  };
}

export default function appReducer(state = initialState(), action) {

  switch (action.type) {
    case ACTIONS.APP_INIT_START:
      return {
        ...state,
        appInitialized: false,
        appInitializing: true
      };

    case ACTIONS.APP_INIT_DONE:
      return {
        ...state,
        appInitialized: true,
        appInitializing: false
      };

    case ACTIONS.RESET_APP:
      return {
        ...state,
        appInitialized: false
      };

    case ACTIONS.SET_APP_STATE:
      return {
        ...state,
        appState: action.appState
      };

    case ACTIONS.FINISH_LOADING_ASSETS:
      return {
        ...state,
        assetsLoaded: true
      };

    case ACTIONS.SET_INTERNET_CONNECTION:
      return {
        ...state,
        internetConnected: true
      };

    default:
      return { ...state };
  }
}
