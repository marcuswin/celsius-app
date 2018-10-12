import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

export async function containsText(component, text) {
    if (!component.props.children.includes(text)) {
      throw new Error(`Could not find text ${text}`);
    };
  }


 export async function fillIn2(identifier, str) {
    const component =  findComponent(identifier);
    component.props.onChange(str);
  }


export async function test(component) {
  console.log(component)
  component.props.onCancel()
}

  