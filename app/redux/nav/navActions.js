import {NavigationActions, StackActions} from "react-navigation";

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

export {navigateTo, navigateBack}
