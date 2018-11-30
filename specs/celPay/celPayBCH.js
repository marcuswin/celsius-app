import store from '../../app/redux/store';
import * as actions from '../../app/redux/actions';


export default {
loginUser,
selectAmountBCH,
sendAmountBCH,
}


function loginUser(spec){
	return async () => {

		store.dispatch(actions.logoutUser());

		await spec.pause(2000)
		await spec.press('Welcome.skipButton')
		await spec.pause(2000)
		await spec.press('MainHeader.Login')
		// LogIn
		await spec.fillIn('CelTextInput.email','filip.jovakaric+wlt@mvpworkshop.co')
		await spec.fillIn('CelTextInput.pass','filip123')
		await spec.press('LoginForm.button')
		await spec.pause(2000)

	}
}

function selectAmountBCH(spec){
	return async () => {

		await spec.press('BottomNavigation.Pay')
		await spec.press('SelectCoin.BCH')
		await spec.pause(5000)

		await spec.press('AmountInput.one')
		await spec.press('AmountInput.period')
		await spec.press('AmountInput.one')
		await spec.press('AmountInput.send')

	}	
}

function sendAmountBCH(spec){
	return async () => {

		await spec.pause(2000)
		await spec.fillIn('passcode.pin','1111')
		await spec.press('Passcode.Confirm')
		await spec.pause(2000)
		await spec.press('AmountInput.confirm-send')
		await spec.pause(2000)
		await spec.press('TransactionConfirmation.confirmWithdraw')
		await spec.pause(2000)
		await spec.press('Passcode.Confirm')

	}	
}