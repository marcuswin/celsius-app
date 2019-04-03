import { Constants, Segment } from "expo";
import { Platform } from "react-native";
import store from "../redux/store";

const { revisionId, version } = Constants.manifest;

const appInfo = {
  revisionId,
  appVersion: version,
  os: Platform.OS,
}

const analytics = {
  identifyUser,
  logoutUser,
  registrationCompleted,
  kycStarted,
  withdrawCompleted,
  celpayCompleted,
  loanApplied,
}

/**
 * Identifies the user on Segment -> Mixpanel, Branch
 */
async function identifyUser() {
  const user = store.getState().user.profile
  if (!user) return

  Segment.identifyWithTraits(user.id, {
    email: user.email
  })
}

/**
 * Logs the user out of Segment
 */
async function logoutUser() {
  await Segment.reset();
}


/**
 * Fires an event when a users completes the registration process (sets PIN number)
 *
 * @param {string} method - email|facebook|google|twitter
 * @param {uuid} referralLinkId - id of the link or promo code user used for registration
 * @param {object} user
 */
async function registrationCompleted(method, referralLinkId, user) {
  const userId = user.id;
  await Segment.trackWithProperties('ACHIEVE_LEVEL', {
    ...appInfo,
    user_data: { developer_identity: userId },
    method,
    referral_link_id: referralLinkId,
  })
}


/**
 * Fires an event when a user starts KYC verification
 */
async function kycStarted() {
  const user = store.getState().user.profile;
  const userId = user.id;
  const description = '1';

  await Segment.trackWithProperties('COMPLETE_TUTORIAL', {
    ...appInfo,
    user_data: { developer_identity: userId },
    products: {
      $og_description: description,
      description
    }
  })
}


/**
 * Fires an event when a user finishes a withdrawal
 * @todo: check if needs moving to BE?
 *
 * @param {object} withdrawInfo
 */
async function withdrawCompleted(withdrawInfo) {
  const { currencyRatesShort } = store.getState().generalData;
  const info = {
    ...withdrawInfo,
    amountUsd: withdrawInfo.amount * currencyRatesShort[withdrawInfo.coin],
  }

  await Segment.trackWithProperties('ADD_TO_WISHLIST', {
    ...appInfo,
    revenue: Number(info.amountUsd),
    currency: 'USD',
    action: 'Withdraw',
    amount_usd: info.amountUsd.toString(),
    amount_crypto: info.amount.toString(),
    coin: info.coin
  });
}


/**
 * Fires an event when a user finishes a CelPay
 *
 * @param {object} celPayInfo
 */
async function celpayCompleted(celPayInfo) {
  await Segment.trackWithProperties('SPEND_CREDITS', {
    ...appInfo,
    revenue: Number(celPayInfo.amountUsd),
    currency: 'USD',
    action: 'CelPay',
    amount_usd: celPayInfo.amountUsd.toString(),
    amount_crypto: celPayInfo.amount.toString(),
    coin: celPayInfo.coin
  });
}


/**
 * Fires an event when a user applies for a loan
 *
 * @param {object} loanData
 */
async function loanApplied(loanData) {
  await Segment.trackWithProperties('Product Added', { // ADD_TO_CART
    ...appInfo,
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
}

// TODO(fj): handle test environment
export default analytics
