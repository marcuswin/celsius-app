import store from '../../app/redux/store';
import * as actions from '../../app/redux/actions';
import { resetTests, containsText, resetNonKycUser, callToComplete, waitForExists } from "../helpers";
import API from "../../app/config/constants/API";


const { dispatch } = store;

export default {
	// Successful Flow 
	successKYCflow,

	// NoKYC screen
	resetKYC,
	setupAddressInfo,
	setupTaxPayer,
	startKyc,

	// Profile details screen
	prepopulateFirstAndLastName,
	noTitle,
	noFirstName,
	noLastName,
	noDateOfBirth,
	underAge,
	noCitizenship,
	noGender,
	profileDetailsFinish,

	// Address information screen
	prepopulateCountry,
	stateFieldExistsIfUSA,
	errWhenNoCity,
	errWhenNoZIP,
	errWhenNoStreet,
	addressInfoValid,

	// Taxpayer ID Screen
	taxpayerIDNoSSN,
	taxpayerIDInvalidSSN,
	taxpayerIDValidSSN,
	taxpayerIDSuccess,

	// Verify documents screen
	takePassportPicture,
	takeFrontAndBackofDrivingLicence,
	takeFrontAndBackofIdentityCard,
	showErrorNoPhoneNumber,
	verifyProfileSuccess,

	// VerifyPhoneNumber screen
	wrongSMSCode,
	correctSMSCode,
}

// Successful flow
function successKYCflow(spec) {
	return async () => {
		await resetKYC(spec)

		// ProfileDetails screen
		// switch to fill
		store.dispatch(actions.updateFormField('title', "mr"));
		store.dispatch(actions.updateFormField('month', "01"));
		store.dispatch(actions.updateFormField('day', "01"));
		store.dispatch(actions.updateFormField('year', "1994"));
		store.dispatch(actions.updateFormField('citizenship', 'Serbia'));
		store.dispatch(actions.updateFormField('gender', 'male'));

		await spec.press('ProfileDetails.addYourAddress')
		await callToComplete(spec, API.UPDATE_USER_PERSONAL_INFO)
		await waitForExists(spec, 'AddressInformation.screen')

		// AddressInformation screen
		// switch to fill
		store.dispatch(actions.updateFormField('country', 'Serbia'))
		store.dispatch(actions.updateFormField('city', 'Novi Beograd'))
		store.dispatch(actions.updateFormField('zip', '442'))
		store.dispatch(actions.updateFormField('street', 'Ulica Filipa Jovakarica'))

		await spec.press('AddressInformation.yourTaxpayerID')
		await callToComplete(spec, API.UPDATE_USER_ADDRESS_INFO)
		await waitForExists(spec, 'TaxpayerID.screen')

		// TaxPayerID screen
		store.dispatch(actions.updateFormField('national_id', '110319415136'))
		await spec.press('TaxpayerID.verifyYourProfile')
		await callToComplete(spec, API.UPDATE_USER_TAXPAYER_INFO)
		await waitForExists(spec, 'VerifyProfile.screen')

		// VerifyProfile screen
		store.dispatch(actions.clearForm());
		await spec.press('CameraInput.front')
		await waitForExists(spec, 'Camera.screen')
		await spec.press('CameraScreen.takePhoto')
		await callToComplete(spec, API.TAKE_CAMERA_PHOTO)
		await waitForExists(spec, 'Camera.confirmScreen')
		await spec.press('CameraScreen.usePhoto')
		await store.dispatch(actions.updateFormField('cellphone', `111+${new Date().getTime()}`))
		await spec.press('VerifyProfile.verify')
		await callToComplete(spec, API.CREATE_KYC_DOCUMENTS)
		await callToComplete(spec, API.UPDATE_USER_PERSONAL_INFO)
		await callToComplete(spec, API.SEND_VERIFICATION_SMS)

		await waitForExists(spec, 'VerifyPhoneNumber.screen')

		// VerifyPhoneNumber screen
		await spec.fillIn('VerifyPhoneNumber.sms', '1111')
		await spec.press('VerifyPhoneNumber.finish')
		await callToComplete(spec, API.VERIFY_SMS)
		await callToComplete(spec, API.START_KYC)
		await waitForExists(spec, 'NoKycPending.screen')
	}
}

