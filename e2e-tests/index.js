import signupFlow from './flows/signup-flow';
import helpers from './helpers';
import loginFlow from "./flows/login-flow";
import kycFlow from "./flows/kyc-flow";

export default function(spec) {
  testSignupFlow(spec);
  testLoginFlow(spec);
  testKycFlow(spec);
  // testSingleSuite(spec);
}

export function testSignupFlow(spec) {
  spec.describe('Signup Flow', () => {

    // Successful flow
    spec.it('should go to NoKYC screen when flow is successful', signupFlow.successfulFlow(spec))

    // Welcome screen tests
    spec.it('should go to SignupOne screen when button is pressed', signupFlow.pressSkipIntro(spec))

    // SignupOne screen tests
    spec.it('button should be disabled when no email and password entered', signupFlow.disableWhenNoData(spec))
    spec.it('button should be disabled when no email entered', signupFlow.disableWhenNoEmail(spec))
    spec.it('button should be disabled when no password entered', signupFlow.disableWhenNoPassword(spec))
    spec.it('button should be disabled when no repeat password entered', signupFlow.disabledWhenNoRepeatPassword(spec))
    spec.it('should show error when invalid email entered', signupFlow.errorWhenEmailInvalid(spec))
    spec.it('should show error when when weak password', signupFlow.errorWhenPasswordWeak(spec))
    spec.it('should show error when user exists', signupFlow.errorWhenUserExists(spec))
    spec.it('should show error when repeat password not same as password', signupFlow.errorWPasswordsDifferent(spec))
    spec.it('should go to SignupTwo screen when all info is valid', signupFlow.stepOneSuccess(spec))

    // SignupTwo screen tests
    spec.it('button should be disabled when no first and last name entered', signupFlow.disableWhenNoNames(spec))
    spec.it('button should be disabled when no first name entered', signupFlow.disableWhenNoLastName(spec))
    spec.it('button should be disabled when no last name entered', signupFlow.disableWhenNoFirstName(spec))
    spec.it('button should be disabled when terms not agreed to', signupFlow.disabledWhenNoCheckbox(spec))
    spec.it('should go to EnterPasscode screen when all info is valid', signupFlow.stepTwoSuccess(spec))

    // CreatePasscode screen tests
    spec.it('should disable button click when 3 digits are entered', signupFlow.disableCreatePasscode(spec))
    spec.it('should go to RepeatPasscode screen when 4 digits are entered', signupFlow.createPasscode(spec))

    // RepeatPasscode screen tests
    spec.it('should show error when different pin is entered', signupFlow.disableWrongPasscode(spec))
    spec.it('should go to NoKYC screen when repeated pin is valid', signupFlow.finishPasscode(spec))
  })
}

export function testLoginFlow(spec) {
  spec.describe('Login Flow', () => {

    // Successful flow
    spec.it('should go to NoKYC screen when flow is successful', loginFlow.successfulFlow(spec))

    // Welcome screen
    spec.it('should go to Login screen when skip intro and login pressed', loginFlow.initFlow(spec))

    // Login screen
    spec.it('should go to Login screen when forgot password pressed', loginFlow.forgottenPassword(spec))
    spec.it('button should be disabled when no email and password entered', loginFlow.disableWhenNoLoginData(spec))
    spec.it('button should be disabled when no email entered', loginFlow.disableWhenNoEmail(spec))
    spec.it('button should be disabled when no password entered', loginFlow.disableWhenNoPassword(spec))
    spec.it('should show error when wrong credentials', loginFlow.errWhenWrongCredentials(spec))
    spec.it('should show error when user doesn\'t exist', loginFlow.errUserDoesNotExists(spec))
    spec.it('should go to NoKYC screen when all info is valid', loginFlow.loginSuccess(spec))

    // LoginPasscode Screen
    spec.it('check how this works', helpers.testFailed(spec))
    // TODO: 2FA

    // ForgottenPassword screen
    spec.it('should show error message when not existing email is entered', loginFlow.forgottenPasswordErrWrongEmail(spec))
    spec.it('should show error message when wrong email format is entered', loginFlow.forgottenPasswordErrWrongEmailFormat(spec))
    spec.it('should show info message when existing email is entered', loginFlow.forgottenPasswordSuccessMsg(spec))
  })
}

export function testSingleSuite(spec) {
  spec.describe('Single test', () => {
    spec.it('should got to NoKyc with pending screen when flow is successful', kycFlow.successKYCflow(spec))
  })
}

export function testKycFlow(spec) {
  spec.describe('KYC Flow', () => {

    // Successful flow
    spec.it('should got to NoKyc with pending screen when flow is successful', kycFlow.successKYCflow(spec))

    // NoKYC screen
    spec.it('should go to Profile details screen when verify profile is pressed', kycFlow.startKyc(spec))

    // Profile details screen
    spec.it('should prepopulate first name and last name', kycFlow.prepopulateFirstAndLastName(spec))
    spec.it('should show error when no title', kycFlow.noTitle(spec))
    spec.it('should show error when no first name', kycFlow.noFirstName(spec))
    spec.it('should show error when no last name', kycFlow.noLastName(spec))
    spec.it('should show error when no date of birth', kycFlow.noDateOfBirth(spec))
    spec.it('should show error when age is under 18', kycFlow.underAge(spec))
    spec.it('should show error when no citizenship', kycFlow.noCitizenship(spec))
    spec.it('should show error when no gender', kycFlow.noGender(spec))
    spec.it('should go to Address Information when all info filled', kycFlow.profileDetailsFinish(spec))

    // // Address information screen
    spec.it('should prepopulate country', kycFlow.prepopulateCountry(spec))
    spec.it('should show state if country is USA', kycFlow.stateFieldExistsIfUSA(spec))
    spec.it('should show error when no City', kycFlow.errWhenNoCity(spec))
    spec.it('should show error when no ZIP/Postal code', kycFlow.errWhenNoZIP(spec))
    spec.it('should show error when no street', kycFlow.errWhenNoStreet(spec))
    spec.it('should go to taxpayer ID screen when all info filled', kycFlow.addressInfoValid(spec))

    // // Taxpayer ID Screen
    spec.it('should throw error when no SSN input', kycFlow.TaxpayerIDNoSSN(spec))
    spec.it('should throw error when SSN input is invalid', kycFlow.TaxpayerIDInvalidSSN(spec))
    spec.it('should go to Verify profile when SSN is valid', kycFlow.TaxpayerIDValidSSN(spec))
    spec.it('should go to Verify profile when info filled in correctly', kycFlow.TaxpayerIDSuccess(spec))

    // // Verify Documents Screen
    spec.it('should take front picture of passport and finish KYC', kycFlow.takePassportPicture(spec))
    spec.it('should take picture of driving licence', kycFlow.takeFrontAndBackofDrivingLicence(spec))
    spec.it('should take  picture of identity card', kycFlow.takeFrontAndBackofIdentityCard(spec))
  })
}
