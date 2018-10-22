// import SignUpKYC from './SignUpKYC'
import { formField } from './helpers';

import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import API from "../app/config/constants/API"

export default function(spec) {
    console.log(store.getState().users);
    console.log(store.getState().ui);
    console.log(actions);      

    store.dispatch(actions.logoutUser());
    
    spec.describe('SingUpKYC', function() {
      spec.it('', async function() {


          

        // signUp with no email, pass
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

        // // kyc, page 1, 
        await spec.press('NoKyc.VerifyProfile')

        await spec.pause(5000)

        await spec.press('ProfileDetails.verifyYourProfile')

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
     
        // kyc, page 1, title, dateOfBirth, citizenship, gender filled 
        store.dispatch(actions.updateFormField('title', 'mr' ));
        store.dispatch(actions.updateFormField('dateOfBirth', "1994-01-01" ));
        store.dispatch(actions.updateFormField('citizenship','Serbia'));
        store.dispatch(actions.updateFormField('gender', 'Male' ));

        // await spec.notExists('ProfileDetails.Title is required!')
        // await spec.notExists('ProfileDetails.Date of Birth is required!')
        // await spec.notExists('ProfileDetails.Citizenship is required!')
        // await spec.notEexists('ProfileDetails.Gender is required!')

        await spec.pause(8000)

        //kyc, page 2, NOT SURE WHAT HAPPEDNS HERE
        await spec.press('ProfileDetails.verifyYourProfile')

        await spec.pause(5000)
        
        // navigate on drivers licence field
        await spec.press('VerifyProfile.identity_card')

        await spec.pause(5000)

        // press input front side photo field
        await spec.press('CameraInput.front')

        // take a pic
        await spec.press('CameraScreen.takePhoto')

        await spec.pause(2000)

        // click use photo button 
        await spec.press('CameraScreen.usePhoto')

        await spec.pause(2000)

        await spec.press('CameraInput.back')
        await spec.press('CameraScreen.takePhoto')

        await spec.pause(2000)

        // click use photo button 
        await spec.press('CameraScreen.usePhoto')
        store.dispatch(actions.updateFormField('cellphone', `111+${ new Date().getTime() }`))

        await spec.pause(3000)

        //repeat front input 
        await spec.press('CameraInput.front')
        await spec.press('CameraScreen.retakePhoto')
        await spec.press('CameraScreen.takePhoto')

        await spec.press('CameraInput.back')
        await spec.press('CameraScreen.retakePhoto')
        await spec.press('CameraScreen.takePhoto')

        await spec.pause(3000)
        
        await spec.press('VerifyProfile.verify')

        await spec.pause(5000)
        
        await spec.fillIn('VerifyPhoneNumber.sms', '1111')
        await spec.press('VerifyPhoneNumber.finish')

        store.dispatch(actions.verifySMSSuccess());

        await spec.pause(300000)

  
    });
});

       



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

    
       
}