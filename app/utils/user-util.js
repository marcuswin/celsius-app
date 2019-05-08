import { Constants } from "expo";

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
