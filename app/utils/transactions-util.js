import moment from "moment";

import { TRANSACTION_TYPES } from "../constants/DATA";
import STYLES from "../constants/STYLES";

const transactionsUtil = {
  mapTransaction,
  filterTransactions,
};

/**
 * Maps transaction props from server
 *
 * @param {Object} transaction
 * @returns {Object}
 */
function mapTransaction(transaction) {
  const newTransaction = { ...transaction };
  newTransaction.type = getTransactionType(newTransaction);
  newTransaction.uiProps = getTransactionProps(newTransaction);
  newTransaction.uiSections = getTransactionSections(newTransaction);

  return newTransaction;
}

/**
 * Gets transaction type
 *
 * @param {Object} transaction
 * @returns {string} one of TRANSACTION_TYPES
 */
function getTransactionType(transaction) {
  if (
    ["canceled", "removed", "rejected", "rejeceted"].includes(transaction.state)
  ) {
    if (transaction.nature === "withdrawal") {
      return TRANSACTION_TYPES.WITHDRAWAL_CANCELED;
    }
    return TRANSACTION_TYPES.CANCELED;
  }

  if (transaction.nature === "deposit" && !transaction.is_confirmed)
    return TRANSACTION_TYPES.DEPOSIT_PENDING;
  if (transaction.nature === "deposit" && transaction.is_confirmed)
    return TRANSACTION_TYPES.DEPOSIT_CONFIRMED;
  if (transaction.nature === "withdrawal") {
    if (transaction.verified === false)
      return TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION;
    if (transaction.verified && transaction.state === "pending_manual_approval")
      return TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW;
    if (!transaction.is_confirmed) return TRANSACTION_TYPES.WITHDRAWAL_PENDING;
    if (transaction.is_confirmed) return TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED;
  }
  if (transaction.nature === "interest") return TRANSACTION_TYPES.INTEREST;
  if (transaction.nature === "bonus_token")
    return TRANSACTION_TYPES.BONUS_TOKEN;

  if (transaction.nature === "collateral") {
    if (transaction.state === "pending")
      return TRANSACTION_TYPES.COLLATERAL_PENDING;
    if (transaction.state === "locked")
      return TRANSACTION_TYPES.COLLATERAL_LOCKED;
    if (transaction.state === "unlocked")
      return TRANSACTION_TYPES.COLLATERAL_UNLOCKED;
    if (transaction.state === "liquidated")
      return TRANSACTION_TYPES.COLLATERAL_LIQUIDATED;
    if (transaction.state === "confirmed") return TRANSACTION_TYPES.MARGIN_CALL;
  }

  // if (transaction.nature === "margin_call") return TRANSACTION_TYPES.MARGIN_CALL;
  if (transaction.nature === "pending_interest")
    return TRANSACTION_TYPES.PENDING_INTEREST;

  if (transaction.nature === "referred_award" && transaction.state === "locked")
    return TRANSACTION_TYPES.REFERRED_HODL;
  if (
    transaction.nature === "referred_award" &&
    transaction.state === "confirmed"
  )
    return TRANSACTION_TYPES.REFERRED;
  if (
    transaction.nature === "referred_award" &&
    transaction.state === "unconfirmed"
  )
    return TRANSACTION_TYPES.REFERRED_PENDING;
  if (transaction.nature === "referrer_award" && transaction.state === "locked")
    return TRANSACTION_TYPES.REFERRER_HODL;
  if (
    transaction.nature === "referrer_award" &&
    transaction.state === "confirmed"
  )
    return TRANSACTION_TYPES.REFERRER;
  if (
    transaction.nature === "referrer_award" &&
    transaction.state === "unconfirmed"
  )
    return TRANSACTION_TYPES.REFERRER_PENDING;

  if (transaction.nature === "loan_principal_payment") {
    if (transaction.type === "outgoing")
      return TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT;
    if (transaction.type === "incoming")
      return TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED;
  }
  if (transaction.nature === "loan_interest_payment")
    return TRANSACTION_TYPES.LOAN_INTEREST;
  if (transaction.nature === "loan_prepayment")
    return TRANSACTION_TYPES.LOAN_INTEREST;

  if (
    transaction.nature === "inbound_transfer" &&
    transaction.transfer_data.claimed_at &&
    !transaction.transfer_data.cleared_at &&
    !transaction.transfer_data.expired_at
  )
    return TRANSACTION_TYPES.CELPAY_ONHOLD;
  if (
    transaction.nature === "inbound_transfer" &&
    transaction.transfer_data.claimed_at &&
    !transaction.transfer_data.cleared_at &&
    transaction.transfer_data.expired_at
  )
    return TRANSACTION_TYPES.CELPAY_RETURNED;
  if (transaction.nature === "inbound_transfer" && transaction.transfer_data)
    return TRANSACTION_TYPES.CELPAY_RECEIVED;
  if (transaction.nature === "outbound_transfer" && transaction.transfer_data) {
    if (
      !transaction.transfer_data.claimed_at &&
      !transaction.transfer_data.cleared_at &&
      !transaction.transfer_data.expired_at
    )
      return TRANSACTION_TYPES.CELPAY_PENDING;
    if (
      transaction.transfer_data.claimed_at &&
      !transaction.transfer_data.cleared_at
    )
      return TRANSACTION_TYPES.CELPAY_CLAIMED;
    if (
      transaction.transfer_data.claimed_at &&
      transaction.transfer_data.cleared_at
    )
      return TRANSACTION_TYPES.CELPAY_SENT;
    if (transaction.transfer_data.expired_at)
      return TRANSACTION_TYPES.CELPAY_RETURNED;
  }

  if (transaction.type === "incoming") return TRANSACTION_TYPES.IN;
  if (transaction.type === "outgoing") return TRANSACTION_TYPES.OUT;
}

