import AppNavigator from '../../config/Navigator';
import ACTIONS from "../../config/constants/ACTIONS";

const initialState = {
  index: 0,
  displayBottomNavigation: false,
  routes: [{ key: 'Init', routeName: 'Home' }],
};

export default (state = initialState, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);

  switch (action.type) {
    case ACTIONS.DISPLAY_BOTTOM_NAVIGATION:
      return {
        ...state,
        displayBottomNavigation: action.value,
      };
    case ACTIONS.LOGOUT_USER:
      return initialState;
    default:
      return newState || state;
  }
};
