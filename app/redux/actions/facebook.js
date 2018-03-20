import ACTIONS from "../../config/constants/ACTIONS";

function faceBookSuccess(user) {
  return {
    type: ACTIONS.FACEBOOK_SUCCESS,
    facebook_user: user,
  }
}

export { faceBookSuccess }
