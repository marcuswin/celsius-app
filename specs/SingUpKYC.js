// import { test, submit } from './helpers';

// import store from '../app/redux/store';
// import * as actions from '../app/redux/actions';

// export default function(spec) {    

//     store.dispatch(actions.logoutUser());

//     spec.describe('Cel pay', function() {
//       spec.it('BTC, ', async function() {
        
//         await spec.press('Welcome.skipButton')
//         await spec.pause(2000)
//         await spec.press('MainHeader.Login')
//         // comp = await spec.findComponent('LoginScreen.loginButton')
//         // await submit(comp)

//         // await spec.press('LoginScreen.loginButton')
//         // LogIn
//         await spec.fillIn('CelTextInput.email','filip.jovakaric+wlt@mvpworkshop.co')
//         await spec.fillIn('CelTextInput.pass','filip123')
//         await spec.pause(2000)
//         await spec.press('LoginForm.button')
//         await spec.pause(30000)

//         await spec.press('BottomNavigation.Pay')
//         await spec.press('SelectCoin.BTC')
//         await spec.pause(5000)

//         await spec.press('AmountInput.one')
//         await spec.press('AmountInput.period')
//         await spec.press('AmountInput.one')

//         await spec.press('AmountInput.send')
//         await spec.pause(2000)
//         await spec.fillIn('passcode.pin','1111')
//         await spec.press('Passcode.Confirm')
//         await spec.pause(2000)
//         await spec.press('AmountInput.confirm-send')
//         await spec.pause(2000)
//         await spec.press('TransactionConfirmation.confirmWithdraw')
//         await spec.pause(2000)
//         await spec.press('Passcode.Confirm')

//       });
//     });

//     spec.describe('Cel pay', function() {
//       spec.it('ETH', async function() {
        
//         await spec.press('Welcome.skipButton')
//         await spec.pause(2000)
//         await spec.press('MainHeader.Login')

//         comp = await spec.findComponent('WalletDetails.iks')
//         await test(comp)

//         // LogIn
//         await spec.fillIn('CelTextInput.email','filip.jovakaric+wlt@mvpworkshop.co')
//         await spec.fillIn('CelTextInput.pass','filip123')
//         await spec.press('LoginForm.button')
//         await spec.pause(2000)
//         // LogIn
//         await spec.pause(4000)
//         await spec.fillIn('passcode.pin','1111')
//         await spec.press('Passcode.Confirm')

//         await spec.press('BottomNavigation.Pay')
//         await spec.press('SelectCoin.ETH')
//         await spec.pause(5000)

//         await spec.press('AmountInput.one')
//         await spec.press('AmountInput.period')
//         await spec.press('AmountInput.two')

//         await spec.press('AmountInput.send')
//         await spec.pause(2000)
//         await spec.fillIn('passcode.pin','1111')
//         await spec.press('Passcode.Confirm')
//         await spec.press('AmountInput.confirm-send')
//         await spec.pause(2000)
//         await spec.press('TransactionConfirmation.confirmWithdraw')
//         await spec.pause(2000)
//         await spec.press('Passcode.Confirm')

//       });
//     });

//     spec.describe('Cel pay', function() {
//       spec.it('XRP', async function() {
        
//         store.dispatch(actions.logoutUser());
//         await spec.press('Welcome.skipButton')
//         await spec.pause(2000)
//         await spec.press('MainHeader.Login')

//         // LogIn
//         await spec.fillIn('CelTextInput.email','filip.jovakaric+wlt@mvpworkshop.co')
//         await spec.fillIn('CelTextInput.pass','filip123')
//         await spec.press('LoginForm.button')
//         await spec.pause(2000)

//         await spec.press('BottomNavigation.Pay')
//         await spec.press('SelectCoin.XRP')
//         await spec.pause(5000)

//         await spec.press('AmountInput.one')
//         await spec.press('AmountInput.period')
//         await spec.press('AmountInput.three')

//         await spec.press('AmountInput.send')
//         await spec.pause(2000)
//         await spec.fillIn('passcode.pin','1111')
//         await spec.press('Passcode.Confirm')
//         await spec.press('AmountInput.confirm-send')
//         await spec.pause(2000)
//         await spec.press('TransactionConfirmation.confirmWithdraw')
//         await spec.pause(2000)
//         await spec.press('Passcode.Confirm')

//       });
//     });

//     spec.describe('Cel pay', function() {
//       spec.it('LTC', async function() {
        
//         store.dispatch(actions.logoutUser());
//         await spec.press('Welcome.skipButton')
//         await spec.pause(2000)
//         await spec.press('MainHeader.Login')

