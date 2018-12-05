import store from '../../app/redux/store';
import * as actions from '../../app/redux/actions';
import { resetTests, callToComplete } from "../helpers";
import constants from "../constants";
import ACTIONS from "../../app/config/constants/ACTIONS";
import API from "../../app/config/constants/API";


const { dispatch, getState } = store;

export default {
  successfulFlow,

  // Welcome screen
  pressSkipIntro,
  
  // Login screen

  // LoginPasscode screen
  // ForgottenPassword screen
}

function successfulFlow(spec) {
  return async () => {
    await resetTests(spec);

    await spec.press('Welcome.skipButton')
    dispatch(actions.navigateTo('Login'))

    await spec.fillIn('CelTextInput.email', 'filip.jovakaric+wlt@mvpworkshop.co')
    await spec.fillIn('CelTextInput.pass','filip123')
		await spec.press('LoginForm.button')

		await spec.pause(5000)
		await spec.exists('WalletLayout.home')

  }
}

function pressSkipIntro(spec) {
  return async () => {
    // await resetTests(spec);

    // await spec.press('Welcome.skipButton')
    // dispatch(actions.navigateTo('Login'))

  }
}