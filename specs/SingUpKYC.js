// import SignUpKYC from './SignUpKYC'

import store from '../app/redux/store';
import actions from '../app/redux/actions';

export default function(spec) {
    
        console.log(store.getState().users);

        store.dispatch(actions.logoutUser());

    // WelcomeScreen exist; press logIn
    spec.describe('SingUpKYC', function() {
      spec.it('', async function() {

        await spec.pause(2000)
        await spec.press('WelcomeScreen.SignUp')
        await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@gmail.com`)
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

//     spec.describe('SignUpKYC', SignUpKYC);
//     spec.describe('Login', Login);
//     spec.describe('SignUpKYC', SignUpKYC);
//     spec.describe('SignUpKYC', SignUpKYC);
});
}