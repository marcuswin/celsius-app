import ACTIONS from "../../constants/ACTIONS";

function initialState() {
  return {
    walletTotalChartData: [],
    coinWalletChartData: [],
    interestChartData: [],
    coinInterestChartData: []
  };
}

export default function graphReducer(state = initialState(), action) {

  switch (action.type) {
    case ACTIONS.GET_WALLET_BALANCE_DATA_SUCCESS:
      return {
        ...state,
        walletTotalChartData: action.walletTotal
      };

    case ACTIONS.GET_COIN_WALLET_BALANCE_DATA_SUCCESS:
      return {
        ...state,
        coinWalletChartData: action.coinWallet
      };

    case ACTIONS.GET_INTEREST_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        interestChartData: action.interestChart
      };

    case ACTIONS.GET_COIN_INTEREST_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        coinInterestChartData: action.coinInterestChart
      };

    default:
      return { ...state };
  }
}