async function resetKYC(spec) {
	await resetNonKycUser(spec);
	await resetTests(spec);
	await dispatch(actions.loginBorrower({
		// TODO move to const
		email: 'testing+non_kyc_user@mvpworkshop.co',
		password: 'Cel51u5!?',
	}))
	await waitForExists(spec, 'NoKyc.screen')
	await spec.press('NoKyc.VerifyProfile')
	await waitForExists(spec, 'ProfileDetails.screen')
}

function startKyc(spec) {
	return async () => {
		await resetKYC(spec);
		await spec.press('NoKyc.VerifyProfile')
		await waitForExists(spec, 'ProfileDetails.screen')
	}
}

// Profile details screen
async function profileDetailsSetup(spec) {
	await resetKYC(spec)
	dispatch(actions.navigateTo('ProfileDetails'))
	await callToComplete(API.GET_USER_PERSONAL_INFO)
	dispatch(actions.clearForm())
}

function prepopulateFirstAndLastName(spec) {
	return async () => {
		await profileDetailsSetup(spec);

		await waitForExists(spec, 'NoKyc.screen')
		// pull property value from CelInput
		await waitForExists(spec, 'Test not implemented yet!')
	}
}

function noTitle(spec) {
	return async () => {
		await profileDetailsSetup(spec);

		store.dispatch(actions.updateFormField('firstName', "David"));
		store.dispatch(actions.updateFormField('lastName', "David"));
		store.dispatch(actions.updateFormField('month', "04"));
		store.dispatch(actions.updateFormField('day', "04"));
		store.dispatch(actions.updateFormField('year', "1994"));
		store.dispatch(actions.updateFormField('citizenship', 'Serbia'));
		store.dispatch(actions.updateFormField('gender', 'male'));

		await spec.press('ProfileDetails.addYourAddress')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.title');
		await containsText(text, `Title is required!`);
	}
}

function noFirstName(spec) {
	return async () => {
		await profileDetailsSetup(spec);

		store.dispatch(actions.updateFormField('title', "mr"));
		await store.dispatch(actions.updateFormField('firstName', ""));
		store.dispatch(actions.updateFormField('lastName', "David"));
		store.dispatch(actions.updateFormField('month', "01"));
		store.dispatch(actions.updateFormField('day', "01"));
		store.dispatch(actions.updateFormField('year', "1994"));
		store.dispatch(actions.updateFormField('citizenship', 'Serbia'));
		store.dispatch(actions.updateFormField('gender', 'male'));

		await spec.press('ProfileDetails.addYourAddress')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.firstName');
		await containsText(text, `First Name is required!`);
	}
}

function noLastName(spec) {
	return async () => {
		await profileDetailsSetup(spec);

		store.dispatch(actions.updateFormField('title', "mr"));
		store.dispatch(actions.updateFormField('firstName', "David"));
		store.dispatch(actions.updateFormField('lastName', ""));
		store.dispatch(actions.updateFormField('month', "01"));
		store.dispatch(actions.updateFormField('day', "01"));
		store.dispatch(actions.updateFormField('year', "1994"));
		store.dispatch(actions.updateFormField('citizenship', 'Serbia'));
		store.dispatch(actions.updateFormField('gender', 'male'));

		await spec.press('ProfileDetails.addYourAddress')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.lastName');
		await containsText(text, `Last Name is required!`);
	}
}

function noDateOfBirth(spec) {
	return async () => {
		await profileDetailsSetup(spec);

		await store.dispatch(actions.updateFormField('title', "mr"));
		await store.dispatch(actions.updateFormField('firstName', "David"));
		await store.dispatch(actions.updateFormField('lastName', "David"));
		await store.dispatch(actions.updateFormField('month', ""));
		await store.dispatch(actions.updateFormField('day', ""));
		await store.dispatch(actions.updateFormField('year', ""));
		await store.dispatch(actions.updateFormField('citizenship', "Serbia"));
		await store.dispatch(actions.updateFormField('gender', "male"));

		await spec.press('ProfileDetails.addYourAddress')

		//check errors
		// const text = await spec.findComponent('InputErrorWrapper.year');
		// await containsText(text, `Date of Birth is required!`);
		await waitForExists(spec, 'Test not implemented yet!')
	}
}


