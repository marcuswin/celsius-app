import ACTIONS from "../../config/constants/ACTIONS";
import UI from "../../constants/UI";

const initialState = {
  initialRoute: UI.INITIAL_ROUTE,
  activeScreen: UI.INITIAL_ROUTE,
  allScreens: [{ route: UI.INITIAL_ROUTE }],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.NAVIGATE:
      return {
        ...state,
        activeScreen: action.screen.route,
        allScreens: [action.screen, ...state.allScreens]
      }
    case ACTIONS.NAVIGATE_BACK:
      return {
        ...state,
        activeScreen: state.allScreens[1], // TODO(sb)
        allScreens: state.allScreens.shift()
      }
    default:
      return { ...state }
  }
};
