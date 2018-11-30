// import { test } from './helpers';
// import store from '../app/redux/store';
// import * as actions from '../app/redux/actions';

// export default {
// 	charts,
// }


// function charts(spec){
// 	return async () => {

// 		store.dispatch(actions.logoutUser());

// 		await spec.pause(2000)
// 		await spec.press('Welcome.skipButton')
// 		await spec.pause(2000)
// 		await spec.press('MainHeader.Login')

// 		// LogIn
// 		await spec.fillIn('CelTextInput.email','filip.jovakaric+wlt@mvpworkshop.co')
// 		await spec.fillIn('CelTextInput.pass','filip123')
// 		await spec.press('LoginForm.button')
// 		await spec.pause(5000)
// 		await spec.exists('WalletBalance.CEL')
// 		await spec.pause(3000)
// 		await spec.press('WalletBalance.CEL')
// 		await spec.press('WalletDetailsHeading.add')
// 		await spec.pause(3000)
// 		await spec.press('MainHeader.BackButton')
// 		await spec.press('WalletDetailsHeading.add')
// 		await spec.exists('AddFunds.QRCode')
// 		await spec.exists('AddFunds.address')
// 		await spec.press('AddFunds.Done')

// 		comp = await spec.findComponent('WalletDetails.iks')
// 		await test(comp)

// 	}
// }