//         // LogIn
//         await spec.fillIn('CelTextInput.email','filip.jovakaric+wlt@mvpworkshop.co')
//         await spec.fillIn('CelTextInput.pass','filip123')
//         await spec.press('LoginForm.button')
//         await spec.pause(2000)

//         await spec.press('BottomNavigation.Pay')
//         await spec.press('SelectCoin.LTC')
//         await spec.pause(5000)

//         await spec.press('AmountInput.two')

//         await spec.press('AmountInput.send')
//         await spec.pause(2000)
//         await spec.fillIn('passcode.pin','1111')
//         await spec.press('Passcode.Confirm')
//         await spec.press('AmountInput.confirm-send')
//         await spec.pause(2000)
//         await spec.press('TransactionConfirmation.confirmWithdraw')
//         await spec.pause(2000)
//         await spec.press('Passcode.Confirm')

//       });
//     });



//     // spec.describe('SingUp', function() {
//     //   spec.it('No username, no password, ', async function() {

//     //     // signUp with no email, pass
//     //      await spec.pause(5000)
//     //      await spec.press('Welcome.skipButton')
//     //      await spec.press('SignupOne.button')
//     //      await spec.notExists('SignupTwo.screen')

//     //      await spec.pause(5000)

          
//     //    });
//     //  });  

//     // spec.describe('SingUp', function() {
//     //   spec.it('No password', async function() {

//     //      // signUp with no pass
//     //      await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@gmail.com`)
//     //      await spec.press('SignupOne.button')
//     //      await spec.notExists('SignupTwo.screen')

//     //      store.dispatch(actions.logoutUser());
 
//     //      await spec.pause(5000)

//     //    });
//     //  });  
      
//     //   spec.describe('SingUp', function() {
//     //     spec.it('No username', async function() {

//     //      // signUp with no email
//     //      await spec.press('Welcome.skipButton')
//     //      store.dispatch(actions.clearForm());
//     //      await spec.fillIn('SignupOne.password','12345678')
//     //      await spec.press('SignupOne.button')
//     //      await spec.notExists('SignupTwo.screen')

//     //      store.dispatch(actions.logoutUser());

//     //      await spec.pause(5000)
 
//     //     });
//     //   });  
      
//     //   spec.describe('SingUp', function() {
//     //     spec.it('Weak password', async function() {

//     //      // signUp with weak paass
//     //      await spec.press('Welcome.skipButton')
//     //      await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@gmail.com`)
//     //      await spec.fillIn('SignupOne.password','1234')
//     //      await spec.press('SignupOne.button')
//     //      await spec.notExists('SignupTwo.screen')

//     //      store.dispatch(actions.logoutUser());

//     //      await spec.pause(5000)
 
//     //     });
//     //   });  
      
//       // spec.describe('SingUp screen two', function() {
//       //   spec.it('Create pin', async function() {

//       //    // signUp
//       //    await spec.press('Welcome.skipButton')
//       //    await spec.fillIn('SignupOne.email',`nemanjatest+${ new Date().getTime() }@gmail.com`)
//       //    await spec.fillIn('SignupOne.password','12345678')
//       //    await spec.press('SignupOne.button')

//       //    await spec.pause(5000)

//       //    await spec.fillIn('SignupTwo.FirstName', 'Nemanja')
//       //    await spec.fillIn('SignupTwo.LastName', 'Krstonic')
//       //    await spec.press('SignupTwo.CreatePin')

//       //    await spec.fillIn('passcode.pin','1111')
//       //    await spec.press('Passcode.Repeat PIN')
//       //    await spec.fillIn('passcode.pin_confirm','1111')
//       //    await spec.press('Passcode.Confirm')
//       //    await spec.pause(1000)

//       //   });
//       // });  
      
//       // spec.describe('KYC', function() {
//       //   spec.it('No title, no dateOfBirth, no chitizenship, no gender', async function() {

//       //   // kyc, page 1
//         //  await spec.press('NoKyc.VerifyProfile')

//       //    await spec.pause(5000)
         
//       //    await spec.press('ProfileDetails.verifyYourProfile')

//       //   //  await spec.exists('ProfileDetails.Title is required!')
//       //   //  await spec.exists('ProfileDetails.Date of Birth is required!')
//       //   //  await spec.exists('ProfileDetails.Citizenship is required!')
//       //   //  await spec.exists('ProfileDetails.Gender is required!')

//       //    await spec.pause(5000)
//       //   });
//       // });  
      
