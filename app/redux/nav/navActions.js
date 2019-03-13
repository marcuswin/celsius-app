import { NavigationActions } from 'react-navigation';

let _navigator;

export {
  navigateTo,
  navigateBack,
  setTopLevelNavigator,
  getActiveScreen
};


/**
 * Gets current active screen
 * @returns {string} - active screen name
 */
function getActiveScreen() {
  if (!navigator._navState) return false;
  const index = _navigator._navState.index;
  const index1 = _navigator._navState.routes[index].index;
  return _navigator._navState.routes[index].routes[index1].routeName;
}


/**
 * Sets _navigator
 * @param {Object} navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}


/**
 * Navigates to a screen
 * @param {string} routeName - name of the screen
 * @param {Object} params - parameters for the next screen
 */
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


/**
 * Navigates back
 */
function navigateBack() {
  return () => {
    _navigator.dispatch(
      NavigationActions.back()
    );
  }
}
