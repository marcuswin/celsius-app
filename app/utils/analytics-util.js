import { Segment } from "expo";
import { mixpanelEvents, initMixpanelUser, logoutMixpanelUser } from "../services/mixpanel";
import branchService from "../services/branch-service";
import store from '../redux/store';
import { branchEvents } from "./branch-util";

export const analyticsEvents = {
  initUser: async (user) => {
    await initMixpanelUser(user);
  },
  identifySegmentUser: async () => {
    const { user } = store.getState().users;
    await Segment.identifyWithTraits(user.id, {
      email: user.email,
    })
  },
  logoutUser: async () => {
    await logoutMixpanelUser();
    await Segment.reset();
  },
  signupButton: () => {
    mixpanelEvents.signupButton()
    const metadata = { btn: 'Skip Intro', screen: 'Welcome' }
    branchService.createEvent({ event: 'BUTTON_PRESSED', identity: 'no-user', metadata })
  },
  buttonPressed: (btn, screen) => {
    const { user } = store.getState().users;
    mixpanelEvents.buttonPressed(btn, screen)
    const metadata = { btn, screen }
    branchService.createEvent({ event: 'BUTTON_PRESSED', identity: (user ? user.id : 'no-user'), metadata })
  },
  startedSignup: (method, user) => {
    mixpanelEvents.startedSignup(method, user);
    const metadata = { method }
    branchService.createEvent({ event: 'STARTED_SIGNUP', identity: 'no-user', metadata })
  },
  finishedSignup: async (method, referralLinkId, user) => {
    mixpanelEvents.finishedSignup(method, referralLinkId, user)

    await Segment.trackWithProperties('COMPLETE_REGISTRATION', {
      method,
      referral_link_id: referralLinkId,
      fb_registration_method: method,
      referralLinkId
    })
  },
  pinSet: async () => {
    const { user } = store.getState().users;
    let method = "Email";
    if (user.facebook_id) {
      method = "Facebook"
    }
    if (user.google_id) {
      method = "Google"
    }
    if (user.twitter_id) {
      method = "Twitter"
    }
    await analyticsEvents.finishedSignup(method, user.referral_link_id, user)
    await mixpanelEvents.pinSet();
    const metadata = { has_pin: true };
    branchEvents.createEvent({ event: 'PIN_SET', identity: user.id, metadata });
  },
  profileDetailsAdded: (profileDetails) => {
    const { user } = store.getState().users;
    mixpanelEvents.profileDetailsAdded(profileDetails)
    const metadata = {
      "First Name": profileDetails.first_name,
      "Last Name": profileDetails.last_name,
      "Date of Birth": profileDetails.date_of_birth,
      "Gender": profileDetails.gender,
      Citizenship: profileDetails.citizenship
    }
    branchService.createEvent({ event: 'PROFILE_DETAILS_ADDED', identity: user.id, metadata })
  },
  documentsAdded: () => {
    mixpanelEvents.documentsAdded()
    const { user } = store.getState().users;
    branchService.createEvent({ event: 'DOCUMENTS_ADDED', identity: user.id })
  },
  phoneVerified: async () => {
    const { user } = store.getState().users;
    const userId = user.id;
    const description = 'completed';

    mixpanelEvents.phoneVerified()
    branchService.createEvent({ event: 'PHONE_VERIFIED', identity: user.id })

    await Segment.trackWithProperties('ACHIEVE_LEVEL', {
      user_data: { developer_identity: userId },
      products: {
        $og_description: description,
        description
      }
    })
    // branchEvents.achieveLevel(user.id, 'completed')
  },
  KYCStarted: () => {
    const { user } = store.getState().users;
    mixpanelEvents.KYCStarted()
    branchService.createEvent({ event: 'KYC_STARTED', identity: user.id })
  },

  pressWalletCard: (coinShort) => {
    const { user } = store.getState().users;
    mixpanelEvents.pressWalletCard(coinShort)
    branchService.createEvent({ event: 'WALLET_CARD_PRESSED', identity: user.id, metadata: { coin: coinShort } })
  },
  pressAddFunds: () => {
    const { user } = store.getState().users;
    mixpanelEvents.pressAddFunds()
    const metadata = { btn: 'Add funds', screen: 'AddFunds' }
    branchService.createEvent({ event: 'BUTTON_PRESSED', identity: user.id, metadata })
  },
  confirmWithdraw: async (withdrawInfo) => {
    const { currencyRatesShort } = store.getState().generalData;
    const info = {
      ...withdrawInfo,
      amountUsd: withdrawInfo.amount * currencyRatesShort[withdrawInfo.coin],
    }

    mixpanelEvents.confirmWithdraw(info)
    await Segment.trackWithProperties('ADD_TO_WISHLIST', {
      revenue: Number(info.amountUsd),
      currency: 'USD',
      action: 'Withdraw',
      amount_usd: info.amountUsd.toString(),
      amount_crypto: info.amount.toString(),
      coin: info.coin,
      // products: JSON.stringify([{
      //   name: info.coin,
      //   sku: info.id,
      // }])
    });
  },
  changeTab: (tab) => {
    const { user } = store.getState().users;
    mixpanelEvents.changeTab(tab)
    const metadata = { tab };
    branchService.createEvent({ event: 'CHANGE_TAB', identity: user.id, metadata })
  },
  openApp: () => {
    const { user } = store.getState().users;
    mixpanelEvents.openApp()
    branchService.createEvent({ event: 'APP_OPENED', identity: user ? user.id : 'no-user' })
  },
  navigation: (screenName) => {
    const { user } = store.getState().users;
    mixpanelEvents.navigation(screenName)
    const metadata = { screen: screenName };
    branchService.createEvent({ event: 'NAVIGATE_TO', identity: (user ? user.id : 'no-user'), metadata })
  },
  celPayTransfer: async (celPayInfo) => {
    mixpanelEvents.celPayTransfer(celPayInfo);
    await Segment.trackWithProperties('SPEND_CREDITS', {
      revenue: Number(celPayInfo.amountUsd),
      currency: 'USD',
      action: 'CelPay',
      amount_usd: celPayInfo.amountUsd.toString(),
      amount_crypto: celPayInfo.amount.toString(),
      coin: celPayInfo.coin,
      // products: JSON.stringify([{
      //   name: celPayInfo.coin,
      //   sku: celPayInfo.hash,
      // }])
    });
    // branchEvents.spendCredits(user.id, celPayInfo);
  },
  applyForLoan: async (loanData) => {
    mixpanelEvents.applyForLoan(loanData);
    console.log(loanData.id)
    await Segment.trackWithProperties('Product Added', {
      revenue: Number(loanData.collateral_amount_usd),
      currency: "USD",
      action: 'Applied for loan',
      id: loanData.id,
      coin: loanData.coin,
      amount_usd: loanData.collateral_amount_usd.toString(),
      amount_crypto: loanData.collateral_amount_crypto.toString(),
      ltv: loanData.ltv.toString(),
      interest: loanData.interest.toString(),
      monthly_payment: loanData.monthly_payment.toString(),

      // products: JSON.stringify([{
      //   name: loanData.coin,
      //   sku: loanData.id
      // }])
    })
    // branchEvents.addToCart(user.id, loanData);
  },
  profileAddressAdded: (profileAddress) => {
    const { user } = store.getState().users;
    mixpanelEvents.profileAddressAdded(profileAddress)
    const metadata = {
      "Country": profileAddress.address.country,
      "Address filled": true
    }
    branchService.createEvent({ event: 'PROFILE_ADDRESS_ADDED', identity: user.id, metadata })
  },
  profileTaxpayerInfoAdded: (profileTaxpayerInfo) => {
    const { user } = store.getState().users;
    mixpanelEvents.profileTaxpayerInfoAdded(user.country, profileTaxpayerInfo)
    const metadata = {};
    if (user.country === "United States") {
      metadata["SSN filled"] = true;
    } else if (profileTaxpayerInfo.taxpayer_info.itin) {
      metadata["Tax ID"] = true;
    }
    branchService.createEvent({ event: 'PROFILE_TAXPAYERINFO_ADDED', identity: user.id, metadata })
  },
  sessionStart: async () => {
    await mixpanelEvents.sessionStart();
    await analyticsEvents.identifySegmentUser();
  },
  sessionEnd: async () => {
    await mixpanelEvents.sessionEnd();
  }
}
