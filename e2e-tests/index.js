import signupFlow from './flows/signup-flow';
import loginFlow from "./flows/login-flow";
import kycFlow from "./flows/kyc-flow";
import withdrawFlow from './flows/withdraw-flow'
import { errorCatchWrapper } from './helpers';

export default function (spec) {
  testSignupFlow(spec);
  testLoginFlow(spec);
  testKycFlow(spec);
  // testWithdrawFlow(spec);
  // testSingleSuite(spec);
}

export function testSignupFlow(spec) {
  spec.describe('Signup Flow', () => {

    // Successful flow
    spec.it('should go to NoKYC screen when flow is successful', errorCatchWrapper(signupFlow.successfulFlow(spec)))

    // Welcome screen tests
    spec.it('should go to SignupOne screen when button is pressed', errorCatchWrapper(signupFlow.pressSkipIntro(spec)))

    // SignupOne screen tests
    spec.it('button should be disabled when no email and password entered', errorCatchWrapper(signupFlow.disableWhenNoData(spec)))
    spec.it('button should be disabled when no email entered', errorCatchWrapper(signupFlow.disableWhenNoEmail(spec)))
    spec.it('button should be disabled when no password entered', errorCatchWrapper(signupFlow.disableWhenNoPassword(spec)))
    spec.it('button should be disabled when no repeat password entered', errorCatchWrapper(signupFlow.disabledWhenNoRepeatPassword(spec)))
    spec.it('should show error when invalid email entered', errorCatchWrapper(signupFlow.errorWhenEmailInvalid(spec)))
    spec.it('should show error when when weak password', errorCatchWrapper(signupFlow.errorWhenPasswordWeak(spec)))
    spec.it('should show error when user exists', errorCatchWrapper(signupFlow.errorWhenUserExists(spec)))
    spec.it('should show error when repeat password not same as password', errorCatchWrapper(signupFlow.errorWPasswordsDifferent(spec)))
    spec.it('should go to SignupTwo screen when all info is valid', errorCatchWrapper(signupFlow.stepOneSuccess(spec)))

    // SignupTwo screen tests
    spec.it('button should be disabled when no first and last name entered', errorCatchWrapper(signupFlow.disableWhenNoNames(spec)))
    spec.it('button should be disabled when no first name entered', errorCatchWrapper(signupFlow.disableWhenNoFirstName(spec)))
    spec.it('button should be disabled when no last name entered', errorCatchWrapper(signupFlow.disableWhenNoLastName(spec)))
    spec.it('button should be disabled when terms not agreed to', errorCatchWrapper(signupFlow.disabledWhenNoCheckbox(spec)))
    spec.it('should go to EnterPasscode screen when all info is valid', errorCatchWrapper(signupFlow.stepTwoSuccess(spec)))

    // CreatePasscode screen tests
    spec.it('should disable button click when 3 digits are entered', errorCatchWrapper(signupFlow.disableCreatePasscode(spec)))
    spec.it('should go to RepeatPasscode screen when 4 digits are entered', errorCatchWrapper(signupFlow.createPasscode(spec)))

    // RepeatPasscode screen tests
    spec.it('should show error when different pin is entered', errorCatchWrapper(signupFlow.disableWrongPasscode(spec)))
    spec.it('should go to NoKYC screen when repeated pin is valid', errorCatchWrapper(signupFlow.finishPasscode(spec)))
  })
}

