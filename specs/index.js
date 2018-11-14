import signupFlow from './signup-flow';
import { testPassed } from './helpers';

export default function(spec) {
  testSignupFlow(spec);
  testLoginFlow(spec);
  testKYCFlow(spec);

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
    spec.it('should disable button click when 3 digits are entered', signupFlow.createPasscode(spec))
    spec.it('should go to RepeatPasscode screen when 4 digits are entered', signupFlow.repeatPasscode(spec))
    // spec.it('should disable button click when 3 digits are entered', testPassed(spec))
    // spec.it('should show error when different pin is entered', testPassed(spec))
    // spec.it('should go to NoKYC screen when repeated pin is valid', testPassed(spec))

    // // User exited registration process after first step
    // spec.it('should go to SignupTwo screen on app open if user hasn\'t entered his name', testPassed(spec))
    // spec.it('should go to EnterPasscode screen on app open if user hasn\'t entered his pin', testPassed(spec))
    // spec.it('should go to NoKYC screen when all steps are successfully finished', testPassed(spec))

    // // TODO Third party signup
  })
}

export function testLoginFlow(spec) {
  spec.describe('Login Flow', () => {
    // // Login screen tests
    // spec.it('button should be disabled when no email and password entered', testPassed(spec))
    // spec.it('button should be disabled when no email entered', testPassed(spec))
    // spec.it('button should be disabled when no password entered', testPassed(spec))
    // spec.it('should show error when wrong credentials', testPassed(spec))
    // spec.it('should show error when user doesn\'t exist', testPassed(spec))
    // spec.it('should go to Home screen when all info is valid', testPassed(spec))

    // // TODO Third party login
  })
}

export function testKYCFlow(spec) {
  spec.describe('Login Flow', () => {
    // // NoKYC screen
    // spec.it('should go to ProfileDetails screen when button is pressed', testPassed(spec))

    // // ProfileDetails screen tests
    // spec.it('should prepopulate first name and last name', testPassed(spec))
    // spec.it('should show error when no title', testPassed(spec))
    // spec.it('should show error when no date of birth', testPassed(spec))
    // spec.it('should show error when no citizenship', testPassed(spec))
    // spec.it('should show error when no gender', testPassed(spec))
    // spec.it('should show error when no first name', testPassed(spec))
    // spec.it('should show error when no last name', testPassed(spec))
    // spec.it('should go to VerifyProfile screen when all info is valid', testPassed(spec))

    // // VerifyPRofile screen tests
    // spec.it('should prepopulate available document types', testPassed(spec))

  })
}
