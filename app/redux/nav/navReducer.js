// import AppNavigator from '../../config/Navigator';
import ACTIONS from "../../config/constants/ACTIONS";
import NavigatorV3 from "../../Navigator.v3";

const initialState = {
  index: 0,
  routes: [{ key: 'Init', routeName: 'Home' }],
};

export default (state = initialState, action) => {
  const newState = NavigatorV3.router.getStateForAction(action, state);

  switch (action.type) {
    case ACTIONS.EXPIRE_SESSION:
      return initialState;
    default:
      return newState || state;
  }
};
