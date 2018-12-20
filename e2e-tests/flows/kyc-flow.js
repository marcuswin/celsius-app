import store from '../../app/redux/store';
import * as actions from '../../app/redux/actions';
import { resetTests, containsText, resetNonKycUser, callToComplete, waitForExists } from "../helpers";
import API from "../../app/config/constants/API";


const { dispatch } = store;

export default {
  // Successful Flow
  successKYCflow,

  // NoKYC screen
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
  taxpayerIDUSNoSSN,
  taxpayerIDUSInvalidSSN,
  taxpayerIDUSValidSSN,
  taxpayerIDSuccess,

  // Verify documents screen
  showErrorNoPhoneNumber,
  showErrorNoFrontPhoto,
  showErrorNoBackPhoto,
  takePassportPicture,
  takeFrontAndBackOfDrivingLicence,
  takeFrontAndBackofIdentityCard,

  // VerifyPhoneNumber screen
  wrongSMSCode,
}

async function resetKYC(spec) {
  await resetNonKycUser(spec);
  await resetTests(spec);
  await dispatch(actions.loginBorrower({
    email: 'testing+non_kyc_user@mvpworkshop.co',
    password: 'Cel51u5!?',
  }))
  await waitForExists(spec, 'NoKyc.screen')
  await spec.press('NoKyc.VerifyProfile')
  await waitForExists(spec, 'ProfileDetails.screen')
}

// Successful flow
function successKYCflow(spec) {
  return async () => {
    await resetKYC(spec)

    // ProfileDetails screen
    fillAllProfileDetailsFields()
    await spec.press('ProfileDetails.addYourAddress')
    await waitForExists(spec, 'AddressInformation.screen')

    // AddressInformation screen
    fillAllAddressInformationFields()
    await spec.press('AddressInformation.yourTaxpayerID')
    await waitForExists(spec, 'TaxpayerID.screen')

    // TaxPayerID screen
    store.dispatch(actions.updateFormField('national_id', '110319415136'))
    await spec.press('TaxpayerID.verifyYourProfile')
    await waitForExists(spec, 'VerifyProfile.screen')

    // VerifyProfile screen
    store.dispatch(actions.updateFormField('documentType', 'passport'))
    await spec.press('CameraInput.front')
    await waitForExists(spec, 'Camera.screen')
    await takePhoto(spec)
    await store.dispatch(actions.updateFormField('cellphone', `111${new Date().getTime()}`))
    await spec.press('VerifyProfile.verify')
    await waitForExists(spec, 'VerifyPhoneNumber.screen')

    // VerifyPhoneNumber screen
    await spec.fillIn('VerifyPhoneNumber.sms', '1111')
    await spec.press('VerifyPhoneNumber.finish')
    await waitForExists(spec, 'NoKycPending.screen')
  }
}

// NoKYC screen
function startKyc(spec) {
  return async () => {
    await resetKYC(spec);
    await spec.press('NoKyc.VerifyProfile')
    await waitForExists(spec, 'ProfileDetails.screen')
  }
}

// ProfileDetails screen
async function profileDetailsSetup(spec) {
  await resetKYC(spec)
  dispatch(actions.navigateTo('ProfileDetails'))
  await waitForExists(spec, 'ProfileDetails.screen')
}

function fillAllProfileDetailsFields() {
  store.dispatch(actions.updateFormField('title', 'mr'));
  store.dispatch(actions.updateFormField('month', '04'));
  store.dispatch(actions.updateFormField('day', '04'));
  store.dispatch(actions.updateFormField('year', '1994'));
  store.dispatch(actions.updateFormField('citizenship', 'Serbia'));
  store.dispatch(actions.updateFormField('gender', 'male'));
}

function prepopulateFirstAndLastName(spec) {
  return async () => {
    await resetNonKycUser(spec);
    await resetTests(spec);
    await dispatch(actions.loginBorrower({
      email: 'testing+non_kyc_user@mvpworkshop.co',
      password: 'Cel51u5!?',
    }))

    store.dispatch(actions.updateFormField('first_name', 'Stefan'));
    store.dispatch(actions.updateFormField('last_name', 'Burscher'));

    await waitForExists(spec, 'NoKyc.screen')
    await spec.press('NoKyc.VerifyProfile')
    await waitForExists(spec, 'ProfileDetails.screen')
    await spec.press('ProfileDetails.addYourAddress')

    await spec.notExists('InputErrorWrapper.firstName')
    await spec.notExists('InputErrorWrapper.lastName')
  }
}

