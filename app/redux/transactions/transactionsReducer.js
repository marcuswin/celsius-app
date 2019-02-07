import ACTIONS from '../../constants/ACTIONS';
import transactionsUtil from "../../utils/transactions-util";

const initialState = {}

export default function transactionsReducer(state = initialState, action) {
    const newTransactions = {};

    switch (action.type) {
      case ACTIONS.GET_ALL_TRANSACTIONS_SUCCESS:
        action.transactions.forEach(t => { newTransactions[t.id] = transactionsUtil.mapTransaction(action.transaction) });

        return {
          ...state,
          ...newTransactions,
        };
    default:
        return { ...state };
    }
}
