import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import { kycSetup, kycPassed } from "./helpers"

const { dispatch } = store;

export default {
	firstAndLastNameExist,
	noTitle,
	noDateOfBirth,
	noCitizenship,
	noGender,
	noFirstName,
	noLastName,
	kycSuccess,
	identityCardPicture,
	drivingLicencePicutre,
	passportPicture,
	finishKycFlow,
}

dispatch(actions.logoutUser());


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

// Can't call this separatly
function kycSuccess(spec) {
	return async () => {
		await spec.pause(10000)
		kycPassed()

		await spec.press('ProfileDetails.verifyYourProfile')
		await spec.pause(10000)
		await spec.exists('VerifyProfile.verify')
	}
}

function identityCardPicture(spec) {
	return async () => {
		await spec.pause(5000)

		await spec.press('VerifyProfile.identity_card')

		await spec.press('CameraInput.front')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')
		
		await spec.pause(5000)
		
		await spec.press('CameraInput.back')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')
		
		await spec.pause(2000)
		

	}
}

function drivingLicencePicutre(spec) {
	return async () => {

		await spec.pause(5000)

		await spec.press('VerifyProfile.driving_licence')

		await spec.press('CameraInput.front')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')
		
		await spec.pause(2000)
		
		await spec.press('CameraInput.back')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')
	}
}

function passportPicture(spec){
	return async () => {
		await spec.pause(5000)
		await spec.press('VerifyProfile.passport')
		
		await spec.press('CameraInput.front')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')
	
	}

}
function finishKycFlow(spec) {
	return async () => {

		await spec.pause(5000)

		await spec.press('VerifyProfile.passport')
		
		await spec.press('CameraInput.front')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')

		store.dispatch(actions.updateFormField('cellphone', `111+${ new Date().getTime() }`))
		await spec.press('VerifyProfile.verify')

		await spec.pause(5000)

  	await spec.fillIn('VerifyPhoneNumber.sms', '1111')
    await spec.press('VerifyPhoneNumber.finish')
    await spec.pause(3000)

		store.dispatch(actions.verifySMSSuccess());

    await spec.pause(3000)
	}
}
