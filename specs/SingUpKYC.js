// import SignUpKYC from './SignUpKYC'
import { formField } from './helpers';

import store from '../app/redux/store';
import * as actions from '../app/redux/actions';

export default function(spec) {
    
        console.log(store.getState().users);
        console.log(store.getState().ui);
        console.log(actions);

        // console.log(store.getKYCStatusSuccess(status), 'Get KYC STATUS');

        store.dispatch(actions.logoutUser());
    // WelcomeScreen exist; press logIn
    spec.describe('SingUpKYC', function() {
      spec.it('', async function() {

        // // signUp with no email, pass
        // await spec.press('WelcomeScreen.SignUp')
        // await spec.press('SignupOne.button')
        // await spec.notExists('SignupTwo.screen')

        // await spec.pause(5000)

        //  // signUp with no pass
        //  await spec.press('WelcomeScreen.SignUp')
        //  await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@gmail.com`)
        //  await spec.press('SignupOne.button')
        //  await spec.notExists('SignupTwo.screen')

        //  store.dispatch(actions.logoutUser());
 
        //  await spec.pause(5000)

        //  // signUp with no email
        //  await spec.press('WelcomeScreen.SignUp')
        //  await spec.fillIn('SignupOne.pass','1234567')
        //  await spec.press('SignupOne.button')
        //  await spec.notExists('SignupTwo.screen')

        //  store.dispatch(actions.logoutUser());

        //  await spec.pause(5000)
 
        //  // signUp with weak paass
        //  await spec.press('WelcomeScreen.SignUp')
        //  await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@gmail.com`)
        //  await spec.fillIn('SignupOne.pass','1234')
        //  await spec.press('SignupOne.button')
        //  await spec.notExists('SignupTwo.screen')

        //  store.dispatch(actions.logoutUser());

        //  await spec.pause(5000)


        // signUp
        await spec.press('WelcomeScreen.SignUp')
        await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@gmail.com`)
        await spec.fillIn('SignupOne.pass','12345678')
        await spec.press('SignupOne.button')

        await spec.pause(5000)

        await spec.fillIn('SignupTwo.FirstName', 'Nemanja')
        await spec.fillIn('SignupTwo.LastName', 'Krstonic')
        await spec.press('SignupTwo.CreatePin')


        await spec.fillIn('passcode.pin','1111')
        await spec.press('Passcode.Repeat PIN')
        await spec.fillIn('passcode.pin_confirm','1111')
        await spec.press('Passcode.Confirm')
        await spec.pause(1000)


        // kyc, page 1, 
        await spec.press('NoKyc.VerifyProfile')
        await spec.pause(3000)

        // await spec.press('ProfileDetails.verifyYourProfile')

        // await spec.exists('ProfileDetails.Title is required!')
        // await spec.exists('ProfileDetails.Date of Birth is required!')
        // await spec.exists('ProfileDetails.Citizenship is required!')
        // await spec.exists('ProfileDetails.Gender is required!')


        // await spec.pause(5000)

        // // kyc, page 1, test empty, title filled
        // store.dispatch(actions.updateFormField('title', 'mr' ));

        // await spec.press('ProfileDetails.verifyYourProfile')

        // await spec.notExists('ProfileDetails.Title is required!')
        // await spec.exists('ProfileDetails.Date of Birth is required!')
        // await spec.exists('ProfileDetails.Citizenship is required!')
        // await spec.exists('ProfileDetails.Gender is required!')

        // await spec.pause(5000)

        // // kyc, page 1, test empty, title, dateOfBirth filled 
        // store.dispatch(actions.updateFormField('title', 'mr' ));
        // store.dispatch(actions.updateFormField('dateOfBirth', '04 04 1994' ));

        // await spec.press('ProfileDetails.verifyYourProfile')

        // await spec.notExists('ProfileDetails.Title is required!')
        // await spec.notExists('ProfileDetails.Date of Birth is required!')
        // await spec.exists('ProfileDetails.Citizenship is required!')
        // await spec.exists('ProfileDetails.Gender is required!')

        // await spec.pause(5000)

        // kyc, page 1, test empty, title, dateOfBirth, citizenship filled 
        store.dispatch(actions.updateFormField('title', 'mr' ));
        store.dispatch(actions.updateFormField('dateOfBirth', '04 04 1994' ));
        store.dispatch(actions.updateFormField('citizenship','Serbia'));
        store.dispatch(actions.updateFormField('gender', 'Male' ));

        await spec.press('ProfileDetails.verifyYourProfile')

        await spec.notExists('ProfileDetails.Title is required!')
        await spec.notExists('ProfileDetails.Date of Birth is required!')
        // await spec.notExists('ProfileDetails.Citizenship is required!')
        await spec.exists('ProfileDetails.Gender is required!')


        //kyc, page 2, NOT SURE WHAT HAPPEDNS HERE
        await spec.press('ProfileDetails.verifyYourProfile')

        
        // navigate on drivers licence field
        await spec.press('VerifyProfile.National ID card')

        // press input front side photo field
        await spec.press('CameraInput.frontSidePhoto')

        // take a pic
        store.dispatch(actions.takeCameraPhoto('photo'));

        await spec.pause(5000)

        // click use photo button 
        await spec.press('CameraScreen.usePhoto')

        await spec.pause(5000)

         // press input front side photo field
         await spec.press('CameraInput.frontSidePhoto')

         // take a pic
         store.dispatch(actions.takeCameraPhoto('photo'));
 
         // click use photo button 
         await spec.press('CameraScreen.usePhoto')

        store.dispatch(actions.updateFormField('cellphone', '123456'))

        await spec.pause(5000)

        await spec.press('VerifyProfile.verify')

        await spec.pause(50000)

       



        // store.dispatch(actions.updateFormField('dateOfBirth', '04 04 1994' ));
        // await spec.pause(3000)
        // await spec.press('CelSelect.fillName')

        // // store.dispatch(actions.updateFormField('citizenship','Japan'));
        // await spec.pause(3000)
        // store.dispatch(actions.updateFormField('gender', 'Male' ));

        // await spec.press('ProfileDetails.verifyYourProfile')
        // store.dispatch(actions.takeCameraPhoto())
        // await spec.pause(3000)



        // await formField(title, label)
        // await press2('CelSelect.rn')
        
        // await spec.pause(150000)
 



        // console.log(store.getState().users);

    });

//     spec.describe('SignUpKYC', SignUpKYC);
//     spec.describe('Login', Login);
//     spec.describe('SignUpKYC', SignUpKYC);
//     spec.describe('SignUpKYC', SignUpKYC);
});
}