import { fillIn2 } from './helpers';

export default function(spec) {

    spec.describe('tests POC', function() {
      spec.it('First test', async function() {
        
        await spec.exists('WelcomeScreen.first')
        await spec.pause(2000)
        await spec.press('WelcomeScreen.acc')
        
       
        
        // const passwordInput = await spec.findComponent('LoginForm.pass')

        // console.log(passwordInput)
        // console.log(typeof passwordInput)
        // passwordInput.open();
        // await spec.press('Login.email')
        await spec.fillIn('CelTextInput.email','krstonic.nemanja123@gmail.com')
        await spec.fillIn('CelTextInput.pass','test1234')
        await spec.press('LoginForm.button')

        await spec.pause(4000)

        // await spec.fillIn('LoginForm.pass','sdsdsd')
        await spec.exists('NoKyc.screen')

        await spec.pause(7000)

        await spec.exists('WalletInterests.popUp')




    //     // await spec.pause(4000)
    //     // await spec.findComponent('SignupOne.textInput');
    //     // await spec.findComponent('SignupOne.pass')
    //     // await spec.fillIn('SignupOne.textInput', 'krstonic.nemanja@gmail.com')
    //     // await spec.fillIn('SignupOne.pass', '12345678')
    //     // await spec.press('SignupOne.button')
        });
      });

          
        // spec.describe('SignupOne', function() {
        //   spec.dec('Login Button', async function() {
         
        //      await spec.findComponent('SignupOne.email');
            
        //     // await fillIn2('CelInput.email', 'krstonic.nemanja@gmail.com')
        //     // await spec.fillIn('SignupOne.pass', '12345678')
        //     // await spec.press()
        //   });
        //   });
          
      // spec.describe('Fill in text field', function() {
      //   spec.it('works', async function() {
          
      //     const comp = await spec.findComponent('LoginForm.email')
      //     console.log(comp.props)
      //     comp.props.onChangeText("bla")
          // await spec.fillIn(comp, 'krstonic.nemanja@gmail.com')
     
          // picker.open();
        //  await spec.fillIn('SignupOne.email', 'krstonic.nemanja@gmail.com')
        //   });
        //  });


        //  spec.describe('Changing the text', function() {
        //   spec.it('works', async function() {
        //     const text = await spec.findComponent('SignupOne.text');
        //     await containsText(text, 'OR SIGN UP WITH E-MAIL');
        //   });
        // });
          
    }
  