//       // spec.describe('KYC', function() {
//       //   spec.it('No dateOfBirth, no chitizenship, no gender', async function() {

//       //    // kyc, page 1, test empty, title filled
//       //    store.dispatch(actions.updateFormField('title', 'mr' ));
//       //    await spec.press('ProfileDetails.verifyYourProfile')
//       //    await spec.pause(3003)
//       //   //  await spec.notExists('ProfileDetails.Title is required!')
//       //   //  await spec.exists('ProfileDetails.Date of Birth is required!')
//       //   //  await spec.exists('ProfileDetails.Citizenship is required!')
//       //   //  await spec.exists('ProfileDetails.Gender is required!')

//       //    await spec.pause(5000)

//       //   });
//       // });  
      
//       // spec.describe('KYC', function() {
//       //   spec.it('no chitizenship, no gender', async function() {

//       //   // kyc, page 1, test empty, title, dateOfBirth filled 
//       //   store.dispatch(actions.updateFormField('title', 'mr' ));
//       //   store.dispatch(actions.updateFormField('dateOfBirth', '04 04 1994' ));

//       //    await spec.press('ProfileDetails.verifyYourProfile')
//       //    await spec.pause(3003)
//       //   //  await spec.notExists('ProfileDetails.Title is required!')
//       //   //  await spec.notExists('ProfileDetails.Date of Birth is required!')
//       //   //  await spec.exists('ProfileDetails.Citizenship is required!')
//       //   //  await spec.exists('ProfileDetails.Gender is required!')

//       //    await spec.pause(5000)
     
//       //   });
//       // });  
      
// //       spec.describe('KYC', function() {
// //         spec.it('All informations filled', async function() {

// //           await spec.press('NoKyc.VerifyProfile')

// //          // kyc, page 1, title, dateOfBirth, citizenship, gender filled 
// //          store.dispatch(actions.updateFormField('title', 'mr' ));
// //          store.dispatch(actions.updateFormField('dateOfBirth', "1994-01-01" ));
// //          store.dispatch(actions.updateFormField('citizenship','Serbia'));
// //          await spec.pause(2000)

// //          store.dispatch(actions.updateFormField('gender', 'Male' ));
// //          await spec.pause(2000)
// //          await spec.press('ProfileDetails.verifyYourProfile')

// //          await spec.pause(30030000)
// //         //  await spec.notExists('ProfileDetails.Title is required!')
// //         //  await spec.notExists('ProfileDetails.Date of Birth is required!')
// //         //  await spec.notExists('ProfileDetails.Citizenship is required!')
// //         //  await spec.notExists('ProfileDetails.Gender is required!')

// //          await spec.pause(5000)

// //         });
// //       });  
      
// //       spec.describe('KYC 2', function() {
// //         spec.it('Take camera pictures', async function() {

// //         //kyc, page 2, NOT SURE WHAT HAPPEDNS HERE
// //          await spec.press('ProfileDetails.verifyYourProfile')

// //          await spec.pause(5000)
        
// //         // ID card take take photo
// //          await spec.press('VerifyProfile.identity_card')

// //          await spec.press('CameraInput.front')
// //          await spec.press('CameraScreen.takePhoto')
// //          await spec.press('CameraScreen.usePhoto')

// //          await spec.pause(5000)

// //          await spec.press('CameraInput.back')
// //          await spec.press('CameraScreen.takePhoto')
// //          await spec.press('CameraScreen.usePhoto')

// //          await spec.pause(2000)

// //          await spec.press('VerifyProfile.passport')

// //          await spec.press('CameraInput.front')
// //          await spec.press('CameraScreen.retakePhoto')
// //          await spec.press('CameraScreen.takePhoto')
// //          await spec.press('CameraScreen.usePhoto')

// //         });
// //       });  
      
// //       spec.describe('KYC 2', function() {
// //         spec.it('Retake driving licence', async function() {

// //         // Drivings licence retake photo
// //          await spec.press('VerifyProfile.driving_licence')

// //          await spec.press('CameraInput.front')
// //          await spec.press('CameraScreen.retakePhoto')
// //          await spec.press('CameraScreen.takePhoto')
// //         //  await spec.press('CameraScreen.usePhoto')

// //          await spec.pause(2000)

// //          await spec.press('CameraInput.back')
// //          await spec.press('CameraScreen.retakePhoto')
// //          await spec.press('CameraScreen.takePhoto')
// //          await spec.press('CameraScreen.usePhoto')

// //          await spec.pause(2000)
        
// //          store.dispatch(actions.updateFormField('cellphone', `111+${ new Date().getTime() }`))

