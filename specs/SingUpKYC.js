export default function(spec) {
    
    // WelcomeScreen exist; press logIn
    spec.describe('SingUpKYC', function() {
      spec.it('', async function() {

        await spec.pause(2000)
        await spec.press('WelcomeScreen.SignUp')
        await spec.fillIn('SignupOne.email','nemanjatest15@gmail.com')
        await spec.fillIn('SignupOne.pass','12345678')
        await spec.press('SignupOne.button')

                await spec.pause(2000)

        await spec.fillIn('SignupTwo.FirstName', 'Nemanja')
        await spec.fillIn('SignupTwo.LastName', 'Krstonic')
        await spec.press('SignupTwo.CreatePin')

                await spec.pause(2000)

        await spec.fillIn('CreatePasscode.pin','1')
        await spec.fillIn('CreatePasscode.pin','1')
        await spec.fillIn('CreatePasscode.pin','1')
        await spec.fillIn('CreatePasscode.pin','1')

    });
});
}