import store from '../redux/store';

export default {
  isERC20,
  getEligibleCoins,
  isEligibleCoin,
}

function isERC20(currency) {
  return ['eth', 'cel', 'omg', 'zrx'].indexOf(currency.toLowerCase()) !== -1;
}

function getEligibleCoins() {
  const { compliance } = store.getState().users;
  return compliance.app.coins;
}

function isEligibleCoin(coin) {
  const { compliance } = store.getState().users;
  const eligibleCoins = compliance.app.coins;
  return eligibleCoins.indexOf(coin.toLowerCase()) !== -1;
}