// //          await spec.pause(2000)
        
// //          await spec.press('VerifyProfile.verify')

// //          await spec.pause(5000)

// //          await spec.fillIn('VerifyPhoneNumber.sms', '1111')
// //          await spec.press('VerifyPhoneNumber.finish')

// //         store.dispatch(actions.verifySMSSuccess());

// //          await spec.pause(3000)

  
// //  });
// //       });  
      
// //       spec.describe('SingUpKYC', function() {
// //         spec.it('', async function() {    

// // store.dispatch(actions.logoutUser());

// // // WelcomeScreen exist; press logIn
// // // spec.describe('LogIn', function() {
// // //     spec.it('Existing user', async function() {
      
// //       await spec.pause(2000)
// //       await spec.exists('WelcomeScreen.first')
// //       await spec.pause(2000)
// //       await spec.press('WelcomeScreen.acc')
      
// //       await spec.fillIn('passcode.pin','1111')
// //       await spec.press('Passcode.Enter PIN')
// //       //LogIn
// //       await spec.fillIn('CelTextInput.email','krstonic.nemanja123@gmail.com')
// //       await spec.fillIn('CelTextInput.pass','test1234')
// //       await spec.press('LoginForm.button')
// //       await spec
// //       // Test Wallet page

// //       // ETH
// //       await spec.press('TabNavigation.Balance')
// //       await spec.exists('WalletBalance.ETH')
// //       await spec.press('WalletBalance.ETH')
// //       await spec.press('WalletDetailsGraphContainer.1d')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1d')

// //       await spec.press('WalletDetailsGraphContainer.7d')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart7d')

// //       await spec.press('WalletDetailsGraphContainer.1m')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1m')

// //       await spec.press('WalletDetailsGraphContainer.3m')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart3m')

// //       await spec.press('WalletDetailsGraphContainer.1y')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1y')

// //       await spec.press('WalletDetailsHeading.add')
// //       await spec.exists('AddFunds.QRCode')
// //       await spec.exists('AddFunds.address')
// //       await spec.press('AddFunds.Done')

// //       let comp = await spec.findComponent('WalletDetails.iks')
// //       await test(comp)
      
// //       await spec.pause(2000)

// //       // BTC 
// //       await spec.exists('WalletBalance.BTC')
// //       await spec.press('WalletBalance.BTC')
// //       await spec.press('WalletDetailsGraphContainer.1d')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1d')

// //       await spec.press('WalletDetailsGraphContainer.7d')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart7d')

// //       await spec.press('WalletDetailsGraphContainer.1m')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1m')

// //       await spec.press('WalletDetailsGraphContainer.3m')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart3m')

// //       await spec.press('WalletDetailsGraphContainer.1y')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1y')

// //       await spec.press('WalletDetailsHeading.add')
// //       await spec.exists('AddFunds.QRCode')
// //       await spec.exists('AddFunds.address')
// //       await spec.press('AddFunds.Done')

// //       comp = await spec.findComponent('WalletDetails.iks')
// //       await test(comp)
      
// //       await spec.pause(2000)

// //       // LTC
// //       await spec.exists('WalletBalance.LTC')
// //       await spec.press('WalletBalance.LTC')
// //       await spec.press('WalletDetailsGraphContainer.1d')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1d')

// //       await spec.press('WalletDetailsGraphContainer.7d')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart7d')

// //       await spec.press('WalletDetailsGraphContainer.1m')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1m')

// //       await spec.press('WalletDetailsGraphContainer.3m')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart3m')

// //       await spec.press('WalletDetailsGraphContainer.1y')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1y')

// //       await spec.press('WalletDetailsHeading.add')
// //       await spec.exists('AddFunds.QRCode')
// //       await spec.exists('AddFunds.address')
// //       await spec.press('AddFunds.Done')

// //       comp = await spec.findComponent('WalletDetails.iks')
// //       await test(comp)
      
// //       await spec.pause(2000)

// //       // XRP
// //       await spec.exists('WalletBalance.XRP')
// //       await spec.press('WalletBalance.XRP')
// //       await spec.press('WalletDetailsGraphContainer.1d')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1d')

// //       await spec.press('WalletDetailsGraphContainer.7d')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart7d')

// //       await spec.press('WalletDetailsGraphContainer.1m')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1m')

// //       await spec.press('WalletDetailsGraphContainer.3m')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart3m')

// //       await spec.press('WalletDetailsGraphContainer.1y')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1y')

