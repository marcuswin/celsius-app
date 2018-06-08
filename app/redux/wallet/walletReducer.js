import ACTIONS from '../../config/constants/ACTIONS';

function initialState() {
    return {
      addresses: {
        ethAddress: undefined,
        btcAddress: undefined,
      }
    };
}

export default function walletReducer($$state = initialState(), action) {
    switch (action.type) {
      case ACTIONS.GET_COIN_ADDRESS_SUCCESS:
          return {
            ...$$state,
            addresses: {
              ...$$state.addresses,
              ...action.address
            }
          };

    default:
        return { ...$$state };
    }
}
