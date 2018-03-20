import {Dimensions, StatusBar} from 'react-native';
import ACTIONS from '../../config/constants/ACTIONS';

const {width, height} = Dimensions.get('window');

const initialState = {
  message: undefined,
  dimensions: {
    statusBar: StatusBar.currentHeight || 0,
    header: 70,
    animatedHeader: 100,
    screenWidth: width,
    screenHeight: height,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SHOW_MESSAGE:
      return {
        ...state,
        message: {
          type: action.msgType,
          text: action.text,
        }
      };

    case ACTIONS.NAVIGATE:
    case ACTIONS.CLEAR_MESSAGE:
      return {
        ...state,
        message: undefined,
      };

    case ACTIONS.SET_HEADER_HEIGHT:
      return {
        ...state,
        dimensions: {
          ...state.dimensions,
          header: action.header,
        }
      };

    default:
      return {...state};

  }
}
