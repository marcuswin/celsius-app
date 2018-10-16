// import SignUpKYC from './SignUpKYC'
import { formField } from './helpers';

import store from '../app/redux/store';
import * as actions from '../app/redux/actions';

export default function(spec) {
    
        console.log(store.getState().users);
        console.log(store.getState().ui);
        console.log(actions);

        store.dispatch(actions.logoutUser());
    // WelcomeScreen exist; press logIn
    spec.describe('SingUpKYC', function() {
      spec.it('', async function() {

        await spec.press('WelcomeScreen.SignUp')
        await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@gmail.com`)
        await spec.fillIn('SignupOne.pass','12345678')
        await spec.press('SignupOne.button')


        await spec.fillIn('SignupTwo.FirstName', 'Nemanja')
        await spec.fillIn('SignupTwo.LastName', 'Krstonic')
        await spec.press('SignupTwo.CreatePin')


        await spec.fillIn('passcode.pin','1111')
        await spec.press('Passcode.Repeat PIN')
        await spec.fillIn('passcode.pin_confirm','1111')
        await spec.press('Passcode.Confirm')
        await spec.pause(1000)

        await spec.press('NoKyc.VerifyProfile')
        await spec.pause(3000)
        store.dispatch(actions.updateFormField('title', 'mr' ));
        store.dispatch(actions.updateFormField('dateOfBirth', '04 04 1994' ));
        store.dispatch(actions.updateFormField('citizenship', ' United States '));
        store.dispatch(actions.updateFormField('gender', 'Male' ));
        await spec.press('ProfileDetails.verifyYourProfile')
        store.dispatch(actions.takeCameraPhoto())
        await spec.pause(3000)



        // await formField(title, label)
        // await press2('CelSelect.rn')
        
        await spec.pause(15000)
 



        // console.log(store.getState().users);

    });

//     spec.describe('SignUpKYC', SignUpKYC);
//     spec.describe('Login', Login);
//     spec.describe('SignUpKYC', SignUpKYC);
//     spec.describe('SignUpKYC', SignUpKYC);
});
}