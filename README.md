![Power to the people](./assets/images/power-to-the-people.png)

# Celsius Mobile App

>The Celsius mobile app enables you to calculate loan and interest rate based on your crypto holdings.

## Install Application on your mobile device

1. [Android users](https://play.google.com/store/apps/details?id=network.celsius.borrower)
2. iPhone users (under review)

## Dev section


### Dev environment setup

```
yarn global add expo expo-cli

yarn install

yarn run start:dev:staging
```

### Ask dev team for:

- `/config` folder
- `app.json`
- relevant credentials

## Testing the app in staging environment

- install `expo` app on device
- ask dev team for expo credentials
- [Open Staging](https://expo.io/@celsiustech/celsius?release-channel=staging)

### Dev commands

```bash
$ yarn start
```
- starts expo project (use one of `yarn run start:dev` commands instead) 

```bash
$ yarn run start:dev
```
- starts expo project with environment settings from `app.json` 


```bash
$ yarn run start:dev:local
```
- updates `app.json` with local settings and starts expo project

```bash
$ yarn run start:dev:staging
```
- updates `app.json` with staging settings and starts expo project

```bash
$ yarn run kill:expo
```
```bash
$ yarn run ios
```
- starts ios simulator and react native debugger

```bash
$ yarn run android
```

```bash
$ yarn run lint
```
- checks the code for linting errors

```bash
$ yarn run env:local
```
- updates `app.json` with local environment variables

```bash
$ yarn run env:staging
```
- updates `app.json` with staging environment variables

```bash
$ yarn run env:production
```
- updates `app.json` with production environment variables

```bash
$ yarn run publish:staging
```
- publishes staging app to expo

```bash
$ yarn run deploy:staging
```
- sets staging environment variables and publishes app to staging

```bash
$ yarn run plop
```
- runs plop [More...](https://github.com/amwmedia/plop). Available plops for: _TODO_

### Tools

* [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
* [Celsius API Docs](https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#bf6e3009-2736-4a6e-b1a0-c0928c704550)
* Sentry

### Dependencies used

* [axios](https://www.npmjs.com/package/axios)
* [base-64](https://www.npmjs.com/package/base-64)
* [country-data](https://www.npmjs.com/package/country-data)
* [currency-formatter](https://www.npmjs.com/package/currency-formatter)
* [exp](https://www.npmjs.com/package/exp)
* [expo](https://www.npmjs.com/package/expo)
* [expo-env](https://www.npmjs.com/package/expo-env)
* [hoek](https://www.npmjs.com/package/hoek)
* [immutable](https://www.npmjs.com/package/immutable)
* [lodash](https://www.npmjs.com/package/lodash)
* [moment](https://www.npmjs.com/package/moment)
* [native-base](https://www.npmjs.com/package/native-base)
* [prop-types](https://www.npmjs.com/package/prop-types)
* [qs](https://www.npmjs.com/package/qs)
* [react](https://www.npmjs.com/package/react)
* [react-native](https://www.npmjs.com/package/react-native)
* [react-native-animatable](https://www.npmjs.com/package/react-native-animatable)
* [react-native-auth0](https://www.npmjs.com/package/react-native-auth0)
* [react-native-checkbox](https://www.npmjs.com/package/react-native-checkbox)
* [react-native-datepicker](https://www.npmjs.com/package/react-native-datepicker)
* [react-native-easy-grid](https://www.npmjs.com/package/react-native-easy-grid)
* [react-native-google-signin](https://www.npmjs.com/package/react-native-google-signin)
* [react-native-image-header-scroll-view](https://www.npmjs.com/package/react-native-image-header-scroll-view)
* [react-native-qrcode](https://www.npmjs.com/package/react-native-qrcode)
* [react-native-simple-twitter](https://www.npmjs.com/package/react-native-simple-twitter)
* [react-native-svg](https://www.npmjs.com/package/react-native-svg)
* [react-native-svg-charts](https://www.npmjs.com/package/react-native-svg-charts)
* [react-native-svg-icon](https://www.npmjs.com/package/react-native-svg-icon)
* [react-native-swipeable](https://www.npmjs.com/package/react-native-swipeable)
* [react-navigation](https://www.npmjs.com/package/react-navigation)
* [react-redux](https://www.npmjs.com/package/react-redux)
* [redux](https://www.npmjs.com/package/redux)
* [redux-logger](https://www.npmjs.com/package/redux-logger)
* [redux-thunk](https://www.npmjs.com/package/redux-thunk)
* [sentry-expo](https://www.npmjs.com/package/sentry-expo)
* [uuid](https://www.npmjs.com/package/uuid)
* [which-country](https://www.npmjs.com/package/which-country)
>Dev dependencies
* [eslint](https://www.npmjs.com/package/eslint)
* [eslint-config-equimper](https://www.npmjs.com/package/eslint-config-equimper)
* [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
* [plop](https://www.npmjs.com/package/plop)
* [pre-commit](https://www.npmjs.com/package/pre-commit)
* [prettier](https://www.npmjs.com/package/prettier)
* [react-native-debugger-open](https://www.npmjs.com/package/react-native-debugger-open)
* [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv)
* [react-test-renderer](https://www.npmjs.com/package/react-test-renderer)
* [remote-redux-devtools](https://www.npmjs.com/package/remote-redux-devtools)
* [remotedev-rn-debugger](https://www.npmjs.com/package/remotedev-rn-debugger)
