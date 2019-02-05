import ACTIONS from "../../config/constants/ACTIONS";
import { INITIAL_ROUTE } from "../../constants/UI";

const initialState = {
  initialRoute: INITIAL_ROUTE,
  activeScreen: INITIAL_ROUTE,
  allScreens: [{ route: INITIAL_ROUTE }],
}

export default (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case ACTIONS.NAVIGATE:
      newState = {
        ...state,
        activeScreen: action.screen.route,
        allScreens: [action.screen, ...state.allScreens]
      }
      return newState
    case ACTIONS.NAVIGATE_BACK:
      if (state.allScreens.length > 1) state.allScreens.shift();
      newState = {
        ...state,
        activeScreen: state.allScreens[1], // TODO(sb)
        allScreens: [...state.allScreens]
      }
      return newState
    default:
      return { ...state }
  }
};
