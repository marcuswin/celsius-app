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
    // camera modal state TODO(fj): remove
    isOpen: false,
    camera: undefined,
    photoName: undefined,
    lastPhoto: undefined,
    lastPhotoName: undefined,
    // camera screen state
    cameraField: undefined,
    cameraHeading: undefined,
    cameraCopy: undefined,
    cameraType: 'back',
    photo: undefined,
    mask: undefined,
  },
  formData: {},
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
          lastPhoto: action.photo,
          lastPhotoName: action.photoName,
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
    //
    default:
      return state;

  }
}
