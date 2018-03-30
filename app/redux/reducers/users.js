/* eslint-disable no-case-declarations */
import ACTIONS from '../../config/constants/ACTIONS';
import { CAMERA_PHOTOS } from '../../config/constants/common';

const initialState = {
  userLocation: undefined,
  user: undefined,
  borrower: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
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
        user: action.borrower.user,
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
      const name = action.twitter_user.name.trim().split(/\s+(?=[^\s]+$)/);
      return {
        ...state,
        user: {
          ...state.user,
          first_name: name[0].trim(),
          last_name: name[1].trim(),
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

    case ACTIONS.GET_USER_PERSONAL_INFO_SUCCESS:
    case ACTIONS.CREATE_USER_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.personalInfo,
        },
      };

    case ACTIONS.GET_USER_ADDRESS_INFO_SUCCESS:
    case ACTIONS.CREATE_USER_ADDRESS_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.addressInfo,
        },
      };

    case ACTIONS.GET_USER_CONTACT_INFO_SUCCESS:
    case ACTIONS.CREATE_USER_CONTACT_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.contactInfo,
        },
      };

    case ACTIONS.GET_USER_BANK_INFO_SUCCESS:
    case ACTIONS.CREATE_USER_BANK_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.bankInfo,
        },
      };

    case ACTIONS.GET_USER_DOCUMENTS_INFO_SUCCESS:
    case ACTIONS.CREATE_USER_DOCUMENTS_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.documents,
        },
      };

    case ACTIONS.TAKE_CAMERA_PHOTO:
      if (action.photoName === CAMERA_PHOTOS.DOCUMENT_FRONT) return setDocumentImage(state, 'document_front', action.base64Image);
      if (action.photoName === CAMERA_PHOTOS.DOCUMENT_BACK) return setDocumentImage(state, 'document_back', action.base64Image);
      if (action.photoName === CAMERA_PHOTOS.SELFIE) return setDocumentImage(state, 'selfie', action.base64Image);
      return { ...state };

    default:
      return {...state};

  }
}

function setDocumentImage(state, imageName, image) {
  return {
    ...state,
    user: {
      ...state.user,
      [imageName]: image,
    }
  }
}