function underAge(spec) {
	return async () => {
		await profileDetailsSetup(spec);

		await store.dispatch(actions.updateFormField('title', "mr"));
		await store.dispatch(actions.updateFormField('citizenship', 'Serbia'));
		await store.dispatch(actions.updateFormField('month', "01"));
		await store.dispatch(actions.updateFormField('day', "01"));
		await store.dispatch(actions.updateFormField('year', "2004"));
		await store.dispatch(actions.updateFormField('gender', 'male'));

		await spec.press('ProfileDetails.addYourAddress')

		//check errors
		// const text = await spec.findComponent('ProfileDetails.title');
		// await containsText(text, `Title is required!`);
		await waitForExists(spec, 'Test not implemented yet!')
	}
}

function noCitizenship(spec) {
	return async () => {
		await profileDetailsSetup(spec);

		await store.dispatch(actions.updateFormField('title', "mr"));
		await store.dispatch(actions.updateFormField('firstName', "David"));
		await store.dispatch(actions.updateFormField('lastName', "David"));
		await store.dispatch(actions.updateFormField('month', "01"));
		await store.dispatch(actions.updateFormField('day', "01"));
		await store.dispatch(actions.updateFormField('year', "1994"));
		await store.dispatch(actions.updateFormField('gender', 'male'));

		await spec.press('ProfileDetails.addYourAddress')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.citizenship');
		await containsText(text, 'Citizenship is required!');
	}
}

function noGender(spec) {
	return async () => {
		await profileDetailsSetup(spec);

		await store.dispatch(actions.updateFormField('title', "mr"));
		await store.dispatch(actions.updateFormField('firstName', "David"));
		await store.dispatch(actions.updateFormField('lastName', "David"));
		await store.dispatch(actions.updateFormField('month', "01"));
		await store.dispatch(actions.updateFormField('day', "01"));
		await store.dispatch(actions.updateFormField('year', "1994"));
		await store.dispatch(actions.updateFormField('citizenship', 'Serbia'));

		await spec.press('ProfileDetails.addYourAddress')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.gender');
		await containsText(text, `Gender is required!`);
	}
}

function profileDetailsFinish(spec) {
	return async () => {
		await profileDetailsSetup(spec);

		await store.dispatch(actions.updateFormField('title', "mr"));
		await store.dispatch(actions.updateFormField('month', "01"));
		await store.dispatch(actions.updateFormField('day', "01"));
		await store.dispatch(actions.updateFormField('year', "1994"));
		await store.dispatch(actions.updateFormField('citizenship', 'Serbia'));
		await store.dispatch(actions.updateFormField('gender', 'male'));

		await spec.press('ProfileDetails.addYourAddress')
		await callToComplete(API.UPDATE_USER_PERSONAL_INFO)
		await waitForExists(spec, 'AddressInformation.screen')
	}
}

// Address information screen
async function setupAddressInfo(spec) {
	await resetKYC(spec);
	dispatch(actions.navigateTo('AddressInformation'))
	await waitForExists(spec, 'AddressInformation.screen')
}

function prepopulateCountry(spec) {
	return async () => {
		await resetKYC(spec);
		dispatch(actions.navigateTo('AddressInformation'))

		await waitForExists(spec, 'Test not implemented yet!')
		// Find CelSelect and check value prop
	}
}

function stateFieldExistsIfUSA(spec) {
	return async () => {
		await setupAddressInfo(spec);

		await store.dispatch(actions.updateFormField('country', 'United States'))
		await waitForExists(spec, 'AddressInformation.state')

		await store.dispatch(actions.updateFormField('country', 'Argentina'))
		await spec.notExists('AddressInformation.state')
	}
}

function errWhenNoCity(spec) {
	return async () => {
		await setupAddressInfo(spec);

		await store.dispatch(actions.updateFormField('country', 'Serbia'))
		await store.dispatch(actions.updateFormField('zip', '442'))
		await store.dispatch(actions.updateFormField('city', ''))
		await store.dispatch(actions.updateFormField('street', 'Ulica Filipa Jovakarica'))

		await spec.press('AddressInformation.yourTaxpayerID')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.city');
		await containsText(text, `City is required!`);
	}
}

