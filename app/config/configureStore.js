import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Sentry from "sentry-expo";

import reducer from '../redux/reducers';

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

const middleware =  [
  thunk,
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
let sentryActionAlerts = 1;
function sentryActionLogger({ getState }) {
  return (next) => (action) => {
    console.log(`Action logger ${action.type} (${ sentryActionAlerts++ }) - ${ new Date().getTime() }`);
    if (
      sentryActionAlerts % 5 === 0
    ) {
      Sentry.captureMessage(`Action logger ${action.type} (${ sentryActionAlerts }) - ${ new Date().getTime() }`, {
        level: 'info',
        extra: {
          action: { ...action },
          state: { ...getState() },
        },
      });
    }

    return next(action);
  }
}


