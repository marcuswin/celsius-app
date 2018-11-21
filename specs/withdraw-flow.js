import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import { loginUserSetup, findComponent, resetBeforeEach, submit } from "./helpers"

const { dispatch, getState } = store;

export default {
	navigateToWithdrawPage,
	withdrawLessThan$1,
	withdrawInsufficientFunds,
	withdraw$2,
	withdraw$5,
	withdraw$2XRP,

	withdrawETH,
	withdrawBTC,
	withdrawOMG,
	withdrawXRP,
	withdrawLTC,
	withdrawBCH,
}

dispatch(actions.logoutUser());

function navigateToWithdrawPage(spec){
	return async () => {

		await spec.pause(5000)
		await spec.press('WalletDetails.withdraw')
		await spec.press('WithdrawalInfo.continue')
		await spec.pause(2000)

	}
}

function withdrawLessThan$1(spec){
	return async () => {

		await spec.pause(2000)
		await spec.press('AmountInput.zero')
    await spec.press('AmountInput.period')
    await spec.press('AmountInput.one')
    await spec.press('AmountInput.nine')
    await spec.pause(2000)
		await spec.press('AmountInput.send')
		await spec.pause(4000)

		await spec.notExists('TransactionConfirmation.confirmWithdraw')
	}
}

function withdrawInsufficientFunds(spec){
	return async () => {

		await spec.pause(2000)
		await spec.press('AmountInput.one')
		await spec.press('AmountInput.one')
		await spec.press('AmountInput.zero')
		await spec.press('AmountInput.zero')
		await spec.press('AmountInput.zero')
		await spec.press('AmountInput.zero')
		await spec.pause(5000)
		await spec.press('AmountInput.send')
		
		// Add showMessage when insufficient funds
	}
}

function withdraw$2(spec){
	return async () => {

		await spec.pause(2000)	
		await spec.press('AmountInput.two')
		await spec.press('AmountInput.send')
		await spec.pause(5000)
		await spec.press('TransactionConfirmation.confirmWithdraw')
		await spec.pause(2000)
		await spec.fillIn('passcode.pin','1111')
		await spec.press('Passcode.Confirm')
		await spec.pause(2000)

	}
}

function withdraw$2XRP(spec){
	return async () => {

		await spec.pause(2000)	
		await spec.press('AmountInput.two')
		await spec.press('AmountInput.send')
		await spec.pause(5000)

		await spec.exists('TransactionConfirmation.destinationTag')

		await spec.press('TransactionConfirmation.confirmWithdraw')
		await spec.pause(2000)
		await spec.fillIn('passcode.pin','1111')
		await spec.press('Passcode.Confirm')
		await spec.pause(2000)

	}
}

function withdraw$5(spec){
	return async () => {

		await spec.pause(2000)
		await spec.press('AmountInput.five')
		
		await spec.press('AmountInput.send')
		await spec.pause(5000)
		await spec.press('TransactionConfirmation.confirmWithdraw')
		await spec.pause(2000)
		await spec.fillIn('passcode.pin','1111')
		await spec.press('Passcode.Confirm')
		await spec.pause(2000)

	}
}

function withdrawETH(spec) {
	return async () => {

		loginUserSetup()
		await spec.pause(5000)
		await spec.exists('WalletBalance.ETH')
		await spec.press('WalletBalance.ETH')

	}
}

function withdrawBTC(spec) {
	return async () => {

		loginUserSetup()
		await spec.pause(5000)
		await spec.exists('WalletBalance.BTC')
		await spec.press('WalletBalance.BTC')

	}
}

function withdrawXRP(spec) {
	return async () => {

		loginUserSetup()
		await spec.pause(5000)
		await spec.exists('WalletBalance.XRP')
		await spec.press('WalletBalance.XRP')

	}
}

function withdrawOMG(spec) {
	return async () => {

		loginUserSetup()
		await spec.pause(5000)
		await spec.exists('WalletBalance.OMG')
		await spec.press('WalletBalance.OMG')

	}
}

function withdrawLTC(spec) {
	return async () => {

		loginUserSetup()
		await spec.pause(5000)
		await spec.exists('WalletBalance.LTC')
		await spec.press('WalletBalance.LTC')

	}
}

function withdrawBCH(spec) {
	return async () => {

		loginUserSetup()
		await spec.pause(5000)
		await spec.exists('WalletBalance.BCH')
		await spec.press('WalletBalance.BCH')

	}
}