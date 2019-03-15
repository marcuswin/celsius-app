import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

export {
  navigateTo,
  navigateBack,
  setTopLevelNavigator,
  getActiveScreen,
  getNavigator
};


/**
 * Gets current active screen
 * @returns {string} - active screen name
 */
function getActiveScreen() {
  if (!_navigator._navState) return false;
  const index = _navigator._navState.index;
  const index1 = _navigator._navState.routes[index].index;
  return _navigator._navState.routes[index].routes[index1].routeName;
}

/**
 * Gets current active screen
 * @returns {Object} - navigator
 */
function getNavigator() {
  return _navigator;
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
function navigateBack(backScreenName) {
  // If back button leads to VerifyProfile, skip it and go back one more screen
  if (backScreenName === 'VerifyProfile') {
    // n: 2 indicates we want to navigate 2 screens back
    return () => {
      _navigator.dispatch(
        StackActions.pop({ n: 2 })
      )
    }
  }
  return () => {
    _navigator.dispatch(
      NavigationActions.back()
    );
  }
}
