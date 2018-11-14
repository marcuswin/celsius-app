// import store from '../app/redux/store';
// import * as actions from '../app/redux/actions';


// export default {
// calculateInterest,

// }


// function calculateInterest(spec){
// 	return async () => {

// 		// BTC
// 		await spec.pause(5000)
// 		store.dispatch(actions.updateFormField('interestCurrency', 'BTC'))
// 		store.dispatch(actions.updateFormField('interestAmount', `123`))
// 		await spec.pause(5000)
// 		await spec.exists('InterestCalculatorScreen.perWeek')
// 		await spec.exists('InterestCalculatorScreen.perMonth')
// 		await spec.exists('InterestCalculatorScreen.per6Months')
		
// 		// ETH
// 		store.dispatch(actions.updateFormField('interestCurrency', 'ETH'))
// 		store.dispatch(actions.updateFormField('interestAmount', `321`))
// 		await spec.pause(5000)
// 		await spec.exists('InterestCalculatorScreen.perWeek')
// 		await spec.exists('InterestCalculatorScreen.perMonth')
// 		await spec.exists('InterestCalculatorScreen.per6Months')

// 		// LTC
// 		store.dispatch(actions.updateFormField('interestCurrency', 'LTC'))
// 		store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// 		await spec.pause(5000)
// 		await spec.exists('InterestCalculatorScreen.perWeek')
// 		await spec.exists('InterestCalculatorScreen.perMonth')
// 		await spec.exists('InterestCalculatorScreen.per6Months')

// 		// XRP
// 		store.dispatch(actions.updateFormField('interestCurrency', 'XRP'))
// 		store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// 		await spec.pause(5000)
// 		await spec.exists('InterestCalculatorScreen.perWeek')
// 		await spec.exists('InterestCalculatorScreen.perMonth')
// 		await spec.exists('InterestCalculatorScreen.per6Months')

// 		// OMG
// 		store.dispatch(actions.updateFormField('interestCurrency', 'OMG'))
// 		store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// 		await spec.pause(5000)
// 		await spec.exists('InterestCalculatorScreen.perWeek')
// 		await spec.exists('InterestCalculatorScreen.perMonth')
// 		await spec.exists('InterestCalculatorScreen.per6Months')

// 		// BCH
// 		store.dispatch(actions.updateFormField('interestCurrency', 'BCH'))
// 		store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))  
// 		await spec.pause(5000)
// 		await spec.exists('InterestCalculatorScreen.perWeek')
// 		await spec.exists('InterestCalculatorScreen.perMonth')
// 		await spec.exists('InterestCalculatorScreen.per6Months')

// 	}
// }