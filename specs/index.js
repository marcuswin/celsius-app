import signupFlow from './signup-flow';
import loginFlow from './login-flow';
import kycFlow from './KYC-flow';
import walletDetails from './walletDetails-flow';
import earnInerestFlow from './earn-interest-flow';
import withdrawFlow from './withdraw-flow'
import celPayFlow from './celpay-flow';
import celpayFlow from './celpay-flow';

export default function(spec) {
  // testSignupFlow(spec);
  // testLoginFlow(spec);
  // testKYCFlow(spec);
  // testWalletDetailsFlow(spec);
  // testWithdrawFlow(spec);
  // testCelPayFlow(spec)
  testEarnFlow(spec);
  

  // spec.describe('Single test', () => { spec.it('should pass', signupFlow.createPasscode(spec)) })
}

export function testSignupFlow(spec) {
  spec.describe('Signup Flow', () => {
    // Welcome screen tests
    spec.it('should go to SignupOne screen when button is pressed', signupFlow.pressSkipIntro(spec))

    // SignupOne screen tests
    spec.it('button should be disabled when no email and password entered', signupFlow.disableWhenNoData(spec))
    spec.it('button should be disabled when no email entered', signupFlow.disableWhenNoEmail(spec))
    spec.it('button should be disabled when no password entered', signupFlow.disableWhenNoPassword(spec))
    spec.it('should show error when invalid email entered', signupFlow.errorWhenEmailInvalid(spec))
    spec.it('should show error when when weak password', signupFlow.errorWhenPasswordWeak(spec))
    spec.it('should `show error when user exists', signupFlow.errorWhenUserExists(spec))
    spec.it('should go to SignupTwo screen when all info is valid', signupFlow.stepOneSuccess(spec))

    // SignupTwo screen tests
    spec.it('should show error when no first and last name entered', signupFlow.disableWhenNoNames(spec))
    spec.it('should show error when no first name entered', signupFlow.disableWhenNoLastName(spec))
    spec.it('should show error when no last name entered', signupFlow.disableWhenNoFirstName(spec))
    spec.it('should go to EnterPasscode screen when all info is valid', signupFlow.stepTwoSuccess(spec))

    // EnterPasscode screen tests
    spec.it('should disable button click when 3 digits are entered', signupFlow.disableCreatePasscode(spec))
    spec.it('should go to RepeatPasscode screen when 4 digits are entered', signupFlow.createPasscode(spec))
    spec.it('should disable button click when 3 digits are entered', signupFlow.disableRepeatPasscode(spec))
    spec.it('should show error when different pin is entered', signupFlow.disableWrongPasscode(spec))
    spec.it('should go to NoKYC screen when repeated pin is valid', signupFlow.finishPasscode(spec))

    // // User exited registration process after first step
    // spec.it('should go to SignupTwo screen on app open if user hasn\'t entered his name', testPassed(spec))
    // spec.it('should go to EnterPasscode screen on app open if user hasn\'t entered his pin', testPassed(spec))
    // spec.it('should go to NoKYC screen when all steps are successfully finished', testPassed(spec))

    // // TODO Third party signup
  })
}

export function testLoginFlow(spec) {
  spec.describe('Login Flow', () => {
    
    // Login screen tests
    spec.it('button should be disabled when no email and password entered', loginFlow.disableWhenNoLoginData(spec))
    spec.it('button should be disabled when no email entered', loginFlow.disableWhenNoEmail(spec))
    spec.it('button should be disabled when no password entered', loginFlow.disableWhenNoPassword(spec))
    spec.it('should show error when wrong credentials', loginFlow.disableWhenWrongCredentials(spec))
    spec.it('should show error when user doesn\'t exist', loginFlow.errUserDoesNotExists(spec))
    spec.it('should go to Home screen when all info is valid', loginFlow.loginSuccess(spec))

    // // TODO Third party login
  })
}