export function testLoginFlow(spec) {
  spec.describe('Login Flow', () => {

    // Init Login screen
    spec.it('should go to Login screen when skip intro and login pressed', errorCatchWrapper(loginFlow.initFlow(spec)))

    // Successful flow
    spec.it('should go to NoKYC screen when flow is successful', errorCatchWrapper(loginFlow.successfulFlow(spec)))

    // Login screen
    spec.it('should go to passport forgoten screen when forgot password pressed', errorCatchWrapper(loginFlow.forgottenPassword(spec)))
    spec.it('button should be disabled when no email and password entered', errorCatchWrapper(loginFlow.disableWhenNoLoginData(spec)))
    spec.it('button should be disabled when no email entered', errorCatchWrapper(loginFlow.disableWhenNoEmail(spec)))
    spec.it('button should be disabled when no password entered', errorCatchWrapper(loginFlow.disableWhenNoPassword(spec)))
    spec.it('should show error when wrong credentials', errorCatchWrapper(loginFlow.errWhenWrongCredentials(spec)))
    spec.it('should show error when user doesn\'t exist', errorCatchWrapper(loginFlow.errUserDoesNotExists(spec)))

    // ForgottenPassword screen
    spec.it('should show error message when not existing email is entered', errorCatchWrapper(loginFlow.forgottenPasswordErrWrongEmail(spec)))
    spec.it('should show error message when wrong email format is entered', errorCatchWrapper(loginFlow.forgottenPasswordErrWrongEmailFormat(spec)))
    spec.it('should show info message when existing email is entered', errorCatchWrapper(loginFlow.forgottenPasswordSuccessMsg(spec)))
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
    spec.it('should got to NoKyc with pending screen when flow is successful', errorCatchWrapper(kycFlow.successKYCflow(spec)))

    // NoKYC screen
    spec.it('should go to Profile details screen when verify profile is pressed', errorCatchWrapper(kycFlow.startKyc(spec)))

    // Profile details screen
    spec.it('should prepopulate first name and last name', errorCatchWrapper(kycFlow.prepopulateFirstAndLastName(spec)))
    spec.it('should show error when no title', errorCatchWrapper(kycFlow.noTitle(spec)))
    spec.it('should show error when no first name', errorCatchWrapper(kycFlow.noFirstName(spec)))
    spec.it('should show error when no last name', errorCatchWrapper(kycFlow.noLastName(spec)))
    spec.it('should show error when no date of birth', errorCatchWrapper(kycFlow.noDateOfBirth(spec)))
    spec.it('should show error when age is under 18', errorCatchWrapper(kycFlow.underAge(spec)))
    spec.it('should show error when no citizenship', errorCatchWrapper(kycFlow.noCitizenship(spec)))
    spec.it('should show error when no gender', errorCatchWrapper(kycFlow.noGender(spec)))
    spec.it('should go to Address Information when all info filled', errorCatchWrapper(kycFlow.profileDetailsFinish(spec)))

    // Address information screen
    spec.it('should prepopulate country', errorCatchWrapper(kycFlow.prepopulateCountry(spec)))
    spec.it('should show state if country is USA', errorCatchWrapper(kycFlow.stateFieldExistsIfUSA(spec)))
    spec.it('should show error when no City', errorCatchWrapper(kycFlow.errWhenNoCity(spec)))
    spec.it('should show error when no ZIP/Postal code', errorCatchWrapper(kycFlow.errWhenNoZIP(spec)))
    spec.it('should show error when no street', errorCatchWrapper(kycFlow.errWhenNoStreet(spec)))
    spec.it('should go to taxpayer ID screen when all info filled', errorCatchWrapper(kycFlow.addressInfoValid(spec)))

    // Taxpayer ID Screen
    spec.it('should throw error when no SSN input', errorCatchWrapper(kycFlow.taxpayerIDUSNoSSN(spec)))
    spec.it('should throw error when SSN input is invalid', errorCatchWrapper(kycFlow.taxpayerIDUSInvalidSSN(spec)))
    spec.it('should go to Verify profile when SSN is valid', errorCatchWrapper(kycFlow.taxpayerIDUSValidSSN(spec)))
    spec.it('should go to Verify profile when info filled in correctly', errorCatchWrapper(kycFlow.taxpayerIDSuccess(spec)))

    // Verify Documents Screen
    spec.it('should show error when no phone number is filled', errorCatchWrapper(kycFlow.showErrorNoPhoneNumber(spec)))
    spec.it('should show error when no front photo', errorCatchWrapper(kycFlow.showErrorNoFrontPhoto(spec)))
    spec.it('should show error when no back photo', errorCatchWrapper(kycFlow.showErrorNoBackPhoto(spec)))
    spec.it('should go to VerifyPhoneNumber when passport photo is ok', errorCatchWrapper(kycFlow.takePassportPicture(spec)))
    spec.it('should go to VerifyPhoneNumber when driving licence photos are ok', errorCatchWrapper(kycFlow.takeFrontAndBackOfDrivingLicence(spec)))
    spec.it('should go to VerifyPhoneNumber when id photos are ok', errorCatchWrapper(kycFlow.takeFrontAndBackofIdentityCard(spec)))

    // Verify Phone Number Screen
    spec.it('should show error when code in bad', errorCatchWrapper(kycFlow.wrongSMSCode(spec)))
  })
}

