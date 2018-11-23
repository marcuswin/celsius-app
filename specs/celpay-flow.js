import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import { loginUserSetup, test, resetBeforeEach, submit } from "./helpers"

const { dispatch } = store;

export default {
	navigateToCelPay,
	selectCoinBTC,
	selectCoinOMG,
	selectCoinXRP,
	selectCoinLTC,
	selectCoinBCH,
	selectCoinETH,
	celPayLessThan$1,
	celPayInsufficientFunds,
	celPay$2,
}

dispatch(actions.logoutUser());

function navigateToCelPay(spec){
	return async () => {

		loginUserSetup()
		await spec.pause(4000)
		await spec.press('BottomNavigation.Pay')
		await spec.exists('SelectCoin.main')
		
	}
}

function celPayLessThan$1 (spec){
	return async () => {

		await spec.pause(2000)
		await spec.press('AmountInput.zero')
    await spec.press('AmountInput.period')
    await spec.press('AmountInput.one')
    await spec.press('AmountInput.nine')
    await spec.pause(2000)
		await spec.press('AmountInput.send')


		// if( amountUsd < 1 ) {

		// }
	}
}

function celPayInsufficientFunds(spec){
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

function celPay$2(spec){
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

function selectCoinBTC(spec) {
	return async () => {

		const btn = await spec.findComponent('SelectCoin.BTC')
    if (!btn.props.disabled) {
			await spec.press('SelectCoin.BTC')
		}	
	}
}

function selectCoinETH(spec) {
	return async () => {

		const btn = await spec.findComponent('SelectCoin.ETH')
    if (!btn.props.disabled) {
			await spec.press('SelectCoin.ETH')
		}
	}
}

function selectCoinOMG(spec) {
	return async () => {

		const btn = await spec.findComponent('SelectCoin.OMG')
    if (!btn.props.disabled) {
			await spec.press('SelectCoin.OMG')
		}
	}
}

function selectCoinXRP(spec) {
	return async () => {

		const btn = await spec.findComponent('SelectCoin.XRP')
    if (!btn.props.disabled) {
			await spec.press('SelectCoin.XRP')
		}
	}
}

function selectCoinLTC(spec) {
	return async () => {

		const btn = await spec.findComponent('SelectCoin.LTC')
    if (!btn.props.disabled) {
			await spec.press('SelectCoin.LTC')
		}
	}
}

function selectCoinBCH(spec) {
	return async () => {

		const btn = await spec.findComponent('SelectCoin.BCH')
    if (!btn.props.disabled) {
			await spec.press('SelectCoin.BCH')
		}
	}
}