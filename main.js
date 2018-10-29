import { Tester, TestHookStore } from 'cavy';
import React, { Component } from 'react';
import Expo from 'expo';
import App from './app/App';

// import SingUpKYC from './specs/SingUpKYC';
import testSuitOne from './specs/testSuitOne';
// import TestInterestCalculator from './specs/TestInterestCalculator'

const { ENV } = Expo.Constants.manifest.extra;

console.log({ const: Expo.Constants })




const testHookStore = new TestHookStore();

export default class AppWrapper extends Component {
    render() {
      console.log({ ENV });

      if (ENV === 'TEST') {
        return (
          <Tester specs={[testSuitOne]} store={testHookStore} waitTime={4000} startDelay={3000} >
            <App />
          </Tester>
        )
      }

      return <App />;
    }
  }

Expo.registerRootComponent(AppWrapper);
