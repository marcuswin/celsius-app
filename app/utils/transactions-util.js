import moment from "moment";

import { TRANSACTION_TYPES } from "../config/constants/common";

const transactionsUtil = {
  mapTransaction,
  filterTransactions,
};

function mapTransaction(transaction) {
  return {
    ...transaction,
    type: getTransactionType(transaction)
  };
}

function getTransactionType(transaction) {
  if (["canceled", "removed", "rejected", "rejeceted"].includes(transaction.state)) return TRANSACTION_TYPES.CANCELED;

  if (transaction.nature === "deposit" && !transaction.is_confirmed) return TRANSACTION_TYPES.DEPOSIT_PENDING;
  if (transaction.nature === "deposit" && transaction.is_confirmed) return TRANSACTION_TYPES.DEPOSIT_CONFIRMED;
  if (transaction.nature === "withdrawal" && !transaction.is_confirmed) return TRANSACTION_TYPES.WITHDRAWAL_PENDING;
  if (transaction.nature === "withdrawal" && transaction.is_confirmed) return TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED;
  if (transaction.nature === "interest") return TRANSACTION_TYPES.INTEREST;
  if (transaction.nature === "collateral") return TRANSACTION_TYPES.COLLATERAL;
  if (transaction.nature === "bonus_token") return TRANSACTION_TYPES.BONUS_TOKEN;

  if (transaction.nature === "referred_award" && transaction.state === "locked") return TRANSACTION_TYPES.REFERRED_HODL;
  if (transaction.nature === "referred_award" && transaction.state === "confirmed") return TRANSACTION_TYPES.REFERRED;
  if (transaction.nature === "referrer_award" && transaction.amount === "locked") return TRANSACTION_TYPES.REFERRER_HODL;
  if (transaction.nature === "referrer_award" && transaction.state === "confirmed") return TRANSACTION_TYPES.REFERRER;

  // TODO(sb): TRANSACTION_TYPES.TRANSFER_ONHOLD (CELPAY_ONHOLD)
  // TODO(sb): TRANSACTION_TYPES.TRANSFER_EXPIRED (CELPAY_EXPIRED) === RETURNED


  if (transaction.nature === "inbound_transfer" && transaction.transfer_data) return TRANSACTION_TYPES.TRANSFER_RECEIVED;
  if (transaction.nature === "outbound_transfer" && transaction.transfer_data) {
    if (!transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at && !transaction.transfer_data.expired_at) return TRANSACTION_TYPES.TRANSFER_PENDING;
    if (transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at) return TRANSACTION_TYPES.TRANSFER_CLAIMED;
    if (transaction.transfer_data.claimed_at && transaction.transfer_data.cleared_at) return TRANSACTION_TYPES.TRANSFER_SENT;
    if (transaction.transfer_data.expired_at) return TRANSACTION_TYPES.TRANSFER_RETURNED;
  }

  if (transaction.type === "incoming") return TRANSACTION_TYPES.IN;
  if (transaction.type === "outgoing") return TRANSACTION_TYPES.OUT;
}

// TODO(fj) add filter
function filterTransactions(transactions) {
  if (!transactions) return [];

  const transactionIds = Object.keys(transactions);
  const transactionArray = [];
  transactionIds.forEach(tid => transactionArray.push(transactions[tid]));

  return orderTransactionsByDate(transactionArray);
}

function orderTransactionsByDate(transactions = []) {
  return transactions.sort((a, b) => {
    const date1 = moment(a.time)
    const date2 = moment(b.time)

    if (date1.isAfter(date2)) {
      return -1;
    }
    if (date1.isBefore(date2)) {
      return 1;
    }

    return 0;
  });
}



export default transactionsUtil;
