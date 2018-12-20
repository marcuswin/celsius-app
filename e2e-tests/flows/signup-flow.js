import store from '../../app/redux/store';
import * as actions from '../../app/redux/actions';
import helpers, { resetTests, callToComplete, containsText, waitForExists, waitToFindComponent } from "../helpers";
import constants from "../constants";
import { setSecureStoreKey } from '../../app/utils/expo-storage'
import API from "../../app/config/constants/API";


const { dispatch } = store;

export default {
  successfulFlow,

  // Welcome screen
  pressSkipIntro,

  // SignupOne screen
  disableWhenNoData,
  disableWhenNoEmail,
  disableWhenNoPassword,
  disabledWhenNoRepeatPassword,
  errorWhenEmailInvalid,
  errorWhenPasswordWeak,
  errorWPasswordsDifferent,
  stepOneSuccess,

  // SignupTwo screen
  errorWhenUserExists,
  disableWhenNoNames,
  disableWhenNoLastName,
  disableWhenNoFirstName,
  disabledWhenNoCheckbox,
  stepTwoSuccess,

  // CreatePasscode screen
  disableCreatePasscode,
  createPasscode,

  // RepeatPasscode screen
  disableRepeatPasscode,
  disableWrongPasscode,
  finishPasscode,
}

function successfulFlow(spec) {
  return async () => {
    await resetTests(spec);

    await spec.press('Welcome.skipButton')
    await waitForExists(spec, 'SignupOne.screen')

    await spec.fillIn('SignupOne.email', `email+${new Date().getTime()}@mvpworkshop.co`)
    await spec.fillIn('SignupOne.passwordOne', 'Celsius123')
    await spec.fillIn('SignupOne.passwordTwo', 'Celsius123')
    await spec.press('SignupOne.button')
    await callToComplete(spec, API.REGISTER_USER)

    await waitForExists(spec, 'SignupTwo.screen')
    await spec.fillIn('SignupTwo.FirstName', 'Nemanja')
    await spec.fillIn('SignupTwo.LastName', 'Krstonic')
    await spec.press('SignupTwo.CreatePin')
    await callToComplete(spec, API.UPDATE_USER)

    await waitForExists(spec, 'CreatePasscode.screen')
    await spec.fillIn('passcode.pin', '1111')
    await spec.press('Passcode.Repeat PIN')

    await waitForExists(spec, 'RepeatPasscode.screen')
    await spec.fillIn('passcode.pin_confirm', '1111')
    await callToComplete(spec, API.SET_PIN)

    await waitForExists(spec, 'NoKyc.screen')
  }
}

// Welcome screen tests
function pressSkipIntro(spec) {
  return async () => {
    await resetTests(spec);

    await spec.press('Welcome.skipButton')
    await waitForExists(spec, 'SignupOne.screen')
  }
}

// SignupTwo screen tests
export function signupOneSetup() {
  dispatch(actions.navigateTo('SignupOne'));
}

function disableWhenNoData(spec) {
  return async () => {
    await resetTests(spec);
    signupOneSetup();

    await waitForExists(spec, 'SignupOne.screen')
    const btn = await waitToFindComponent(spec, 'SignupOne.button')

    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);

    }
  }
}

function disableWhenNoEmail(spec) {
  return async () => {
    await resetTests(spec);
    signupOneSetup();

    await waitForExists(spec, 'SignupOne.screen')
    await spec.fillIn('SignupOne.passwordOne', 'Celsius123')
    await spec.fillIn('SignupOne.passwordTwo', 'Celsius123')

    const btn = await waitToFindComponent(spec, 'SignupOne.button')
    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }

  }
}

function disableWhenNoPassword(spec) {
  return async () => {
    await resetTests(spec);
    signupOneSetup();

    await waitForExists(spec, 'SignupOne.screen')
    await spec.fillIn('SignupOne.email', `nemanjatest+${new Date().getTime()}@mvpworkshop.co`)

    const btn = await waitToFindComponent(spec, 'SignupOne.button')
    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }

  }
}

