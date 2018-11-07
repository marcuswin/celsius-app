import store from '../app/redux/store';
import * as actions from '../app/redux/actions';


export default {
interestChart,
interestQR
}


function interestChart(spec){
	return async () => {

		await spec.pause(2000)
		await spec.press('TabNavigation.Interest')
		await spec.press('WalletInterest.1m')
		await spec.press('WalletInterest.3m')
		await spec.press('WalletInterest.1y')
		await spec.press('WalletInterests.AddMoreFunds')
		await spec.exists('AddFunds.QRCode')
		await spec.exists('AddFunds.address')

	}
}	
function interestQR(spec){
	return async () => {

	
		store.dispatch(actions.updateFormField('currency', 'eth'))
		await spec.exists('AddFunds.QRCode')
		await spec.exists('AddFunds.address')

		store.dispatch(actions.updateFormField('currency', 'btc'))
		await spec.exists('AddFunds.QRCode')
		await spec.exists('AddFunds.address')

		store.dispatch(actions.updateFormField('currency', 'ltc'))
		await spec.exists('AddFunds.QRCode')
		await spec.exists('AddFunds.address')

		store.dispatch(actions.updateFormField('currency', 'xrp'))
		await spec.exists('AddFunds.QRCode')
		await spec.exists('AddFunds.address')

		store.dispatch(actions.updateFormField('currency', 'omg'))
		await spec.exists('AddFunds.QRCode')
		await spec.exists('AddFunds.address')

		store.dispatch(actions.updateFormField('currency', 'bch'))
		await spec.exists('AddFunds.QRCode')
		await spec.exists('AddFunds.address')
		await spec.press('AddFunds.Done')

		//Test earn page, How to earn tab
		await spec.press('BottomNavigation.Earn')
		await spec.exists('InterestCalculatorScreen.exist')
		await spec.pause(5000)

	}
}