function errWhenNoZIP(spec) {
	return async () => {
		await setupAddressInfo(spec);

		await store.dispatch(actions.navigateTo('AddressInformation'))
		await callToComplete(API.GET_USER_PERSONAL_INFO)
		await store.dispatch(actions.clearForm());

		await store.dispatch(actions.updateFormField('country', 'Serbia'))
		await store.dispatch(actions.updateFormField('city', 'Novi Beograd'))
		await store.dispatch(actions.updateFormField('zip', ''))
		await store.dispatch(actions.updateFormField('street', 'Ulica Filipa Jovakarica'))

		await spec.press('AddressInformation.yourTaxpayerID')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.zip');
		await containsText(text, `Zip / Postal code is required!`);
	}
}

function errWhenNoStreet(spec) {
	return async () => {
		await setupAddressInfo(spec);

		await store.dispatch(actions.navigateTo('AddressInformation'))
		await callToComplete(API.GET_USER_PERSONAL_INFO)
		await store.dispatch(actions.clearForm());

		await store.dispatch(actions.updateFormField('country', 'Serbia'))
		await store.dispatch(actions.updateFormField('zip', '442'))
		await store.dispatch(actions.updateFormField('street', ''))
		await store.dispatch(actions.updateFormField('city', 'Novi Beograd'))

		await spec.press('AddressInformation.yourTaxpayerID')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.street');
		await containsText(text, `Street is required!`);
	}
}

function addressInfoValid(spec) {
	return async () => {
		await setupAddressInfo(spec);

		store.dispatch(actions.navigateTo('AddressInformation'))
		await callToComplete(API.GET_USER_PERSONAL_INFO)

		store.dispatch(actions.updateFormField('country', 'Serbia'))
		await store.dispatch(actions.updateFormField('city', 'Novi Beograd'))
		await store.dispatch(actions.updateFormField('zip', '442'))
		await store.dispatch(actions.updateFormField('street', 'Ulica Filipa Jovakarica'))

		await spec.press('AddressInformation.yourTaxpayerID')

		await waitForExists(spec, 'TaxpayerID.screen')
	}
}

// Taxpayer ID Screen
async function setupTaxPayer(spec) {
	await resetKYC(spec);
	dispatch(actions.navigateTo('TaxprayerID'))
	await waitForExists(spec, 'TaxpayerID.screen')
}

function taxpayerIDNoSSN(spec) {
	return async () => {
		await setupTaxPayer(spec);

		// store.dispatch(actions.navigateTo('AddressInformation'))

		await store.dispatch(actions.updateFormField('country', 'United States'))
		// await	store.dispatch(actions.updateFormField('city','Novi Beograd'))
		// await	store.dispatch(actions.updateFormField('zip','442'))
		// await	store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

		// await spec.press('AddressInformation.yourTaxpayerID')

		// await waitForExists(spec,'TaxpayerID.screen')
		await spec.press('TaxpayerID.verifyYourProfile')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.ssn');
		await containsText(text, `ssn is required!`);

	}
}

function taxpayerIDInvalidSSN(spec) {
	return async () => {
		await setupTaxPayer(spec);
		// store.dispatch(actions.navigateTo('AddressInformation'))

		await store.dispatch(actions.updateFormField('country', 'United States'))
		// await	store.dispatch(actions.updateFormField('city','Novi Beograd'))
		// await	store.dispatch(actions.updateFormField('zip','442'))
		// await	store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

		// await spec.press('AddressInformation.yourTaxpayerID')

		await store.dispatch(actions.updateFormField('ssn', '110319415136'))

		await spec.press('TaxpayerID.verifyYourProfile')

		const text = await spec.findComponent('InputErrorWrapper.ssn');
		await containsText(text, `ssn is not valid!`);

	}
}

