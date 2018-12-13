import { Tester, TestHookStore } from 'cavy';
import React, { Component } from 'react';
import Expo from 'expo';
import App from './app/App';

const { ENV } = Expo.Constants.manifest.extra;

const testHookStore = new TestHookStore();

export default class AppWrapper extends Component {
    render() {
      if (ENV === 'TEST') {
        const specs = require('./e2e-tests');
        return (
          <Tester specs={[specs.default]} store={testHookStore} startDelay={10000} waitTime={4000}>
            <App />
          </Tester>
        )
      }

      return <App />;
    }
  }

Expo.registerRootComponent(AppWrapper);
