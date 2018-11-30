export default {
  userWithoutName,
  userWithName,
}

const userWithoutName = {
  "id": "c2732b75-04df-4bb1-acca-ddb88e88bb00",
  "referral_link_id": null,
  "phone_contacts_connected": false,
  "twitter_friends_connected": false,
  "facebook_friends_connected": false,
  "session_invalid_before": null,
  "partner_id": "Celsius",
  "created_at": "2018-11-09T10:49:28.631Z",
  "updated_at": "2018-11-09T10:49:28.631Z",
  "email": "no.name@mvpworkshop.co",
  "auth0_user_id": "auth0|5be56638ec312320f5624735",
  "first_name": null,
  "last_name": null,
  "country": null,
  "twitter_id": null,
  "twitter_screen_name": null,
  "profile_picture": null,
  "facebook_id": null,
  "google_id": null,
  "pin": null,
  "expo_push_tokens": null,
  "api_token": null,
  "two_factor_enabled": null,
  "two_factor_secret": null
};

const userWithName = {
  ...userWithoutName,
  first_name: 'Some',
  last_name: 'User',
}
