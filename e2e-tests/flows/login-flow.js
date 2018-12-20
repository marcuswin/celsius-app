import store from '../../app/redux/store';
import * as actions from '../../app/redux/actions';
import { resetTests, callToComplete, containsText, waitForExists, resetNonKycUser, waitToFindComponent } from "../helpers";
import API from "../../app/config/constants/API";


const { dispatch } = store;

export default {
  successfulFlow,

  // Welcome screen
  initFlow,

  // Login screen
  forgottenPassword,
  disableWhenNoLoginData,
  disableWhenNoEmail,
  disableWhenNoPassword,
  errWhenWrongCredentials,
  errUserDoesNotExists,
  loginSuccess,

  // LoginPasscode screen

  // ForgottenPassword screen
  forgottenPasswordErrWrongEmail,
  forgottenPasswordErrWrongEmailFormat,
  forgottenPasswordSuccessMsg,
}

function successfulFlow(spec) {
  return async () => {
    await resetTests(spec);
    await resetNonKycUser(spec);

    await spec.press('Welcome.skipButton')
    await waitForExists(spec, 'SignupOne.screen')

    await spec.press('MainHeader.RightLink')
    await waitForExists(spec, 'Login.screen')

    await spec.fillIn('CelTextInput.email', 'testing+non_kyc_user@mvpworkshop.co')
    await spec.fillIn('CelTextInput.pass', 'Cel51u5')
    await spec.press('LoginForm.button')

    await callToComplete(spec, API.LOGIN_BORROWER)
    // await waitForExists(spec,'WalletBalance.screen')
  }
}

function initFlow(spec) {
  return async () => {
    await resetTests(spec);
    await resetNonKycUser(spec);

    await spec.press('Welcome.skipButton')
    await waitForExists(spec, 'SignupOne.screen')

    await spec.press('MainHeader.RightLink')
    await waitForExists(spec, 'Login.screen')

    await spec.press('MainHeader.RightLink')
    await waitForExists(spec, 'Login.screen')
  }
}

// Login screen tests
async function loginSetup(spec) {
  await resetTests(spec);
  await resetNonKycUser(spec);

  await spec.press('Welcome.skipButton')
  await waitForExists(spec, 'SignupOne.screen')

  await spec.press('MainHeader.RightLink')
  await waitForExists(spec, 'Login.screen')
}

function forgottenPassword(spec) {
  return async () => {
    await loginSetup(spec);

    await spec.press('LoginScreen.forgotPassword')
    await waitForExists(spec, 'ForgottenPassword.screen')
  }
}

function disableWhenNoLoginData(spec) {
  return async () => {
    await loginSetup(spec)

    const btn = await waitToFindComponent(spec, 'LoginForm.button')
    if (!btn.props.disabled) {
      throw new Error(`Login Button enabled`);
    }
  }
}

function disableWhenNoEmail(spec) {
  return async () => {
    await loginSetup(spec)

    await spec.fillIn('CelTextInput.pass', 'filip123')

    const btn = await waitToFindComponent(spec, 'LoginForm.button')
    if (!btn.props.disabled) {
      throw new Error(`Login Button enabled`);
    }
  }
}

function disableWhenNoPassword(spec) {
  return async () => {
    await loginSetup(spec)

    await spec.fillIn('CelTextInput.email', 'testing+non_kyc_user@mvpworkshop.co')

    const btn = await waitToFindComponent(spec, 'LoginForm.button')
    if (!btn.props.disabled) {
      throw new Error(`Login Button enabled`);
    }
  }
}

function errWhenWrongCredentials(spec) {
  return async () => {
    await loginSetup(spec)
    await resetNonKycUser(spec);

    await spec.fillIn('CelTextInput.pass', 'filip1234')
    await spec.fillIn('CelTextInput.email', 'testing+non_kyc_user@mvpworkshop.co')
    await spec.press('LoginForm.button')
    await callToComplete(spec, API.LOGIN_BORROWER)
    const text = await waitToFindComponent(spec, 'Message.msg');
    await containsText(text, `Uhoh, looks like your username or password don't match.`);
    await spec.notExists('WalletBalance.screen')
  }
}

function errUserDoesNotExists(spec) {
  return async () => {
    await loginSetup(spec)

    await spec.fillIn('CelTextInput.email', `filip.jovakaric${new Date().getTime()}@mvpworkshop.co`)
    await spec.fillIn('CelTextInput.pass', 'filip1234')
    await spec.press('LoginForm.button')

    const text = await waitToFindComponent(spec, 'Message.msg');
    await containsText(text, `Uhoh, looks like your username or password don't match.`);
    await spec.notExists('WalletBalance.screen')
  }
}

function loginSuccess(spec) {
  return async () => {
    await loginSetup(spec)

    await spec.fillIn('CelTextInput.email', 'testing+non_kyc_user@mvpworkshop.co')
    await spec.fillIn('CelTextInput.pass', 'Cel51u5!?')
    await spec.press('LoginForm.button')

    await callToComplete(spec, API.LOGIN_BORROWER)
    await waitForExists(spec, 'NoKyc.screen')
  }
}

// ForgottenPassword screen tests
async function forgottenPasswordSetup(spec) {
  await loginSetup(spec);

  await spec.press('LoginScreen.forgotPassword')
  await waitForExists(spec, 'ForgottenPassword.screen')
}

function forgottenPasswordErrWrongEmail(spec) {
  return async () => {
    await forgottenPasswordSetup(spec)

    await spec.fillIn('CelTextInput.email', 'notexisting@mvpworkshop.co')
    await spec.press('ForgottenPassword.getResetLink')

    const text = await waitToFindComponent(spec, 'Message.msg');
    await containsText(text, `Sorry, but it looks like this user doesn't exist.`);
  }
}

function forgottenPasswordErrWrongEmailFormat(spec) {
  return async () => {
    await forgottenPasswordSetup(spec);

    await spec.fillIn('CelTextInput.email', 'filip.jovakap.co')
    await spec.press('ForgottenPassword.getResetLink')

    const text = await waitToFindComponent(spec, 'Message.msg');
    await containsText(text, `Oops, looks like you didn't enter something right.`);
  }
}

function forgottenPasswordSuccessMsg(spec) {
  return async () => {
    await forgottenPasswordSetup(spec);

    dispatch(actions.updateFormField('email', 'testing+non_kyc_user@mvpworkshop.co'))
    await spec.press('ForgottenPassword.getResetLink')

    const text2 = await waitToFindComponent(spec, 'Message.msg');
    await containsText(text2, `Email sent!`);
  }
}
