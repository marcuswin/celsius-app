// TODO(fj): Rewrite from scratch

// import Constants from 'expo-constants';

// import * as Segment from 'expo-analytics-segment';
// import { initMixpanelUser, logoutMixpanelUser } from "../services/mixpanel";
// import branchService from "../services/branch-service";
// import store from '../redux/store';

// const { ENV } = Constants.extra;
const analyticsEventsTest = {
  initUser: async () => { },
  identifySegmentUser: async () => { },
  logoutUser: async () => { },
  signupButton: () => { },
  buttonPressed: () => { },
  startedSignup: () => { },
  finishedSignup: async () => { },
  pinSet: () => { },
  profileDetailsAdded: () => { },
  documentsAdded: () => { },
  phoneVerified: async () => { },
  KYCStarted: () => { },
  pressWalletCard: () => { },
  pressAddFunds: () => { },
  confirmWithdraw: async () => { },
  changeTab: () => { },
  openApp: () => { },
  navigation: () => { },
  celPayTransfer: async () => { },
  applyForLoan: async () => { },
  profileAddressAdded: () => { },
  profileTaxpayerInfoAdded: () => { },
  sessionStart: async () => { },
  sessionEnd: async () => { }
}
// const analyticsEventsUtil = {
//   initUser: async (user) => {
//     await initMixpanelUser(user);
//   },
//   identifySegmentUser: async () => {
//     const { profile } = store.getState().user;
//     await Segment.identifyWithTraits(profile.id, {
//       email: profile.email,
//     })
//   },
//   logoutUser: async () => {
//     await logoutMixpanelUser();
//     await Segment.reset();
//   },
//   signupButton: () => {
//     mixpanelEvents.signupButton()
//     const metadata = { btn: 'Skip Intro', screen: 'Welcome' }
//     branchService.createEvent({ event: 'BUTTON_PRESSED', identity: 'no-user', metadata })
//   },
//   buttonPressed: (btn, screen) => {
//     const { profile } = store.getState().user;
//     mixpanelEvents.buttonPressed(btn, screen)
//     const metadata = { btn, screen }
//     branchService.createEvent({ event: 'BUTTON_PRESSED', identity: (profile ? profile.id : 'no-user'), metadata })
//   },
//   startedSignup: (method) => {
//     mixpanelEvents.startedSignup(method);
//     const metadata = { method }
//     branchService.createEvent({ event: 'STARTED_SIGNUP', identity: 'no-user', metadata })
//   },
//   finishedSignup: async (method, referralLinkId, user) => {
//     mixpanelEvents.finishedSignup(method, referralLinkId, user)

//     await Segment.trackWithProperties('COMPLETE_REGISTRATION', {
//       method,
//       referral_link_id: referralLinkId,
//       fb_registration_method: method,
//       referralLinkId
//     })
//   },
//   pinSet: () => {
//     const { profile } = store.getState().user;
//     mixpanelEvents.pinSet();
//     const metadata = { has_pin: true };
//     branchService.createEvent({ event: 'PIN_SET', identity: profile.id, metadata });
//   },
//   profileDetailsAdded: (profileDetails) => {
//     const { profile } = store.getState().user;
//     mixpanelEvents.profileDetailsAdded(profileDetails)
//     const metadata = {
//       "First Name": profileDetails.first_name,
//       "Last Name": profileDetails.last_name,
//       "Date of Birth": profileDetails.date_of_birth,
//       "Gender": profileDetails.gender,
//       Citizenship: profileDetails.citizenship
//     }
//     branchService.createEvent({ event: 'PROFILE_DETAILS_ADDED', identity: profile.id, metadata })
//   },
//   documentsAdded: () => {
//     mixpanelEvents.documentsAdded()
//     const { profile } = store.getState().user;
//     branchService.createEvent({ event: 'DOCUMENTS_ADDED', identity: profile.id })
//   },
//   phoneVerified: async () => {
//     const { profile } = store.getState().user;
//     const userId = profile.id;
//     const description = 'completed';

//     mixpanelEvents.phoneVerified()
//     branchService.createEvent({ event: 'PHONE_VERIFIED', identity: userId })

//     await Segment.trackWithProperties('ACHIEVE_LEVEL', {
//       user_data: { developer_identity: userId },
//       products: {
//         $og_description: description,
//         description
//       }
//     })
//     // branchEvents.achieveLevel(user.id, 'completed')
//   },
//   KYCStarted: () => {
//     const { profile } = store.getState().user;
//     mixpanelEvents.KYCStarted()
//     branchService.createEvent({ event: 'KYC_STARTED', identity: profile.id })
//   },

