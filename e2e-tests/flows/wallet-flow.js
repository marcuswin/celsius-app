import store from '../../app/redux/store';
import * as actions from '../../app/redux/actions';
import { resetTests, containsText, resetKycUser, callToComplete, waitForExists } from "../helpers";
import API from "../../app/config/constants/API";


const { dispatch } = store;

export default {
  testFailed,
  navigateToWalletBalance,
  tabsSwitch,
}

function testFailed(spec){
	return async () => {

	}
}

function navigateToWalletBalance(spec){
	return async () => {
    await resetTests(spec);
    await resetKycUser(spec);
    
    await spec.press('Welcome.skipButton')
    await waitForExists(spec, 'SignupOne.screen')
    
    await spec.press('MainHeader.RightLink')
    await waitForExists(spec,'Login.screen')
    
    await spec.fillIn('CelTextInput.email', 'filip.jovakaric+wlt@mvpworkshop.co')
    await spec.fillIn('CelTextInput.pass', 'filip123')
    await spec.press('LoginForm.button')
    
    await callToComplete(spec, API.LOGIN_BORROWER)
     
		await spec.press('WalletDetails.withdraw')
		await spec.press('WithdrawalInfo.continue')

	}
}

function tabsSwitch(spec){
	return async () => {
		await resetTests(spec);
		await resetKycUser(spec);
		
	  await spec.press('TabNavigation.Transactions')
		await waitForExists(spec, 'WalletInterest.screen')

	  await spec.press('TabNavigation.Balance')
		await waitForExists(spec, 'WalletBalance.screen')

	}
}

