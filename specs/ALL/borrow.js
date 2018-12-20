// import store from '../app/redux/store';
// import * as actions from '../app/redux/actions';

// export default {
// 	inputBTC,
// 	inputETH,
// 	inputLTC,
// 	inputOMG,
// 	inputXRP,
// 	inputBCH,
// }

// function inputBTC(spec){
// 		return async () => {

// 			await spec.press('BottomNavigation.Borrow')
// 			store.dispatch(actions.updateFormField('coin', 'btc'))
// 			store.dispatch(actions.updateFormField('amountCollateralUSD', '1234'))
// 			await spec.press(`LoanApplication.three`)
// 			await spec.press(`LoanApplication.five`)
// 			await spec.press(`LoanApplication.seven`)
// 	}
// }

// function inputETH(spec){
// 	return async () => {

// 		store.dispatch(actions.updateFormField('coin', 'eth'))
// 		store.dispatch(actions.updateFormField('amountCollateralUSD', '1415555551231123'))
// 		await spec.press(`LoanApplication.three`)
// 		await spec.press(`LoanApplication.five`)
// 		await spec.press(`LoanApplication.seven`)
// 	}
// }

// function inputLTC(spec){
// 	return async () => {

// 		store.dispatch(actions.updateFormField('coin', 'ltc'))
// 		store.dispatch(actions.updateFormField('amountCollateralUSD', '0'))
// 		await spec.press(`LoanApplication.three`)
// 		await spec.press(`LoanApplication.five`)
// 		await spec.press(`LoanApplication.seven`)
// 	}
// }

// function inputXRP(spec){
// 	return async () => {

// 		store.dispatch(actions.updateFormField('coin', 'xrp'))
// 		store.dispatch(actions.updateFormField('amountCollateralUSD', '12'))
// 		// await spec.press(`LoanApplication.three`)
// 		await spec.press(`LoanApplication.five`)
// 		await spec.press(`LoanApplication.seven`)
// 	}
// }

// function inputOMG(spec){
// 	return async () => {

// 		store.dispatch(actions.updateFormField('coin', 'omg'))
// 		store.dispatch(actions.updateFormField('amountCollateralUSD', '1234'))
// 		await spec.press(`LoanApplication.three`)
// 		await spec.press(`LoanApplication.five`)
// 		await spec.press(`LoanApplication.seven`)
// 	}
// }

// function inputBCH(spec){
// 	return async () => {

// 		store.dispatch(actions.updateFormField('coin', 'bch'))
// 		store.dispatch(actions.updateFormField('amountCollateralUSD', '1234'))
// 		await spec.press(`LoanApplication.three`)
// 		await spec.press(`LoanApplication.five`)
// 		await spec.press(`LoanApplication.seven`)
// 	}
// }