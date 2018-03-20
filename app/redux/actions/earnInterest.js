import ACTIONS from '../../config/constants/ACTIONS';
import API from '../../config/constants/API';
import {startApiCall, apiError} from './api';
import {showMessage} from './ui';
import earnInterestService from '../../services/earn-interest-service';

export {
  createInterestRequest,
  acceptInterestRequest,
}

function createInterestRequest() {
  return async dispatch => {
    dispatch(startApiCall(API.CREATE_INTEREST_REQUEST));

    try {
      const res = await earnInterestService.create();
      const interestData = res.data.earn_interest;
      dispatch(createInterestSuccess(interestData));

    } catch(err) {
      dispatch(showMessage(err.type === 'info' ? 'info' : 'error', err.msg));
      dispatch(apiError(API.CREATE_INTEREST_REQUEST, err));
    }
  }
}

function createInterestSuccess(interestData) {
  return {
    type: ACTIONS.CREATE_INTEREST_SUCCESS,
    interestData,
    callName: API.CREATE_INTEREST_REQUEST,
  }
}


function acceptInterestRequest() {
  return async dispatch => {
    dispatch(startApiCall(API.ACCEPT_INTEREST_REQUEST));

    try {
      const res = await earnInterestService.accept();
      const acceptedInterestData = res.data.earn_interest;
      dispatch(acceptInterestRequestSuccess(acceptedInterestData));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.ACCEPT_INTEREST_REQUEST, err));
    }
  }
}

function acceptInterestRequestSuccess(acceptedInterestData) {
  return {
    type: ACTIONS.ACCEPT_INTEREST_REQUEST_SUCCESS,
    acceptedInterestData,
    callName: API.ACCEPT_INTEREST_REQUEST,
  }
}