function disabledWhenNoRepeatPassword(spec) {
  return async () => {
    await resetTests(spec);
    signupOneSetup();

    await waitForExists(spec, 'SignupOne.screen')
    await spec.fillIn('SignupOne.email', `nemanjatest+${new Date().getTime()}@mvpworkshop.co`)
    await spec.fillIn('SignupOne.passwordOne', 'Celsius123')

    const btn = await waitToFindComponent(spec, 'SignupOne.button')
    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }
  }
}

function errorWhenEmailInvalid(spec) {
  return async () => {
    await resetTests(spec);
    signupOneSetup();

    await waitForExists(spec, 'SignupOne.screen')
    await spec.fillIn('SignupOne.email', 'wrong email format')
    await spec.fillIn('SignupOne.passwordOne', 'Celsius123')
    await spec.fillIn('SignupOne.passwordTwo', 'Celsius123')
    await spec.press('SignupOne.button')

    await spec.notExists('SignupTwo.screen')

    await waitForExists(spec, 'InputErrorWrapper.email')
    const text = await waitToFindComponent(spec, 'InputErrorWrapper.email');
    await containsText(text, `Oops, looks like you didn't enter something right.`);

  }
}

function errorWhenPasswordWeak(spec) {
  return async () => {
    await resetTests(spec);
    signupOneSetup();

    await waitForExists(spec, 'SignupOne.screen')
    await spec.fillIn('SignupOne.email', 'valid.email@mvpworkshop.co')
    await spec.fillIn('SignupOne.passwordOne', 'Cels')
    await spec.fillIn('SignupOne.passwordTwo', 'Cels')
    await spec.press('SignupOne.button')

    await spec.notExists('SignupTwo.screen')

    await waitForExists(spec, 'InputErrorWrapper.password')
    const text = await waitToFindComponent(spec, 'InputErrorWrapper.password');
    await containsText(text, `Password must have at least 8 characters!`);
  }
}

function errorWhenUserExists(spec) {
  return async () => {
    await resetTests(spec);
    signupOneSetup();

    await waitForExists(spec, 'SignupOne.screen')
    await spec.fillIn('SignupOne.email', 'filip.jovakaric+wlt@mvpworkshop.co')
    await spec.fillIn('SignupOne.passwordOne', 'filip123')
    await spec.fillIn('SignupOne.passwordTwo', 'filip123')
    await spec.press('SignupOne.button')

    await helpers.callToComplete(spec, API.REGISTER_USER)

    await waitForExists(spec, 'Message.msg')
    const text = await waitToFindComponent(spec, 'Message.msg');
    await containsText(text, `It looks like you've already created an account.`);

  }
}

function errorWPasswordsDifferent(spec) {
  return async () => {
    await resetTests(spec);
    signupOneSetup();

    await waitForExists(spec, 'SignupOne.screen')
    await spec.fillIn('SignupOne.email', 'filip.jovakaric+wlt@mvpworkshop.co')
    await spec.fillIn('SignupOne.passwordOne', 'filip123')
    await spec.fillIn('SignupOne.passwordTwo', 'filip123456')

  }
}


function stepOneSuccess(spec) {
  return async () => {
    await resetTests(spec);
    signupOneSetup();

    await waitForExists(spec, 'SignupOne.screen')
    await spec.fillIn('SignupOne.email', `email+${new Date().getTime()}@mvpworkshop.co`)
    await spec.fillIn('SignupOne.passwordOne', 'Celsius123')
    await spec.fillIn('SignupOne.passwordTwo', 'Celsius123')
    await spec.press('SignupOne.button')

    await callToComplete(spec, API.REGISTER_USER)
    await waitForExists(spec, 'SignupTwo.screen')
  }
}


// SignupTwo screen tests
export function signupTwoSetup() {
  dispatch(actions.registerUserSuccess({
    user: constants.userWithoutName
  }));
  setSecureStoreKey('id_token', constants.bearerToken);
  dispatch(actions.navigateTo('SignupTwo'))
}

