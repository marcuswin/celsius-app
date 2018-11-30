import store from '../../app/redux/store';
import * as actions from '../../app/redux/actions';


export default {
	loginUser,
	charts,
	withdrawLessThanOne,
	withdrawOver20K,
	withdraw5$,

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

function charts(spec){
	return async () => {

		// BTC 
		await spec.pause(5000)
		await spec.exists('WalletBalance.BTC')
		await spec.press('WalletBalance.BTC')
		await spec.press('WalletDetailsGraphContainer.1d')
		await spec.exists('WalletDetailsGraphContainer.LineChart1d')

		await spec.press('WalletDetailsGraphContainer.7d')
		await spec.exists('WalletDetailsGraphContainer.LineChart7d')

		await spec.press('WalletDetailsGraphContainer.1m')
		await spec.exists('WalletDetailsGraphContainer.LineChart1m')

		await spec.press('WalletDetailsGraphContainer.3m')
		await spec.exists('WalletDetailsGraphContainer.LineChart3m')

		await spec.press('WalletDetailsGraphContainer.1y')
		await spec.exists('WalletDetailsGraphContainer.LineChart1y')

		await spec.press('WalletDetailsHeading.add')
		await spec.pause(2000)
		await spec.exists('AddFunds.QRCode')
		await spec.exists('AddFunds.address')
		await spec.press('AddFunds.Done')
		await spec.pause(2000)

	}
}

function withdrawLessThanOne(spec){
	return async () => {

		await spec.pause(2000)
    await spec.press('WalletDetails.withdraw')
    await spec.press('WithdrawalInfo.continue')
    await spec.pause(2000)
    await spec.press('AmountInput.zero')
    await spec.press('AmountInput.period')
    await spec.press('AmountInput.one')
    await spec.press('AmountInput.nine')
    await spec.pause(2000)
    await spec.press('AmountInput.send')
    await spec.pause(2000)

	}
}

function withdrawOver20K(spec){
	return async () => {

		 // Withdraw more than $20k
		 await spec.pause(2002)
		 await spec.press('WalletDetails.withdraw')
		 await spec.press('WithdrawalInfo.continue')
		 await spec.pause(2000)

		 
		 await spec.press('AmountInput.one')
		 await spec.press('AmountInput.one')
		 await spec.press('AmountInput.zero')
		 await spec.press('AmountInput.zero')
		 await spec.press('AmountInput.zero')
		 await spec.press('AmountInput.zero')

		 await spec.pause(5000)
		 await spec.press('AmountInput.send')

	}
}

function withdraw5$(spec){
	return async () => {

		// Withdraw $5
		await spec.pause(2002)
		await spec.press('WalletDetails.withdraw')
		await spec.press('WithdrawalInfo.continue')
		await spec.pause(2000)
		
		await spec.press('AmountInput.one')

		await spec.press('AmountInput.send')
		await spec.pause(2000)
		await spec.press('TransactionConfirmation.confirmWithdraw')
		await spec.pause(2000)
		await spec.fillIn('passcode.pin','1111')
		await spec.press('Passcode.Confirm')
		await spec.pause(5000)

	}
}