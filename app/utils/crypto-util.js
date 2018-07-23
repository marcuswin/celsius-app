export default {
  isERC20,
  getEligibleCoins,
  isEligibleCoin,
}

const ELIGIBLE_COINS = ['btc', 'eth', 'cel'];

function isERC20(currency) {
  return ['eth', 'cel'].indexOf(currency) !== -1;
}

function getEligibleCoins() {
  return ELIGIBLE_COINS;
}

function isEligibleCoin(coin) {
  return ELIGIBLE_COINS.indexOf(coin.toLowerCase()) !== -1;
}
