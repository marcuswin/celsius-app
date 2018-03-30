import currency from "currency-formatter";

export default {
  usd,
  cel,
  crypto,
}

function usd(amount, options = {}) {
  return currency.format(amount, { code: 'USD', ...options });
}

function cel(amount) {
  return currency.format(amount, { precision: 0, thousand: ',', symbol: 'CEL', format: '%v %s' })
}

function crypto(amount, cryptocurrency) {
  return currency.format(amount, { precision: 2, thousand: ',', symbol: cryptocurrency, format: '%v %s' })
}