function taxpayerIDValidSSN(spec) {
	return async () => {
		await setupTaxPayer(spec);

		// await store.dispatch(actions.navigateTo('AddressInformation'))

		await store.dispatch(actions.updateFormField('country', 'United States'))
		// await store.dispatch(actions.updateFormField('city','Novi Beograd'))
		// await store.dispatch(actions.updateFormField('zip','442'))
		// await store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

		await spec.press('AddressInformation.yourTaxpayerID')

		await store.dispatch(actions.updateFormField('ssn', '110-31-9415'))

		await spec.press('TaxpayerID.verifyYourProfile')

		await waitForExists(spec, 'Test not implemented yet!')
	}
}

function taxpayerIDSuccess(spec) {
	return async () => {
		await setupTaxPayer(spec);
		// await store.dispatch(actions.navigateTo('AddressInformation'))

		await store.dispatch(actions.updateFormField('country', 'Serbia'))
		// await store.dispatch(actions.updateFormField('city','Novi Beograd'))
		// await store.dispatch(actions.updateFormField('zip','442'))
		// await store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

		// await spec.press('AddressInformation.yourTaxpayerID')

		await store.dispatch(actions.updateFormField('national_id', '110319415136'))

		await spec.press('TaxpayerID.verifyYourProfile')

		await waitForExists(spec, 'Test not implemented yet!')
	}
}

// Verify profile page
async function setupVerifyProfile(spec) {
	await resetKYC(spec)
	dispatch(actions.navigateTo('TaxprayerID'))
	await waitForExists(spec, 'VerifyProfile.screen')
}

function takePassportPicture(spec) {
	return async () => {
		await setupVerifyProfile(spec);

		await store.dispatch(actions.clearForm());
		// await store.dispatch(actions.navigateTo('VerifyProfile'))

		//STATE NEEDS TO BE CLEARED FOR THIS TO WORK
		await spec.press('CameraInput.front')
		await spec.press('CameraScreen.takePhoto')
		await callToComplete(API.TAKE_CAMERA_PHOTO)
		// await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')

		await store.dispatch(actions.updateFormField('cellphone', `111+${new Date().getTime()}`))

		await spec.press('VerifyProfile.verify')
		await callToComplete(spec, API.SEND_VERIFICATION_SMS)
		await waitForExists(spec, 'VerifyPhoneNumber.screen')
	}
}

function takeFrontAndBackofDrivingLicence(spec) {
	return async () => {
		await setupVerifyProfile(spec);

		await store.dispatch(actions.navigateTo('VerifyProfile'))

		//STATE NEEDS TO BE CLEARED FOR THIS TO WORK
		await spec.press('VerifyProfile.driving_licence')

		await spec.press('CameraInput.front')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')

		await spec.press('CameraInput.back')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')

		await waitForExists(spec, 'Test not implemented yet!')
	}
}

function takeFrontAndBackofIdentityCard(spec) {
	return async () => {
		await setupVerifyProfile(spec);

		await store.dispatch(actions.navigateTo('VerifyProfile'))

		//STATE NEEDS TO BE CLEARED FOR THIS TO WORK
		await spec.press('VerifyProfile.identity_card')

		await spec.press('CameraInput.front')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')

		await spec.press('CameraInput.back')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')

		await waitForExists(spec, 'Test not implemented yet!')
	}
}

function showErrorNoPhoneNumber(spec) {
	return async () => {
		await setupVerifyProfile(spec);
		await waitForExists(spec, 'Test not implemented yet!')
	}
}
function verifyProfileSuccess(spec) {
	return async () => {
		await setupVerifyProfile(spec);
		await waitForExists(spec, 'Test not implemented yet!')
	}
}

// VerifyPhoneNumber screen
async function setupVerifyPhoneNumber(spec) {
	await resetKYC(spec)
	dispatch(actions.navigateTo('VerifyPhoneScreen'))
	await waitForExists(spec, 'VerifyPhoneNumber.screen')
}

function wrongSMSCode(spec) {
	return async () => {
		await setupVerifyPhoneNumber(spec);
		await waitForExists(spec, 'Test not implemented yet!')
	}
}
function correctSMSCode(spec) {
	return async () => {
		await setupVerifyPhoneNumber(spec);
		await waitForExists(spec, 'Test not implemented yet!')
	}
}