// TODO(fj): add BigNumber here
// TODO(fj): check round and ordinal suffix methods
// TODO(fj): set crypto precision default to 5

import currency from "currency-formatter";

export default {
  usd,
  cel,
  crypto,
  ordinalSuffixOf,
  round,
  deepmerge,
  capitalize,
  percentage,
}

function usd(amount, options = {}) {
  return currency.format(amount, { code: 'USD', ...options });
}

function cel(amount) {
  return currency.format(amount, { precision: 0, thousand: ',', symbol: 'CEL', format: '%v %s' })
}

function crypto(amount, cryptocurrency, options = {}) {
  return currency.format(amount, { precision: options.precision || 5, thousand: ',', symbol: cryptocurrency, format: '%v %s' })
}

function round(amount, options = {}) {
  return currency.format(amount, { precision: options.precision || 2, thousand: ',' })
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function percentage(number) {
  return Math.round(number * 10000) / 100;
}

function ordinalSuffixOf(number) {
  const j = number % 10;
  const k = number % 100;

  if (j === 1 && k !== 11) {
    return `${number}st`;
  }
  if (j === 2 && k !== 12) {
    return `${number}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${number}rd`;
  }
  return `${number}th`;
}

// deep merge

function isMergeableObject(val) {
  const nonNullObject = val && typeof val === 'object'

  return nonNullObject
    && Object.prototype.toString.call(val) !== '[object RegExp]'
    && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
  const clone = optionsArgument && optionsArgument.clone === true
  return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
  const destination = target.slice()
  source.forEach((e, i) => {
    if (typeof destination[i] === 'undefined') {
      destination[i] = cloneIfNecessary(e, optionsArgument)
    } else if (isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, optionsArgument)
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e, optionsArgument))
    }
  })
  return destination
}

function mergeObject(target, source, optionsArgument) {
  const destination = {}
  if (isMergeableObject(target)) {
    Object.keys(target).forEach((key) => {
      destination[key] = cloneIfNecessary(target[key], optionsArgument)
    })
  }
  Object.keys(source).forEach((key) => {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneIfNecessary(source[key], optionsArgument)
    } else {
      destination[key] = deepmerge(target[key], source[key], optionsArgument)
    }
  })
  return destination
}

function deepmerge(target, source, optionsArgument) {
  const array = Array.isArray(source);
  const options = optionsArgument || { arrayMerge: defaultArrayMerge }
  const arrayMerge = options.arrayMerge || defaultArrayMerge

  if (array) {
    return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
  }
  return mergeObject(target, source, optionsArgument)
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
  if (!Array.isArray(array) || array.length < 2) {
    throw new Error('first argument should be an array with at least two elements')
  }

  // we are sure there are at least 2 values, so it is safe to have no initial value
  return array.reduce((prev, next) => deepmerge(prev, next, optionsArgument));
}
