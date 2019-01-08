// TODO(fj): rename to user
// TODO(fj): remove borrower
// TODO(fj): check what is error?
// TODO(fj): check if we need appSettings anymore?
// TODO(fj): map user with additional props
// TODO(fj): merge kyc

/* eslint-disable no-case-declarations */
import ACTIONS from '../../config/constants/ACTIONS';
// import { CAMERA_PHOTOS } from '../../config/constants/common';

const initialState = {
  userLocation: undefined,
  user: undefined,
  error: null,
  borrower: undefined,
  expiredSession: false,
  agreedToTermsOfUse: true,
  kycStatus: undefined,
  kycDocuments: undefined,
  appSettings: {
    showWalletDetailsInfoBox: true,
    showWalletLandingInfoBox: true,
    showSecureTransactionsScreen: true,
    showTodayRatesModal: true,
    showBchExplanationInfoBox: true,
    declineAccess: false,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.EXPIRE_SESSION:
      return {
        ...state,
        expiredSession: true,
      };
    case ACTIONS.LOGIN_USER_SUCCESS:
      return {
        ...state,
        tokens: action.tokens,
        user: action.user,
      };

    case ACTIONS.GET_LOGGED_IN_BORROWER_SUCCESS:
    case ACTIONS.LOGIN_BORROWER_SUCCESS:
      return {
        ...state,
        borrower: action.borrower,
        user: action.borrower.user || action.borrower,
      };

    case ACTIONS.REGISTER_USER_SUCCESS:
    case ACTIONS.REGISTER_USER_TWITTER_SUCCESS:
    case ACTIONS.UPDATE_USER_SUCCESS:
    case ACTIONS.LOGIN_USER_GOOGLE_SUCCESS:
    case ACTIONS.LOGIN_USER_FACEBOOK_SUCCESS:
    case ACTIONS.LOGIN_USER_TWITTER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };

    case ACTIONS.REGISTER_BORROWER_SUCCESS:
      return {
        ...state,
        user: action.user,
        borrower: action.borrower,
      };

    case ACTIONS.REGISTER_EXISTING_BORROWER_SUCCESS:
      return {
        ...state,
        user: action.user,
        borrower: action.borrower,
      };

    case ACTIONS.SET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.userLocation,
      };

    case ACTIONS.TWITTER_GET_ACCESS_TOKEN:
      return {
        ...state,
        user: {
          ...state.user,
          twitter_oauth_token: action.twitter_tokens.oauth_token,
          twitter_oauth_secret: action.twitter_tokens.oauth_token_secret,
        },
      };

    case ACTIONS.TWITTER_SUCCESS:
      const names = action.twitter_user.name.trim().split(/\s+(?=[^\s]+$)/);
      return {
        ...state,
        user: {
          ...state.user,
          first_name: names[0] ? names[0].trim() : '',
          last_name: names[1] ? names[1].trim() : '',
          email: action.twitter_user.email,
          twitter_screen_name: action.twitter_user.screen_name,
          twitter_id: action.twitter_user.id_str,
          profile_picture: action.twitter_user.profile_image_url_https,
        },
      };

    case ACTIONS.FACEBOOK_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          first_name: action.facebook_user.first_name,
          last_name: action.facebook_user.last_name,
          email: action.facebook_user.email,
          facebook_id: action.facebook_user.id,
          access_token: action.facebook_user.accessToken,
        },
      };

    case ACTIONS.GOOGLE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          first_name: action.google_user.given_name,
          last_name: action.google_user.family_name,
          email: action.google_user.email,
          google_id: action.google_user.id,
          access_token: action.google_user.accessToken,
          profile_picture: action.google_user.picture,
        },
      };

    case ACTIONS.GET_ICO_USERS_INFO_SUCCESS:
    case ACTIONS.GET_USER_PERSONAL_INFO_SUCCESS:
    case ACTIONS.UPDATE_USER_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.personalInfo,
        },
      };

      case ACTIONS.UPDATE_USER_ADDRESS_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.addressInfo,
        },
      };
      case ACTIONS.UPDATE_USER_TAXPAYER_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.taxpayerInfo,
        },
      };
    case ACTIONS.SET_PIN_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          has_pin: true,
        }
      }

    case ACTIONS.UPDATE_USER_PERSONAL_INFO_ERROR:
      return {
        ...state,
        error: action.error
      }

    case ACTIONS.TOGGLE_TERMS_OF_USE:
      return {
        ...state,
        agreedToTermsOfUse: !state.agreedToTermsOfUse,
      }

    case ACTIONS.UPLOAD_PLOFILE_IMAGE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          profile_picture: action.image
        },
      }

    case ACTIONS.START_KYC_SUCCESS:
    case ACTIONS.GET_KYC_STATUS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          kyc: action.kyc,
        }
      }

    case ACTIONS.GET_KYC_DOCUMENTS_SUCCESS:
    case ACTIONS.CREATE_KYC_DOCUMENTS_SUCCESS:
      return {
        ...state,
        kycDocuments: action.documents,
      }

    case ACTIONS.UPDATE_USER_APP_SETTINGS:
      return {
        ...state,
        appSettings: {
          ...state.appSettings,
          ...action.appSettings,
        }
      };

    case ACTIONS.GET_INDIVIDUAL_LINK_SUCCESS:
    case ACTIONS.SET_INDIVIDUAL_REFERRAL_LINK:
      return {
        ...state,
        user: {
          ...state.user,
          individual_referral_link: action.link
        }
      }


    default:
      return state;

  }
}
