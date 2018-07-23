import {NavigationActions, StackActions} from "react-navigation";
import ACTIONS from "../../config/constants/ACTIONS";

function navigateTo(routeName, screenProps) {
  return (dispatch) => {
    if (screenProps === true) {
      dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName})
        ]
      }))
    } else {
      dispatch(NavigationActions.navigate({routeName, params: screenProps}))
    }
  }
}

function navigateBack() {
  return (dispatch) => {
    dispatch(NavigationActions.back())
  }
}

function displayBottomNavigation(value) {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.DISPLAY_BOTTOM_NAVIGATION,
      value,
    })
  }
}

export {navigateTo, navigateBack, displayBottomNavigation}