export function testKYCFlow(spec) {
  spec.describe('KYC flow', () => {
    // NoKYC screen

    // ProfileDetails screen tests
    spec.it('should prepopulate first name and last name', kycFlow.firstAndLastNameExist(spec))
    spec.it('should show error when no title', kycFlow.noTitle(spec))
    spec.it('should show error when no date of birth', kycFlow.noDateOfBirth(spec))
    spec.it('should show error when no citizenship', kycFlow.noCitizenship(spec))
    spec.it('should show error when no gender', kycFlow.noGender(spec))
    spec.it('should show error when no first name', kycFlow.noFirstName(spec))
    spec.it('should show error when no last name', kycFlow.noLastName(spec))

    // KYC success 
    spec.it('should go to NoKYC screen when repeated pin is valid', signupFlow.signupKYCSuccess(spec))
    spec.it('should go to VerifyProfile screen when all info is valid', kycFlow.kycSuccess(spec))

    // VerifyPRofile screen tests
    spec.it('should take front and back picture of ID card', kycFlow.identityCardPicture(spec))
    spec.it('should retake picture of driving licence', kycFlow.drivingLicencePicutre(spec))
    spec.it('should retake picture of passport', kycFlow.passportPicture(spec))
    spec.it('should retake picture of driving licence', kycFlow.finishKycFlow(spec))

  })
}

export function testWalletDetailsFlow(spec) {
  spec.describe('Add funds flow', () => {

    // ETH Wallet details
    spec.it('should navigate to ETH balance', walletDetails.eth(spec))
    spec.it('line charts should exist for different time', walletDetails.graphs(spec))
    spec.it('address and QR code for ETH should exists on add funds page', walletDetails.addressAndQR(spec))

    // BTC Wallet details
    spec.it('should navigate to BTC balance', walletDetails.btc(spec))
    spec.it('line charts should exist for different time', walletDetails.graphs(spec))
    spec.it('address and QR code for BTC should exists on add funds page', walletDetails.addressAndQR(spec))

    // LTC Wallet details
    spec.it('should navigate to LTC balance', walletDetails.ltc(spec))
    spec.it('line charts should exist for different time', walletDetails.graphs(spec))
    spec.it('address and QR code for LTC should exists on add funds page', walletDetails.addressAndQR(spec))

    // OMG Wallet details
    spec.it('should navigate to OMG balance', walletDetails.omg(spec))
    spec.it('line charts should exist for different time', walletDetails.graphs(spec))
    spec.it('address and QR code for OMG should exists on add funds page', walletDetails.addressAndQR(spec))

    // XRP Wallet details
    spec.it('should navigate to XRP balance', walletDetails.xrp(spec))
    spec.it('line charts should exist for different time', walletDetails.graphs(spec))
    spec.it('address and QR code for XRP should exists on add funds page', walletDetails.addressAndQR(spec))

    // BCH Wallet details
    spec.it('should navigate to BCH balance', walletDetails.bch(spec))
    spec.it('line charts should exist for different time', walletDetails.graphs(spec))
    spec.it('address and QR code for BCH should exists on add funds page', walletDetails.addressAndQR(spec))
    
    // CEL Wallet details
    spec.it('should navigate to CEL balance', walletDetails.cel(spec))
    spec.it('address and QR code for CEL should exists on add funds page', walletDetails.addressAndQR(spec))
  })
}

