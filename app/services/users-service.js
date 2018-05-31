import axios from 'axios';
import isBase64 from 'is-base64';
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
  sendResetLink,
  resetPassword,
  getPersonalInfo,
  updateProfileInfo,
  setProfileImage,
  createKYCDocuments,
};

function register({ email, password }) {
  return axios.post(`${apiUrl}/users/register`, {
    email,
    password,
  });
}

function registerTwitter(twitterUser) {
  const { email, firstName, lastName, country, countryAlpha3 } = twitterUser;
  return axios.post(`${apiUrl}/users/twitter`, {
    email,
    first_name: firstName,
    last_name: lastName,
    country,
    country_alpha3: countryAlpha3,
    twitter_id: twitterUser.twitter_id,
    twitter_screen_name: twitterUser.twitter_screen_name,
    profile_picture: twitterUser.profile_picture,
    access_token: twitterUser.twitter_oauth_token,
    secret_token: twitterUser.twitter_oauth_secret
  });
}

function registerFacebook(facebookUser) {
  const { email, firstName, lastName, country, countryAlpha3 } = facebookUser;
  return axios.post(`${apiUrl}/users/facebook`, {
    email,
    first_name: firstName,
    last_name: lastName,
    country,
    country_alpha3: countryAlpha3,
    facebook_id: facebookUser.facebook_id,
    access_token: facebookUser.access_token
  });
}

function registerGoogle(googleUser) {
  const { email, firstName, lastName, country, countryAlpha3 } = googleUser;
  return axios.post(`${apiUrl}/users/google`, {
    email,
    first_name: firstName,
    last_name: lastName,
    country,
    country_alpha3: countryAlpha3,
    google_id: googleUser.google_id,
    profile_picture: googleUser.picture,
    access_token: googleUser.access_token
  });
}

function update({ firstName, lastName, country, countryAlpha3}) {
  return axios.put(`${apiUrl}/users/update`, {
    first_name: firstName,
    last_name: lastName,
    country,
    country_alpha3: countryAlpha3,
  });
}

function login({ email, password }) {
  return axios.post(`${apiUrl}/users/login`, {
    email,
    password,
  });
}

function sendResetLink(email) {
  return axios.post(`${apiUrl}/users/send_reset_link`, {
    email,
  });
}

function resetPassword(currentPassword, newPassword) {
  return axios.post(`${apiUrl}/users/reset_password`, {
    current_password: currentPassword,
    new_password: newPassword,
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

function getPersonalInfo() {
  return axios.get(`${apiUrl}/users/personal_info`);
}

function updateProfileInfo(profileInfo) {
  return axios.patch(`${apiUrl}/me`, profileInfo);
}

function setProfileImage(image) {
  // check if url of base64
  const data = isBase64(image) ? { img_base64: image } : { img_url: image }
  return axios.post(`${apiUrl}/me/profile_image`, data);
}

function createKYCDocuments(documents) {
  return axios.post(`${apiUrl}/me/documents`, documents);
}

export default usersService;
