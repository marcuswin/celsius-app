import { Constants } from "expo";
import store from '../redux/store';

/**
 * @param {Object} userData
 * @returns {boolean}
 */
export function shouldRenderInitialIdVerification(userData) {
  if (Constants.appOwnership === "expo" && !Constants.isDevice) {
    return false;
  }

  return !userData.enteredInitialPin;
}

export function isBlacklistedCountry(place) {
  const country = store.getState().generalData.blacklistedCountryResidency;
  let isPlace;

  if(country.indexOf(place) !== -1) {
    isPlace = true
  } else {
    isPlace = false
  }

  return isPlace
}

export function isBlacklistedState(place) {
  const state = store.getState().generalData.blacklistedStatesResidency;
  let isPlace;

  if(state.indexOf(place) !== -1) {
    isPlace = true
  } else {
    isPlace = false
  }

  return isPlace
}

export function isBlacklistedCountryLocation(place) {
  const country = store.getState().generalData.blacklistedCountryLocation;
  let isPlace;

  if(country.indexOf(place) !== -1) {
    isPlace = true
  } else {
    isPlace = false
  }

  return isPlace
}

export function isBlacklistedStateLocation(place) {
  const state = store.getState().generalData.blacklistedStatesLocation;
  let isPlace;

  if(state.indexOf(place) !== -1) {
    isPlace = true
  } else {
    isPlace = false
  }

  return isPlace
}

