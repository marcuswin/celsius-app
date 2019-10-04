import { Platform } from "react-native";
import appsFlyer from "react-native-appsflyer";

import store from "../redux/store";
import appUtil from "./app-util";

const advertisingId = store.getState().app.advertisingId;

let revisionId = "";
let version = "";
appUtil.getRevisionId().then(metadata => {
  version = metadata.codePushVersion.version;
  revisionId = metadata.codePushVersion.label;
});

const appInfo = {
  revisionId,
  appVersion: version,
  os: Platform.OS,
  advertisingId
};

// TODO probably destroy
const analytics = {
  registrationCompleted,
  kycStarted,
  withdrawCompleted,
  celpayCompleted,
  loanApplied
};

// Apps flyer
/**
 * Fires an event when a users completes the registration process (sets PIN number)
 *
 * @param {object} user
 * @param {object} user.facebook_id - indicates user registered through facebook
 * @param {object} user.google_id - indicates user registered through google
 * @param {object} user.twitter_id - indicates user registered through twitter
 * @param {object} user.id
 * @param {object} user.referral_link_id - id of the person who referred the user
 */
async function registrationCompleted(user) {
  let method = "email";
  if (user.facebook_id) method = "facebook";
  if (user.google_id) method = "google";
  if (user.twitter_id) method = "twitter";

  await appsFlyer.trackEvent("ACHIEVE_LEVEL", {
    ...appInfo,
    user_data: { developer_identity: user.id },
    method,
    referral_link_id: user.referral_link_id,
    action: "User completed registration",
    content_items: [
      {
        $og_description: method
      }
    ]
  });
}

/**
 * Fires an event when a user starts KYC verification
 */
async function kycStarted() {
  const user = store.getState().user.profile;
  const userId = user.id;
  const description = "1";

  await appsFlyer.trackEvent("COMPLETE_TUTORIAL", {
    ...appInfo,
    user_data: { developer_identity: userId },
    products: {
      $og_description: description,
      description,
      action: "User started KYC",
      content_item: [
        {
          $sku: 1
        }
      ]
    }
  });
}

/**
 * Fires an event when a user finishes a withdrawal
 * @todo: check if needs moving to BE?
 *
 * @param {object} withdrawTransaction
 */
async function withdrawCompleted(withdrawTransaction) {
  const { currencyRatesShort } = store.getState().currencies;
  const payload = {
    ...withdrawTransaction,
    amountUsd:
      withdrawTransaction.amount * currencyRatesShort[withdrawTransaction.coin]
  };

  await appsFlyer.trackEvent("ADD_TO_WISHLIST", {
    ...appInfo,
    revenue: Number(payload.amountUsd),
    currency: "USD",
    amount_usd: payload.amountUsd.toString(),
    amount_crypto: payload.amount.toString(),
    coin: payload.coin,
    action: "Withdraw",
    id: payload.id
  });
}

/**
 * Fires an event when a user finishes a CelPay
 *
 * @param {object} celPayTransfer
 * @param {string} celPayTransfer.amount
 * @param {string} celPayTransfer.coin - eg. BTC|ETH
 * @param {uuid} celPayTransfer.id
 */
async function celpayCompleted(celPayTransfer) {
  const { currencyRatesShort } = store.getState().currencies;

  const amountUsd =
    celPayTransfer.amount *
    currencyRatesShort[celPayTransfer.coin.toLowerCase()];

  await appsFlyer.trackEvent("SPEND_CREDITS", {
    ...appInfo,
    revenue: Number(amountUsd),
    currency: "USD",
    amount_usd: amountUsd.toString(),
    amount_crypto: celPayTransfer.amount.toString(),
    coin: celPayTransfer.coin,
    id: celPayTransfer.id,
    action: "CelPay"
  });
}

/**
 * Fires an event when a user applies for a loan
 *
 * @param {object} loanData
 */
async function loanApplied(loanData) {
  await appsFlyer.trackEvent("Product Added", {
    // ADD_TO_CART
    ...appInfo,
    revenue: Number(loanData.loan_amount),
    currency: "USD",
    coin: loanData.coin,
    amount_usd: loanData.amount_collateral_usd.toString(),
    amount_crypto: loanData.amount_collateral_crypto.toString(),
    ltv: loanData.ltv.toString(),
    interest: loanData.interest.toString(),
    monthly_payment: loanData.monthly_payment.toString(),
    id: loanData.id,
    action: "Applied for loan"
  });
}

export default analytics;
