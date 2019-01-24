// TODO(fj): doublecheck Home navigation logic
// TODO(fj): doublecheck reset param. should get changed to screenProps.reset or something...
// TODO(fj): check if needs major refactoring after adding multiple stacks

import { NavigationActions, StackActions } from "react-navigation";
import { analyticsEvents } from "../../utils/analytics-util";
import { KYC_STATUSES } from "../../config/constants/common";

function navigateTo(routeName, screenProps) {
  return (dispatch, getState) => {
    const { profile } = getState().user;
    let goToRoute = routeName;
    if (goToRoute === 'Home') {
      if (!profile) goToRoute = 'Welcome';
      else if (!profile.first_name || !profile.last_name) goToRoute = 'SignupTwo';
      else if (!profile.has_pin) goToRoute = 'CreatePasscode';
      else if (!profile.kyc || (profile.kyc && profile.kyc.status !== KYC_STATUSES.passed)) goToRoute = 'NoKyc';
      else goToRoute = 'WalletBalance';
    }


    if (screenProps === true) {
      dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: goToRoute })
        ]
      }))
    } else {
      dispatch(NavigationActions.navigate({ routeName: goToRoute, params: screenProps }))
    }
    analyticsEvents.navigation(routeName)
  }
}

function navigateBack() {
  return (dispatch, getState) => {
    dispatch(NavigationActions.back())
    const activeScreen = getState().nav.routes[getState().nav.index].routeName;
    analyticsEvents.navigation(activeScreen)
  }
}

export { navigateTo, navigateBack }
