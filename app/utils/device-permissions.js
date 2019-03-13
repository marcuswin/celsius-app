import { Permissions } from 'expo';
import { Linking, Platform } from 'react-native';

export default {
  hasPermission,
  requestForPermission,
}


/**
 * Checks if a user has allowed some permission
 *
 * @param {string} permission - from expo.Permissions
 * @returns {boolean}
 */
async function hasPermission(permission) {
  const { status } = await Permissions.getAsync(permission);
  return status === 'granted'
};


/**
 * Requests some permissions for user
 *
 * @param {string} permission - from expo.Permissions
 * @returns {boolean}
 */
async function requestForPermission(permission) {
  let { status } = await Permissions.getAsync(permission);

  if (Platform.OS === 'ios') {
    if (status === 'undetermined') {
      const perm = await Permissions.askAsync(permission);
      status = perm.status;
    } else {
      Linking.openURL('app-settings:')
    }
  } else if (Platform.OS === 'android') {
    const perm = await Permissions.askAsync(permission);
    status = perm.status;
  }

  return status === 'granted'
};