function noTitle(spec) {
  return async () => {
    await profileDetailsSetup(spec);

    fillAllProfileDetailsFields();
    store.dispatch(actions.updateFormField('title', ''));
    await spec.press('ProfileDetails.addYourAddress')

    const text = await spec.findComponent('InputErrorWrapper.title');
    await containsText(text, `Title is required!`);
  }
}

function noFirstName(spec) {
  return async () => {
    await profileDetailsSetup(spec);

    fillAllProfileDetailsFields();
    store.dispatch(actions.updateFormField('firstName', ''));
    await spec.press('ProfileDetails.addYourAddress')

    const text = await spec.findComponent('InputErrorWrapper.firstName');
    await containsText(text, `First Name is required!`);
  }
}

function noLastName(spec) {
  return async () => {
    await profileDetailsSetup(spec);

    fillAllProfileDetailsFields();
    store.dispatch(actions.updateFormField('lastName', ''));
    await spec.press('ProfileDetails.addYourAddress')

    const text = await spec.findComponent('InputErrorWrapper.lastName');
    await containsText(text, `Last Name is required!`);
  }
}

function noDateOfBirth(spec) {
  return async () => {
    await profileDetailsSetup(spec);

    fillAllProfileDetailsFields();
    store.dispatch(actions.updateFormField('date_of_birth', ''));
    store.dispatch(actions.updateFormField('month', ''));
    store.dispatch(actions.updateFormField('day', ''));
    store.dispatch(actions.updateFormField('year', ''));
    await spec.press('ProfileDetails.addYourAddress')

    //check errors
    const text = await spec.findComponent('InputErrorWrapper.dateOfBirth');
    await containsText(text, `Date of Birth is required!`);
  }
}


function underAge(spec) {
  return async () => {
    await profileDetailsSetup(spec);

    fillAllProfileDetailsFields();
    store.dispatch(actions.updateFormField('date_of_birth', '2004-01-01'));
    store.dispatch(actions.updateFormField('month', '01'));
    store.dispatch(actions.updateFormField('day', '01'));
    store.dispatch(actions.updateFormField('year', '2004'));
    await spec.press('ProfileDetails.addYourAddress')

    //check errors
    const text = await spec.findComponent('InputErrorWrapper.dateOfBirth');
    await containsText(text, `You must be at least 18 years old to use Celsius application.`);
  }
}

function noCitizenship(spec) {
  return async () => {
    await profileDetailsSetup(spec);

    fillAllProfileDetailsFields();
    store.dispatch(actions.updateFormField('citizenship', ''));
    await spec.press('ProfileDetails.addYourAddress')

    const text = await spec.findComponent('InputErrorWrapper.citizenship');
    await containsText(text, 'Citizenship is required!');
  }
}

function noGender(spec) {
  return async () => {
    await profileDetailsSetup(spec);

    fillAllProfileDetailsFields();
    store.dispatch(actions.updateFormField('gender', ''));
    await spec.press('ProfileDetails.addYourAddress')

    const text = await spec.findComponent('InputErrorWrapper.gender');
    await containsText(text, `Gender is required!`);
  }
}

function profileDetailsFinish(spec) {
  return async () => {
    await profileDetailsSetup(spec);

    fillAllProfileDetailsFields();
    store.dispatch(actions.updateFormField('citizenship', '01'));
    await spec.press('ProfileDetails.addYourAddress')

    await waitForExists(spec, 'AddressInformation.screen')
  }
}

// Address information screen
async function setupAddressInfo(spec) {
  await resetKYC(spec);
  dispatch(actions.navigateTo('AddressInformation'))
  await waitForExists(spec, 'AddressInformation.screen')
}

function fillAllAddressInformationFields() {
  store.dispatch(actions.updateFormField('country', 'Serbia'))
  store.dispatch(actions.updateFormField('zip', '442'))
  store.dispatch(actions.updateFormField('city', 'Belgrade'))
  store.dispatch(actions.updateFormField('street', 'Ulica Filipa Jovakarica'))
}


function prepopulateCountry(spec) {
  return async () => {
    await resetKYC(spec);
    await store.dispatch(actions.updateFormField('country', 'Argentina'))
    await dispatch(actions.navigateTo('AddressInformation'))
    await waitForExists(spec, 'AddressInformation.screen')
    await spec.press('AddressInformation.yourTaxpayerID')

    await spec.notExists('InputErrorWrapper.country')
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

    fillAllAddressInformationFields();
    store.dispatch(actions.updateFormField('city', ''))
    await spec.press('AddressInformation.yourTaxpayerID')

    const text = await spec.findComponent('InputErrorWrapper.city');
    await containsText(text, `City is required!`);
  }
}

