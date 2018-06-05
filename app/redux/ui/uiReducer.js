import {Dimensions, StatusBar} from 'react-native';
import {Camera} from "expo";

import ACTIONS from '../../config/constants/ACTIONS';
import device from "../../utils/device-util";

const {width, height} = Dimensions.get('window');

function getBottomNavDimensions() {
  let navHeight;
  let navPaddingBottom;

  if (device.isiPhoneX()) {
    navHeight = 87;
    navPaddingBottom = 30;
  } else {
    navHeight = 60;
    navPaddingBottom = 5;
  }

  return {
    height: navHeight,
    paddingBottom: navPaddingBottom,
  }
}

const initialState = {
  message: undefined,
  dimensions: {
    statusBar: StatusBar.currentHeight || 0,
    header: 70,
    animatedHeader: 100,
    screenWidth: width,
    screenHeight: height,
    bottomNavigation: getBottomNavDimensions(),
  },
  camera: {
    isOpen: false,
    camera: undefined,
    photoName: undefined,
    lastPhoto: undefined,
    lastPhotoName: undefined,
  },
  portfolioFormData: []
};

export default (state = initialState, action) => {
  let newState;
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

    case ACTIONS.TOGGLE_CAMERA:
      if (state.camera.isOpen) {
        newState = {
          ...state,
          camera: { ...initialState.camera },
        }
      } else {
        newState = {
          ...state,
          camera: {
            isOpen: true,
            photoName: action.photoName,
            camera: Camera.Constants.Type.back,
          }
        }
      }
      return newState;

    case ACTIONS.FLIP_CAMERA:
      return {
        ...state,
        camera: {
          ...state.camera,
          camera: state.camera.camera === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
        }
      }

    case ACTIONS.TAKE_CAMERA_PHOTO:
      return {
        ...state,
        camera: {
          ...state.camera,
          lastPhoto: action.photo,
          lastPhotoName: action.photoName,
        }
      }

    case ACTIONS.UPDATE_PORTFOLIO_FORM_DATA:
    return {
      ...state,
      portfolioFormData: action.data
    }

    default:
      return state;

  }
}
