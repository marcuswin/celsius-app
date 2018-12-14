import store from '../../app/redux/store';
import * as actions from '../../app/redux/actions';
import { resetTests, containsText, findComponent, resetKycUser, resetNonKycUser, callToComplete } from "../helpers";
import constants from "../constants";
import ACTIONS from "../../app/config/constants/ACTIONS";
import API from "../../app/config/constants/API";
import NoKyc from '../../app/components/screens/NoKyc/NoKyc';
import AddressInformation from '../../app/components/screens/AddressInformation/AddressInformation';
import VerifyProfile from '../../app/components/screens/VerifyProfile/VerifyProfile';
 

const { dispatch } = store;

export default {
	// Successful Flow 
  // successfulFlow,

	// NoKYC screen
	resetKYC,
	startKyc,
	successKYCflow,
	
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
	TaxpayerIDNoSSN,
	TaxpayerIDInvalidSSN,
	TaxpayerIDValidSSN,
	TaxpayerIDSuccess,

	// Verify documents screen
	takePassportPicture,
	takeFrontAndBackofDrivingLicence,
	takeFrontAndBackofIdentityCard,

}

async function resetKYC(spec){
	// await resetKycUser();
	// await resetTests(spec);
	await dispatch(actions.loginUser({
		email: 'testing+non_kyc_user@mvpworkshop.co',
		password: 'Cel51u5!?',
	}))
	resetNonKycUser(spec);
}

function startKyc(spec) {
  return async () => {
		await resetTests(spec);

		await dispatch(actions.navigateTo('Home'))
		await spec.press('NoKyc.VerifyProfile')
	}
}

async function kycSetup(spec) {
	await resetNonKycUser();
	await resetTests(spec);
	await dispatch(actions.loginUser({
		email: 'testing+non_kyc_user@mvpworkshop.co',
		password: 'Cel51u5!?',
	}))
	
	await spec.exists('NoKyc.screen')
	await spec.press('NoKyc.VerifyProfile')
	
	await spec.exists('ProfileDetails.screen')
}

function successKYCflow(spec){
	return async () => {	
		await kycSetup(spec)

		// switch to fill
		store.dispatch(actions.updateFormField('title', "mr" ));
		store.dispatch(actions.updateFormField('month', "01" ));
		store.dispatch(actions.updateFormField('day', "01" ));
		store.dispatch(actions.updateFormField('year', "1994" ));
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		store.dispatch(actions.updateFormField('gender', 'male' ));
		
		await spec.press('ProfileDetails.addYourAddress')
		await callToComplete(spec, API.UPDATE_USER_PERSONAL_INFO)
		await spec.exists('AddressInformation.screen')
				
		// switch to fill

		store.dispatch(actions.updateFormField('country', 'Serbia'))
		store.dispatch(actions.updateFormField('city','Novi Beograd'))
		store.dispatch(actions.updateFormField('zip','442'))
		store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

		await spec.press('AddressInformation.yourTaxpayerID')
		await callToComplete(spec, API.UPDATE_USER_PERSONAL_INFO)
		await spec.exists('TaxpayerID.home')

		store.dispatch(actions.updateFormField('national_id','110319415136'))

		await spec.press('TaxpayerID.verifyYourProfile')					
					
		await spec.exists('VerifyProfile.home')

		store.dispatch(actions.clearForm());

		//STATE NEEDS TO BE CLEARED FOR THIS TO WORK
		await spec.press('CameraInput.front')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.takePhoto')
		await spec.press('CameraScreen.usePhoto')
					
		await store.dispatch(actions.updateFormField('cellphone', `111+${ new Date().getTime()}`))
		await spec.press('VerifyProfile.verify')

		await spec.fillIn('VerifyPhoneNumber.sms', '1111')
		await spec.press('VerifyPhoneNumber.finish')

		await store.dispatch(actions.verifySMSSuccess());
	}
}

// Profile details screen
function prepopulateFirstAndLastName(spec) {
	return async () => {
		// await resetTests(spec);
		await resetKYC(spec);

		await spec.exists('NoKyc.screen')

		// do tests ...
	}
}

function noTitle(spec){
	return async () => {
		await resetKYC(spec);
		
		await spec.press('NoKyc.VerifyProfile')
		await callToComplete(API.GET_USER_PERSONAL_INFO)
		store.dispatch(actions.clearForm());

		store.dispatch(actions.updateFormField('firstName', "David" ));
		store.dispatch(actions.updateFormField('lastName', "David" ));
		store.dispatch(actions.updateFormField('month', "04" ));
		store.dispatch(actions.updateFormField('day', "04" ));
		store.dispatch(actions.updateFormField('year', "1994" ));
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		store.dispatch(actions.updateFormField('gender', 'male' ));
		
		await spec.press('ProfileDetails.addYourAddress')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.title');
    await containsText(text, `Title is required!`);
	}
}

