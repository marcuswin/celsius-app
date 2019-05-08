import ACTIONS from '../../constants/ACTIONS'

const initialState = {
  activeScreen: ''
}

export default function navReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE_SCREEN: {
      const { screenName } = action.payload
      return {
        ...state,
        activeScreen: screenName
      }
    }
    default:
      return { ...state };
  }
}
