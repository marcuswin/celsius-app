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