export function testWithdrawFlow(spec) {
  spec.describe('Test withdraw flow', () => {

    // spec.it('should login user', waletDetails.logins(spec)) 

    // Withdraw ETH
    spec.it('should navigate to ETH wallet', withdrawFlow.selectETH(spec))
    spec.it('should navigate to withdraw screen', withdrawFlow.navigateToWithdrawPage(spec))
    spec.it('should throw error when withdraw less then $1', withdrawFlow.withdrawLessThan$1(spec))
    spec.it('should throw error when insufficient funds', withdrawFlow.withdrawInsufficientFunds(spec))
    spec.it('should withdraw $2 ETH', withdrawFlow.withdraw$2(spec))

    // Withdraw BTC
    spec.it('should navigate to BTC wallet', withdrawFlow.selectBTC(spec))
    spec.it('should navigate to withdraw screen', withdrawFlow.navigateToWithdrawPage(spec))
    spec.it('should throw error when withdraw less then $1', withdrawFlow.withdrawLessThan$1(spec))
    spec.it('should throw error when insufficient funds', withdrawFlow.withdrawInsufficientFunds(spec))
    spec.it('should withdraw $2 BTC', withdrawFlow.withdraw$2(spec))

    // Withdraw LTC
    spec.it('should navigate to LTC wallet', withdrawFlow.selectLTC(spec))
    spec.it('should navigate to withdraw screen', withdrawFlow.navigateToWithdrawPage(spec))
    spec.it('should throw error when withdraw less then $1', withdrawFlow.withdrawLessThan$1(spec))
    spec.it('should throw error when insufficient funds', withdrawFlow.withdrawInsufficientFunds(spec))
    // spec.it('should withdraw $2 LTC', withdrawFlow.withdraw$2(spec))

    // Withdraw OMG
    // spec.it('should navigate to OMG wallet', withdrawFlow.selectOMG(spec))
    // spec.it('should navigate to withdraw screen', withdrawFlow.navigateToWithdrawPage(spec))
    // spec.it('should throw error when withdraw less then $1', withdrawFlow.withdrawLessThan$1(spec))
    // spec.it('should throw error when insufficient funds', withdrawFlow.withdrawInsufficientFunds(spec))
    // spec.it('should withdraw $5 OMG', withdrawFlow.withdraw$5(spec))

    // Withdraw XRP
    spec.it('should navigate to XRP wallet', withdrawFlow.selectXRP(spec))
    spec.it('should navigate to withdraw screen', withdrawFlow.navigateToWithdrawPage(spec))
    spec.it('should throw error when withdraw less then $1', withdrawFlow.withdrawLessThan$1(spec))
    spec.it('should throw error when insufficient funds', withdrawFlow.withdrawInsufficientFunds(spec))
    spec.it('should withdraw $2 XRP', withdrawFlow.withdraw$2(spec))

    // Withdraw BCH
    // spec.it('should navigate to BCH wallet', withdrawFlow.selectBCH(spec))
  // spec.it('should navigate to withdraw screen', withdrawFlow.navigateToWithdrawPage(spec))
    // spec.it('should throw error when withdraw less then $1', withdrawFlow.withdrawLessThan$1(spec))
    // spec.it('should throw error when insufficient funds', withdrawFlow.withdrawInsufficientFunds(spec))
    // spec.it('should withdraw $2 BCH', withdrawFlow.withdraw$2(spec))

  }) 
}

export function testCelPayFlow(spec) {
  spec.describe('Test Cel pay flow', () => {

    spec.it('should navigate to cel pay screen', celPayFlow.navigateToCelPay(spec))
    spec.it('should select btc', celPayFlow.selectCoinBTC(spec))
    spec.it('test', celpayFlow.celPayLessThan$1(spec))

    spec.it('should navigate to cel pay screen', celPayFlow.navigateToCelPay(spec))
    spec.it('should select ETH', celPayFlow.selectCoinETH(spec))

    spec.it('should navigate to cel pay screen', celPayFlow.navigateToCelPay(spec))
    spec.it('should select LTC', celPayFlow.selectCoinLTC(spec))

    spec.it('should navigate to cel pay screen', celPayFlow.navigateToCelPay(spec))
    spec.it('should select XRP', celPayFlow.selectCoinXRP(spec))

    spec.it('should navigate to cel pay screen', celPayFlow.navigateToCelPay(spec))
    spec.it('should select BCH', celPayFlow.selectCoinBCH(spec))

    spec.it('should navigate to cel pay screen', celPayFlow.navigateToCelPay(spec))
    spec.it('should select OMG', celPayFlow.selectCoinOMG(spec))

  })
}

export function testEarnFlow(spec) {
  spec.describe('Calculator page', () => {

    spec.it('should navigate to earn tab', earnInerestFlow.navigateToEarnTab(spec))
    spec.it('11111111111', earnInerestFlow.selectCurrency(spec))
    
  })
}

