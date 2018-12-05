import signupFlow from './flows/signup-flow';
import helpers from './helpers';
import loginFlow from "../specs/login-flow";

export default function(spec) {
  testSignupFlow(spec);
  testLoginFlow(spec);
  testSingleSuite(spec);
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

export function testSingleSuite(spec) {
  spec.describe('Single test', () => {
    spec.it('should go to Login screen when skip intro and login pressed', loginFlow.pressSkipIntro(spec))
  })
}

export function testLoginFlow(spec) {
  spec.describe('Login Flow', () => {
    // Successful flow
    spec.it('should go to NoKYC screen when flow is successful', helpers.testFailed(spec))

    // Welcome screen
    spec.it('should go to Login screen when skip intro and login pressed', loginFlow.pressSkipIntro(spec))

    // Login screen
    spec.it('should go to Login screen when forgot password pressed', helpers.testFailed(spec))
    spec.it('button should be disabled when no email and password entered', helpers.testFailed(spec))
    spec.it('button should be disabled when no email entered', helpers.testFailed(spec))
    spec.it('button should be disabled when no password entered', helpers.testFailed(spec))
    spec.it('should show error when wrong credentials', helpers.testFailed(spec))
    spec.it('should show error when user doesn\'t exist', helpers.testFailed(spec))
    spec.it('should go to LoginPasscode? screen when all info is valid', helpers.testFailed(spec))

    // LoginPasscode Screen
    spec.it('check how this works', helpers.testFailed(spec))
    // TODO: 2FA

    // ForgottenPassword screen
    spec.it('should show error message when not existing email is entered', helpers.testFailed(spec))
    spec.it('should show error message when wrong email format is entered', helpers.testFailed(spec))
    spec.it('should show info message when existing email is entered', helpers.testFailed(spec))
  })
}
