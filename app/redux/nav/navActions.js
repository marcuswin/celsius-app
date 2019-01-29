// // TODO(fj): doublecheck Home navigation logic
// // TODO(fj): doublecheck reset param. should get changed to screenProps.reset or something...
// // TODO(fj): check if needs major refactoring after adding multiple stacks

import { NavigationActions } from 'react-navigation';
import ACTIONS from "../../constants/ACTIONS";

// NOTE(fj): Using this logic to attach to redux -> https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
let _navigator;

export {
  navigateTo,
  navigateBack,
  setTopLevelNavigator,
};

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
  return {
    type: "SET_TOP_LEVEL_NAVIGATION",
  }
}

function navigateTo(routeName, params) {
  return (dispatch) => {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
    dispatch({
      type: ACTIONS.NAVIGATE,
      screen: {
        route: routeName,
        screenParams: params,
      }
    })
  }
}

function navigateBack() {
  return (dispatch) => {
    _navigator.dispatch(
      NavigationActions.back() // key: 'Profile',
    );
    dispatch({
      type: ACTIONS.NAVIGATE_BACK,
    })
  }
}


// TODO: add navigateBack, resetNavigation...
// add other navigation functions that you need and export them

