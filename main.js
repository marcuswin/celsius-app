import { Tester, TestHookStore } from 'cavy';
import React, { Component } from 'react';
import * as Expo from 'expo';
import App from './app/App';

const { ENV } = Expo.Constants.manifest.extra;


function wrapTestApp() {
  const specs = require('./e2e-tests');
  const testHookStore = new TestHookStore();
  
  return (
    <Tester specs={[specs.default]} store={testHookStore} startDelay={10000} waitTime={4000}>
      <App />
    </Tester>
  )
}

export default class AppWrapper extends Component {
  render = () => ENV === 'TEST' ? wrapTestApp() : <App />
}

Expo.registerRootComponent(AppWrapper);
