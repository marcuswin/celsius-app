import store from "../app/redux/store";
import * as actions from "../app/redux/actions";
import axios from "axios";
import Constants from 'expo-constants';

const { API_URL } = Constants.manifest.extra;
const { dispatch, getState } = store;

export default {
  waitForWelcomeScreen,
  resetTests,
  callToComplete,
  waitForExists,
  testPassed,
  testFailed,
}

async function waitForWelcomeScreen(spec) {
  let welcome;
  let activeScreen;
  let tryCount = 1;

  dispatch(actions.navigateTo('Welcome'));
  while ((!welcome || activeScreen !== 'Welcome') && tryCount < 20) {
    try {
      activeScreen = getState().nav.routes[getState().nav.index].routeName
      welcome = await spec.exists('Welcome.screen')
    } catch (e) {
      dispatch(actions.navigateTo('Welcome'))
      welcome = null
    }
    tryCount++
    // // console.log(`Try: ${ tryCount } | ${ activeScreen }`)
    if (!welcome) await spec.pause(1000)
  }

  if (tryCount === 20) throw new Error('Too many tries!');
}

export async function resetTests(spec) {
  await dispatch(actions.resetApp());
  await waitForWelcomeScreen(spec);
}

export async function callToComplete(spec, callName) {
  let tryCount = 1;
  let lastCompletedCall = getState().api.history[0];
  // // console.log(`Try: ${ tryCount } | ${ lastCompletedCall } | ${ callName }`)
  while (!lastCompletedCall.includes(callName) && tryCount < 50) {
    tryCount++
    await spec.pause(500)
    lastCompletedCall = getState().api.history[0];
    // // console.log(`Try: ${ tryCount } | ${ lastCompletedCall } | ${ callName }`)
  }

  if (tryCount === 20) {
    throw new Error('Too many tries!');
  }
}

export async function waitForExists(spec, screen) {
  let activeScreen;
  let tryCount = 1;

  while (!activeScreen && tryCount < 10) {
    try {
      activeScreen = await spec.exists(screen)
    } catch (e) {
      activeScreen = null
    }
    tryCount++
    if (!activeScreen) await spec.pause(500)
  }

  if (tryCount === 20) throw new Error(`spec.exists('${screen})': Too many tries!`);
}

export async function waitToFindComponent(spec, component) {
  let activeComponent;
  let tryCount = 1;

  while (!activeComponent && tryCount < 10) {
    try {
      activeComponent = await spec.findComponent(component)
    } catch (e) {
      activeComponent = null
    }
    tryCount++
    if (!activeComponent) await spec.pause(500)
  }

  if (tryCount === 20) throw new Error(`spec.findComponent('${component})': Too many tries!`);
  if (activeComponent) return activeComponent;
}

export function testPassed(spec) {
  return async () => {
    await resetTests(spec);
    await spec.notExists('SignupTwo.screen')
  }
}

export function testFailed(spec) {
  return async () => {
    await resetTests(spec);
    await spec.exists('SignupTwo.screen')
  }
}

export async function containsText(component, text) {
  if (!component.props.children.includes(text)) {
    throw new Error(`Could not find text ${text}`);
  };
}

export async function resetNonUser() {
  return axios.post(API_URL + '/test/reset_non_user')
}

export async function resetNonKycUser() {
  return axios.post(API_URL + '/test/reset_non_kyc_user')
}

export async function resetKycUser() {
  return axios.post(API_URL + '/test/reset_kyc_user')
}

export const errorCatchWrapper = fn => {
  return async () => {
    try {
      return await fn()
    } catch (err) {
      // console.log("ERR:", err)
      throw err;
    }
  }
}