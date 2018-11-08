import signup from './signup';
import KYC from './KYC';
import withdrawBTC from './withdraw/withdrawBTC';
import withdrawETH from './withdraw/withdrawETH';
import withdrawLTC from './withdraw/withdrawLTC';
import withdrawXRP from './withdraw/withdrawXRP';
import withdrawOMG from './withdraw/withdrawOMG';
import withdrawBCH from './withdraw/withdrawBCH';
import CELcharts from './CELcharts';
import Interest from './Interest';
import calculator from './calculator';
import profile from './profile';
import borrow from './borrow';
import celPayBTC from './celPay/celPayBTC';

export default function(spec) {
  // spec.describe('Signup Flow', () => {
  //   spec.it('no email no password', signup.noEmailPass(spec))
  //   spec.it('no pass', signup.noPass(spec))
  //   spec.it('no email', signup.noEmail(spec))
  //   spec.it('weak password', signup.weekPassword(spec))
  //   spec.it('sing up', signup.signUp(spec))
  //   spec.it('input first and last name', signup.inputUserName(spec))
  //   spec.it('input and repeat password ', signup.inputPassword(spec))

  // })

  // spec.describe('KYC Flow', () => {
  //   spec.it('Try to pass kyc with no title, no dateOfBirth, no chitizenship, no gender', KYC.startKYC(spec))
  //   spec.it('Try to pass kyc with no dateOfBirth, no chitizenship, no gender', KYC.startKYC2(spec))
  //   spec.it('Try to pass kyc with no chitizenship, no gender', KYC.startKYC3(spec))
  //   spec.it('Try to pass kyc with no gender', KYC.startKYC4(spec))
  //   spec.it('Try to pass kyc with all info filled', KYC.startKYC5(spec))
  //   spec.it('Take picure of ID card', KYC.idCardTakePicture(spec))
  //   spec.it('Retake driving licence picture', KYC.drivingLicenceRetakePhoto(spec))
  //   spec.it('Verify SMS number', KYC.verifySMS(spec))

  // })

  // spec.describe('Withdraw btc flow', () => {
  //   spec.it('Login user', withdrawBTC.loginUser(spec))
  //   spec.it('Charts exists', withdrawBTC.charts(spec))
  //   spec.it('Can`t withdraw less than $1', withdrawBTC.withdrawLessThanOne(spec))
  //   spec.it('Can`t withdraw over &20k', withdrawBTC.withdrawOver20K(spec))
  //   spec.it('Withdraw $5', withdrawBTC.withdraw5$(spec))

  // })

  // spec.describe('Withdraw eth flow', () => {
  //   spec.it('Login user', withdrawETH.loginUser(spec))
  //   spec.it('Charts exists', withdrawETH.charts(spec))
  //   spec.it('Can`t withdraw less than $1', withdrawETH.withdrawLessThanOne(spec))
  //   spec.it('Can`t withdraw over &20k', withdrawETH.withdrawOver20K(spec))
  //   spec.it('Withdraw $4', withdrawETH.withdraw4$(spec))

  // })

  // spec.describe('Withdraw ltc flow', () => {
  //   spec.it('Login user', withdrawLTC.loginUser(spec))
  //   spec.it('Charts exists', withdrawLTC.charts(spec))
  //   spec.it('Can`t withdraw less than $1', withdrawLTC.withdrawLessThanOne(spec))
  //   spec.it('Can`t withdraw over &20k', withdrawLTC.withdrawOver20K(spec))
  //   // Uncomment this if user have funds
  //   // spec.it('Withdraw $4', withdrawLTC.withdraw2$(spec))

  // })

  // spec.describe('Withdraw xrp flow', () => {
  //   spec.it('Login user', withdrawXRP.loginUser(spec))
  //   spec.it('Charts exists', withdrawXRP.charts(spec))
  //   spec.it('Can`t withdraw less than $1', withdrawXRP.withdrawLessThanOne(spec))
  //   spec.it('Can`t withdraw over &20k', withdrawXRP.withdrawOver20K(spec))
  //   spec.it('Withdraw $4', withdrawXRP.withdraw1$(spec))

  // })

  // spec.describe('Withdraw omg flow', () => {
  //   spec.it('Login user', withdrawOMG.loginUser(spec))
  //   spec.it('Charts exists', withdrawOMG.charts(spec))
  //   // Uncomment this if user have funds
  //   // spec.it('Can`t withdraw less than $1', withdrawOMG.withdrawLessThanOne(spec))
  //   // spec.it('Can`t withdraw over &20k', withdrawOMG.withdrawOver20K(spec))

  // })

  // spec.describe('Withdraw bch flow', () => {
  //   spec.it('Login user', withdrawBCH.loginUser(spec))
  //   spec.it('Charts exists', withdrawBCH.charts(spec))
  //   // Uncomment this if user have funds
  //   // spec.it('Can`t withdraw less than $1', withdrawBCH.withdrawLessThanOne(spec))
  //   // spec.it('Insuficient funds', withdrawBCH.insuficientFunds(spec))

  // })

  // spec.describe('Cel charts', () => {
  //   spec.it('Charts shows up', CELcharts.charts(spec))

  // })

  // spec.describe('Interest page', () => {
  //   spec.it('Interest charts shows up', Interest.interestChart(spec))
  //   spec.it('QR code and addresses show up', Interest.interestQR(spec))

  // })

  // spec.describe('Earn page', () => { 
  //   spec.it('calculator show interest', calculator.calculateInterest(spec))

  // })

  spec.describe('Borrow page', () => {
    spec.it('Login user', celPayBTC.loginUser(spec))
    spec.it('Calculate colleteral BTC', borrow.inputBTC(spec))
    spec.it('Calculate colleteral ETH', borrow.inputETH(spec))
    spec.it('Calculate colleteral LTC', borrow.inputLTC(spec))
    spec.it('Calculate colleteral XRP', borrow.inputXRP(spec))
    spec.it('Calculate colleteral OMG', borrow.inputOMG(spec))
    spec.it('Calculate colleteral BCH', borrow.inputBCH(spec))

  })

  spec.describe('Cel pay flow', () => {
    // spec.it('Login user', celPayBTC.loginUser(spec))
    spec.it('Select amunt of BTC to send', celPayBTC.selectAmountBTC(spec))
    spec.it('Send the selected amount of BTC', celPayBTC.sendAmountBTC(spec))

    spec.it('Select amunt of ETH to send', celPayETH.selectAmountETH(spec))
    spec.it('Send the selected amount of ETH', celPayETH.sendAmountETH(spec))

    spec.it('Select amunt of XRP to send', celPayXRP.selectAmountXRP(spec))
    spec.it('Send the selected amount of XRP', celPayXRP.sendAmountXRP(spec))

    // Uncomment this if user have funds
    // spec.it('Select amunt of OMG to send', celPayOMG.selectAmountOMG(spec))
    // spec.it('Send the selected amount of OMG', celPayOMG.sendAmountOMG(spec))

    // spec.it('Select amunt of LTC to send', celPayLTC.selectAmountLTC(spec))
    // spec.it('Send the selected amount of LTC', celPayLTC.sendAmountLTC(spec))

    // spec.it('Select amunt of BCH to send', celPayBCH.selectAmountBCH(spec))
    // spec.it('Send the selected amount of BCH', celPayBCH.sendAmountBCH(spec))
  })

  spec.describe('Profile page', () => {
    spec.it('Change profile details', profile.changeProfileInfo(spec))

  })



}

