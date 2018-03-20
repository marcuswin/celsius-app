import Expo from 'expo'

export {
  setSecureStoreKey,
  getSecureStoreKey,
  deleteSecureStoreKey
};

/**
 * @name setSecureStoreKey
 * @param key {string}
 * @param value {string}
 * @description Store a key–value pair.
 * The key to associate with the stored value. Keys may contain alphanumeric characters ., -, and _.
 *
 * @return A promise that will reject if value cannot be stored on the device
 * */
async function setSecureStoreKey(key, value) {
  return await Expo.SecureStore.setItemAsync(key, value)
}

/**
 * @name getSecureStoreKey
 * @param key {string}
 * @description Fetch the stored value associated with the provided key.
 *
 * @return A promise that resolves to the previously stored value, or null if there is no entry for the given key.
 * The promise will reject if an error occurred while retrieving the value.
 * */
async function getSecureStoreKey(key) {
  return Expo.SecureStore.getItemAsync(key)
}

/**
 * @name deleteSecureStoreKey
 * @param key {string}
 * @description Delete the value associated with the provided key.
 *
 * @return A promise that will reject if the value couldn’t be deleted.
 * */
async function deleteSecureStoreKey(key) {
  return Expo.SecureStore.deleteItemAsync(key)
}

