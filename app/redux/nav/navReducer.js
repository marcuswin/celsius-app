import AppNavigator from '../../config/Navigator';
import ACTIONS from "../../config/constants/ACTIONS";

const initialState = {
  index: 0,
  routes: [{ key: 'Init', routeName: 'Home' }],
};

export default (state = initialState, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);

  switch (action.type) {
    case ACTIONS.LOGOUT_USER:
    case ACTIONS.EXPIRE_SESSION:
      return initialState;
    default:
      return newState || state;
  }
};
