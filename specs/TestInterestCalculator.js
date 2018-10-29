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
    
    spec.describe('Wallet page, transactions and interest', function() {
      spec.it('Addresses and QR codes exists', async function() {


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
				
				store.dispatch(actions.updateFormField('currency', 'eth'))
				await spec.exists('AddFunds.QRCode')
        await spec.exists('AddFunds.address')
				
				store.dispatch(actions.updateFormField('currency', 'btc'))
				await spec.exists('AddFunds.QRCode')
        await spec.exists('AddFunds.address')
				
				store.dispatch(actions.updateFormField('currency', 'ltc'))
				await spec.exists('AddFunds.QRCode')
        await spec.exists('AddFunds.address')
				
				store.dispatch(actions.updateFormField('currency', 'xrp'))
				await spec.exists('AddFunds.QRCode')
        await spec.exists('AddFunds.address')
				
				store.dispatch(actions.updateFormField('currency', 'omg'))
				await spec.exists('AddFunds.QRCode')
        await spec.exists('AddFunds.address')
				
				store.dispatch(actions.updateFormField('currency', 'bch'))
				await spec.exists('AddFunds.QRCode')
        await spec.exists('AddFunds.address')
				await spec.press('AddFunds.Done')

        //Test earn page, How to earn tab
        await spec.press('BottomNavigation.Earn')
				await spec.exists('InterestCalculatorScreen.exist')
				await spec.pause(5000)

				});
			});
		
		spec.describe('Earn page, interest currnecy', function() {
			spec.it('', async function() {

				// Select a currency
				// BTC
				await spec.pause(5000)
        store.dispatch(actions.updateFormField('interestCurrency', 'BTC'))
				store.dispatch(actions.updateFormField('interestAmount', `123`))
				await spec.pause(5000)
				await spec.exists('InterestCalculatorScreen.perWeek')
        await spec.exists('InterestCalculatorScreen.perMonth')
				await spec.exists('InterestCalculatorScreen.per6Months')
				// ETH
				store.dispatch(actions.updateFormField('interestCurrency', 'ETH'))
				store.dispatch(actions.updateFormField('interestAmount', `321`))
				await spec.pause(5000)
				await spec.exists('InterestCalculatorScreen.perWeek')
        await spec.exists('InterestCalculatorScreen.perMonth')
				await spec.exists('InterestCalculatorScreen.per6Months')
        // LTC
        store.dispatch(actions.updateFormField('interestCurrency', 'LTC'))
				store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
				await spec.pause(5000)
				await spec.exists('InterestCalculatorScreen.perWeek')
        await spec.exists('InterestCalculatorScreen.perMonth')
				await spec.exists('InterestCalculatorScreen.per6Months')
        // XRP
        store.dispatch(actions.updateFormField('interestCurrency', 'XRP'))
				store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
				await spec.pause(5000)
				await spec.exists('InterestCalculatorScreen.perWeek')
        await spec.exists('InterestCalculatorScreen.perMonth')
				await spec.exists('InterestCalculatorScreen.per6Months')
        // OMG
        store.dispatch(actions.updateFormField('interestCurrency', 'OMG'))
				store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))
				await spec.pause(5000)
				await spec.exists('InterestCalculatorScreen.perWeek')
        await spec.exists('InterestCalculatorScreen.perMonth')
				await spec.exists('InterestCalculatorScreen.per6Months')
        // BCH
        store.dispatch(actions.updateFormField('interestCurrency', 'BCH'))
				store.dispatch(actions.updateFormField('interestAmount', `${ new Date().getTime() }`))  
				await spec.pause(5000)
        await spec.exists('InterestCalculatorScreen.perWeek')
        await spec.exists('InterestCalculatorScreen.perMonth')
				await spec.exists('InterestCalculatorScreen.per6Months')
				
			});
		});

		spec.describe('Earn page, interest currnecy1', function() {
			spec.it('', async function() {

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

        // Test earn page, calculator tab
        await spec.press('TabNavigation.Calculator')
       

        //Test Tracker page
        await spec.press('BottomNavigation.Tracker')

        //Test Borower page
        await spec.press('BottomNavigation.Borrow')

        //Test Profile page
        await spec.press('BottomNavigation.Profile')


        await spec.press('ProfileScreen.LogOut')


			});
    });
}