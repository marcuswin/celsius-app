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
  documentsAdded: () => mixpanelAnalytics.track('KYC Documents successfully uploaded', { email: userEmail }),
  phoneVerified: () => mixpanelAnalytics.track('Phone verified', { email: userEmail }),
  KYCStarted: () => mixpanelAnalytics.track('KYC Started', { email: userEmail }),
  // Wallet Events
  pressWalletCard: (coinShort) => mixpanelAnalytics.track('Pressed wallet card', { coin: coinShort.toUpperCase(), email: userEmail }),
  pressAddFunds: () => mixpanelAnalytics.track('Funds added', { email: userEmail }),
  confirmWithdraw: ({ amountUsd, amountCrypto, currency }) => mixpanelAnalytics.track('Withdraw complete', { amountUsd, amountCrypto, currency, email: userEmail }),
  // Other Events
  changeTab: (tab) => mixpanelAnalytics.track(`Changed tab to ${tab}`, { email: userEmail }),
  openApp: () => mixpanelAnalytics.track('App opened', { email: userEmail }),
  navigation: (screenName) => mixpanelAnalytics.track(`Navigated to ${ screenName }`, { email: userEmail }),
  estimationExplanation: () => mixpanelAnalytics.track('Pressed Loan Estimation explanation', { email: userEmail }),

  applyForLoan: (loanData) => mixpanelAnalytics.track('Applied for loan', { email: userEmail, ...loanData }),
  celPayTransfer: (celPayData) => mixpanelAnalytics.track('CelPay initialized', { email: userEmail, ...celPayData }),
}

export const updateMixpanelBalances = async function(balances) {
  return await mixpanelAnalytics.people_set(balances);
}

export const initMixpanelUser = async function(user) {
  if (mixpanelAnalytics.userId === user.email) return;

  mixpanelAnalytics.identify(user.email);
  userEmail = user.email;

  await mixpanelAnalytics.people_set({
    "$first_name": user.first_name,
    "$last_name": user.last_name,
    "$email": user.email,
    "Created At": user.created_at,
    Citizenship: user.citizenship,
  })
}

export const logoutMixpanelUser = async function() {
  userEmail = undefined;
  mixpanelAnalytics.identify(uuid());
}

export const registerMixpanelUser = async function(user) {
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
  mixpanelAnalytics.track('KYC Profile details successfully added', { email: userEmail });

  await mixpanelAnalytics.people_set({
    Citizenship: profileDetails.citizenship,
  })
}
