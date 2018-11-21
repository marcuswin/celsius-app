import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import { findComponent } from "./helpers"

const { dispatch } = store;

export default {
	navigateToEarnTab,
	selectCurrency,
	updateCurrency,
}

dispatch(actions.logoutUser());

function navigateToEarnTab(spec){
	return async () => {

		await spec.pause(1000)
		await spec.press('BottomNavigation.Earn')
    await spec.exists('InterestCalculatorScreen.interestCurrency')
    
	}
}

function selectCurrency(spec) {
	return async () => {

		// store.dispatch(actions.updateFormField('interestCurrency', 'Ethereum'))
		// store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))

	}
}

function updateCurrency(spec) {
	return async () => {

		// store.dispatch(actions.updateFormField('interestCurrency', 'Ethereum'))
    // store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))       

		// await spec.exists('InterestCalculatorScreen.perWeek')
		// await spec.pause(30000)
	}
}

//Test earn page, How to earn tab
// //      await spec.press('BottomNavigation.Earn')
// //       await spec.exists('InterestCalculatorScreen.exist')
// //       await spec.press('TabNavigation.How to earn')
// //       await spec.exists('HowToEarnInterest.exist')
// //       await spec.pause(1000)
// //       await spec.press('InterestExplanation.BalancePress')
// //       await spec.exists('InterestExplanation.Balance')
// //       await spec.pause(1000)
// //       await spec.press('InterestExplanation.TimePress')
// //       await spec.exists('InterestExplanation.Time')
// //       await spec.pause(1000)
// //       await spec.press('InterestExplanation.HodlPress')
// //       await spec.exists('InterestExplanation.Hodl')

// //     //Test earn page, calculator tab
// //       await spec.press('TabNavigation.Calculator')
// //       // Select a currency
// //       // BTC
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Bitcoin'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// //       // ETH
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Ethereum'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// //       // LTC
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Litecoin'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// //       // XRP
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Ripple'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// //       // OMG
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Omisego'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// //       // BCH
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Bitcoin cash'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
      
// //       // await spec.fillIn('InterestCalculatorScreen.interestAmount', 100)
// //       await spec.pause(5000)
// //       await spec.exists('InterestCalculatorScreen.perWeek')
// //       await spec.exists('InterestCalculatorScreen.perMonth')
// //       await spec.exists('InterestCalculatorScreen.per6Months')