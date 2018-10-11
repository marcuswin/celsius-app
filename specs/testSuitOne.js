import { fillIn2 } from './helpers';

export default function(spec) {
    
    // WelcomeScreen exist; press logIn
    spec.describe('LogIn', function() {
      spec.it('Existing user', async function() {
        
        await spec.pause(2000)
        await spec.exists('WelcomeScreen.first')
        await spec.pause(2000)
        await spec.press('WelcomeScreen.acc')
        
        //LogIn
        await spec.fillIn('CelTextInput.email','krstonic.nemanja123@gmail.com')
        await spec.fillIn('CelTextInput.pass','test1234')
        await spec.press('LoginForm.button')
        await spec.pause(10000)

        // Test Wallet page
        // await spec.press('TabNavigation.q')
        // await spec.exists('WalletInterest.chart')
        // await spec.press()
        
        //Test earn page, How to earn tab
        await spec.press('BottomNavigation.Earn')
        await spec.exists('InterestCalculatorScreen.exist')
        await spec.press('TabNavigation.How to earn')
        await spec.exists('HowToEarnInterest.exist')
        await spec.pause(5000)
        await spec.press('InterestExplanation.BalancePress')
        await spec.exists('InterestExplanation.Balance')
        await spec.pause(1000)
        await spec.press('InterestExplanation.TimePress')
        await spec.exists('InterestExplanation.Time')
        await spec.pause(1000)
        await spec.press('InterestExplanation.HodlPress')
        await spec.exists('InterestExplanation.Hodl')

        //Test earn page, calculator tab
        await spec.press('TabNavigation.Calculator')

        await spec.pause(5000)

        //Test Tracker page
        await spec.press('BottomNavigation.Tracker')

        //Test Borower page
        await spec.press('BottomNavigation.Borrow')

        //Test Profile page
        await spec.press('BottomNavigation.Profile')
        

        await spec.press('ProfileScreen.LogOut')
      
        });
      });

        // Test for earn page 
        spec.describe('========', function() {
          spec.it('========', async function() {
           
           
            // await spec.pause(8000)
            // await spec.press('TodayRatesModal.popUP')
            // await spec.pause(4000)

            // await spec.fillIn('CelTextInput.pin', '1')

            // await spec.exists('NoKyc.screen')
            // await spec.pause(4000)
            // await spec.press('BottomNavigation.Profile')
            // await spec.press('BottomNavigation.Earn')
            // await spec.press('BottomNavigation.Borrow')
        // await spec.press('BottomNavigation.Tracker')

          });
      });

      // LogOut
      spec.describe('LogOut', function() {
        spec.it('...', async function() {

        });
      });
    }
  