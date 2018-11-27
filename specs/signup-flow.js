import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import { resetTests, signupOneSetup, signupTwoSetup, createPinSetup } from "./helpers"


const { dispatch, getState } = store;

export default {
  pressSkipIntro,
  disableWhenNoData,
  disableWhenNoEmail,
  disableWhenNoPassword,
  errorWhenEmailInvalid,
  errorWhenPasswordWeak,
  stepOneSuccess,
  errorWhenUserExists,
  signupOneSetup,
  signupTwoSetup,
  disableWhenNoNames,
  disableWhenNoLastName,
  disableWhenNoFirstName,
  stepTwoSuccess,
  disableCreatePasscode,
  createPasscode,
  disableRepeatPasscode,
  disableWrongPasscode,
  finishPasscode,
  signupKYCSuccess,
}

// Welcome screen tests
function pressSkipIntro(spec) {
  return async () => {
    resetTests()
    dispatch(actions.navigateTo('Welcome'));

    await spec.press('Welcome.skipButton')
    await spec.exists('SignupOne.screen')

  }
}

function disableWhenNoData(spec) {
  return async () => {
    resetTests();
    signupOneSetup();

    await spec.exists('SignupOne.screen')
    const btn = await spec.findComponent('SignupOne.button')

    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }
  }
}

function disableWhenNoEmail(spec) {
  return async () => {
    resetTests();
    signupOneSetup();

    await spec.exists('SignupOne.screen')
    await spec.fillIn('SignupOne.password','12345678')

    const btn = await spec.findComponent('SignupOne.button')
    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }
  }
}

function disableWhenNoPassword(spec) {
  return async () => {
    resetTests();
    signupOneSetup();

    dispatch(actions.clearForm());
    await spec.pause(5000)
    await spec.exists('SignupOne.screen')
    await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@mvpworkshop.co`)

    const btn = await spec.findComponent('SignupOne.button')
    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }
  }
}

function errorWhenEmailInvalid(spec) {
  return async () => {
    resetTests();
    signupOneSetup();

    await spec.exists('SignupOne.screen')
    await spec.fillIn('SignupOne.email','wrong email format')
    await spec.fillIn('SignupOne.password','Celsius123')
    await spec.press('SignupOne.button')

    await spec.notExists('SignupTwo.screen')
  }
}

function errorWhenPasswordWeak(spec) {
  return async () => {
    resetTests();
    signupOneSetup();

    await spec.pause(5000)
    await spec.exists('SignupOne.screen')
    await spec.fillIn('SignupOne.email','valid.email@mvpworkshop.co')
    await spec.fillIn('SignupOne.password','cel')
    await spec.press('SignupOne.button')

    await spec.notExists('SignupTwo.screen')
  }
}

function errorWhenUserExists(spec) {
  return async () => {
    resetTests();
    signupOneSetup();

    await spec.exists('SignupOne.screen')
    await spec.fillIn('SignupOne.email','filip.jovakaric+wlt@mvpworkshop.co')
    await spec.fillIn('SignupOne.password','filip123')
    await spec.press('SignupOne.button')

    await spec.notExists('SignupTwo.screen')
  }
}

function stepOneSuccess(spec) {
  return async () => {
    resetTests();
    signupOneSetup();

    await spec.exists('SignupOne.screen')
    await spec.fillIn('SignupOne.email', `email+${ new Date().getTime() }@mvpworkshop.co`)
    await spec.fillIn('SignupOne.password', 'Celsius123')
    await spec.press('SignupOne.button')

    await spec.exists('SignupTwo.screen')
  }
}

function disableWhenNoNames(spec) {
  return async () => {
    resetTests();
    signupTwoSetup();

    await spec.pause(3000)
    await spec.exists('SignupTwo.screen')
  }
}

function disableWhenNoLastName(spec) {
  return async () => {
    resetTests();
    signupTwoSetup();

    await spec.pause(3000)
    await spec.exists('SignupTwo.screen')
    await spec.fillIn('SignupTwo.LastName', 'Krstonic')
    const btn = await spec.findComponent('SignupTwo.CreatePin')

    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }

  }
}

function disableWhenNoFirstName(spec) {
  return async () => {
    resetTests();
    signupTwoSetup();

    await spec.pause(3000)
    await spec.exists('SignupTwo.screen')
    await spec.fillIn('SignupTwo.FirstName', 'Nemanja')

    const btn = await spec.findComponent('SignupTwo.CreatePin')

    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }

  }
}

function stepTwoSuccess(spec) {
  return async () => {
    resetTests();
    signupTwoSetup();

    await spec.pause(3000)
    await spec.exists('SignupTwo.screen')
    await spec.fillIn('SignupTwo.FirstName', 'Nemanja')
    await spec.fillIn('SignupTwo.LastName', 'Krstonic')
    await spec.press('SignupTwo.CreatePin')
  }
}

function disableCreatePasscode(spec) {
  return async () => {
    createPinSetup();

    await spec.pause(2000)
    await spec.fillIn('passcode.pin','111')
    await spec.press('Passcode.Repeat PIN')

    const btn = await spec.findComponent('Passcode.Repeat PIN')

    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);


    }
  }
}

function createPasscode(spec) {
  return async () => {
    createPinSetup();

    await spec.pause(2000)
    await spec.fillIn('passcode.pin','1111')
    await spec.press('Passcode.Repeat PIN')

  }
}

function disableRepeatPasscode(spec) {
  return async () => {

    await spec.pause(2000)
    await spec.fillIn('passcode.pin','111')
    await spec.press('Passcode.Repeat PIN')

    const btn = await spec.findComponent('Passcode.Repeat PIN')

    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);


    }
  }
}

function disableWrongPasscode(spec) {
  return async () => {

    await spec.pause(2000)
    await spec.fillIn('passcode.pin','1234')
    await spec.press('Passcode.Confirm')
  }
}

function finishPasscode(spec) {
  return async () => {

    await spec.pause(2000)
    await spec.fillIn('passcode.pin','1111')
    await spec.press('Passcode.Confirm')
    // await spec.exists('NoKyc.screen')
  }
}

function signupKYCSuccess(spec) {
  return async () => {
    resetTests()
    dispatch(actions.navigateTo('Welcome'));

    await spec.press('Welcome.skipButton')
    await spec.exists('SignupOne.screen')

    await spec.exists('SignupOne.screen')
    await spec.fillIn('SignupOne.email', `email+${ new Date().getTime() }@mvpworkshop.co`)
    await spec.fillIn('SignupOne.password', 'Celsius123')
    await spec.press('SignupOne.button')

    await spec.exists('SignupTwo.screen')
    await spec.pause(3000)
    await spec.exists('SignupTwo.screen')
    await spec.fillIn('SignupTwo.FirstName', 'Nemanja')
    await spec.fillIn('SignupTwo.LastName', 'Krstonic')
    await spec.press('SignupTwo.CreatePin')

    await spec.pause(2000)
    await spec.fillIn('passcode.pin','1111')
    await spec.press('Passcode.Repeat PIN')

    await spec.pause(2000)
    await spec.fillIn('passcode.pin_confirm','1111')
    await spec.press('Passcode.Confirm')

    await spec.pause(2000)

    await spec.press('NoKyc.VerifyProfile')

  }
}
