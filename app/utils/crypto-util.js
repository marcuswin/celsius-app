// TODO(fj): user these more throughout the app
// TODO(fj): add conversion here
// TODO(fj): add conversion here
// TODO(fj): check if other crypto methods are used throughout the app

import { ELIGIBLE_COINS } from '../config/constants/common';

export default {
  isERC20,
  getEligibleCoins,
  isEligibleCoin,
}

function isERC20(currency) {
  return ['eth', 'cel', 'omg', 'zrx'].indexOf(currency.toLowerCase()) !== -1;
}

function getEligibleCoins() {
  return ELIGIBLE_COINS;
}

function isEligibleCoin(coin) {
  return ELIGIBLE_COINS.indexOf(coin.toLowerCase()) !== -1;
}
