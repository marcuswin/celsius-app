import { Segment } from "expo";
import store from '../redux/store';

const analyticsEvents = {
  initUser: async () => { },
  identifySegmentUser: async () => { },
  logoutUser: async () => { },
  signupButton: () => { },
  buttonPressed: () => { },
  startedSignup: () => { },
  finishedSignup: async (method, referralLinkId, user) => {
    const userId = user.id;
    await Segment.trackWithProperties('ACHIEVE_LEVEL', {
      user_data: { developer_identity: userId },
      method,
      referral_link_id: referralLinkId,
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
    await analyticsEvents.finishedSignup(method, user.referral_link_id, user);
  },
  profileDetailsAdded: () => { },
  documentsAdded: () => { },
  phoneVerified: async () => {
    const { user } = store.getState().users;
    const userId = user.id;
    const description = '1';

    await Segment.trackWithProperties('COMPLETE_TUTORIAL', {
      user_data: { developer_identity: userId },
      products: {
        $og_description: description,
        description
      }
    })
  },
  KYCStarted: () => { },
  pressWalletCard: () => { },
  pressAddFunds: () => { },
  confirmWithdraw: async (withdrawInfo) => {
    const { currencyRatesShort } = store.getState().generalData;
    const info = {
      ...withdrawInfo,
      amountUsd: withdrawInfo.amount * currencyRatesShort[withdrawInfo.coin],
    }

    await Segment.trackWithProperties('ADD_TO_WISHLIST', {
      revenue: Number(info.amountUsd),
      currency: 'USD',
      action: 'Withdraw',
      amount_usd: info.amountUsd.toString(),
      amount_crypto: info.amount.toString(),
      coin: info.coin
    });
  },
  changeTab: () => { },
  openApp: () => { },
  navigation: () => { },
  celPayTransfer: async (celPayInfo) => {
    await Segment.trackWithProperties('SPEND_CREDITS', {
      revenue: Number(celPayInfo.amountUsd),
      currency: 'USD',
      action: 'CelPay',
      amount_usd: celPayInfo.amountUsd.toString(),
      amount_crypto: celPayInfo.amount.toString(),
      coin: celPayInfo.coin
    });
  },
  applyForLoan: async (loanData) => {
    await Segment.trackWithProperties('Product Added', { // ADD_TO_CART
      revenue: Number(loanData.amount_collateral_usd),
      currency: "USD",
      action: 'Applied for loan',
      id: loanData.id,
      coin: loanData.coin,
      amount_usd: loanData.amount_collateral_usd.toString(),
      amount_crypto: loanData.amount_collateral_crypto.toString(),
      ltv: loanData.ltv.toString(),
      interest: loanData.interest.toString(),
      monthly_payment: loanData.monthly_payment.toString()
    })
  },
  profileAddressAdded: () => { },
  profileTaxpayerInfoAdded: () => { },
  sessionStart: async () => { },
  sessionEnd: async () => { }
}

export { analyticsEvents }