function errWhenNoZIP(spec) {
  return async () => {
    await setupAddressInfo(spec);

    fillAllAddressInformationFields()
    store.dispatch(actions.updateFormField('zip', ''))
    await spec.press('AddressInformation.yourTaxpayerID')

    const text = await spec.findComponent('InputErrorWrapper.zip');
    await containsText(text, `Zip / Postal code is required!`);
  }
}

function errWhenNoStreet(spec) {
  return async () => {
    await setupAddressInfo(spec);

    fillAllAddressInformationFields()
    store.dispatch(actions.updateFormField('street', ''))
    await spec.press('AddressInformation.yourTaxpayerID')

    const text = await spec.findComponent('InputErrorWrapper.street');
    await containsText(text, `Street is required!`);
  }
}

function addressInfoValid(spec) {
  return async () => {
    await setupAddressInfo(spec);

    fillAllAddressInformationFields()
    await spec.press('AddressInformation.yourTaxpayerID')
    await waitForExists(spec, 'TaxpayerID.screen')
  }
}

// TaxpayerID screen
async function setupTaxPayer(spec) {
  await resetKYC(spec);
  dispatch(actions.navigateTo('TaxpayerID'))
  await waitForExists(spec, 'TaxpayerID.screen')
}

function taxpayerIDUSNoSSN(spec) {
  return async () => {
    await setupTaxPayer(spec);

    await store.dispatch(actions.updateFormField('country', 'United States'))
    await spec.press('TaxpayerID.verifyYourProfile')

    const text = await spec.findComponent('InputErrorWrapper.ssn');
    await containsText(text, `ssn is required!`);
  }
}

function taxpayerIDUSInvalidSSN(spec) {
  return async () => {
    await setupTaxPayer(spec);

    await store.dispatch(actions.updateFormField('country', 'United States'))
    await store.dispatch(actions.updateFormField('ssn', '110319415136'))
    await spec.press('TaxpayerID.verifyYourProfile')

    const text = await spec.findComponent('InputErrorWrapper.ssn');
    await containsText(text, `ssn is not valid!`);

  }
}

function taxpayerIDUSValidSSN(spec) {
  return async () => {
    await setupTaxPayer(spec);

    await store.dispatch(actions.updateFormField('country', 'United States'))
    await store.dispatch(actions.updateFormField('ssn', '110-31-9415'))
    await spec.press('TaxpayerID.verifyYourProfile')

    await waitForExists(spec, 'VerifyProfile.screen')
  }
}

function taxpayerIDSuccess(spec) {
  return async () => {
    await setupTaxPayer(spec);

    await store.dispatch(actions.updateFormField('country', 'Serbia'))
    await store.dispatch(actions.updateFormField('national_id', '110319415136'))
    await spec.press('TaxpayerID.verifyYourProfile')

    await waitForExists(spec, 'VerifyProfile.screen')
  }
}

// VerifyProfile screen
async function setupVerifyProfile(spec) {
  await resetKYC(spec)
  dispatch(actions.navigateTo('VerifyProfile'))
  await store.dispatch(actions.updateFormField('documentType', 'passport'))
  await waitForExists(spec, 'VerifyProfile.screen')
}

async function takePhoto(spec) {
  await waitForExists(spec, 'Camera.screen')
  await callToComplete(spec, API.GET_CAMERA_ROLL)
  await spec.press('CameraScreen.takePhoto')
  try {
    await spec.pause(1000)
    await spec.exists('Camera.confirmScreen')
  } catch (err) {
    await spec.press('CameraScreen.takePhoto')
  }
  await waitForExists(spec, 'Camera.confirmScreen')
  await spec.press('CameraScreen.usePhoto')
}

function showErrorNoPhoneNumber(spec) {
  return async () => {
    await setupVerifyProfile(spec);
    await spec.press('VerifyProfile.verify')

    const text = await spec.findComponent('InputErrorWrapper.cellphone');
    await containsText(text, `Cell phone is required!`);
  }
}

function showErrorNoFrontPhoto(spec) {
  return async () => {
    await setupVerifyProfile(spec);
    await spec.press('VerifyProfile.verify')

    const text = await spec.findComponent('InputErrorWrapper.front');
    await containsText(text, `Front side photo is required!`);
  }
}

function showErrorNoBackPhoto(spec) {
  return async () => {
    await profileDetailsSetup(spec);

    fillAllProfileDetailsFields();
    await spec.press('ProfileDetails.addYourAddress')

    await waitForExists(spec, 'AddressInformation.screen')
    dispatch(actions.navigateTo('VerifyProfile'))
    await waitForExists(spec, 'VerifyProfile.screen')
    await waitForExists(spec, 'VerifyProfile.identity_card')
    await spec.press('VerifyProfile.identity_card')
    await spec.press('VerifyProfile.verify')

    const text = await spec.findComponent('InputErrorWrapper.back');
    await containsText(text, `Back side photo is required!`);
  }
}

