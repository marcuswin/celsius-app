import { Permissions } from 'expo';

export const hasPermission = async (permission) => {
  const { status } = await Permissions.getAsync(permission);
  return status === 'granted'
};

export const requestForPermission = async (permission) => {
  const { status } = await Permissions.askAsync(permission);
  return status === 'granted'
};
