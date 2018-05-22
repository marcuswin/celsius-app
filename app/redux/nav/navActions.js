import {NavigationActions, StackActions} from "react-navigation";

function navigateTo(routeName, reset) {
  return (dispatch) => {
    if (reset) {
      dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName})
        ]
      }))
    } else {
      dispatch(NavigationActions.navigate({routeName}))
    }
  }
}

function navigateBack() {
  return (dispatch) => {
    dispatch(NavigationActions.back())
  }
}

export {navigateTo, navigateBack}
