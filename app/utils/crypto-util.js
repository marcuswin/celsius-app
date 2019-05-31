// TODO(fj): user these more throughout the app
// TODO(fj): add conversion here
// TODO(fj): add conversion here
// TODO(fj): check if other crypto methods are used throughout the app

import BigNumber from 'bignumber.js';
import { ELIGIBLE_COINS } from '../constants/DATA';

/**
 * Checks if coin is ERC20
 * @todo: add missing ERC20 coins
 *
 * @param {string} currency - eg. eth
 * @returns {boolean}
 */
function isERC20(currency) {
  return ['eth', 'dai', 'pax', 'cel', 'omg', 'zrx', 'tusd', 'gusd', 'usdc'].indexOf(currency.toLowerCase()) !== -1;
}

/**
 * Gets Celsius eligible coins
 * @deprecated: moved to compliance
 */
function getEligibleCoins() {
  return ELIGIBLE_COINS;
}

/**
 * Checks if coin is eligible
 * @deprecated: moved to compliance
 */
function isEligibleCoin(coin) {
  return ELIGIBLE_COINS.indexOf(coin.toLowerCase()) !== -1;
}

function isGreaterThan(str1, str2) {
  const num1 = new BigNumber(str1)
  const num2 = new BigNumber(str2)
  return num1.gt(num2)
}

/**
 * WalletLanding page priority order for coins
 */
const priorityCoins = ["CEL", "BTC", "ETH", "XRP", "LTC", "ZRX"];


export default {
  isERC20,
  getEligibleCoins,
  isEligibleCoin,
  priorityCoins,
  isGreaterThan
}
