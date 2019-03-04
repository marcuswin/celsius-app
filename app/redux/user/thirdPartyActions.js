import { Constants } from 'expo';

import ACTIONS from '../../constants/ACTIONS';
import API from '../../constants/API';
import { startApiCall, apiError } from '../api/apiActions';
import { navigateTo } from '../nav/navActions';
import { showMessage } from '../ui/uiActions';
import { getComplianceInfo } from "../user/userActions";
import { claimAllBranchTransfers } from '../transfers/transfersActions';
import { setSecureStoreKey } from "../../utils/expo-storage";
import usersService from '../../services/users-service';
import { analyticsEvents } from "../../utils/analytics-util";

const { SECURITY_STORAGE_AUTH_KEY } = Constants.manifest.extra;

export {
    registerUserTwitter,
    loginTwitter,
    twitterClose,
    twitterOpen,
    twitterGetAccessToken,
    twitterSuccess,

    registerUserFacebook,
    loginFacebook,
    facebookSuccess,

    registerUserGoogle,
    loginGoogle,
    googleSuccess
}



// Twitter Actions
/**
 * Registers a new user through Twitter
 * @param {Object} user
 */
function registerUserTwitter(user) {
    return async (dispatch, getState) => {
        dispatch(startApiCall(API.REGISTER_USER_TWITTER));
        try {
            const referralLinkId = getState().branch.referralLinkId;

            const res = await usersService.registerTwitter({
                ...user,
                referralLinkId,
            });

            // add token to expo storage
            await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

            dispatch(registerUserTwitterSuccess(res.data));
            dispatch(claimAllBranchTransfers());
            await analyticsEvents.sessionStart();
            analyticsEvents.finishedSignup('Twitter', referralLinkId, res.data.user);
        } catch (err) {
            dispatch(showMessage('error', err.msg));
            dispatch(apiError(API.REGISTER_USER_TWITTER, err));
        }
    }
}


/**
 * @todo: move to registerUserTwitter
 */
function registerUserTwitterSuccess(data) {

    return (dispatch) => {
        dispatch({
            type: ACTIONS.REGISTER_USER_TWITTER_SUCCESS,
            callName: API.REGISTER_USER_TWITTER,
            user: data.user,
        })
    }
}


/**
 * Log a user in through Twitter
 * @param {Object} user
 */
function loginTwitter(user) {
    return async dispatch => {
        dispatch(startApiCall(API.LOGIN_USER_TWITTER));
        try {
            const res = await usersService.twitterLogin(user);

            await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

            const userRes = await usersService.getPersonalInfo();
            res.data.user = userRes.data;

            dispatch(loginUserTwitterSuccess(res.data))
            dispatch(claimAllBranchTransfers());
        } catch (err) {
            dispatch(showMessage('error', err.msg));
            dispatch(apiError(API.LOGIN_USER_TWITTER, err))
        }
    }
}


/**
 * @todo: move to loginUser
 */
function loginUserTwitterSuccess(data) {
    analyticsEvents.sessionStart();
    return async (dispatch) => {
      await dispatch(getComplianceInfo());

      dispatch({
            type: ACTIONS.LOGIN_USER_TWITTER_SUCCESS,
            callName: API.LOGIN_USER_TWITTER,
            user: data.user,
        });

        dispatch(navigateTo('Home', true));
    }
}


/**
 * Closes Twitter modal
 * @returns {Object} - Action
 */
function twitterClose() {
    return {
        type: ACTIONS.TWITTER_CLOSE,
    }
}


/**
 * Opens Twitter Modal
 * @returns {Object} - Action
 */
function twitterOpen() {
    return {
        type: ACTIONS.TWITTER_OPEN,
    }
}


/**
 * Sets Twitter access token in reducer
 * @param {Object} tokens
 * @returns {Object} - Action
 */
function twitterGetAccessToken(tokens) {
    return {
        type: ACTIONS.TWITTER_GET_ACCESS_TOKEN,
        twitter_tokens: tokens,
    }
}


/**
 * Successfully logged into Twitter
 * @param {Object} user
 * @returns {Object} - Action
 */
function twitterSuccess(user) {
    return {
        type: ACTIONS.TWITTER_SUCCESS,
        twitter_user: user,
    }
}



// Facebook Actions
/**
 * Creates new user through Facebook
 * @param {Object} user
 */