function disableWhenNoNames(spec) {
  return async () => {
    await resetTests(spec);
    signupTwoSetup();

    await waitForExists(spec, 'SignupTwo.screen')
    const btn = await waitToFindComponent(spec, 'SignupTwo.CreatePin')
    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }
  }
}

function disableWhenNoLastName(spec) {
  return async () => {
    await resetTests(spec);
    signupTwoSetup();

    await waitForExists(spec, 'SignupTwo.screen')
    await spec.fillIn('SignupTwo.LastName', 'Krstonic')
    const btn = await waitToFindComponent(spec, 'SignupTwo.CreatePin')

    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }

  }
}

function disableWhenNoFirstName(spec) {
  return async () => {
    await resetTests(spec);
    signupTwoSetup();

    await waitForExists(spec, 'SignupTwo.screen')
    await spec.fillIn('SignupTwo.FirstName', 'Nemanja')

    const btn = await waitToFindComponent(spec, 'SignupTwo.CreatePin')

    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }

  }
}

function disabledWhenNoCheckbox(spec) {
  return async () => {
    await resetTests(spec);
    signupTwoSetup();

    dispatch(actions.toggleTermsOfUse())

    const btn = await waitToFindComponent(spec, 'SignupTwo.CreatePin')

    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }
  }
}

function stepTwoSuccess(spec) {
  return async () => {
    await resetTests(spec);
    signupTwoSetup();

    await waitForExists(spec, 'SignupTwo.screen')
    await spec.fillIn('SignupTwo.FirstName', 'Nemanja')
    await spec.fillIn('SignupTwo.LastName', 'Krstonic')
    await spec.press('SignupTwo.CreatePin')
  }
}

// CreatePasscode screen tests
export function createPasscodeSetup() {
  dispatch(actions.updateProfileInfoSuccess({ user: constants.userWithName }));
  setSecureStoreKey('id_token', constants.bearerToken);
  dispatch(actions.navigateTo('CreatePasscode'))
}

function disableCreatePasscode(spec) {
  return async () => {
    await resetTests(spec)
    createPasscodeSetup();

    await waitForExists(spec, 'CreatePasscode.screen')
    await spec.fillIn('passcode.pin', '111')

    const btn = await waitToFindComponent(spec, 'Passcode.Repeat PIN')

    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }
  }
}

function createPasscode(spec) {
  return async () => {
    await resetTests(spec)
    createPasscodeSetup();

    await waitForExists(spec, 'CreatePasscode.screen')
    await spec.fillIn('passcode.pin', '1111')
    await spec.press('Passcode.Repeat PIN')
    await waitForExists(spec, 'RepeatPasscode.screen')
  }
}

// RepeatPasscode screen tests
async function repeatPasscodeSetup() {
  await dispatch(actions.registerUser({ email: `filip+${new Date().getTime()}@mvpworkshop.co`, password: 'Filip123' }))
  dispatch(actions.updateFormField('pin', '1111'))
  dispatch(actions.navigateTo('RepeatPasscode'))

}
function disableRepeatPasscode(spec) {
  return async () => {
    await resetTests(spec)
    repeatPasscodeSetup()

    await waitForExists(spec, 'RepeatPasscode.screen')
    await spec.fillIn('passcode.pin', '111')

  }
}

function disableWrongPasscode(spec) {
  return async () => {
    await resetTests(spec)
    repeatPasscodeSetup()

    await spec.fillIn('passcode.pin_confirm', '1234')

    await waitForExists(spec, 'Message.msg')

    const text = await waitToFindComponent(spec, 'Message.msg');
    await containsText(text, `Pin code should be the same`);

  }
}

function finishPasscode(spec) {
  return async () => {
    await resetTests(spec)
    await repeatPasscodeSetup()

    await waitForExists(spec, 'RepeatPasscode.screen')
    await spec.fillIn('passcode.pin_confirm', '1111')
    await callToComplete(spec, API.SET_PIN)

    await waitForExists(spec, 'NoKyc.screen')
  }
}
