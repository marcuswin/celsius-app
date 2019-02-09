import { CameraRoll } from "react-native";

import ACTIONS from '../../constants/ACTIONS';
import * as navActions from '../nav/navActions';
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
import API from "../../constants/API";


export {
    getCameraRollPhotos,
    takeCameraPhoto,
    flipCamera,
    activateCamera,
    retakePhoto
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

function takeCameraPhoto(photo) {
    return {
        type: ACTIONS.TAKE_CAMERA_PHOTO,
        photo,
    }
}

function retakePhoto() {
    return {
        type: ACTIONS.RETAKE_PHOTO,
    }
}

function flipCamera() {
    return {
        type: ACTIONS.FLIP_CAMERA,
    }
}

function activateCamera(cameraProps) {
    return dispatch => {
        dispatch({
            type: ACTIONS.ACTIVATE_CAMERA,
            ...cameraProps,
        });
        dispatch(navActions.navigateTo('Camera', { onSave: cameraProps.onSave }));
    }
}