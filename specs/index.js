import signup from './signup';

export default function(spec) {
  spec.describe('Signup Flow', () => {
    spec.it('no email no password', signup.noEmailPass(spec))
    spec.it('existing user', signup.existingUser(spec))
  })
}
