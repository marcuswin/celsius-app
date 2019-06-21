import store from '../redux/store'

export {
  isCompanyMember,
  // TODO maybe add isCelsiusMember, hasPassedKYC ...
}

/**
 * get if the user is a company member
 * @returns {boolean}
 */
function isCompanyMember () {
  const { profile } = store.getState().user
  if (!profile || !profile.email) return false
  return profile.email.includes('@mvpworkshop.co') || profile.email.includes('@celsius.network')
}
