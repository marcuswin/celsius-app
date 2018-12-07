import branchService from "../services/branch-service";

export const branchEvents = {
  completeRegistration: (userId, method) => branchService.createBranchEvent({ name: 'COMPLETE_REGISTRATION', user_data: { developer_identity: userId }, custom_data: { fb_registration_method: method, method }}),
  achieveLevel: (userId, description) => branchService.createBranchEvent({ name: 'ACHIEVE_LEVEL', user_data: { developer_identity: userId }, content_items: [{ $og_description: description, description }]}),
  addToCart: (userId, loanApplication) => branchService.createBranchEvent({
    name: 'ADD_TO_CART',
    user_data: { developer_identity: userId },
    commerce_data: {
      revenue: loanApplication.collateral_amount_usd,
      currency: "USD",
    },
    event_data: {
      revenue: Number(loanApplication.collateral_amount_usd),
      currency: "USD",
    },
    content_items: [{
      $product_name: loanApplication.coin,
      $sku: loanApplication.id,
    }],
    custom_data: {
      amount_usd: loanApplication.collateral_amount_usd.toString(),
      amount_crypto: loanApplication.collateral_amount_crypto.toString(),
      ltv: loanApplication.ltv.toString(),
      interest: loanApplication.interest.toString(),
      monthly_payment: loanApplication.monthly_payment.toString(),
    }
  }),
  spendCredits: (userId, celPayInfo) => branchService.createBranchEvent({
    name: 'SPEND_CREDITS',
    user_data: { developer_identity: userId },
    event_data: {
      revenue: Number(celPayInfo.amountUsd),
      currency: 'USD',
    },
    content_items: [{
      $product_name: celPayInfo.coin,
      $sku: celPayInfo.hash,
    }],
    custom_data: {
      amount_usd: celPayInfo.amountUsd.toString(),
      amount_crypto: celPayInfo.amount.toString(),
      coin: celPayInfo.coin,
    }
  }),
  addToWishlist: (userId, withdrawInfo) => branchService.createBranchEvent({
    name: 'ADD_TO_WISHLIST' ,
    user_data: { developer_identity: userId },
    event_data: {
      revenue: Number(withdrawInfo.amountUsd),
      currency: 'USD',
    },
    content_items: [{
      $product_name: withdrawInfo.coin,
      $sku: withdrawInfo.id,
    }],
    custom_data: {
      amount_usd: withdrawInfo.amountUsd.toString(),
      amount_crypto: withdrawInfo.amount.toString(),
      coin: withdrawInfo.coin,
    }
  }),
}
