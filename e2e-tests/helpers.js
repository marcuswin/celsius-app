import store from "../app/redux/store";
import * as actions from "../app/redux/actions";
import axios from "axios";
import { Constants } from "expo";

import { clearSecureStorage } from "../app/utils/expo-storage";

const {API_URL} = Constants.manifest.extra;
const { dispatch, getState } = store;

export default {
  waitForWelcomeScreen,
  resetTests,
  callToComplete,
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
    // console.log(`Try: ${ tryCount } | ${ activeScreen }`)
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
  let lastCompletedCall = getState().api.history[getState().api.history.length - 1];
  // console.log(`Try: ${ tryCount } | ${ lastCompletedCall } | ${ callName }`)
  while (lastCompletedCall.includes(callName) && tryCount < 20) {
    // console.log(`Try: ${ tryCount } | ${ lastCompletedCall } | ${ callName }`)
    tryCount++
    // tryCount++;
    await spec.pause(500)
    lastCompletedCall = getState().api.history[getState().api.history.length - 1];
  }

  if (tryCount === 20) throw new Error('Too many tries!');
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

export async function resetNonUser(){
  return axios.get(API_URL + '/test/reset_non_user')
}

export async function resetNonKycUser(){
  return axios.get(API_URL + '/test/reset_non_kyc_user')
}

export async function resetKycUser(){
  return axios.post(API_URL + '/test/reset_kyc_user')
}
