// TODO(sb): RN update dependencies fixes
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { Platform } from "react-native"

const ALL_PERMISSIONS = {
  CAMERA: "CAMERA",
  CONTACTS: "CONTACTS",
  LOCATION: "LOCATION",
  LIBRARY: "LIBRARY",
  NOTIFICATIONS: "NOTIFICATIONS"
}

export { getPermissionStatus, hasPermission, requestForPermission, ALL_PERMISSIONS };

/**
 * Get permission name per platform
 *
 * @param {string} permission
 * @returns {string}
 */
function getPermissionName(permission) {
  let platformPermission
  switch (permission) {
    case ALL_PERMISSIONS.CAMERA:
      platformPermission = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      })
      break;

    case ALL_PERMISSIONS.CONTACTS:
      platformPermission = Platform.select({
        android: PERMISSIONS.ANDROID.READ_CONTACTS,
        ios: PERMISSIONS.IOS.CONTACTS,
      })
      break;

    case ALL_PERMISSIONS.LOCATION:
      platformPermission = Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      })
      break;

    case ALL_PERMISSIONS.LIBRARY:
      platformPermission = Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      })
      break;

    default:
      break;
  }
  return platformPermission
}

/**
 * Get the permission status
 *
 * @param {string} permission - from ALL_PERMISSIONS
 * @returns {boolean}
 */
async function getPermissionStatus(permission) {
  const platformPermission = getPermissionName(permission)
  const result = await check(platformPermission)
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log(
        'This feature is not available (on this device / in this context)',
      );
      break;
    case RESULTS.DENIED:
      console.log(
        'The permission has not been requested / is denied but requestable',
      );
      break;
    case RESULTS.GRANTED:
      console.log('The permission is granted');
      break;
    case RESULTS.BLOCKED:
      console.log('The permission is denied and not requestable anymore');
      break;
  }
  return result
}

/**
 * Checks if a user has allowed some permission
 *
 * @param {string} permission - from ALL_PERMISSIONS
 * @returns {boolean}
 */
async function hasPermission(permission) {
  const platformPermission = getPermissionName(permission)
  const result = await check(platformPermission)
  return result === RESULTS.GRANTED
}

/**
 * Requests some permissions for user
 *
 * @param {string} permission - 
 * @returns {boolean}
 */
async function requestForPermission(permission, options) {
  const platformPermission = getPermissionName(permission)
  const result = await request(platformPermission)
  return result
}
