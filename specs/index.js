import signup from './signup';
import KYC from './KYC';

export default function(spec) {
  spec.describe('Signup Flow', () => {
    spec.it('no email no password', signup.noEmailPass(spec))
    spec.it('no pass', signup.noPass(spec))
    spec.it('no email', signup.noEmail(spec))
    spec.it('weak password', signup.weekPassword(spec))
    spec.it('sing up', signup.signUp(spec))
    spec.it('input first and last name', signup.inputUserName(spec))
    spec.it('input and repeat password ', signup.inputPassword(spec))
  })

  spec.describe('KYC Flow', () => {
    spec.it('Try to pass kyc with no title, no dateOfBirth, no chitizenship, no gender', KYC.startKYC(spec))
    spec.it('Try to pass kyc with no dateOfBirth, no chitizenship, no gender', KYC.startKYC2(spec))
    spec.it('Try to pass kyc with no chitizenship, no gender', KYC.startKYC3(spec))
    spec.it('Try to pass kyc with no gender', KYC.startKYC4(spec))
    spec.it('Try to pass kyc with all info filled', KYC.startKYC5(spec))
    spec.it('Take picure of ID card', KYC.idCardTakePicture(spec))
    spec.it('Retake driving licence picture', KYC.drivingLicenceRetakePhoto(spec))
    spec.it('Verify SMS number', KYC.verifySMS(spec))

  })

}

