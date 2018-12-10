import { NavigationActions, StackActions } from "react-navigation";
import { analyticsEvents } from "../../utils/analytics-util";

function navigateTo(routeName, screenProps) {
  return (dispatch) => {
    if (screenProps === true) {
      dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName })
        ]
      }))
    } else {
      dispatch(NavigationActions.navigate({ routeName, params: screenProps }))
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
