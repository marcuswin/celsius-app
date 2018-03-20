import currency from "currency-formatter";

export default {
  usd,
  cel
}

function usd(amount, options = {}) {
  return currency.format(amount, { code: 'USD', ...options });
}

function cel(amount) {
  return currency.format(amount, { precision: 0, thousand: ',', symbol: 'CEL', format: '%v %s' })
}
