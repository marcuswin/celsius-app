import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';
import store from '../app/redux/store';
import * as actions from '../app/redux/actions';
import ACTIONS from "../app/config/constants/ACTIONS";

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