function takePassportPicture(spec) {
  return async () => {
    await setupVerifyProfile(spec);

    await spec.press('CameraInput.front')
    await takePhoto(spec)
    await waitForExists(spec, 'VerifyProfile.screen')

    await store.dispatch(actions.updateFormField('cellphone', `111${new Date().getTime()}`))

    await waitForExists(spec, 'VerifyProfile.verify')
    await spec.press('VerifyProfile.verify')
    await waitForExists(spec, 'VerifyPhoneNumber.screen')
  }
}

function takeFrontAndBackOfDrivingLicence(spec) {
  return async () => {
    await profileDetailsSetup(spec);

    fillAllProfileDetailsFields();
    await spec.press('ProfileDetails.addYourAddress')

    await waitForExists(spec, 'AddressInformation.screen')
    dispatch(actions.navigateTo('VerifyProfile'))
    await waitForExists(spec, 'VerifyProfile.screen')
    await waitForExists(spec, 'VerifyProfile.driving_licence')
    await spec.press('VerifyProfile.driving_licence')

    await spec.press('CameraInput.front')
    await takePhoto(spec)
    await waitForExists(spec, 'VerifyProfile.screen')

    await spec.press('CameraInput.back')
    await takePhoto(spec)
    await waitForExists(spec, 'VerifyProfile.screen')

    await store.dispatch(actions.updateFormField('cellphone', `111${new Date().getTime()}`))

    await spec.press('VerifyProfile.verify')
    await waitForExists(spec, 'VerifyPhoneNumber.screen')
  }
}

function takeFrontAndBackofIdentityCard(spec) {
  return async () => {
    await profileDetailsSetup(spec);

    fillAllProfileDetailsFields();
    await spec.press('ProfileDetails.addYourAddress')

    await waitForExists(spec, 'AddressInformation.screen')
    dispatch(actions.navigateTo('VerifyProfile'))
    await waitForExists(spec, 'VerifyProfile.screen')
    await waitForExists(spec, 'VerifyProfile.identity_card')
    await spec.press('VerifyProfile.identity_card')

    await spec.press('CameraInput.front')
    await takePhoto(spec)
    await waitForExists(spec, 'VerifyProfile.screen')

    await spec.press('CameraInput.back')
    await takePhoto(spec)
    await waitForExists(spec, 'VerifyProfile.screen')

    await store.dispatch(actions.updateFormField('cellphone', `111${new Date().getTime()}`))

    await spec.press('VerifyProfile.verify')
    await waitForExists(spec, 'VerifyPhoneNumber.screen')
  }
}

// VerifyPhoneNumber screen
async function setupVerifyPhoneNumber(spec) {
  await resetKYC(spec)
  dispatch(actions.navigateTo('VerifyPhoneNumber'))
  await waitForExists(spec, 'VerifyPhoneNumber.screen')
}

function wrongSMSCode(spec) {
  return async () => {
    await resetKYC(spec)

    // ProfileDetails screen
    fillAllProfileDetailsFields()
    await spec.press('ProfileDetails.addYourAddress')
    await waitForExists(spec, 'AddressInformation.screen')

    // AddressInformation screen
    fillAllAddressInformationFields()
    await spec.press('AddressInformation.yourTaxpayerID')
    await waitForExists(spec, 'TaxpayerID.screen')

    // TaxPayerID screen
    store.dispatch(actions.updateFormField('national_id', '110319415136'))
    await spec.press('TaxpayerID.verifyYourProfile')
    await waitForExists(spec, 'VerifyProfile.screen')

    // VerifyProfile screen
    store.dispatch(actions.updateFormField('documentType', 'passport'))
    await spec.press('CameraInput.front')
    await waitForExists(spec, 'Camera.screen')
    await takePhoto(spec)
    await store.dispatch(actions.updateFormField('cellphone', `111${new Date().getTime()}`))
    await spec.press('VerifyProfile.verify')
    await waitForExists(spec, 'VerifyPhoneNumber.screen')

    // VerifyPhoneNumber screen
    await spec.fillIn('VerifyPhoneNumber.sms', '1234')
    await spec.press('VerifyPhoneNumber.finish')

    // await spec.notExists('NoKycPending.screen') // Zbog staging-a svaki sms code prolazi!
  }
}