import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import { resetTests } from "./helpers";

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

  disableWhenNoNames,
}

// Welcome screen tests
function pressSkipIntro(spec) {
  return async () => {
    resetTests()

    await spec.press('Welcome.skipButton')
    await spec.exists('SignupOne.screen')

  }
}

// SignupOne screen tests
function signupOneSetup() {
  dispatch(actions.navigateTo('SignupOne'));
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

function disableWhenNoPassword(spec) {
  return async () => {
    resetTests();
    signupOneSetup();

    await spec.exists('SignupOne.screen')
    await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@mvpworkshop.co`)

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

    await spec.exists('SignupOne.screen')
    await spec.fillIn('SignupOne.email','valid.email@mvpworkshop.co')
    await spec.fillIn('SignupOne.password','celsius123')
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

// SignupTwo screen tests
function signupTwoSetup() {
  dispatch(actions.registerUserSuccess({ user: {
    "id": "c2732b75-04df-4bb1-acca-ddb88e88bb00",
    "referral_link_id": null,
    "phone_contacts_connected": false,
    "twitter_friends_connected": false,
    "facebook_friends_connected": false,
    "session_invalid_before": null,
    "partner_id": "Celsius",
    "created_at": "2018-11-09T10:49:28.631Z",
    "updated_at": "2018-11-09T10:49:28.631Z",
    "email": "no.name@mvpworkshop.co",
    "auth0_user_id": "auth0|5be56638ec312320f5624735",
    "first_name": null,
    "last_name": null,
    "country": null,
    "twitter_id": null,
    "twitter_screen_name": null,
    "profile_picture": null,
    "facebook_id": null,
    "google_id": null,
    "pin": null,
    "expo_push_tokens": null,
    "api_token": null,
    "two_factor_enabled": null,
    "two_factor_secret": null
  }}));
  dispatch(actions.navigateTo('Home'))
}

function disableWhenNoNames(spec) {
  return async () => {
    resetTests();
    signupTwoSetup();

    await spec.exists('SignupTwo.screen')
  }
}

