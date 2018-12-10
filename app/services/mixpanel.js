import uuid from 'uuid'
import { Constants } from 'expo';
import ExpoMixpanelAnalytics from 'expo-mixpanel-analytics';

const { MIXPANEL_TOKEN } = Constants.manifest.extra;

export const mixpanelAnalytics = new ExpoMixpanelAnalytics(MIXPANEL_TOKEN);

let userEmail;

export const mixpanelEvents = {
  createAlias: (userId) => mixpanelAnalytics.track('$create_alias', { 'alias': userId, email: userEmail }),
  // Signup Events
  signupButton: () => mixpanelAnalytics.track('Pressed sign up button', { email: userEmail }),
  startedSignup: (method) => mixpanelAnalytics.track('Started sign up', { method, email: userEmail }),
  finishedSignup: (method) => mixpanelAnalytics.track('Finished sign up', { method, email: userEmail }),
  // Tracker Events
  addCoinButton: () => mixpanelAnalytics.track('Pressed add another coin button on Tracker', { email: userEmail }),
  addCoinToTracker: (coinShort) => mixpanelAnalytics.track('Coin added to Tracker', { coin: coinShort, email: userEmail }),
  // KYC Events
  profileDetailsAdded,
  profileAddressAdded,
  profileTaxpayerInfoAdded,
  documentsAdded,
  phoneVerified,
  KYCStarted: () => mixpanelAnalytics.track('KYC Started', { email: userEmail }),
  // Wallet Events
  pressWalletCard: (coinShort) => mixpanelAnalytics.track('Pressed wallet card', { coin: coinShort.toUpperCase(), email: userEmail }),
  pressAddFunds: () => mixpanelAnalytics.track('Funds added', { email: userEmail }),
  confirmWithdraw: ({ amountUsd, amountCrypto, currency }) => mixpanelAnalytics.track('Withdraw complete', { amountUsd, amountCrypto, currency, email: userEmail }),
  // Other Events
  changeTab: (tab) => mixpanelAnalytics.track(`Changed tab to ${tab}`, { email: userEmail }),
  openApp: () => mixpanelAnalytics.track('App opened', { email: userEmail }),
  navigation: (screenName) => mixpanelAnalytics.track(`Navigated to ${screenName}`, { email: userEmail }),
  estimationExplanation: () => mixpanelAnalytics.track('Pressed Loan Estimation explanation', { email: userEmail }),

  applyForLoan: (loanData) => mixpanelAnalytics.track('Applied for loan', { email: userEmail, ...loanData }),
  celPayTransfer: (celPayData) => mixpanelAnalytics.track('CelPay initialized', { email: userEmail, ...celPayData }),
}

export const updateMixpanelBalances = async function (balances) {
  return await mixpanelAnalytics.people_set(balances);
}

export const initMixpanelUser = async function (user) {
  if (mixpanelAnalytics.userId === user.email) return;

  mixpanelAnalytics.identify(user.email);
  userEmail = user.email;

  const metaData = {
    "$first_name": user.first_name,
    "$last_name": user.last_name,
    "$email": user.email,
    "Created At": user.created_at,
    Citizenship: user.citizenship,
    "KYC Country": user.country,
    "KYC City": user.city,
    "Date of Birth": user.date_of_birth,
    "Gender": user.gender,
    "Phone verified": user.cellphone_verified
  }
  if (user.ssn) {
    metaData["SSN filled"] = true;
  }
  if (user.itin) {
    metaData["Tax ID"] = true;
  }

  await mixpanelAnalytics.people_set(metaData)
}

export const logoutMixpanelUser = async function () {
  userEmail = undefined;
  mixpanelAnalytics.identify(uuid());
}

export const registerMixpanelUser = async function (user) {
  await mixpanelEvents.createAlias(user.email);

  mixpanelAnalytics.identify(user.email);
  userEmail = user.email;

  await mixpanelAnalytics.people_set({
    "$first_name": user.first_name,
    "$last_name": user.last_name,
    "$email": user.email,
    "Created At": user.created_at,
  })
}

async function profileDetailsAdded(profileDetails) {
  mixpanelAnalytics.track('KYC Profile details successfully added', {
    email: userEmail
  });

  await mixpanelAnalytics.people_set({
    "$first_name": profileDetails.first_name,
    "$last_name": profileDetails.last_name,
    "Date of Birth": profileDetails.date_of_birth,
    "Gender": profileDetails.gender,
    Citizenship: profileDetails.citizenship,
  })
}

async function profileAddressAdded(profileAddress) {
  mixpanelAnalytics.track('KYC Profile address successfully added', {
    email: userEmail
  });

  await mixpanelAnalytics.people_set({
    "KYC Country": profileAddress.address.country,
    "KYC City": profileAddress.address.city,
    "Address filled": true
  })
}

async function profileTaxpayerInfoAdded(country, profileTaxpayerInfo) {
  const metaData = {};
  if (country === "United States") {
    metaData["SSN filled"] = true;
  } else if (profileTaxpayerInfo.taxpayer_info.itin) {
    metaData["Tax ID"] = true;
  }

  mixpanelAnalytics.track('KYC Profile Taxpayer info successfully added', {
    email: userEmail
  });

  await mixpanelAnalytics.people_set(metaData)
}

async function documentsAdded() {
  mixpanelAnalytics.track('KYC Documents successfully uploaded', {
    email: userEmail
  })

  await mixpanelAnalytics.people_set({
    "Photo Uploaded": true
  })
}
async function phoneVerified() {
  mixpanelAnalytics.track('Phone verified', {
    email: userEmail
  })

  await mixpanelAnalytics.people_set({
    "Phone Verified": true
  })
}