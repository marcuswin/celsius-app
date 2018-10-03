import { Tester, TestHookStore } from 'cavy';
import React, { Component } from 'react';

import Expo from 'expo';

import App from './app/App';


import firstTest from './specs/firstTest';


const testHookStore = new TestHookStore();

export default class AppWrapper extends Component {
    render() {
      return (
        <Tester specs={[firstTest]} store={testHookStore} waitTime={4000} startDelay={3000}>
          <App/>
        </Tester>
      );
    }
  }

Expo.registerRootComponent(AppWrapper);
