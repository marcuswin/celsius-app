import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import { test, loginSetup, resetBeforeEach, submit } from "./helpers"

const { dispatch, getState } = store;

export default {
	graphs,
	addressAndQR,
	logins,
	eth,
	btc,
	ltc,
	omg,
	xrp,
	bch,
	cel,
}

function graphs(spec) {
	return async () => {

		await spec.pause(5000)
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

	}
}

function addressAndQR(spec){
	return async () => {

		await spec.pause(5000)
		await spec.press('WalletDetailsHeading.add')
		await spec.pause(3000)
    await spec.exists('AddFunds.QRCode')
    await spec.exists('AddFunds.address')
    await spec.press('AddFunds.Done')

    let comp = await spec.findComponent('WalletDetails.iks')
    await test(comp)

	}
}

function logins(spec) {
	return async () => {
  	loginSetup()
	  await spec.fillIn('CelTextInput.email', 'filip.jovakaric+wlt@mvpworkshop.co')
	  await spec.fillIn('CelTextInput.pass','filip123')
	  await spec.press('LoginForm.button')

	  await spec.pause(5000)
	  await spec.press('TabNavigation.Balance')
	  await spec.press('TabNavigation.Balance')
	  await spec.press('TabNavigation.Transactions')
	}
}

function eth(spec) {
	return async () => {
		
		await spec.pause(5000)
		await spec.exists('WalletBalance.ETH')
		await spec.press('WalletBalance.ETH')

	}
}

function btc(spec) {
	return async () => {

		await spec.pause(5000)
		await spec.exists('WalletBalance.BTC')
		await spec.press('WalletBalance.BTC')
	}
}


function ltc(spec) {
	return async () => {

		await spec.pause(5000)
		await spec.exists('WalletBalance.LTC')
		await spec.press('WalletBalance.LTC')
	}
}

function omg(spec) {
	return async () => {

		await spec.pause(5000)
		await spec.exists('WalletBalance.OMG')
		await spec.press('WalletBalance.OMG')
	}
}

function xrp(spec) {
	return async () => {

		await spec.pause(5000)
		await spec.exists('WalletBalance.XRP')
		await spec.press('WalletBalance.XRP')
	}
}

function bch(spec) {
	return async () => {

		await spec.pause(5000)
		await spec.exists('WalletBalance.BCH')
		await spec.press('WalletBalance.BCH')
	}
}

function cel(spec) {
	return async () => {

		await spec.pause(5000)
		await spec.exists('WalletBalance.CEL')
		await spec.press('WalletBalance.CEL')
	}
}