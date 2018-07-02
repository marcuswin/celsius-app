import AppNavigator from '../../config/Navigator';
import ACTIONS from "../../config/constants/ACTIONS";

const initialState = {
  index: 0,
  routes: [{ key: 'Init', routeName: 'Home' }],
};

export default (state = initialState, action) => {
  let newState = AppNavigator.router.getStateForAction(action, state);

  if (action.type === ACTIONS.LOGOUT_USER) newState = initialState;

  return newState || state;
};
