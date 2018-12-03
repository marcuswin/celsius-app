import store from "../app/redux/store";
import * as actions from "../app/redux/actions";
import { clearSecureStorage } from "../app/utils/expo-storage";

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
    console.log(`Try: ${ tryCount++ } | ${ activeScreen }`)
    if (!welcome) await spec.pause(1000)
  }

  if (tryCount === 20) throw new Error('Too many tries!');
}

export async function resetTests(spec) {
  await clearSecureStorage();
  dispatch(actions.clearForm());
  await dispatch(actions.logoutUser());
  await waitForWelcomeScreen(spec);
}

export async function callToComplete(spec, callName) {
  let tryCount = 1;
  let lastCompletedCall = getState().api.lastCompletedCall;
  while (lastCompletedCall !== callName && tryCount < 20) {
    console.log(`Try: ${ tryCount++ } | ${ lastCompletedCall }`)
    await spec.pause(200)
    lastCompletedCall = getState().api.lastCompletedCall;
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
