import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';
import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import ACTIONS from "../app/config/constants/ACTIONS";
import SignupOne from '../app/components/screens/Signup/SignupOne';
import CreatePasscode from '../app/components/screens/Passcode/CreatePasscode';

const { dispatch, getState } = store;

export async function containsText(component, text) {
  if (!component.props.children.includes(text)) {
    throw new Error(`Could not find text ${text}`);
  };
}
export async function fillIn2(identifier, str) {
    const component = findComponent(identifier);
    component.props.onChange(str);
}

export async function test(component) {
  console.log(component)
  component.props.onCancel()
}

export async function submit(component) {
  console.log(component)
  component.props.onSubmit()
}

export async function formField(field, item ) {
  actions.updateFormField(field, item.name);
  component.props.onValueChange();
}


export async function onChange(field, item) {
  actions.updateFormField(field, item.name);
  component.props.onChange();
}

export function resetTests() {
  dispatch(actions.clearForm());
  dispatch({ type: ACTIONS.LOGOUT_USER });

}

export function testPassed(spec) {
  return async () => {
    resetTests();
    await spec.notExists('SignupTwo.screen')
  }
}

export function testFailed(spec) {
  return async () => {
    resetTests();
    await spec.exists('SignupTwo.screen')
  }
}

export function signupOneSetup() {
  dispatch(actions.navigateTo('SignupOne'));
}

export function signupTwoSetup() {
  dispatch(actions.registerUserSuccess({ user: {
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
  }}));
  dispatch(actions.navigateTo('Home'))
}

export function createPinSetup() {
  dispatch(actions.navigateTo('CreatePasscode'))
}
