import ACTIONS from '../../config/constants/ACTIONS';

export {
  twitterClose,
  twitterOpen,
  twitterGetAccessToken,
  twitterSuccess
}

function twitterClose() {
  return {
    type: ACTIONS.TWITTER_CLOSE,
  }
}

function twitterOpen() {
  return {
    type: ACTIONS.TWITTER_OPEN,
  }
}

function twitterGetAccessToken(tokens) {
  return {
    type: ACTIONS.TWITTER_GET_ACCESS_TOKEN,
    twitter_tokens: tokens,
  }
}

function twitterSuccess(user) {
  return {
    type: ACTIONS.TWITTER_SUCCESS,
    twitter_user: user,
  }
}
