import React, { Component } from 'react';
import * as Expo from './app/utils/expo-util';
import App from './app/App';

export default class AppWrapper extends Component {
  render = () => <App />
}

Expo.registerRootComponent(AppWrapper);