function noFirstName(spec){
	return async () => {
		await resetKYC(spec);

		await spec.press('NoKyc.VerifyProfile')
		await callToComplete(API.GET_USER_PERSONAL_INFO)
		store.dispatch(actions.clearForm());

		store.dispatch(actions.updateFormField('title', "mr" ));
		await store.dispatch(actions.updateFormField('firstName', "" ));
		store.dispatch(actions.updateFormField('lastName', "David" ));
		store.dispatch(actions.updateFormField('month', "01" ));
		store.dispatch(actions.updateFormField('day', "01" ));
		store.dispatch(actions.updateFormField('year', "1994" ));
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		store.dispatch(actions.updateFormField('gender', 'male' ));

		await spec.press('ProfileDetails.addYourAddress')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.firstName');
		await containsText(text, `First Name is required!`);
	}
}

function noLastName(spec){
	return async () => {
		await resetKYC(spec);

		await spec.press('NoKyc.VerifyProfile')
		await callToComplete(API.GET_USER_PERSONAL_INFO)
		store.dispatch(actions.clearForm());
		
		store.dispatch(actions.updateFormField('title', "mr" ));		
		store.dispatch(actions.updateFormField('firstName', "David" ));
		store.dispatch(actions.updateFormField('lastName', "" ));
		store.dispatch(actions.updateFormField('month', "01" ));
		store.dispatch(actions.updateFormField('day', "01" ));
		store.dispatch(actions.updateFormField('year', "1994" ));
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		store.dispatch(actions.updateFormField('gender', 'male' ));
		
		await spec.press('ProfileDetails.addYourAddress')

		//check errors
		const text = await spec.findComponent('InputErrorWrapper.lastName');
		await containsText(text, `Last Name is required!`);
	}
}

function noDateOfBirth(spec){
	return async () => {
		await resetKYC(spec);

		await spec.press('NoKyc.VerifyProfile')
		await callToComplete(API.GET_USER_PERSONAL_INFO)
		store.dispatch(actions.clearForm());

		await spec.pause(2000)
		store.dispatch(actions.updateFormField('title', "mr" ));
		store.dispatch(actions.updateFormField('firstName', "David" ));
		store.dispatch(actions.updateFormField('lastName', "David" ));
		await store.dispatch(actions.updateFormField('month', "" ));
		await store.dispatch(actions.updateFormField('day', "" ));
		await store.dispatch(actions.updateFormField('year', "" ));
		store.dispatch(actions.updateFormField('citizenship',"Serbia"));
		store.dispatch(actions.updateFormField('gender', "male" ));

		await spec.press('ProfileDetails.addYourAddress')

		//check errors
		// const text = await spec.findComponent('InputErrorWrapper.year');
		// await containsText(text, `Date of Birth is required!`);
		
	}
}


function underAge(spec){
	return async () => {
		await resetKYC(spec);

		await spec.press('NoKyc.VerifyProfile')

		store.dispatch(actions.updateFormField('title', "mr" ));
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		store.dispatch(actions.updateFormField('month', "01" ));
		store.dispatch(actions.updateFormField('day', "01" ));
		store.dispatch(actions.updateFormField('year', "2004" ));
		store.dispatch(actions.updateFormField('gender', 'male' ));
		
		await spec.press('ProfileDetails.addYourAddress')
		
		//check errors
		// const text = await spec.findComponent('ProfileDetails.title');
		// await containsText(text, `Title is required!`);
	}
}

function noCitizenship(spec){
	return async () => {
		await resetKYC(spec);

		await spec.press('NoKyc.VerifyProfile')
		await callToComplete(API.GET_USER_PERSONAL_INFO)
		await store.dispatch(actions.clearForm());
		
		store.dispatch(actions.updateFormField('title', "mr" ));
		store.dispatch(actions.updateFormField('firstName', "David" ));
		store.dispatch(actions.updateFormField('lastName', "David" ));
		store.dispatch(actions.updateFormField('month', "01" ));
		store.dispatch(actions.updateFormField('day', "01" ));
		store.dispatch(actions.updateFormField('year', "1994" ));
		store.dispatch(actions.updateFormField('gender', 'male' ));
	
		await spec.press('ProfileDetails.addYourAddress')
		
		//check errors
		const text = await spec.findComponent('InputErrorWrapper.citizenship');
		await containsText(text, 'Citizenship is required!');
	}
}