/**
 * Filters transactions by type, limit or coin
 *
 * @param {Object} transactions
 * @param {Object} filter
 * @param {number} filter.limit
 * @param {string} filter.coin
 * @param {string} filter.type
 * @returns {Array}
 */
function filterTransactions(transactions, filter = undefined) {
  if (!transactions) return [];

  const transactionIds = Object.keys(transactions);
  let transactionArray = [];
  transactionIds.forEach(tid => transactionArray.push(transactions[tid]));

  transactionArray = orderTransactionsByDate(transactionArray);

  if (filter) {
    if (filter.coin)
      transactionArray = transactionArray.filter(
        t =>
          t.coin.toLowerCase() === filter.coin.toLowerCase() ||
          (t.interest_coin &&
            t.interest_coin.toLowerCase() === filter.coin.toLowerCase())
      );
    if (filter.type)
      transactionArray = filterTransactionsByType(
        transactionArray,
        filter.type
      );
    if (filter.limit)
      transactionArray = transactionArray.slice(0, filter.limit);
  }

  return transactionArray;
}

/**
 * Filters transactions by type
 *
 * @param {Array} transactions
 * @param {string} type one of interest|withdraw|received
 * @returns {Array}
 */
function filterTransactionsByType(transactions, type) {
  switch (type) {
    case "interest":
      return transactions.filter(t => t.type === TRANSACTION_TYPES.INTEREST);
    case "received":
      return transactions.filter(t =>
        [
          TRANSACTION_TYPES.DEPOSIT_CONFIRMED,
          TRANSACTION_TYPES.DEPOSIT_PENDING,
        ].includes(t.type)
      );
    case "withdraw":
      return transactions.filter(t =>
        [
          TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED,
          TRANSACTION_TYPES.WITHDRAWAL_PENDING,
          TRANSACTION_TYPES.WITHDRAWAL_CANCELED,
        ].includes(t.type)
      );
    default:
      return transactions;
  }
}

/**
 * Orders transactions
 *
 * @param {Array} transactions
 * @returns {Array}
 */
function orderTransactionsByDate(transactions = []) {
  return transactions.sort((a, b) => {
    const date1 = moment(a.time);
    const date2 = moment(b.time);

    if (date1.isAfter(date2)) {
      return -1;
    }
    if (date1.isBefore(date2)) {
      return 1;
    }

    return 0;
  });
}

