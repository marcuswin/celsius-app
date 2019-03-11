// TODO(fj): split into auth service and profile service?

import axios from 'axios';
import apiUrl from './api-url';
import imageUtil from '../utils/image-util';

const usersService = {
  // TODO: auth service
  register,
  login,
  registerTwitter,
  registerFacebook,
  registerGoogle,
  googleLogin,
  facebookLogin,
  twitterLogin,
  resetPassword,

  // TODO: profile service
  update,
  sendResetLink,
  getPersonalInfo,
  getProfileAddressInfo,
  updateProfileInfo,
  getProfileTaxpayerInfo,
  updateProfileAddressInfo,
  updateProfileTaxpayerInfo,
  setProfileImage,
  addExpoPushToken,
  getIcoPersonalInfo,
  getComplianceInfo,
  connectPhoneContacts,
  getConnectedContacts,
  getLinkedBankAccount,
  linkBankAccount
};


/**
 * Registers a user with email/password
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#a6c7198c-d7a5-402d-b1ff-308da2def3ed
 * @deprecated probably
 *
 * @param {Object} user
 * @return {Promise}
 */
function register(user) {
  return axios.post(`${apiUrl}/users/register`, {
    email: user.email,
    password: user.password,
    referral_link_id: user.referralLinkId || undefined,
  });
}

/**
 * Registers a user through Twitter
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#aade0752-df0f-4265-8917-929e4870fbd4
 * @deprecated probably
 *
 * @param {Object} twitterUser
 * @return {Promise}
 */
function registerTwitter(twitterUser) {
  const { email, firstName, lastName } = twitterUser;
  return axios.post(`${apiUrl}/users/twitter`, {
    email,
    first_name: firstName,
    last_name: lastName,
    twitter_id: twitterUser.twitter_id,
    twitter_screen_name: twitterUser.twitter_screen_name,
    profile_picture: twitterUser.profile_picture,
    access_token: twitterUser.twitter_oauth_token,
    secret_token: twitterUser.twitter_oauth_secret,
    referral_link_id: twitterUser.referralLinkId || undefined,
  });
}


/**
 * Registers a user through Facebook
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#14c50dea-3b2d-4319-9c8f-0c1ac9dcfbbc
 * @deprecated probably
 *
 * @param {Object} facebookUser
 * @return {Promise}
 */
function registerFacebook(facebookUser) {
  const { email, firstName, lastName } = facebookUser;
  return axios.post(`${apiUrl}/users/facebook`, {
    email,
    first_name: firstName,
    last_name: lastName,
    facebook_id: facebookUser.facebook_id,
    access_token: facebookUser.access_token,
    referral_link_id: facebookUser.referralLinkId || undefined,
  });
}

/**
 * Registers a user through Google
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#ab2d7b2c-7507-4e84-a98c-0e064fc86451
 *
 * @param {Object} googleUser
 * @return {Promise}
 */
function registerGoogle(googleUser) {
  const { email, firstName, lastName } = googleUser;
  return axios.post(`${apiUrl}/users/google`, {
    email,
    first_name: firstName,
    last_name: lastName,
    google_id: googleUser.google_id,
    profile_picture: googleUser.picture,
    access_token: googleUser.access_token,
    referral_link_id: googleUser.referralLinkId || undefined,
  });
}


/**
 * Updates user info
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#e5b7ebf2-acb7-4b26-ae2a-dc396782309f
 * @todo check reusability and add params
 *
 * @param {Object} user
 * @param {string} user.firstName
 * @param {string} user.lastName
 * @return {Promise}
 */
function update({ firstName, lastName}) {
  return axios.put(`${apiUrl}/users/update`, {
    first_name: firstName,
    last_name: lastName,
  });
}


/**
 * Logs a user into Celsius with email/password
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#abf851b0-e170-4a3c-9018-bab17b9461d7
 *
 * @param {Object} user
 * @param {string} user.email
 * @param {string} user.password
 * @return {Promise}
 */
function login({ email, password }) {
  return axios.post(`${apiUrl}/users/login`, {
    email,
    password,
  });
}


/**
 * Send an email to the user with the reset password link
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#bf6e3009-2736-4a6e-b1a0-c0928c704550
 *
 * @param {string} email
 * @return {Promise}
 */
function sendResetLink(email) {
  return axios.post(`${apiUrl}/users/send_reset_link`, {
    email,
  });
}

/**
 * resets the password for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#413e806c-89d8-486f-b638-0d1e32832381
 *
 * @param {string} currentPassword
 * @param {string} newPassword
 * @return {Promise}
 */
function resetPassword(currentPassword, newPassword) {
  return axios.post(`${apiUrl}/users/reset_password`, {
    current_password: currentPassword,
    new_password: newPassword,
  });
}

/**
 * Logs a user into Celsius through Google
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#c74fa667-84dc-41eb-a760-aa09f74019f6
 * @deprecated probably
 *
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.given_name
 * @param {string} data.family_name
 * @param {string} data.id
 * @param {string} data.picture
 * @param {string} data.accessToken
 * @return {Promise}
 */
function googleLogin(data) {
  return axios.post(`${apiUrl}/users/google/login`, {
    email: data.email,
    first_name: data.given_name,
    last_name: data.family_name,
    google_id: data.id,
    profile_picture: data.picture,
    access_token: data.accessToken,
  });
}


/**
 * Logs a user into Celsius through Facebook
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#cfbd2ca1-c1a7-492f-b6e1-4c9e4f1a6da0
 * @deprecated probably
 *
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.first_name
 * @param {string} data.last_name
 * @param {string} data.id
 * @param {string} data.accessToken
 * @return {Promise}
 */
