// import store from '../app/redux/store';
// import * as actions from '../app/redux/actions';

// export default {
// startKYC,
// startKYC2,
// startKYC3,
// startKYC4,
// startKYC5,
// idCardTakePicture,
// drivingLicenceRetakePhoto,
// verifySMS,

// }

// function startKYC(spec){
// 	return async () => {

// 		await spec.pause(3000)
// 		await spec.press('NoKyc.VerifyProfile')
// 		await spec.pause(5000)
// 		await spec.press('ProfileDetails.verifyYourProfile')

// 	}
// }

// function startKYC2(spec){
// 	return async () => {
		
// 		await spec.pause(9000)
// 		store.dispatch(actions.updateFormField('title', 'mr' ));
// 		await spec.press('ProfileDetails.verifyYourProfile')
	
// 	}
// }

// function startKYC3(spec){
// 	return async () => {

// 		await spec.pause(9000)
// 		store.dispatch(actions.updateFormField('title', 'mr' ));
// 		store.dispatch(actions.updateFormField('dateOfBirth', '1994-01-01T00:00:00-06:00' ));

// 		await spec.press('ProfileDetails.verifyYourProfile')
// 		await spec.pause(3003)
// 		await spec.notExists('ProfileDetails.Title is required!')
// 		await spec.notExists('ProfileDetails.Date of Birth is required!')
// 		await spec.exists('ProfileDetails.Citizenship is required!')
// 		await spec.exists('ProfileDetails.Gender is required!')

// 	}
// }

// function startKYC4(spec){
// 	return async () => {

// 		await spec.pause(9000)
// 		store.dispatch(actions.updateFormField('title', 'mr' ));
//     store.dispatch(actions.updateFormField('dateOfBirth', "1994-01-01T00:00:00-06:00" ));
// 		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		
// 		await spec.press('ProfileDetails.verifyYourProfile')

// 	}
// }

// function startKYC5(spec){
// 	return async () => {

// 		await spec.pause(9000)
// 		store.dispatch(actions.updateFormField('title', 'mr' ));
// 		store.dispatch(actions.updateFormField('dateOfBirth', "2016-01-01T00:00:00-06:00" ));
// 		store.dispatch(actions.updateFormField('citizenship','Serbia'));
// 		store.dispatch(actions.updateFormField('gender', 'Male' ));
// 		await spec.pause(5000)

// 		await spec.press('ProfileDetails.verifyYourProfile')
// 		await spec.pause(5000)

// 	}
// }

// function idCardTakePicture(spec){
// 	return async () => {

// 		await spec.pause(5000)
//     await spec.press('VerifyProfile.identity_card')

//     await spec.press('CameraInput.front')
//     await spec.press('CameraScreen.takePhoto')
//     await spec.press('CameraScreen.usePhoto')

//     await spec.pause(5000)

//     await spec.press('CameraInput.back')
//     await spec.press('CameraScreen.takePhoto')
//     await spec.press('CameraScreen.usePhoto')

//     await spec.pause(2000)

//     await spec.press('VerifyProfile.passport')

//     await spec.press('CameraInput.front')
//     await spec.pause(2000)
//     await spec.press('CameraScreen.retakePhoto')
//     await spec.press('CameraScreen.takePhoto')
// 		await spec.press('CameraScreen.usePhoto')
			 
// 	}
// }

// function drivingLicenceRetakePhoto(spec){
// 	return async () => {

// 		await spec.pause(3000)
// 		await spec.press('VerifyProfile.driving_licence')

// 		await spec.press('CameraInput.front')
// 		await spec.pause(2000)
//     await spec.press('CameraScreen.takePhoto')
// 		await spec.press('CameraScreen.retakePhoto')
// 		await spec.press('CameraScreen.takePhoto')
// 		await spec.press('CameraScreen.usePhoto')

// 		await spec.pause(2000)

// 		await spec.press('CameraInput.back')
// 		await spec.pause(4000)
// 		await spec.press('CameraScreen.takePhoto')
// 		await spec.press('CameraScreen.retakePhoto')
// 		await spec.press('CameraScreen.takePhoto')
// 		await spec.press('CameraScreen.usePhoto')

// 	}
// }

// function verifySMS(spec){
// 	return async () => {

//     await spec.press('VerifyProfile.identity_card')

// 		await spec.press('CameraInput.front')
// 		await spec.press('CameraScreen.takePhoto')
// 		await spec.pause(3000)
//     await spec.press('CameraScreen.usePhoto')

// 		await spec.press('CameraInput.back')
// 		await spec.press('CameraScreen.takePhoto')
// 		await spec.pause(3000)
//     await spec.press('CameraScreen.usePhoto')

// 		store.dispatch(actions.updateFormField('cellphone', `111+${ new Date().getTime() }`))
//     await spec.pause(2000)
//     await spec.press('VerifyProfile.verify')
//     await spec.pause(5000)
//     await spec.fillIn('VerifyPhoneNumber.sms', '1111')
//     await spec.press('VerifyPhoneNumber.finish')
//     store.dispatch(actions.verifySMSSuccess());
// 		await spec.pause(3000)
			 
// 	}
// }