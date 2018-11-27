import { Tester, TestHookStore } from 'cavy';
import React, { Component } from 'react';
import Expo from 'expo';
import App from './app/App';

const { ENV } = Expo.Constants.manifest.extra;

const testHookStore = new TestHookStore();

export default class AppWrapper extends Component {
    render() {
      if (ENV === 'TEST') {
        return (
          <Tester specs={[require('./specs')]} store={testHookStore} waitTime={4000} startDelay={3000} >
            <App />
          </Tester>
        )
      }

      return <App />;
    }
  }

Expo.registerRootComponent(AppWrapper);
