import { Platform } from "react-native";

import mixpanelService from "../services/mixpanel-service";
import store from "../redux/store";
import appUtil from "./app-util";
import loggerUtil from "./logger-util";

const userBehaviorUtil = {
  sendEvent,
  buttonPressed,
  navigated,
  sessionStarted,
  sessionEnded
};

let userData = {};

let advertisingId;

let revisionId = "";
let version = "";

const appInfo = { os: Platform.OS };

/**
 * Send event attribution
 *
 * @param {string} event - name of the event
 * @param {Object} data - payload
 */
async function sendEvent(event, data = {}) {
  if (!advertisingId) {
    advertisingId = store.getState().app.advertisingId;
    appInfo.advertisingId = advertisingId;
  }
  if (!revisionId || !version) {
    try {
      const metadata = await appUtil.getRevisionId();
      version = metadata.codePushVersion.version;
      revisionId = metadata.codePushVersion.label;

      appInfo.revisionId = revisionId;
      appInfo.appVersion = version;
    } catch (error) {
      loggerUtil.err(error);
    }
  }
  if (!userData.id) {
    userData = store.getState().user.profile;
  }
  mixpanelService.track(event, {
    distinct_id: userData.id,
    ...appInfo,
    ...data
  });
}

/**
 * Fires an event when a user fires NAVIGATE_TO or NAVIGATE_BACK actions
 *
 * @param {string} screen
 */
function navigated(screen) {
  sendEvent("Navigated to", { screen });
}

/**
 * Fires an event when a user presses a CelButton
 *
 * @param {string} buttonText - copy on the button
 */
function buttonPressed(button) {
  sendEvent("Button pressed", { button });
}

/**
 * Set data to the user selected by distinct_id
 */
function sessionStarted() {
  sendEvent("$create_alias", { alias: userData.id });
  mixpanelService.engage(userData.id, {
    $email: userData.email,
    $first_name: userData.first_name,
    $last_name: userData.last_name,
    $created: userData.created_at,
    $phone: userData.cellphone,
    "Phone verified": userData.cellphone_verified,
    Citizenship: userData.citizenship,
    "Country of residence": userData.country,
    State: userData.state,
    $city: userData.city,
    "Two factor enabled": !!userData.two_factor_enabled,
    "Has pin": userData.has_pin,
    "KYC status": userData.kyc ? userData.kyc.status : "unknown",
    "Has referral link": !!userData.referral_link_id,
    "Is celsius member": userData.celsius_member,
    "Has SSN": !!userData.ssn
  });
  sendEvent("Session started");
}

/**
 * Fires an event when a user ends the session - logout|app state to background
 */
function sessionEnded() {
  userData = {};
  sendEvent("Session ended");
}

export default userBehaviorUtil;
