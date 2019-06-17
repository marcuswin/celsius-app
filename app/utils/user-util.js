import store from '../redux/store'

/**
 * @param {Object} userData
 * @returns {boolean}
 */
export function shouldRenderInitialIdVerification (userData) {
  return !userData.enteredInitialPin
}

/**
 * get if the user is a company member
 * @returns {boolean}
 */
export function isCompanyMember () {
  const { profile } = store.getState().user
  if (!profile || !profile.email) return false
  return profile.email.includes('@mvpworkshop.co') || profile.email.includes('@celsius.network')
}