function facebookLogin(data) {
  return axios.post(`${apiUrl}/users/facebook/login`, {
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    facebook_id: data.id,
    access_token: data.accessToken,
  });
}


/**
 * Logs a user into Celsius through Twitter
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#6d7f3d95-b44b-41c2-a888-6d07fdfb82ae
 * @deprecated probably
 *
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.name
 * @param {string} data.id_str
 * @param {string} data.accessToken
 * @param {string} data.secret_token
 * @return {Promise}
 */
function twitterLogin(data) {
  return axios.post(`${apiUrl}/users/twitter/login`, {
    email: data.email,
    first_name: data.name,
    twitter_id: data.id_str,
    access_token: data.accessToken,
    secret_token: data.secret_token
  });
}

/**
 * Get profile info for logged in user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#52468b39-6440-417c-9e53-35471dbdd0e0
 *
 * @return {Promise}
 */
function getPersonalInfo() {
  return axios.get(`${apiUrl}/me`);
}

/**
 * Gets address info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#0f7664af-a74f-42bd-a86c-c773b2288f87
 *
 * @return {Promise}
 */
function getProfileAddressInfo() {
  return axios.get(`${apiUrl}/me/address`);
}

/**
 * Gets taxpayer info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#46f917e4-9e14-4531-bebd-a11ccf9e1fc2
 *
 * @return {Promise}
 */
function getProfileTaxpayerInfo() {
  return axios.get(`${apiUrl}/me/taxpayer_info`);
}


/**
 * Updates user info
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#cd83aca2-11a1-42d2-ad08-3df6b3d2d090
 * @todo check reusability and add params, check update method, duplicate
 *
 * @param {Object} profileInfo
 * @return {Promise}
 */
function updateProfileInfo(profileInfo) {
  return axios.patch(`${apiUrl}/me`, profileInfo);
}


/**
 * Updates address info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#55dd21a1-2e99-4c6d-865c-a605eaef5b57
 *
 * @param {Object} profileAddressInfo
 * @param {string} profileAddressInfo.country - eg. "Serbia",
 * @param {string} profileAddressInfo.state - US state
 * @param {string} profileAddressInfo.city - eg. "Beograd",
 * @param {string} profileAddressInfo.zip - eg. "11FG0",
 * @param {string} profileAddressInfo.street
 * @param {string} profileAddressInfo.building_number - eg. "456b",
 * @return {Promise}
 */
function updateProfileAddressInfo(profileAddressInfo) {
  return axios.post(`${apiUrl}/me/address`, profileAddressInfo);
}

/**
 * Updates taxpayer info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#ce921baa-1d5e-4cca-986c-ed1bcfb393ff
 *
 * @param {Object} profileTaxpayerInfo
 * @param {string} profileTaxpayerInfo.ssn
 * @param {string} profileTaxpayerInfo.itin
 * @param {string} profileTaxpayerInfo.national_id
 * @return {Promise}
 */
function updateProfileTaxpayerInfo(profileTaxpayerInfo) {
  return axios.post(`${apiUrl}/me/taxpayer_info`, profileTaxpayerInfo);
}

/**
 * Updates profile image for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#029631f2-67bc-48c2-8463-f0d2572145a0
 *
 * @param {string} image - url|base64
 * @return {Promise}
 */
function setProfileImage(image) {
  // check if url of base64
  const data = imageUtil.isBase64(image) ? { img_base64: image } : { img_url: image }
  return axios.post(`${apiUrl}/me/profile_image`, data);
}


/**
 * Adds Expo push notification token to user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#cae21d46-1014-4c5e-b909-8a821767c16d
 *
 * @param {string} token
 * @return {Promise}
 */
async function addExpoPushToken(token) {
  return axios.put(`${apiUrl}/users/expoPushToken`, {
    expo_push_token: token,
  });
}


/**
 * Gets ICO info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#7de4e2e1-9867-4f8b-bb8a-f8847e22e4cc
 *
 * @return {Promise}
 */
function getIcoPersonalInfo() {
  return axios.get(`${apiUrl}/me/kyc/ico_data`)
}

/**
 * Gets compliance info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#7d62f0f6-ae30-4abf-b36a-792dc785a88a
 *
 * @return {Promise}
 */
function getComplianceInfo() {
  return axios.get(`${apiUrl}/me/compliance`);
}

/**
 * Connects contacts from device phone book
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#0b117565-209f-4b10-8f5a-a02c63815330
 *
 * @param {Object} contacts - @todo check payload
 * @return {Promise}
 */
function connectPhoneContacts(contacts) {
  return axios.post(`${apiUrl}/users/friends/contacts`, {contacts});
}

/**
 * Gets all contacts for user
 * @note not in Postman
 *
 * @return {Promise}
 */
function getConnectedContacts() {
  return axios.get(`${apiUrl}/users/friends`);
}

/**
 * Gets users bank account for loan
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#eec4ff11-563e-48bb-82c1-0d6d3fb78ba2
 *
 * @return {Promise}
 */
function getLinkedBankAccount() {
  return axios.get(`${apiUrl}/bank/account`)
}

/**
 * Creates bank account for user
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#230b4a7d-0055-4d51-81e9-7397fdc29278
 *
 * @param {number} bankAccountInfo
 * @param {string} bankAccountInfo.bank_name
 * @param {string} bankAccountInfo.bank_routing_number
 * @param {string} bankAccountInfo.account_type
 * @param {string} bankAccountInfo.bank_account_number
 * @param {string} bankAccountInfo.iban
 * @param {string} bankAccountInfo.swift
 * @return {Promise}
 */
function linkBankAccount(bankAccountInfo) {
  return axios.post(`${apiUrl}/bank/account`, bankAccountInfo)
}

export default usersService;
