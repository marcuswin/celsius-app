import ACTIONS from "../../config/constants/ACTIONS";

function facebookSuccess(user) {
  return {
    type: ACTIONS.FACEBOOK_SUCCESS,
    facebook_user: user,
  }
}

export { facebookSuccess }
