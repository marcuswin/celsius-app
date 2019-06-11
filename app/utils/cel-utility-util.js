import store from '../redux/store'
import * as actions from '../redux/actions'

export default {
  isLosingMembership,
  isLosingTier,
  refetchMembershipIfChanged
}

/**
 * get if the user will lose cel membership
 *
 * @param {String} coin - eg. BTC|ETH|CEL
 * @param {String} newBalance
 * @returns {boolean}
 */
function isLosingMembership (coin, newBalance) {
  const { celsius_member: isCelsiusMember } = store.getState().user.profile
  return isCelsiusMember && coin === 'CEL' && Number(newBalance) < 1
}

/**
 * get if the user will lose cel his current tier
 *
 * @param {String} coin
 * @param {String} newBalance
 * @returns {boolean}
 */
function isLosingTier (coin, newBalance) {
  const { min_for_tier: minForTier } = store.getState().user.loyaltyInfo
  return coin === 'CEL' && Number(newBalance) < Number(minForTier)
}

/**
 * Refetch cel membership flag if the cel summary balance is changed and it is lower than 1
 *
 * @param {String} coin
 */
async function refetchMembershipIfChanged (coin) {
  await store.dispatch(actions.getWalletSummary())
  if (coin === 'CEL') {
    const { summary } = store.getState().wallet
    const coinData = summary.coins.find(c => c.short === 'CEL')
    if (Number(coinData.amount) < 1) {
      await store.dispatch(actions.getProfileInfo())
    }
  }
}
