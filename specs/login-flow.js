import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import { loginSetup, resetTests, createPinSetup, submit } from "./helpers"

const { dispatch, getState } = store;

export default {
	disableWhenNoLoginData,
	disableWhenNoEmail,
	disableWhenNoPassword,
	disableWhenWrongCredentials,
	errUserDoesNotExists,
	loginSuccess,
}

dispatch(actions.logoutUser());

function disableWhenNoLoginData(spec) {
  return async () => {	
		loginSetup()

		await spec.fillIn('CelTextInput.email', 'filip.jovakaric+wlt@mvpworkshop.co')

		const btn = await spec.findComponent('LoginForm.button')
    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }
	}
}

function disableWhenNoEmail(spec) {
	return async () => {
		loginSetup() 

    await spec.fillIn('CelTextInput.pass','filip123')

		const btn = await spec.findComponent('LoginForm.button')
    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }
	}
}

function disableWhenNoPassword(spec) {
	return async () => {
		loginSetup() 

		await spec.fillIn('CelTextInput.email', 'filip.jovakaric+wlt@mvpworkshop.co')

		const btn = await spec.findComponent('LoginForm.button')
    if (!btn.props.disabled) {
      throw new Error(`Signup Button enabled`);
    }
	}
}

function disableWhenWrongCredentials(spec) {
	return async () => {
		loginSetup() 

		await spec.fillIn('CelTextInput.email', 'filip.jovakaric+wlt@mvpworkshop.co')
    await spec.fillIn('CelTextInput.pass','filip1234')

		await spec.pause(5000)
		await spec.notExists('WalletLayout.home')
	}
}

function errUserDoesNotExists(spec) {
	return async () => {
		loginSetup() 

		await spec.fillIn('CelTextInput.email', 'filip.jovakaric+wlt11122313@mvpworkshop.co')
    await spec.fillIn('CelTextInput.pass','filip1234')

		await spec.notExists('WalletLayout.home')
	}
}

function loginSuccess(spec) { 
	return async () => {
		loginSetup() 

		await spec.fillIn('CelTextInput.email', 'filip.jovakaric+wlt@mvpworkshop.co')
    await spec.fillIn('CelTextInput.pass','filip123')
		await spec.press('LoginForm.button')

		await spec.pause(5000)
		await spec.exists('WalletLayout.home')
	}
}