function registerUserFacebook(user) {
    return async (dispatch, getState) => {
        dispatch(startApiCall(API.REGISTER_USER_FACEBOOK));
        try {
            const referralLinkId = getState().branch.referralLinkId;

            const res = await usersService.registerFacebook({
                ...user,
                referralLinkId,
            });

            // add token to expo storage
            await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

            dispatch(registerUserFacebookSuccess(res.data));
            dispatch(claimAllBranchTransfers());
            await analyticsEvents.sessionStart();
            analyticsEvents.finishedSignup('Facebook', referralLinkId, res.data.user);
        } catch (err) {
            dispatch(showMessage('error', err.msg));
            dispatch(apiError(API.REGISTER_USER_FACEBOOK, err));
        }
    }
}


/**
 * @todo: move to registerUserFacebook
 */
function registerUserFacebookSuccess(data) {

    return (dispatch) => {
        dispatch({
            type: ACTIONS.REGISTER_USER_FACEBOOK_SUCCESS,
            callName: API.REGISTER_USER_FACEBOOK,
            user: data.user,
        })
    }
}


/**
 * Logs a user in through Facebook
 * @param {Object} user
 */
function loginFacebook(user) {
    return async dispatch => {
        dispatch(startApiCall(API.LOGIN_USER_FACEBOOK));
        try {
            const res = await usersService.facebookLogin(user);

            await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

            const userRes = await usersService.getPersonalInfo();
            res.data.user = userRes.data;

            dispatch(loginUserFacebookSuccess(res.data))
            dispatch(claimAllBranchTransfers());
        } catch (err) {
            dispatch(showMessage('error', err.msg));
            dispatch(apiError(API.LOGIN_USER_FACEBOOK, err))
        }
    }
}


/**
 * @todo: move to loginUserFacebook
 */
function loginUserFacebookSuccess(data) {
    analyticsEvents.sessionStart();
    return async (dispatch) => {
      await dispatch(getComplianceInfo());

      dispatch({
            type: ACTIONS.LOGIN_USER_FACEBOOK_SUCCESS,
            callName: API.LOGIN_USER_FACEBOOK,
            user: data.user,
        });

        dispatch(navigateTo('Home', true));
    }
}


/**
 * User successfully logged in through Facebook
 * @param {Object} user
 * @returns {Object} - Action
 */
function facebookSuccess(user) {
    return {
        type: ACTIONS.FACEBOOK_SUCCESS,
        facebook_user: user,
    }
}


// Google Actions
/**
 * Creates a new user through Google
 * @param {Object} user - response from google
 */
function registerUserGoogle(user) {
    return async (dispatch, getState) => {
        dispatch(startApiCall(API.REGISTER_USER_GOOGLE));
        try {
            const referralLinkId = getState().branch.referralLinkId;

            const res = await usersService.registerGoogle({
                ...user,
                referralLinkId,
            });

            await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);
            dispatch(registerUserGoogleSuccess(res.data))
            dispatch(claimAllBranchTransfers());
            await analyticsEvents.sessionStart();
            analyticsEvents.finishedSignup('Google', referralLinkId, res.data.user);
        } catch (err) {
            dispatch(showMessage('error', err.msg));
            dispatch(apiError(API.REGISTER_USER_GOOGLE, err))
        }
    }
}


/**
 * @todo: move to registerUserGoogle
 */
function registerUserGoogleSuccess(data) {

    return (dispatch) => {
        dispatch({
            type: ACTIONS.REGISTER_USER_GOOGLE_SUCCESS,
            callName: API.REGISTER_USER_GOOGLE,
            user: data.user,
        })
    }
}


/**
 * Logs a user in through Google
 * @param {Object} user - user from Google
 */
function loginGoogle(user) {
    return async dispatch => {
        dispatch(startApiCall(API.LOGIN_USER_GOOGLE));
        try {
            const res = await usersService.googleLogin(user);

            await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, res.data.id_token);

            const userRes = await usersService.getPersonalInfo();
            res.data.user = userRes.data;

            dispatch(loginUserGoogleSuccess(res.data))
            dispatch(claimAllBranchTransfers());
        } catch (err) {
            dispatch(showMessage('error', err.msg));
            dispatch(apiError(API.REGISTER_USER_GOOGLE, err))
        }
    }
}


/**
 * @todo: move to loginUserGoogle
 */
function loginUserGoogleSuccess(data) {
    analyticsEvents.sessionStart();
    return async (dispatch) => {
      await dispatch(getComplianceInfo());

      dispatch({
            type: ACTIONS.LOGIN_USER_GOOGLE_SUCCESS,
            callName: API.LOGIN_USER_GOOGLE,
            user: data.user,
        });

        dispatch(navigateTo('Home', true));
    }
}


/**
 * User successfully logged in through Google
 * @param {Object} user - user from Google
 * @returns {Object} - Action
 */
function googleSuccess(user) {
    return {
        type: ACTIONS.GOOGLE_SUCCESS,
        google_user: user
    }
}