//   pressWalletCard: (coinShort) => {
//     const { profile } = store.getState().user;
//     mixpanelEvents.pressWalletCard(coinShort)
//     branchService.createEvent({ event: 'WALLET_CARD_PRESSED', identity: profile.id, metadata: { coin: coinShort } })
//   },
//   pressAddFunds: () => {
//     const { profile } = store.getState().user;
//     mixpanelEvents.pressAddFunds()
//     const metadata = { btn: 'Add funds', screen: 'AddFunds' }
//     branchService.createEvent({ event: 'BUTTON_PRESSED', identity: profile.id, metadata })
//   },
//   confirmWithdraw: async (withdrawInfo) => {
//     const { currencyRatesShort } = store.getState().generalData;
//     const info = {
//       ...withdrawInfo,
//       amountUsd: withdrawInfo.amount * currencyRatesShort[withdrawInfo.coin],
//     }

//     mixpanelEvents.confirmWithdraw(info)
//     await Segment.trackWithProperties('ADD_TO_WISHLIST', {
//       revenue: Number(info.amountUsd),
//       currency: 'USD',
//       action: 'Withdraw',
//       amount_usd: info.amountUsd.toString(),
//       amount_crypto: info.amount.toString(),
//       coin: info.coin,
//       // products: JSON.stringify([{
//       //   name: info.coin,
//       //   sku: info.id,
//       // }])
//     });
//   },
//   changeTab: (tab) => {
//     const { profile } = store.getState().user;
//     mixpanelEvents.changeTab(tab)
//     const metadata = { tab };
//     branchService.createEvent({ event: 'CHANGE_TAB', identity: profile.id, metadata })
//   },
//   openApp: () => {
//     const { profile } = store.getState().user;
//     mixpanelEvents.openApp()
//     branchService.createEvent({ event: 'APP_OPENED', identity: profile ? profile.id : 'no-user' })
//   },
//   navigation: (screenName) => {
//     const { profile } = store.getState().user;
//     mixpanelEvents.navigation(screenName)
//     const metadata = { screen: screenName };
//     branchService.createEvent({ event: 'NAVIGATE_TO', identity: profile ? profile.id : 'no-user', metadata })
//   },
//   celPayTransfer: async (celPayInfo) => {
//     mixpanelEvents.celPayTransfer(celPayInfo);
//     await Segment.trackWithProperties('SPEND_CREDITS', {
//       revenue: Number(celPayInfo.amountUsd),
//       currency: 'USD',
//       action: 'CelPay',
//       amount_usd: celPayInfo.amountUsd.toString(),
//       amount_crypto: celPayInfo.amount.toString(),
//       coin: celPayInfo.coin,
//       // products: JSON.stringify([{
//       //   name: celPayInfo.coin,
//       //   sku: celPayInfo.hash,
//       // }])
//     });
//     // branchEvents.spendCredits(user.id, celPayInfo);
//   },
//   applyForLoan: async (loanData) => {
//     mixpanelEvents.applyForLoan(loanData);
//     // console.log(loanData.id)
//     await Segment.trackWithProperties('Product Added', {
//       revenue: Number(loanData.collateral_amount_usd),
//       currency: "USD",
//       action: 'Applied for loan',
//       id: loanData.id,
//       coin: loanData.coin,
//       amount_usd: loanData.collateral_amount_usd.toString(),
//       amount_crypto: loanData.collateral_amount_crypto.toString(),
//       ltv: loanData.ltv.toString(),
//       interest: loanData.interest.toString(),
//       monthly_payment: loanData.monthly_payment.toString(),

//       // products: JSON.stringify([{
//       //   name: loanData.coin,
//       //   sku: loanData.id
//       // }])
//     })
//     // branchEvents.addToCart(user.id, loanData);
//   },
//   profileAddressAdded: (profileAddress) => {
//     const { profile } = store.getState().user;
//     mixpanelEvents.profileAddressAdded(profileAddress)
//     const metadata = {
//       "Country": profileAddress.address.country,
//       "Address filled": true
//     }
//     branchService.createEvent({ event: 'PROFILE_ADDRESS_ADDED', identity: profile.id, metadata })
//   },
//   profileTaxpayerInfoAdded: (profileTaxpayerInfo) => {
//     const { profile } = store.getState().user;
//     mixpanelEvents.profileTaxpayerInfoAdded(profile.country, profileTaxpayerInfo)
//     const metadata = {};
//     if (profile.country === "United States") {
//       metadata["SSN filled"] = true;
//     } else if (profileTaxpayerInfo.taxpayer_info.itin) {
//       metadata["Tax ID"] = true;
//     }
//     branchService.createEvent({ event: 'PROFILE_TAXPAYERINFO_ADDED', identity: profile.id, metadata })
//   },
//   sessionStart: async () => {
//     await mixpanelEvents.sessionStart();
//     await analyticsEvents.identifySegmentUser();
//   },
//   sessionEnd: async () => {
//     await mixpanelEvents.sessionEnd();
//   }
// }

// const analyticsEvents = ENV === 'NEVER_USE' ? analyticsEventsUtil : analyticsEventsTest;
const analyticsEvents = analyticsEventsTest

export { analyticsEvents }
