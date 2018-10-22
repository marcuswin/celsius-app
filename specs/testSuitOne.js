import { test } from './helpers';

import store from '../app/redux/store';
import * as actions from '../app/redux/actions';

export default function(spec) {
    
    store.dispatch(actions.logoutUser());

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
        await spec
        // Test Wallet page

        // ETH
        await spec.press('TabNavigation.Balance')
        await spec.exists('WalletBalance.ETH')
        await spec.press('WalletBalance.ETH')
        await spec.press('WalletDetailsGraphContainer.1d')
        await spec.exists('WalletDetailsGraphContainer.LineChart1d')

        await spec.press('WalletDetailsGraphContainer.7d')
        await spec.exists('WalletDetailsGraphContainer.LineChart7d')

        await spec.press('WalletDetailsGraphContainer.1m')
        await spec.exists('WalletDetailsGraphContainer.LineChart1m')

        await spec.press('WalletDetailsGraphContainer.3m')
        await spec.exists('WalletDetailsGraphContainer.LineChart3m')

        await spec.press('WalletDetailsGraphContainer.1y')
        await spec.exists('WalletDetailsGraphContainer.LineChart1y')

        await spec.press('WalletDetailsHeading.add')
        await spec.exists('AddFunds.QRCode')
        await spec.exists('AddFunds.address')
        await spec.press('AddFunds.Done')

        let comp = await spec.findComponent('WalletDetails.iks')
        await test(comp)
        
        await spec.pause(2000)

        // // // BTC 
        // await spec.exists('WalletBalance.BTC')
        // await spec.press('WalletBalance.BTC')
        // await spec.press('WalletDetailsGraphContainer.1d')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1d')

        // await spec.press('WalletDetailsGraphContainer.7d')
        // await spec.exists('WalletDetailsGraphContainer.LineChart7d')

        // await spec.press('WalletDetailsGraphContainer.1m')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1m')

        // await spec.press('WalletDetailsGraphContainer.3m')
        // await spec.exists('WalletDetailsGraphContainer.LineChart3m')

        // await spec.press('WalletDetailsGraphContainer.1y')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1y')

        // await spec.press('WalletDetailsHeading.add')
        // await spec.exists('AddFunds.QRCode')
        // await spec.exists('AddFunds.address')
        // await spec.press('AddFunds.Done')

        // comp = await spec.findComponent('WalletDetails.iks')
        // await test(comp)
        
        // await spec.pause(2000)

        // // LTC
        // await spec.exists('WalletBalance.LTC')
        // await spec.press('WalletBalance.LTC')
        // await spec.press('WalletDetailsGraphContainer.1d')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1d')

        // await spec.press('WalletDetailsGraphContainer.7d')
        // await spec.exists('WalletDetailsGraphContainer.LineChart7d')

        // await spec.press('WalletDetailsGraphContainer.1m')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1m')

        // await spec.press('WalletDetailsGraphContainer.3m')
        // await spec.exists('WalletDetailsGraphContainer.LineChart3m')

        // await spec.press('WalletDetailsGraphContainer.1y')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1y')

        // await spec.press('WalletDetailsHeading.add')
        // await spec.exists('AddFunds.QRCode')
        // await spec.exists('AddFunds.address')
        // await spec.press('AddFunds.Done')

        // comp = await spec.findComponent('WalletDetails.iks')
        // await test(comp)
        
        // await spec.pause(2000)

        // // XRP
        // await spec.exists('WalletBalance.XRP')
        // await spec.press('WalletBalance.XRP')
        // await spec.press('WalletDetailsGraphContainer.1d')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1d')

        // await spec.press('WalletDetailsGraphContainer.7d')
        // await spec.exists('WalletDetailsGraphContainer.LineChart7d')

        // await spec.press('WalletDetailsGraphContainer.1m')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1m')

        // await spec.press('WalletDetailsGraphContainer.3m')
        // await spec.exists('WalletDetailsGraphContainer.LineChart3m')

        // await spec.press('WalletDetailsGraphContainer.1y')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1y')

        // await spec.press('WalletDetailsHeading.add')
        // await spec.exists('AddFunds.QRCode')
        // await spec.exists('AddFunds.address')
        // await spec.press('AddFunds.Done')

        // comp = await spec.findComponent('WalletDetails.iks')
        // await test(comp)
        
        // await spec.pause(2000)

        // // OMG
        // await spec.exists('WalletBalance.OMG')
        // await spec.press('WalletBalance.OMG')
        // await spec.press('WalletDetailsGraphContainer.1d')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1d')

        // await spec.press('WalletDetailsGraphContainer.7d')
        // await spec.exists('WalletDetailsGraphContainer.LineChart7d')

        // await spec.press('WalletDetailsGraphContainer.1m')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1m')

        // await spec.press('WalletDetailsGraphContainer.3m')
        // await spec.exists('WalletDetailsGraphContainer.LineChart3m')

        // await spec.press('WalletDetailsGraphContainer.1y')
        // await spec.exists('WalletDetailsGraphContainer.LineChart1y')

        // await spec.press('WalletDetailsHeading.add')
        // await spec.exists('AddFunds.QRCode')
        // await spec.exists('AddFunds.address')
        // await spec.press('AddFunds.Done')

        // comp = await spec.findComponent('WalletDetails.iks')
        // await test(comp)
        
        // await spec.pause(2000).pause(2000)


        // CEL
        await spec.exists('WalletBalance.CEL')
        await spec.press('WalletBalance.CEL')
        await spec.press('WalletDetailsHeading.add')
        await spec.exists('AddFunds.QRCode')
        await spec.exists('AddFunds.address')
        await spec.press('AddFunds.Done')

        comp = await spec.findComponent('WalletDetails.iks')
        await test(comp)
        
        await spec.pause(5000)

        // Transaction tab, wallet page

        await spec.press('TabNavigation.Transactions')
        await spec.press('WalletTransactions.AddFunds')
        await spec.exists('AddFunds.QRCode')
        await spec.exists('AddFunds.address')
        // await spec.press('AddFunds.BTC')
        await spec.press('AddFunds.Done')


        await spec.press('TabNavigation.Interest')
        await spec.exists('WalletInterest.chart')
        await spec.press('WalletInterest.1m')
        await spec.press('WalletInterest.3m')
        await spec.press('WalletInterest.1y')
        await spec.press('WalletInterests.AddMoreFunds')
        await spec.exists('AddFunds.QRCode')
        await spec.exists('AddFunds.address')
        await spec.press('AddFunds.Done')


        // await spec.exists('WalletInterest.chart')
        // await spec.press()
        
        //Test earn page, How to earn tab
        await spec.press('BottomNavigation.Earn')
        await spec.exists('InterestCalculatorScreen.exist')
        await spec.press('TabNavigation.How to earn')
        await spec.exists('HowToEarnInterest.exist')
        await spec.pause(1000)
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
        store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
        // await spec.fillIn('InterestCalculatorScreen.interestAmount', 100)
        await spec.pause(5000)
        await spec.exists('InterestCalculatorScreen.perWeek')
        await spec.exists('InterestCalculatorScreen.perMonth')
        await spec.exists('InterestCalculatorScreen.per6Months')

        //Test Tracker page
        await spec.press('BottomNavigation.Tracker')
        await spec.press('Calculator.addCoins')

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
  