import { CameraRoll } from "react-native";

import ACTIONS from '../../config/constants/ACTIONS';
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
import API from "../../config/constants/API";

export {
  getCameraRollPhotos,
}


function getCameraRollPhotos() {
  return async (dispatch, getState) => {
    const { cameraRoll } = getState();

    if (!cameraRoll.hasMore) return;

    const config = {
      after: cameraRoll.lastPhotoCursor,
      first: 30,
      assetType: 'Photos',
    }

    dispatch(startApiCall(API.GET_CAMERA_ROLL));

    try {
      const photos = await CameraRoll.getPhotos(config);
      dispatch(getCameraRollPhotosSuccess(photos));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_CAMERA_ROLL, err));
    }
  }
}

function getCameraRollPhotosSuccess(photos) {
  return {
    photos,
    type: ACTIONS.GET_CAMERA_ROLL_SUCCESS,
    callName: API.GET_CAMERA_ROLL,
  }
}
