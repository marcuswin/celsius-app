// // TODO(fj): doublecheck Home navigation logic
// // TODO(fj): doublecheck reset param. should get changed to screenProps.reset or something...
// // TODO(fj): check if needs major refactoring after adding multiple stacks

import { NavigationActions } from 'react-navigation';

let _navigator;

export {
  navigateTo,
  navigateBack,
  setTopLevelNavigator,
  getActiveScreen
};

function getActiveScreen() {
  const index = _navigator._navState.index;
  const index1 = _navigator._navState.routes[index].index;
  return _navigator._navState.routes[index].routes[index1].routeName;
}

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigateTo(routeName, params) {
  return () => {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
  }
}

function navigateBack() {
  return () => {
    _navigator.dispatch(
      NavigationActions.back()
    );
  }
}