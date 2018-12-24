import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../redux/reducers';
import ACTIONS from "./constants/ACTIONS";
import Sentry from '../utils/sentry-util';

/* eslint global-require: 0 */
let composeEnhancers = compose;
/* eslint-disable no-undef */
if (__DEV__) {
  // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
  /* eslint-disable no-underscore-dangle */
  composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    require('remote-redux-devtools').composeWithDevTools)({
      name: Platform.OS,
      ...require('../../package.json').remotedev
    });
  /* eslint-enable no-underscore-dangle */
}

const middleware = [
  thunk,
  // enable when debugging standalone app
  // sentryActionLogger,
];

const enhancer = composeEnhancers(applyMiddleware(...middleware));

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('../redux/reducers').default);
    });
  }
  return store;
}

// Middleware used for branch.io debugging in testflight
// logs every fifth action on sentry
/* eslint-disable */
let allActions = [];
function sentryActionLogger({ getState }) {
  return (next) => (action) => {
    allActions.push(action.type);
    console.log(`Action logger ${action.type} (${allActions.length}) - ${new Date().getTime()}`);
    if (
      allActions.length % 20 === 0 ||
      [
        // add actions to log here
        ACTIONS.CREATE_BRANCH_LINK_SUCCESS,
        ACTIONS.BRANCH_LINK_REGISTERED,
      ].indexOf(action.type) !== -1
    ) {
      Sentry.captureMessage(`Action logger ${action.type} (${allActions.length}) - ${new Date().getTime()}`, {
        level: 'info',
        extra: {
          allActions,
          action: { ...action },
          state: {
            transfers: getState().transfers,
            api: getState().api,
            ui: getState().ui,
            branch: getState().branch,
          },
        },
      });
    }

    return next(action);
  }
}


