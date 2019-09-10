import BigNumber from 'bignumber.js';

/**
 * Checks if coin is ERC20
 * @todo: add missing ERC20 coins
 *
 * @param {string} currency - eg. eth
 * @returns {boolean}
 */
function isERC20(currency) {
  return ['eth', 'dai', 'pax', 'cel', 'omg', 'zrx', 'tusd', 'gusd', 'usdc', 'orbs', 'leo', 'usdt erc20', 'tcad', 'tgbp', 'thkd', 'taud'].indexOf(currency.toLowerCase()) !== -1;
}

function hasLinkToBuy(currency) {
  return ["BCH", "BTC", "ETH", "XRP", "LTC", "TUSD", "USDC", "PAX", 'THKD', 'TCAD', 'TAUD', 'TGBP'].includes(currency)
}

function provideLink(currency) {
  let link;
  switch (currency) {
    case "BCH":
      link = "https://buy.bitcoin.com/bch/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-bch";
      break;
    case "BTC":
      link = "https://buy.bitcoin.com/btc/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-btc";
      break;
    case "ETH":
      link = "https://buy.bitcoin.com/eth/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-eth";
      break;
    case "LTC":
      link = "https://buy.bitcoin.com/ltc/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-ltc";
      break;
    case "XRP":
      link = "https://buy.bitcoin.com/xrp/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-xrp";
      break;
    case "TUSD":
      link = "https://www.trusttoken.com/trueusd";
      break;
    case "USDC":
      link = "https://usdc.circle.com/start";
      break;
    case "PAX":
      link = "https://account.paxos.com/signup";
      break;
    case "THKD":
      link = "https://www.trusttoken.com/truehkd";
      break;
    case "TCAD":
      link = "https://www.trusttoken.com/truecad";
      break;
    case "TAUD":
      link = "https://www.trusttoken.com/trueaud";
      break;
    case "TGBP":
      link = "https://www.trusttoken.com/truegbp";
      break;
    default:
      link = null;
  }
  return link
}

function provideText(currency) {
  let text;
  switch (currency) {
    case "BCH":
      text = `Buy ${currency} from bitcoin.com`;
      break;
    case "BTC":
      text = `Buy ${currency} from bitcoin.com`;
      break;
    case "ETH":
      text = `Buy ${currency} from bitcoin.com`;
      break;
    case "LTC":
      text = `Buy ${currency} from bitcoin.com`;
      break;
    case "XRP":
      text = `Buy ${currency} from bitcoin.com`;
      break;
    case "TUSD":
      text = `Buy ${currency} from TrustToken`;
      break;
    case "USDC":
      text = `Buy ${currency} from Circle`;
      break;
    case "PAX":
      text = `Buy ${currency} from Paxos`;
      break;
    case "THKD":
      text = `Buy ${currency} from TrustToken`;
      break;
    case "TCAD":
      text = `Buy ${currency} from TrustToken`;
      break;
    case "TAUD":
      text = `Buy ${currency} from TrustToken`;
      break;
    case "TGBP":
      text = `Buy ${currency} from TrustToken`;
      break;
    default:
      text = null;
  }
  return text
}

function isGreaterThan(str1, str2) {
  const num1 = new BigNumber(str1)
  const num2 = new BigNumber(str2)
  return num1.gt(num2)
}

export default {
  isERC20, // TODO move to BE or something
  isGreaterThan, // TODO maybe move to formatter? add JSDoc
  hasLinkToBuy,
  provideLink,
  provideText
}
