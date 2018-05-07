import ACTIONS from '../../config/constants/ACTIONS';

export {
  googleSuccess
}

function googleSuccess(user) {
  return {
    type: ACTIONS.GOOGLE_SUCCESS,
    google_user: user
  }
}
