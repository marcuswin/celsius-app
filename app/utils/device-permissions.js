import { Permissions } from 'expo';
import { Linking, Platform } from 'react-native';

export const hasPermission = async (permission) => {
  const { status } = await Permissions.getAsync(permission);
  return status === 'granted'
};

export const requestForPermission = async (permission) => {
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
