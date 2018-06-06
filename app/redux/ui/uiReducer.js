import {Dimensions, StatusBar} from 'react-native';
import {Camera} from "expo";

import ACTIONS from '../../config/constants/ACTIONS';
import device from "../../utils/device-util";

const {width, height} = Dimensions.get('window');

function getBottomNavDimensions() {
  let navHeight;
  let navPaddingBottom;

  if (device.isiPhoneX()) {
    navHeight = 87 + 15;
    navPaddingBottom = 30;
  } else {
    navHeight = 60 + 15;
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
    cameraField: undefined,
    cameraHeading: undefined,
    cameraCopy: undefined,
    cameraType: 'back',
    photo: undefined,
    mask: undefined,
  },
  formData: {},
  portfolioFormData: [],
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
          cameraType: state.camera.cameraType === 'back' ? 'front' : 'back',
        }
      }

    case ACTIONS.ACTIVATE_CAMERA:
      return {
        ...state,
        camera: {
          ...state.camera,
          cameraField: action.cameraField,
          cameraType: action.cameraType,
          cameraHeading: action.cameraHeading,
          cameraCopy: action.cameraCopy,
          photo: action.photo,
          mask: action.mask,
        }
      }

    case ACTIONS.TAKE_CAMERA_PHOTO:
      return {
        ...state,
        camera: {
          ...state.camera,
          photo: action.photo,
        }
      }

    case ACTIONS.RETAKE_PHOTO:
      return {
        ...state,
        camera: {
          ...state.camera,
          photo: undefined,
        }
      }

    case ACTIONS.UPDATE_FORM_FIELD:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        }
      }

    case ACTIONS.INIT_FORM:
      return {
        ...state,
        formData: action.formData,
      }
    //
    case ACTIONS.UPDATE_PORTFOLIO_FORM_DATA:
    return {
      ...state,
      portfolioFormData: action.data
    }

    default:
      return state;

  }
}
