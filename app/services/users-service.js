import axios from 'axios';
import apiUrl from './api-url';

const usersService = {
  register,
  update,
  login,
  registerTwitter,
  registerFacebook,
  registerGoogle,
  googleLogin,
  facebookLogin,
  twitterLogin,
  getUserInfo,
  getPersonalInfo,
  createPersonalInfo,
  getAddressInfo,
  createAddressInfo,
  getContactInfo,
  createContactInfo,
  getBankAccountInfo,
  createBankAccountInfo,
};

function register({ email, password }) {
  return axios.post(`${apiUrl}/users/register`, {
    email,
    password,
  });
}

function registerTwitter(twitterUser) {
  const { email, firstName, lastName, country } = twitterUser;
  return axios.post(`${apiUrl}/users/twitter`, {
    email,
    first_name: firstName,
    last_name: lastName,
    country,
    twitter_id: twitterUser.twitter_id,
    twitter_screen_name: twitterUser.twitter_screen_name,
    profile_picture: twitterUser.profile_picture,
    access_token: twitterUser.twitter_oauth_token,
    secret_token: twitterUser.twitter_oauth_secret
  });
}

function registerFacebook(facebookUser) {
  const { email, firstName, lastName, country } = facebookUser;
  return axios.post(`${apiUrl}/users/facebook`, {
    email,
    first_name: firstName,
    last_name: lastName,
    country,
    facebook_id: facebookUser.facebook_id,
    access_token: facebookUser.access_token
  });
}

function registerGoogle(googleUser) {
  const { email, firstName, lastName, country } = googleUser;
  return axios.post(`${apiUrl}/users/google`, {
    email,
    first_name: firstName,
    last_name: lastName,
    country,
    google_id: googleUser.google_id,
    profile_picture: googleUser.picture,
    access_token: googleUser.access_token
  });
}

function update({ firstName, lastName, country}) {
  return axios.put(`${apiUrl}/users/update`, {
    first_name: firstName,
    last_name: lastName,
    country,
  });
}

function login({ email, password }) {
  return axios.post(`${apiUrl}/users/login`, {
    email,
    password,
  });
}

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

function facebookLogin(data) {
  return axios.post(`${apiUrl}/users/facebook/login`, {
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    facebook_id: data.id,
    access_token: data.accessToken,
  });
}

function twitterLogin(data) {
  return axios.post(`${apiUrl}/users/twitter/login`, {
    email: data.email,
    first_name: data.name,
    twitter_id: data.id_str,
    access_token: data.accessToken,
    secret_token: data.secret_token
  });
}

function getUserInfo() {
  return axios.get(`${apiUrl}/users/info`);
}

function createPersonalInfo(personalInfo) {
  return axios.post(`${apiUrl}/users/personal_info`, {
    title: personalInfo.title,
    first_name: personalInfo.firstName,
    last_name: personalInfo.lastName,
    middle_name: personalInfo.middleName,
    date_of_birth: personalInfo.dateOfBirth,
    mothers_maiden_name: personalInfo.motherMaidenName,
    gender: personalInfo.gender,
    ssn: personalInfo.socialSecurityNumber,
  });
}

function getPersonalInfo() {
  return axios.get(`${apiUrl}/users/personal_info`);
}

function createAddressInfo(addressInfo) {
  return axios.post(`${apiUrl}/users/address`, {
    country: addressInfo.country,
    us_state: addressInfo.state,
    city: addressInfo.city,
    zip: addressInfo.zip,
    street: addressInfo.street,
    building_number: addressInfo.buildingNumber,
  });
}

function getAddressInfo() {
  return axios.get(`${apiUrl}/users/address`);
}

function createContactInfo(contactInfo) {
  return axios.post(`${apiUrl}/users/contact`, {
    cellphone: contactInfo.cellPhone,
    other_phone_number: contactInfo.otherPhones,
    email: contactInfo.email,
  });
}

function getContactInfo() {
  return axios.get(`${apiUrl}/users/contact`);
}

function createBankAccountInfo(bankAccountInfo) {
  return axios.post(`${apiUrl}/users/bank_info`, {
    bank_name: bankAccountInfo.name,
    bank_routing_number: bankAccountInfo.routingNumber,
    bank_account_number: bankAccountInfo.accountNumber,
  });
}

function getBankAccountInfo() {
  return axios.get(`${apiUrl}/users/bank_info`);
}

export default usersService;
