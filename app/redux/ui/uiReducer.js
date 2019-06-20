// TODO(fj): split according to the actions
// TODO(fj): try to delete as much code as we can

import { Dimensions, StatusBar } from 'react-native';

import ACTIONS from '../../constants/ACTIONS';
import { THEMES } from '../../constants/UI';
// import store from '../../redux/store';
// import { KYC_STATUSES } from "../../config/constants/common";
// import { shouldRenderInitialIdVerification } from "../../utils/user-util";
// import { screens } from "../../config/Navigator";

const { width, height } = Dimensions.get('window');

function getBottomNavDimensions() {
  const navHeight = 60 + 15;
  const navPaddingBottom = 5;

  return {
    height: navHeight,
    paddingBottom: navPaddingBottom,
  }
}


// function shouldShowBottomNavigation(action) {
//   const { type } = action;
//   const { nav } = store.getState();
//   const { profile } = store.getState().user;
//   const { userActions } = store.getState().ui;
//   let routeName;

//   if (type === ACTIONS.NAVIGATE) routeName = action.routeName;
//   if (type === ACTIONS.NAVIGATION_RESET) routeName = action.actions[0].routeName;
//   if (type === ACTIONS.NAVIGATE_BACK) routeName = nav.routes[nav.routes.length - 2].routeName;
//   if (type === ACTIONS.LOGOUT_USER) routeName = 'Welcome';
//   if (type === ACTIONS.GET_USER_PERSONAL_INFO_SUCCESS || type === ACTIONS.FIRE_USER_ACTION) routeName = nav.routes[nav.routes.length - 1].routeName;
//   if (type === ACTIONS.REFRESH_BOTTOM_NAVIGATION) routeName = nav.routes[nav.routes.length - 1].routeName;

//   let showNav;

//   if (routeName !== 'Home') {
//     showNav = !!screens[routeName].bottomNavigation;
//   } else if (!profile) {
//     showNav = false;
//   } else if (!profile.first_name || !profile.last_name) {
//     showNav = false;
//   } else if (!profile.has_pin) {
//     showNav = false;
//   } else if (shouldRenderInitialIdVerification(userActions)) {
//     showNav = false;
//   } else if (!profile.kyc || (profile.kyc && profile.kyc.status !== KYC_STATUSES.passed)) {
//     showNav = true;
//   } else {
//     showNav = true;
//   }

//   return showNav;
// }

const initialState = {
  // new v3
  theme: THEMES.LIGHT,
  fabMenuOpen: false,
  fabType: 'hide',
  isKeypadOpen: false,

  // keep
  message: undefined,
  openedModal: undefined,

  // check to remove
  maintenanceMode: false,
  userActions: {
    enteredInitialPin: false,
  },
  keyboardHeight: 0,
  dimensions: {
    statusBar: StatusBar.currentHeight || 0,
    header: 70,
    animatedHeader: 100,
    screenWidth: width,
    screenHeight: height,
    bottomNavigation: getBottomNavDimensions(),
  },
  scrollTo: undefined,
  scrollPosition: 0,
  formInputLayouts: {},
  scrollLayouts: {},

  // remove
  hasBottomNavigation: false,

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
      
    case ACTIONS.CLEAR_MESSAGE:
      return {
        ...state,
        message: undefined,
      };

    case ACTIONS.TOGGLE_KEYPAD:
      return {
        ...state,
        isKeypadOpen: action.isKeypadOpen,
      }

    case ACTIONS.OPEN_MODAL:
      return {
        ...state,
        openedModal: action.modal,
      }

    case ACTIONS.CLOSE_MODAL:
      return {
        ...state,
        openedModal: undefined,
      }
    case ACTIONS.GET_BACKEND_STATUS_SUCCESS:
      return {
        ...state,
        maintenanceMode: action.backendStatus.maintenance || false,
      };

    case ACTIONS.OPEN_FAB_MENU:
      return {
        ...state,
        fabMenuOpen: true
      }
    case ACTIONS.CLOSE_FAB_MENU:
      return {
        ...state,
        fabMenuOpen: false
      }
    case ACTIONS.SET_FAB_TYPE:
      if (action.fabType !== state.fabType) {
        return {
          ...state,
          fabType: action.fabType
        }
      }
      return state;

    case ACTIONS.NAVIGATE_BACK:
    case ACTIONS.NAVIGATE:
    case ACTIONS.GET_USER_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        // hasBottomNavigation: shouldShowBottomNavigation(action),
      }

    // return {
    //   ...state,
    //   hasBottomNavigation: shouldShowBottomNavigation(action.actions[0].routeName),
    // }

    default:
      return state;

  }
}
