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
        
        // LogIn
        await spec.fillIn('CelTextInput.email','filip.jovakaric+wlt@mvpworkshop.co')
        await spec.fillIn('CelTextInput.pass','filip123')
        await spec.press('LoginForm.button')
        await spec

        // Test Wallet page
        await spec.fillIn('passcode.pin','1111')
        await spec.press('Passcode.Enter PIN')
        
        await spec.pause(5000)
        await spec.press('TodayRatesModal.popUP')

      });
    });

        spec.describe('Wallet screen for BTC', function() {
          spec.it('Charts exists', async function() {

        // BTC 
        await spec.exists('WalletBalance.BTC')
        await spec.press('WalletBalance.BTC')
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
        await spec.pause(5000)

      });
    });

    spec.describe('Withdraw screen for BTC', function() {
      spec.it('Can`t withdraw less than $1', async function() {

        // Withdraw less than $1
        await spec.press('WalletDetails.withdraw')
        await spec.press('WithdrawalInfo.continue')
        await spec.pause(2000)

        await spec.press('AmountInput.zero')
        await spec.press('AmountInput.period')
        await spec.press('AmountInput.one')
        await spec.press('AmountInput.five')
        await spec.pause(5000)
        await spec.press('AmountInput.send')
        await spec.pause(2000)

      });
            });
      
      spec.describe('Withdraw screen for BTC', function() {
        spec.it('Can`t withdraw over &20k', async function() {

        // Withdraw more than $20k
        await spec.press('WalletDetails.withdraw')
        await spec.press('WithdrawalInfo.continue')
        await spec.pause(2000)

        
        await spec.press('AmountInput.five')
        await spec.press('AmountInput.five')
        await spec.press('AmountInput.zero')
        await spec.press('AmountInput.zero')
        await spec.press('AmountInput.zero')
        await spec.press('AmountInput.zero')

        await spec.pause(5000)
        await spec.press('AmountInput.send')

        });
      });

      spec.describe('Withdraw screen for BTC', function() {
        spec.it('Withdraw $5', async function() {

        // Withdraw $2
        await spec.press('WalletDetails.withdraw')
        await spec.press('WithdrawalInfo.continue')
        await spec.pause(2000)
        
        await spec.press('AmountInput.five')

        await spec.press('AmountInput.send')
        await spec.pause(2000)
        await spec.press('TransactionConfirmation.confirmWithdraw')
        await spec.pause(2000)
        await spec.fillIn('passcode.pin','1111')
        await spec.press('Passcode.Confirm')
        await spec.pause(5000)

        });
      });

      spec.describe('Wallet screen for ETH', function() {
        spec.it('Charts exists', async function() {
       // ETH
       await spec.pause(2000)
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

       // Withdraw
       // await spec.press('WalletDetails.withdraw')
       // await spec.press('WithdrawalInfo.continue')

       // await spec.press('AmountInput.zero')
       // await spec.press('AmountInput.period')
       // await spec.press('AmountInput.zero')
       // await spec.press('AmountInput.zero')
       // await spec.press('AmountInput.zero')
       // await spec.press('AmountInput.one')
       // await spec.press('AmountInput.five')


       await spec.pause(5000)

       let comp = await spec.findComponent('WalletDetails.iks')
       await test(comp)
       
       await spec.pause(2000)

      });
    });

      // spec.describe('LogIn1', function() {
      //   spec.it('Existing user1', async function() {
          
      //     await spec.pause(2000)
      //     await spec.exists('WelcomeScreen.first')
      //     await spec.pause(2000)
      //     await spec.press('WelcomeScreen.acc')
          
      //     //LogIn
      //     await spec.fillIn('CelTextInput.email','filip.jovakaric+wlt@mvpworkshop.co')
      //     await spec.fillIn('CelTextInput.pass','filip123')
      //     await spec.press('LoginForm.button')

          // Test Wallet page
  
          // await spec.fillIn('passcode.pin','1111')
          // await spec.press('Passcode.Enter PIN')
        // await spec.pause(500000)

        // comp = await spec.findComponent('WalletDetails.iks')
        // await test(comp)
        
        // await spec.pause(2000)

        spec.describe('Wallet screen for LTC', function() {
          spec.it('Charts exists', async function() {

        // LTC
        await spec.exists('WalletBalance.LTC')
        await spec.press('WalletBalance.LTC')
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

        comp = await spec.findComponent('WalletDetails.iks')
        await test(comp)
        
        await spec.pause(2000)
      
      });
    });

    spec.describe('Wallet screen for XRP', function() {
      spec.it('Chart exists', async function() {

        // XRP
        await spec.exists('WalletBalance.XRP')
        await spec.press('WalletBalance.XRP')
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

        comp = await spec.findComponent('WalletDetails.iks')
        await test(comp)
        
        await spec.pause(2000)

      });
    });

    spec.describe('Wallet screen for OMG', function() {
      spec.it('Chart exists', async function() {

        // OMG
        await spec.exists('WalletBalance.OMG')
        await spec.press('WalletBalance.OMG')
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

        comp = await spec.findComponent('WalletDetails.iks')
        await test(comp)
        
        await spec.pause(2000)
      });
    });

    spec.describe('Wallet screen for CEL', function() {
      spec.it('Chart exists', async function() {

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
      });
    });

    spec.describe('Add more funds', function() {
      spec.it('', async function() {

        // Transaction tab, wallet page
        await spec.press('TabNavigation.Transactions')

        await spec.pause(2000)
        await spec.press('TabNavigation.Interest')
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
        // Select a currency
        // BTC
        store.dispatch(actions.updateFormField('interestCurrency', 'Bitcoin'))
        store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
        // ETH
        store.dispatch(actions.updateFormField('interestCurrency', 'Ethereum'))
        store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
        // // LTC
        // store.dispatch(actions.updateFormField('interestCurrency', 'Litecoin'))
        // store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
        // // XRP
        // store.dispatch(actions.updateFormField('interestCurrency', 'Ripple'))
        // store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
        // // OMG
        // store.dispatch(actions.updateFormField('interestCurrency', 'Omisego'))
        // store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
        // // BCH
        // store.dispatch(actions.updateFormField('interestCurrency', 'Bitcoin cash'))
        // store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))  
        // await spec.fillIn('InterestCalculatorScreen.interestAmount', 100)
        // await spec.pause(2000)
        // await spec.exists('InterestCalculatorScreen.perWeek')
        // await spec.exists('InterestCalculatorScreen.perMonth')
        // await spec.exists('InterestCalculatorScreen.per6Months')

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


          });
      });

      // LogOut
      spec.describe('LogOut', function() {
        spec.it('...', async function() {

        });
      });
    }
  