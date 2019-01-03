// import ACTIONS from "../../config/constants/ACTIONS";

import { LOAN_STATUSES } from "../../config/constants/common";

function initialState() {
  return {
    allLoans: [
      { id: 1000, amount_collateral_usd: 1000, amount_collateral_crypto: 12.5, coin: 'BTC', status: LOAN_STATUSES.pending, created_at: new Date(), ltv: { percent: 0.5, interest: 0.12 } },
      { id: 20000, amount_collateral_usd: 20000, amount_collateral_crypto: 122.5, coin: 'ETH', status: LOAN_STATUSES.rejected, created_at: new Date(), ltv: { percent: 0.5, interest: 0.12 } },
      { id: 15000, amount_collateral_usd: 15000, amount_collateral_crypto: 120, coin: 'ETH', status: LOAN_STATUSES.approved, created_at: new Date(), ltv: { percent: 0.5, interest: 0.12 } },
      { id: 10000, amount_collateral_usd: 10000, amount_collateral_crypto: 125, coin: 'XRP', status: LOAN_STATUSES.active, created_at: new Date(), ltv: { percent: 0.5, interest: 0.12 } },
      { id: 12000, amount_collateral_usd: 12000, amount_collateral_crypto: 155, coin: 'LTC', status: LOAN_STATUSES.completed, created_at: new Date(), ltv: { percent: 0.5, interest: 0.12 } },
    ],
  };
}

export default function loansReducer($$state = initialState(), action) {
  switch (action.type) {
    default:
      return { ...$$state };
  }
}
