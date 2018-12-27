// TODO(fj): export as object

import ACTIONS from '../../config/constants/ACTIONS';
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../config/constants/API";
import { showMessage, openModal } from "../ui/uiActions";
import apiKeyService from "../../services/api-key-service";
import { MODALS } from '../../config/constants/common';

export function createAPIKey(permissions) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.CREATE_API_KEY))

      const apiKeyRes = await apiKeyService.create(permissions)

      dispatch({
        type: ACTIONS.CREATE_API_KEY_SUCCESS,
        apiKey: apiKeyRes.data.api_key,
      })
      dispatch(openModal(MODALS.GENERATE_API_KEY))
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CREATE_API_KEY, err));
    }
  }
}

export function revokeAPIKey(keyId) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.DELETE_API_KEY))

      await apiKeyService.remove(keyId)

      dispatch({
        type: ACTIONS.DELETE_API_KEY_SUCCESS,
        keyId,
      })
      getAllAPIKeys();
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.DELETE_API_KEY, err));
    }
  }
}

export function getAllAPIKeys() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_API_KEYS))

      const apiKeysRes = await apiKeyService.getAll();

      dispatch({
        type: ACTIONS.GET_API_KEYS_SUCCESS,
        apiKeys: apiKeysRes.data.api_keys,
      })
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_API_KEYS, err));
    }
  }
}