function noGender(spec){
	return async () => {
		await resetKYC(spec);

		await spec.press('NoKyc.VerifyProfile')
		await callToComplete(API.GET_USER_PERSONAL_INFO)
		store.dispatch(actions.clearForm());
		
		store.dispatch(actions.updateFormField('title', "mr" ));
		store.dispatch(actions.updateFormField('firstName', "David" ));
		store.dispatch(actions.updateFormField('lastName', "David" ));
		store.dispatch(actions.updateFormField('month', "01" ));
		store.dispatch(actions.updateFormField('day', "01" ));
		store.dispatch(actions.updateFormField('year', "1994" ));
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
	
		await spec.press('ProfileDetails.addYourAddress')
		
		//check errors
		const text = await spec.findComponent('InputErrorWrapper.gender');
		await containsText(text, `Gender is required!`);
	}
}

function profileDetailsFinish(spec){
	return async () => {
		await resetKYC(spec);

		await spec.press('NoKyc.VerifyProfile')

		store.dispatch(actions.updateFormField('title', "mr" ));
		store.dispatch(actions.updateFormField('month', "01" ));
		store.dispatch(actions.updateFormField('day', "01" ));
		store.dispatch(actions.updateFormField('year', "1994" ));
		store.dispatch(actions.updateFormField('citizenship','Serbia'));
		store.dispatch(actions.updateFormField('gender', 'male' ));
	
		await spec.press('ProfileDetails.addYourAddress')
		await spec.exists('AddressInformation.home')
	}
}

    // Address information screen

		function prepopulateCountry(spec){
			return async () => {
				await resetKYC(spec);
				
				dispatch(actions.navigateTo('AddressInformation'))
	
				
			}
		}

		function stateFieldExistsIfUSA(spec){
			return async () => {
				await resetKYC(spec);

				store.dispatch(actions.navigateTo('AddressInformation'))
				store.dispatch(actions.updateFormField('country', 'United States'))
				await spec.exists('AddressInformation.state')
				
			}
		}
		
		function errWhenNoCity(spec){
			return async () => {
				await resetKYC(spec);

				await store.dispatch(actions.navigateTo('AddressInformation'))
				await callToComplete(API.GET_USER_PERSONAL_INFO)
				await store.dispatch(actions.clearForm());

				store.dispatch(actions.updateFormField('country', 'Serbia'))
				store.dispatch(actions.updateFormField('zip','442'))
				await store.dispatch(actions.updateFormField('city',''))
				store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

				await spec.press('AddressInformation.yourTaxpayerID')

				//check errors
				const text = await spec.findComponent('InputErrorWrapper.city');
				await containsText(text, `City is required!`);
			}
		}	

		function errWhenNoZIP(spec){
			return async () => {
				await resetKYC(spec);

				await store.dispatch(actions.navigateTo('AddressInformation'))
				await callToComplete(API.GET_USER_PERSONAL_INFO)
				await store.dispatch(actions.clearForm());

				store.dispatch(actions.updateFormField('country', 'Serbia'))
				store.dispatch(actions.updateFormField('city','Novi Beograd'))
				store.dispatch(actions.updateFormField('zip',''))
				store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

				await spec.press('AddressInformation.yourTaxpayerID')


				//check errors
				const text = await spec.findComponent('InputErrorWrapper.zip');
				await containsText(text, `Zip / Postal code is required!`);
			}
		}	

		function errWhenNoStreet(spec){
			return async () => {
				await resetKYC(spec);

				await store.dispatch(actions.navigateTo('AddressInformation'))
				await callToComplete(API.GET_USER_PERSONAL_INFO)
				await store.dispatch(actions.clearForm());

				store.dispatch(actions.updateFormField('country', 'Serbia'))
				store.dispatch(actions.updateFormField('zip','442'))
				store.dispatch(actions.updateFormField('street',''))
				store.dispatch(actions.updateFormField('city','Novi Beograd'))

				await spec.press('AddressInformation.yourTaxpayerID')
				
				//check errors
				const text = await spec.findComponent('InputErrorWrapper.street');
				await containsText(text, `Street is required!`);
			}
		}	

		function addressInfoValid(spec){
			return async () => {
				await resetKYC(spec);

				store.dispatch(actions.navigateTo('AddressInformation'))
				await callToComplete(API.GET_USER_PERSONAL_INFO)

				store.dispatch(actions.updateFormField('country', 'Serbia'))
				store.dispatch(actions.updateFormField('city','Novi Beograd'))
				store.dispatch(actions.updateFormField('zip','442'))
				store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

				await spec.press('AddressInformation.yourTaxpayerID')
				
				await spec.exists('TaxpayerID.home')
			}
		}	

		// Taxpayer ID Screen

		function TaxpayerIDNoSSN(spec){
			return async () => {
				await resetKYC(spec);
				store.dispatch(actions.navigateTo('AddressInformation'))

				store.dispatch(actions.updateFormField('country', 'United States'))
				store.dispatch(actions.updateFormField('city','Novi Beograd'))
				store.dispatch(actions.updateFormField('zip','442'))
				store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

				await spec.press('AddressInformation.yourTaxpayerID')
			
				await spec.exists('TaxpayerID.home')
				await spec.press('TaxpayerID.verifyYourProfile')	

				//check errors
				const text = await spec.findComponent('InputErrorWrapper.ssn');
				await containsText(text, `ssn is required!`);
				
			}
		}	

		function TaxpayerIDInvalidSSN(spec){
			return async () => {
				await resetKYC(spec);
				store.dispatch(actions.navigateTo('AddressInformation'))

				store.dispatch(actions.updateFormField('country', 'United States'))
				store.dispatch(actions.updateFormField('city','Novi Beograd'))
				store.dispatch(actions.updateFormField('zip','442'))
				store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

				await spec.press('AddressInformation.yourTaxpayerID')
			
				store.dispatch(actions.updateFormField('ssn','110319415136'))

				await spec.press('TaxpayerID.verifyYourProfile')					
			
				const text = await spec.findComponent('InputErrorWrapper.ssn');
				await containsText(text, `ssn is not valid!`);

			}
		}	

		function TaxpayerIDValidSSN(spec){
			return async () => {
				await resetKYC(spec);
				store.dispatch(actions.navigateTo('AddressInformation'))

				store.dispatch(actions.updateFormField('country', 'United States'))
				store.dispatch(actions.updateFormField('city','Novi Beograd'))
				store.dispatch(actions.updateFormField('zip','442'))
				store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

				await spec.press('AddressInformation.yourTaxpayerID')
			
				store.dispatch(actions.updateFormField('ssn','110-31-9415'))

				await spec.press('TaxpayerID.verifyYourProfile')					
				
				await spec.exists('VerifyProfile.home')
			}
		}	

		function TaxpayerIDSuccess(spec){
			return async () => {
				await resetKYC(spec);
				store.dispatch(actions.navigateTo('AddressInformation'))

				store.dispatch(actions.updateFormField('country', 'Serbia'))
				store.dispatch(actions.updateFormField('city','Novi Beograd'))
				store.dispatch(actions.updateFormField('zip','442'))
				store.dispatch(actions.updateFormField('street','Ulica Filipa Jovakarica'))

				await spec.press('AddressInformation.yourTaxpayerID')

				store.dispatch(actions.updateFormField('national_id','110319415136'))

				await spec.press('TaxpayerID.verifyYourProfile')					
				
				await spec.exists('VerifyProfile.home')

			}
		}	

		// Verify profile page
		
		function takePassportPicture(spec){
			return async () => {
				await resetKYC(spec);

				store.dispatch(actions.clearForm());
				store.dispatch(actions.navigateTo('VerifyProfile'))

				//STATE NEEDS TO BE CLEARED FOR THIS TO WORK
				await spec.press('CameraInput.front')
    		// await spec.press('CameraScreen.takePhoto')
				await spec.press('CameraScreen.usePhoto')
				
				await store.dispatch(actions.updateFormField('cellphone', `111+${ new Date().getTime() }`))
				await spec.press('VerifyProfile.verify')


  			await spec.fillIn('VerifyPhoneNumber.sms', '1111')
				await spec.press('VerifyPhoneNumber.finish')

				await store.dispatch(actions.verifySMSSuccess());
			}
		}

		function takeFrontAndBackofDrivingLicence(spec){
			return async () => {
				await resetKYC(spec);

				store.dispatch(actions.navigateTo('VerifyProfile'))

				//STATE NEEDS TO BE CLEARED FOR THIS TO WORK
				await spec.press('VerifyProfile.driving_licence')

				await spec.press('CameraInput.front')
				// await spec.press('CameraScreen.takePhoto')
				await spec.press('CameraScreen.usePhoto')

				await spec.press('CameraInput.back')
				await spec.press('CameraScreen.takePhoto')
				await spec.press('CameraScreen.takePhoto')
				await spec.press('CameraScreen.usePhoto')

			}
		}

		function takeFrontAndBackofIdentityCard(spec){
			return async () => {
				await resetKYC(spec);

				store.dispatch(actions.navigateTo('VerifyProfile'))

				//STATE NEEDS TO BE CLEARED FOR THIS TO WORK
				await spec.press('VerifyProfile.identity_card')

				await spec.press('CameraInput.front')
				// await spec.press('CameraScreen.takePhoto')
				await spec.press('CameraScreen.usePhoto')

				await spec.press('CameraInput.back')
				await spec.press('CameraScreen.takePhoto')
				await spec.press('CameraScreen.takePhoto')
				await spec.press('CameraScreen.usePhoto')

			}
		}