import signupFlow from './signup-flow';
import { testPassed } from './helpers';

export default function(spec) {
  // testSignupFlow(spec);

  spec.describe('Single test', () => { spec.it('should pass', signupFlow.disableWhenNoNames(spec)) })
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
    spec.it('should show error when user exists', signupFlow.errorWhenUserExists(spec))
    spec.it('should go to SignupTwo screen when all info is valid', signupFlow.stepOneSuccess(spec))

    // SignupTwo screen tests
    spec.it('should show error when no first and last name entered', signupFlow.disableWhenNoNames(spec))
    spec.it('should show error when no first name entered', testPassed(spec))
    spec.it('should show error when no last name entered', testPassed(spec))
    spec.it('should go to EnterPasscode screen when all info is valid', testPassed(spec))

    // EnterPasscode screen tests
    spec.it('should disable button click when 3 digits are entered', testPassed(spec))
    spec.it('should go to RepeatPasscode screen when 4 digits are entered', testPassed(spec))
    spec.it('should disable button click when 3 digits are entered', testPassed(spec))
    spec.it('should show error when different pin is entered', testPassed(spec))
    spec.it('should go to NoKYC screen when repeated pin is valid', testPassed(spec))

    // User exited registration process after first step
    spec.it('should go to SignupTwo screen on app open if user hasn\'t entered his name', testPassed(spec))
    spec.it('should go to EnterPasscode screen on app open if user hasn\'t entered his pin', testPassed(spec))
  })
}