// //       await spec.press('WalletDetailsHeading.add')
// //       await spec.exists('AddFunds.QRCode')
// //       await spec.exists('AddFunds.address')
// //       await spec.press('AddFunds.Done')

// //       comp = await spec.findComponent('WalletDetails.iks')
// //       await test(comp)
      
// //       await spec.pause(2000)

// //       // OMG
// //       await spec.exists('WalletBalance.OMG')
// //       await spec.press('WalletBalance.OMG')
// //       await spec.press('WalletDetailsGraphContainer.1d')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1d')

// //       await spec.press('WalletDetailsGraphContainer.7d')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart7d')

// //       await spec.press('WalletDetailsGraphContainer.1m')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1m')

// //       await spec.press('WalletDetailsGraphContainer.3m')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart3m')

// //       await spec.press('WalletDetailsGraphContainer.1y')
// //       await spec.exists('WalletDetailsGraphContainer.LineChart1y')

// //       await spec.press('WalletDetailsHeading.add')
// //       await spec.exists('AddFunds.QRCode')
// //       await spec.exists('AddFunds.address')
// //       await spec.press('AddFunds.Done')

// //       comp = await spec.findComponent('WalletDetails.iks')
// //       await test(comp)
      
// //       await spec.pause(2000).pause(2000)

// //       // CEL
// //       await spec.exists('WalletBalance.CEL')
// //       await spec.press('WalletBalance.CEL')
// //       await spec.press('WalletDetailsHeading.add')
// //       await spec.exists('AddFunds.QRCode')
// //       await spec.exists('AddFunds.address')
// //       await spec.press('AddFunds.Done')

// //       comp = await spec.findComponent('WalletDetails.iks')
// //       await test(comp)
      
// //       await spec.pause(5000)

// //       // Transaction tab, wallet page
// //       await spec.press('TabNavigation.Transactions')
// //       await spec.press('WalletTransactions.AddFunds')
// //       await spec.exists('AddFunds.QRCode')
// //       await spec.exists('AddFunds.address')
// //       // await spec.press('AddFunds.BTC')
// //       await spec.press('AddFunds.Done')


// //       await spec.press('TabNavigation.Interest')
// //       await spec.exists('WalletInterest.chart')
// //       await spec.press('WalletInterest.1m')
// //       await spec.press('WalletInterest.3m')
// //       await spec.press('WalletInterest.1y')
// //       await spec.press('WalletInterests.AddMoreFunds')
// //       await spec.exists('AddFunds.QRCode')
// //       await spec.exists('AddFunds.address')
// //       await spec.press('AddFunds.Done')


// //       // await spec.exists('WalletInterest.chart')
// //       // await spec.press()
      
// //       //Test earn page, How to earn tab
// //       await spec.press('BottomNavigation.Earn')
// //       await spec.exists('InterestCalculatorScreen.exist')
// //       await spec.press('TabNavigation.How to earn')
// //       await spec.exists('HowToEarnInterest.exist')
// //       await spec.pause(1000)
// //       await spec.press('InterestExplanation.BalancePress')
// //       await spec.exists('InterestExplanation.Balance')
// //       await spec.pause(1000)
// //       await spec.press('InterestExplanation.TimePress')
// //       await spec.exists('InterestExplanation.Time')
// //       await spec.pause(1000)
// //       await spec.press('InterestExplanation.HodlPress')
// //       await spec.exists('InterestExplanation.Hodl')

// //     //Test earn page, calculator tab
// //       await spec.press('TabNavigation.Calculator')
// //       // Select a currency
// //       // BTC
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Bitcoin'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// //       // ETH
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Ethereum'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// //       // LTC
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Litecoin'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// //       // XRP
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Ripple'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// //       // OMG
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Omisego'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
// //       // BCH
// //       store.dispatch(actions.updateFormField('interestCurrency', 'Bitcoin cash'))
// //       store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
      
// //       // await spec.fillIn('InterestCalculatorScreen.interestAmount', 100)
// //       await spec.pause(5000)
// //       await spec.exists('InterestCalculatorScreen.perWeek')
// //       await spec.exists('InterestCalculatorScreen.perMonth')
// //       await spec.exists('InterestCalculatorScreen.per6Months')

// //       //Test Tracker page
// //       await spec.press('BottomNavigation.Tracker')
// //       await spec.press('Calculator.addCoins')

// //       //Test Borower page
// //       await spec.press('BottomNavigation.Borrow')

// //       //Test Profile page
// //       await spec.press('BottomNavigation.Profile')
      

// //       await spec.press('ProfileScreen.LogOut')
    
// //       });
// //     });
// }