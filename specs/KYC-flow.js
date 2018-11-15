import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import signupFlow from './signup-flow';
import { resetTests, kycSetup, submit } from "./helpers"
import NoKyc from '../app/components/screens/NoKyc/NoKyc';
import { startKYC } from '../app/redux/actions';

const { dispatch, getState } = store;

export default {
	profileDetails,
	firstAndLastNameExist,
	noTitle,
	noDateOfBirth,
	noCitizenship,
	noGender,
	noFirstName,
	noLastName,
	kycSuccess,
	identityCardPicture,
}

dispatch(actions.logoutUser());

function profileDetails(spec) {
	return async () => {
		// dispatch(actions.navigateTo('ProfileDetails'))

    spec.it('should go to SignupTwo screen when all info is valid', signupFlow.stepOneSuccess(spec))
    spec.it('should go to EnterPasscode screen when all info is valid', signupFlow.stepTwoSuccess(spec))
		spec.it('should go to RepeatPasscode screen when 4 digits are entered', signupFlow.createPasscode(spec))
		spec.it('should go to NoKYC screen when repeated pin is valid', signupFlow.finishPasscode(spec))
	}
}

function firstAndLastNameExist(spec) {
	return async () => {
	
	}
}

function noTitle(spec) {
	return async () => {
		kycSetup() 

		await spec.pause(3000)
		store.dispatch(actions.updateFormField('firstName', "Nemanja" ));
		store.dispatch(actions.updateFormField('lastName', "Krstonic" ));
		store.dispatch(actions.updateFormField('middleName', "krrr" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('dateOfBirth', "1994-01-01" ));
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('gender', 'Male' ));
		await spec.pause(3000)
		await spec.press('ProfileDetails.verifyYourProfile')
	}
}

function noDateOfBirth(spec) {
	return async () => {
		kycSetup() 

		store.dispatch(actions.updateFormField('title','mr'));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('firstName', "Nemanja" ));
		store.dispatch(actions.updateFormField('lastName', "Krstonic" ));
		store.dispatch(actions.updateFormField('middleName', "krrr" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('gender', 'Male' ));
		await spec.pause(3000)
		await spec.press('ProfileDetails.verifyYourProfile')
	}
}

function noCitizenship(spec) {
	return async () => {
		kycSetup() 

		store.dispatch(actions.updateFormField('title','mr'));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('firstName', "Nemanja" ));
		store.dispatch(actions.updateFormField('lastName', "Krstonic" ));
		store.dispatch(actions.updateFormField('middleName', "krrr" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('dateOfBirth', "1994-01-01" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('gender', 'Male' ));
		await spec.pause(3000)
		await spec.press('ProfileDetails.verifyYourProfile')
	}
}

function noGender(spec) {
	return async () => {
		kycSetup() 

		store.dispatch(actions.updateFormField('title','mr'));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('firstName', "Nemanja" ));
		store.dispatch(actions.updateFormField('lastName', "Krstonic" ));
		store.dispatch(actions.updateFormField('middleName', "krrr" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('dateOfBirth', "1994-01-01" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		await spec.pause(3000)
		await spec.press('ProfileDetails.verifyYourProfile')
	}
}

function noFirstName(spec) {
	return async () => {
		kycSetup() 

		store.dispatch(actions.updateFormField('title','mr'));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('lastName', "Krstonic" ));
		store.dispatch(actions.updateFormField('middleName', "krrr" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('dateOfBirth', "1994-01-01" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('gender', 'Male' ));

		await spec.press('ProfileDetails.verifyYourProfile')
	}
}

function noLastName(spec) {
	return async () => {
		kycSetup() 

		store.dispatch(actions.updateFormField('title','mr'));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('firstName', "Nemanja" ));
		store.dispatch(actions.updateFormField('middleName', "krrr" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('dateOfBirth', "1994-01-01" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('gender', 'Male' ));

		await spec.press('ProfileDetails.verifyYourProfile')
	}
}

function kycSuccess(spec) {
	return async () => {
		kycSetup() 


		await spec.pause(3000)
		store.dispatch(actions.updateFormField('firstName', "Nemanja" ));
		store.dispatch(actions.updateFormField('lastName', "Krstonic" ));
		store.dispatch(actions.updateFormField('middleName', "krrr" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('dateOfBirth', "1994-01-01" ));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		await spec.pause(3000)
		store.dispatch(actions.updateFormField('gender', 'male' ));
		store.dispatch(actions.updateFormField('title', 'mr' ));

		await spec.press('ProfileDetails.verifyYourProfile')
		await spec.pause(4000)
		await spec.exists('VerifyProfile.verify')
	}
}

function identityCardPicture(spec) {
	return async () => {
		await spec.press('VerifyProfile.identity_card')

		await spec.press('CameraInput.front')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')
		
		await spec.pause(5000)
		
		await spec.press('CameraInput.back')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')
		
		await spec.pause(2000)
		
		await spec.press('VerifyProfile.passport')
		
		await spec.press('CameraInput.front')
		await spec.press('CameraScreen.retakePhoto')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')
		

	}
}