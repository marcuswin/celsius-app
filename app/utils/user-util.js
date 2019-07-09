import store from '../redux/store'

export {
  isCompanyMember,
  isUSCitizen,
  isMalisaPusonja,
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

/**
 * get if the user is a company member
 * @returns {boolean}
 */
function isUSCitizen () {
  const { profile } = store.getState().user
  return [profile.citizenship, profile.country].includes('United States')
}

function isMalisaPusonja() {
  const { profile } = store.getState().user
  return profile.email === 'malisa.pusonja@gmail.com' || profile.email === 'lela.djokic@mvpworkshop.co'
}
