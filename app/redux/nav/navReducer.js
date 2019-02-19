import ACTIONS from "../../constants/ACTIONS";
import { INITIAL_ROUTE } from "../../constants/UI";

const initialState = {
  initialRoute: INITIAL_ROUTE,
  activeScreen: INITIAL_ROUTE,
  allScreens: [{ route: INITIAL_ROUTE }],
}

export default (state = initialState, action) => {
  let newState;
  let allScreens = [];

  switch (action.type) {
    case ACTIONS.NAVIGATE:
      newState = {
        ...state,
        activeScreen: action.screen.route,
        allScreens: [action.screen, ...state.allScreens]
      }
      return newState

    case ACTIONS.NAVIGATE_BACK:
      allScreens = [ ...state.allScreens ]
      if (allScreens.length > 1) allScreens.shift();
      newState = {
        ...state,
        activeScreen: allScreens[0].route,
        allScreens: [...allScreens]
      }
      return newState
    default:
      return { ...state }
  }
};
