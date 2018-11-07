import store from '../app/redux/store';
import * as actions from '../app/redux/actions';

export default {
  noEmailPass,
  noPass,
  noEmail,
  weekPassword,
  signUp,
  inputUserName,
  inputPassword,
}

store.dispatch(actions.logoutUser());

function noEmailPass(spec) {
  return async () => {
    // signUp with no email, pass
    await spec.pause(5000)
    await spec.press('Welcome.skipButton')
    await spec.press('SignupOne.button')
    await spec.notExists('SignupTwo.screen')

    await spec.pause(5000)
  }
}

function noPass(spec) {
  return async () => {
    // singUp with no pass
    await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@gmail.com`)
    await spec.press('SignupOne.button')
    await spec.notExists('SignupTwo.screen')

    store.dispatch(actions.logoutUser());

    await spec.pause(5000)

  }
}

function noEmail(spec) {
  return async () => {

    // signUp with no email
    await spec.press('Welcome.skipButton')
    store.dispatch(actions.clearForm());
    await spec.fillIn('SignupOne.password','12345678')
    await spec.press('SignupOne.button')
    await spec.notExists('SignupTwo.screen')

    store.dispatch(actions.logoutUser());

    await spec.pause(5000)
  }
}

function weekPassword(spec) { 
  return async () => {

  //  signUp with no email
  await spec.press('Welcome.skipButton')
  store.dispatch(actions.clearForm());
  await spec.fillIn('SignupOne.password','12345678')
  await spec.press('SignupOne.button')
  await spec.notExists('SignupTwo.screen')

  store.dispatch(actions.logoutUser());

  await spec.pause(5000)
  }
}

function signUp(spec) {
  return async () => {

  // signUp
  await spec.press('Welcome.skipButton')
  await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@gmail.com`)
  await spec.fillIn('SignupOne.password','12345678')
  await spec.press('SignupOne.button')
  }
}
 
function inputUserName(spec) {
  return async () => {
    await spec.pause(5000)
    await spec.fillIn('SignupTwo.FirstName', 'Nemanja')
    await spec.fillIn('SignupTwo.LastName', 'Krstonic')
    await spec.press('SignupTwo.CreatePin')
  }
}

function inputPassword(spec) {
  return async () => {
    await spec.pause(3000)
    await spec.fillIn('passcode.pin','1111')
    await spec.press('Passcode.Repeat PIN')
    await spec.fillIn('passcode.pin_confirm','1111')
    await spec.press('Passcode.Confirm')
  }
}