/**
 * Get UI props for TransactionDetails screen
 *
 * @param {Object} transaction
 * @returns {Object} screenProps
 * @returns {string} screenProps.title
 * @returns {string} screenProps.color
 * @returns {string} screenProps.iconName
 * @returns {string} screenProps.statusText
 */
function getTransactionProps(transaction) {
  switch (transaction.type) {
    case TRANSACTION_TYPES.PENDING_INTEREST:
      return {
        title: coin => `${coin} Interest`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionInterest",
        statusText: "Interest pending",
      };
    case TRANSACTION_TYPES.MARGIN_CALL:
      return {
        title: () => "Margin Call Collateral",
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionSent",
        statusText: "Margin Call Collateral",
      };
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED:
      return {
        title: () => "Loan Received",
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionReceived",
        statusText: "Loan Received",
      };
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT:
      return {
        title: () => "Principal Payment",
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionSent",
        statusText: "Loan Principal Payment",
      };
    case TRANSACTION_TYPES.LOAN_INTEREST:
      return {
        title: () => "Loan Interest Payment",
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionSent",
        statusText: "Loan Interest Payment",
      };
    case TRANSACTION_TYPES.DEPOSIT_PENDING:
      return {
        title: coin => `${coin} Deposit`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionReceived",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.DEPOSIT_CONFIRMED:
      return {
        title: coin => `${coin} Deposit`,
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionReceived",
        statusText: "Received",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING:
      return {
        title: coin => `${coin} Withdrawal`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionSent",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_CANCELED:
      return {
        // Withdrawn canceled
        title: coin => `${coin} Withdrawal`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionCanceled",
        statusText: "Canceled",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED:
      return {
        title: coin => `${coin} Withdrawal`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionSent",
        statusText: "Withdrawn",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION:
      return {
        title: coin => `${coin} Withdrawal`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionSent",
        statusText: "Pending verification",
      };
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW:
      return {
        title: coin => `${coin} Withdrawal`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionSent",
        statusText: "Pending review",
      };

    case TRANSACTION_TYPES.INTEREST:
      return {
        title: coin => `${coin} Interest`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionInterest",
        statusText: `${transaction.interest_coin &&
          transaction.interest_coin.toUpperCase()} interest`,
      };

    case TRANSACTION_TYPES.BONUS_TOKEN:
      return {
        title: () => `Bonus CEL`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "ReceiveArrowTransactions",
        statusText: "Bonus",
      };

    case TRANSACTION_TYPES.CELPAY_PENDING:
      return {
        title: () => `Waiting to be accepted`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionSent",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.CELPAY_CLAIMED:
      return {
        title: coin => `${coin} Claimed`,
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionSent",
        statusText: "Claimed",
      };
    case TRANSACTION_TYPES.CELPAY_SENT:
      return {
        title: coin => `${coin} Sent`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionSent",
        statusText: "Sent",
      };
    case TRANSACTION_TYPES.CELPAY_RECEIVED:
      return {
        title: () => `CelPay Received`,
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionReceived",
        statusText: "Received",
      };
    case TRANSACTION_TYPES.CELPAY_RETURNED:
      return {
        title: () => `Canceled Transaction`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionCanceled",
        statusText: "Returned",
      };

    case TRANSACTION_TYPES.CELPAY_ONHOLD:
      return {
        title: coin => `Received ${coin}`,
        color: STYLES.COLORS.ORANGE,
        iconName: "ReceiveArrowTransactions",
        statusText: "On Hold",
      };

    case TRANSACTION_TYPES.COLLATERAL_PENDING:
      return {
        title: () => `Pending Collateral`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionLocked",
        statusText: "Pending Collateral",
      };
    case TRANSACTION_TYPES.COLLATERAL_LOCKED:
      return {
        title: () => `Locked Collateral`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionLocked",
        statusText: "Locked Collateral",
      };
    case TRANSACTION_TYPES.COLLATERAL_UNLOCKED:
      return {
        title: () => `Unlocked Collateral`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionUnlocked",
        statusText: "Unlocked Collateral",
      };
    case TRANSACTION_TYPES.COLLATERAL_LIQUIDATED:
      return {
        title: () => `Liquidated Collateral`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionLocked",
        statusText: "Liquidated Collateral",
      };

    case TRANSACTION_TYPES.REFERRED_HODL:
      return {
        title: () => `HODL Award`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionLocked",
        statusText: "Locked reward",
      };
    case TRANSACTION_TYPES.REFERRED:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionReceived",
        statusText: "Referral reward",
      };
    case TRANSACTION_TYPES.REFERRED_PENDING:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionReceived",
        statusText: "Pending",
      };
    case TRANSACTION_TYPES.REFERRER_HODL:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.CELSIUS_BLUE,
        iconName: "TransactionLocked",
        statusText: "Locked",
      };
    case TRANSACTION_TYPES.REFERRER:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionReceived",
        statusText: "Referral reward",
      };
    case TRANSACTION_TYPES.REFERRER_PENDING:
      return {
        title: () => `Referral Award`,
        color: STYLES.COLORS.ORANGE,
        iconName: "TransactionReceived",
        statusText: "Pending",
      };

    case TRANSACTION_TYPES.CANCELED:
      return {
        title: () => `Canceled Transaction`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionCanceled",
        statusText: "Canceled",
      };

    case TRANSACTION_TYPES.IN:
      return {
        title: coin => `Received ${coin}`,
        color: STYLES.COLORS.GREEN,
        iconName: "TransactionReceived",
        statusText: "Received",
      };
    case TRANSACTION_TYPES.OUT:
      return {
        title: coin => `Sent ${coin}`,
        color: STYLES.COLORS.RED,
        iconName: "TransactionSent",
        statusText: "Sent",
      };
    default:
      break;
  }
}

/**
 * Gets sections for TransactionDetails screen
 *
 * @param {Object} transaction
 * @returns {Array}
 */
function getTransactionSections(transaction) {
  switch (transaction.type) {
    case TRANSACTION_TYPES.PENDING_INTEREST:
      return [
        "info",
        "date",
        "time",
        "status:noSeparator",
        "info:box",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.DEPOSIT_PENDING:
      return [
        "info",
        "address:from",
        "date",
        "time",
        "status:noSeparator",
        "transactionId",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.DEPOSIT_CONFIRMED:
      return [
        "info",
        "address:from",
        "date",
        "time",
        "status:noSeparator",
        "transactionId",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION:
      return [
        "info",
        "address:to",
        "date",
        "time",
        "status:noSeparator",
        "button:deposit",
        "button:cancel:withdrawal",
        "button:back",
      ];
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW:
      return [
        "info",
        "address:to",
        "date",
        "time",
        "status:noSeparator",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.WITHDRAWAL_PENDING:
      return [
        "info",
        "address:to",
        "date",
        "time",
        "status:noSeparator",
        "transactionId",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.WITHDRAWAL_CANCELED:
      return [
        "info",
        "date",
        "time",
        "status:noSeparator",
        "transactionId",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED:
      return [
        "info",
        "address:to",
        "date",
        "time",
        "status:noSeparator",
        "transactionId",
        "button:deposit",
        "button:back",
      ];

    case TRANSACTION_TYPES.INTEREST:
      return [
        "info",
        "date",
        "time",
        "status:noSeparator",
        "interest",
        "button:deposit",
        "button:back",
      ];
    case TRANSACTION_TYPES.BONUS_TOKEN:
      return ["info", "date", "time", "status"];

    case TRANSACTION_TYPES.CELPAY_PENDING:
      return [
        "info",
        "sentTo",
        "date",
        "time",
        "status",
        "type",
        "note",
        "button:celpay:another",
        "button:cancel:celpay",
        "button:back",
      ];
    case TRANSACTION_TYPES.CELPAY_CLAIMED:
      return [
        "info",
        "sentTo",
        "date",
        "time",
        "status",
        "type",
        "note",
        "button:celpay:another",
        "button:back",
      ];
    case TRANSACTION_TYPES.CELPAY_SENT:
      return [
        "info",
        "sentTo",
        "date",
        "time",
        "status",
        "type",
        "note",
        "button:celpay:another",
        "button:back",
      ];
    case TRANSACTION_TYPES.CELPAY_RECEIVED:
      return [
        "info",
        "sentFrom",
        "date",
        "time",
        "status",
        "type",
        "note",
        "button:celpay:friend",
        "button:back",
      ];
    case TRANSACTION_TYPES.CELPAY_RETURNED:
      return [
        "info",
        "sentTo",
        "date",
        "time",
        "status",
        "type",
        "note",
        "button:celpay:another",
        "button:back",
      ];
    case TRANSACTION_TYPES.CELPAY_EXPIRED:
      return [
        "info",
        "date",
        "time",
        "status",
        "type",
        "note",
        "button:celpay:another",
        "button:back",
      ];
    case TRANSACTION_TYPES.CELPAY_ONHOLD:
      return [
        "info",
        "date",
        "time",
        "status",
        "type",
        "note",
        "button:celpay:friend",
        "button:back",
      ];

    case TRANSACTION_TYPES.COLLATERAL_PENDING:
      return ["info", "disclaimer", "collateral:loan:card", "button:back"];
    case TRANSACTION_TYPES.COLLATERAL_LOCKED:
      return ["info", "collateral:loan:card", "button:back"];
    case TRANSACTION_TYPES.COLLATERAL_UNLOCKED:
      return [
        "info",
        "collateral:loan:card",
        "collateral:date:unlocked",
        "collateral:time:unlocked",
        "collateral:unlock:reason",
        "button:back",
      ];
    case TRANSACTION_TYPES.COLLATERAL_LIQUIDATED:
      return [
        "info",
        "collateral:loan:card",
        "collateral:date:liquidated",
        "collateral:time:liquidated",
        "collateral:liquidation:reason",
        "button:back",
      ];
    case TRANSACTION_TYPES.MARGIN_CALL:
      return [
        "info",
        "collateral:loan:card",
        "date",
        "time",
        "margin:call:card",
        "button:back",
      ];
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED:
      return ["info", "collateral:loan:card", "date", "time", "button:back"];
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT:
      return ["info", "collateral:loan:card", "date", "time", "button:back"];
    case TRANSACTION_TYPES.LOAN_INTEREST:
      return [
        "info",
        "collateral:loan:card",
        "date",
        "time",
        "change:payment:card",
        "button:back",
      ];

    case TRANSACTION_TYPES.REFERRED_HODL:
      // return ["info", "hodl:info", "date:deposited", "time", "status:noSeparator"];
      return ["info", "date:deposited", "time", "status:noSeparator"]; // "hodl:info" removed until the backend return us needed data
    case TRANSACTION_TYPES.REFERRED:
      return [
        "info",
        "referred",
        "date",
        "time",
        "status:noSeparator",
        "button:refer",
        "button:back",
      ];
    case TRANSACTION_TYPES.REFERRED_PENDING:
      return [
        "info",
        "referred:pending",
        "date",
        "time",
        "status:noSeparator",
        "button:refer",
        "button:back",
      ];
    case TRANSACTION_TYPES.REFERRER_HODL:
      return [
        "info",
        "referrerHODL",
        "date",
        "time",
        "status:noSeparator",
        "button:refer",
        "button:back",
      ];
    case TRANSACTION_TYPES.REFERRER:
      return [
        "info",
        "referrer",
        "date",
        "time",
        "status:noSeparator",
        "button:refer",
        "button:back",
      ];
    case TRANSACTION_TYPES.REFERRER_PENDING:
      return [
        "info",
        "referrer:pending",
        "date",
        "time",
        "status:noSeparator",
        "button:refer",
        "button:back",
      ];

    case TRANSACTION_TYPES.CANCELED:
      return ["info", "date", "time", "status"];

    case TRANSACTION_TYPES.IN:
      return ["info", "date", "time", "status"];
    case TRANSACTION_TYPES.OUT:
      return ["info", "date", "time", "status"];

    default:
      break;
  }
}

export default transactionsUtil;