export function testWithdrawFlow(spec) {
  spec.describe('Withdraw Flow', () => {

    // Wallet landing
    spec.it('should show wallet landing when enter pin', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should switch between tabs correctly', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should open wallet details when ETH pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should change currency when right arrow pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should change currency when left arrow pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    // ETH wallet details
    spec.it('should open wallet details when ETH pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show chart for each period of time', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should open add funds when add eth pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show QR and address', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to BitGo page when transactions are secure is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to ETH wallet details when done is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to wallet landing when x is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    spec.it('should show error when atempt to widhdraw insufficient funds', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show error when atempt to widhdraw less then $1', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should withdraw 2 dolars', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    // BTC wallet details
    spec.it('should open wallet details when BTC pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show chart for each period of time', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should open add funds when add BTC pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show QR and address', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to BitGo page when transactions are secure is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to BTC wallet details when done is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to wallet landing when x is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    spec.it('should show error when atempt to widhdraw insufficient funds', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show error when atempt to widhdraw less then $1', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should withdraw 2 dolars', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    // BCH wallet details
    spec.it('should open wallet details when BCH pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show chart for each period of time', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should open add funds when add BCH pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show QR and address', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should change QR and address when use cash address format is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to BitGo page when transactions are secure is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to BCH wallet details when done is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to wallet landing when x is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    spec.it('should show error when atempt to widhdraw insufficient funds', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show error when atempt to widhdraw less then $1', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should withdraw 2 dolars', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    // LTC wallet details
    spec.it('should open wallet details when LTC pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show chart for each period of time', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should open add funds when add LTC pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show QR and address', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should change QR and address when use M-format address is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to BitGo page when transactions are secure is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to LTC wallet details when done is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to wallet landing when x is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    spec.it('should show error when atempt to widhdraw insufficient funds', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show error when atempt to widhdraw less then $1', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should withdraw 2 dolars', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    // BCH wallet details
    spec.it('should open wallet details when BCH pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show chart for each period of time', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should open add funds when add BCH pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show QR and address', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should have XRP destination tag box', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to BitGo page when transactions are secure is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to BCH wallet details when done is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to wallet landing when x is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    spec.it('should show error when atempt to widhdraw insufficient funds', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show error when atempt to widhdraw less then $1', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should withdraw 5 dolars', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    // OMG wallet details
    spec.it('should open wallet details when OMG pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show chart for each period of time', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should open add funds when add OMG pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show QR and address', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should change QR and address when use cash address format is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to BitGo page when transactions are secure is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to OMG wallet details when done is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should go to wallet landing when x is pressed', errorCatchWrapper(withdrawFlow.testFailed(spec)))

    spec.it('should show error when atempt to widhdraw insufficient funds', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should show error when atempt to widhdraw less then $1', errorCatchWrapper(withdrawFlow.testFailed(spec)))
    spec.it('should withdraw 5 dolars', errorCatchWrapper(withdrawFlow.testFailed(spec)))
  })
}