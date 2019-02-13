import moment from "moment";

// import { TRANSACTION_TYPES } from "../config/constants/common";
import DATA from "../constants/DATA";
import STYLES from "../constants/STYLES";

const TRANSACTION_TYPES = DATA.TRANSACTION_TYPES;

const transactionsUtil = {
  mapTransaction,
  filterTransactions,
  getTransactionsProps,
  getTransactionSections
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


  if (transaction.nature === "inbound_transfer" && transaction.transfer_data) return TRANSACTION_TYPES.CELPAY_RECEIVED;
  if (transaction.nature === "outbound_transfer" && transaction.transfer_data) {
    if (!transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at && !transaction.transfer_data.expired_at) return TRANSACTION_TYPES.CELPAY_PENDING;
    if (transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at) return TRANSACTION_TYPES.CELPAY_CLAIMED;
    if (transaction.transfer_data.claimed_at && transaction.transfer_data.cleared_at) return TRANSACTION_TYPES.CELPAY_SENT;
    if (transaction.transfer_data.expired_at) return TRANSACTION_TYPES.CELPAY_RETURNED;
  }

  if (transaction.type === "incoming") return TRANSACTION_TYPES.IN;
  if (transaction.type === "outgoing") return TRANSACTION_TYPES.OUT;
}

// TODO(fj) add filter
function filterTransactions(transactions, filter = undefined) {
  if (!transactions) return [];

  const transactionIds = Object.keys(transactions);
  let transactionArray = [];
  transactionIds.forEach(tid => transactionArray.push(transactions[tid]))

  transactionArray = orderTransactionsByDate(transactionArray);

  if (filter) {
    if (filter.coin) transactionArray = transactionArray.filter(t => t.coin.toLowerCase() === filter.coin.toLowerCase());
    if (filter.type) transactionArray = filterTransactionsByType(transactionArray, filter.type);
    if (filter.limit) transactionArray = transactionArray.slice(0, filter.limit);
  }

  return transactionArray;
}

function filterTransactionsByType(transactions, type) {
  switch (type) {
    case 'interest':
      return transactions.filter(t => t.type === TRANSACTION_TYPES.INTEREST)
    case 'reveiced':
      return transactions.filter(t => [TRANSACTION_TYPES.DEPOSIT_CONFIRMED, TRANSACTION_TYPES.DEPOSIT_PENDING].includes(t.type))
    case 'withdraw':
      return transactions.filter(t => [TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED, TRANSACTION_TYPES.WITHDRAWAL_PENDING].includes(t.type))
    default:
      return transactions
  }
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

function getTransactionsProps(transaction = []) {
  return {
    [TRANSACTION_TYPES.DEPOSIT_PENDING]: {
      title: (coin) => `${coin} Deposit`,
      color: STYLES.COLORS.ORANGE,
      iconName: 'TransactionReceived',
      statusText: 'Pending'
    },
    [TRANSACTION_TYPES.DEPOSIT_CONFIRMED]: { // Deposit
      title: (coin) => `${coin} Deposit`,
      color: STYLES.COLORS.GREEN,
      iconName: 'TransactionReceived',
      statusText: 'Received'
    },
    [TRANSACTION_TYPES.WITHDRAWAL_PENDING]: { // Withdrawn pending 
      title: (coin) => `${coin} Withdrawal`,
      color: STYLES.COLORS.ORANGE,
      iconName: 'TransactionSent',
      statusText: 'Pending'
    },
    [TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED]: {
      title: (coin) => `${coin} Withdrawal`,
      color: STYLES.COLORS.RED,
      iconName: 'TransactionSent',
      statusText: 'Withdrawn'
    },

    [TRANSACTION_TYPES.INTEREST]: { // Interest
      title: (coin) => `${coin} Interest`,
      color: STYLES.COLORS.CELSIUS_BLUE,
      iconName: 'TransactionInterest',
      statusText: `${transaction.interest_coin && transaction.interest_coin.toUpperCase()} interest`
    },
    [TRANSACTION_TYPES.COLLATERAL]: { // Loan Active ? locked ?
      title: () => `Dollar loan`,
      color: STYLES.COLORS.CELSIUS_BLUE,
      iconName: 'TransactionLocked',
      statusText: 'Loan Collateral'
    },
    // TITLE pise CEL ?
    [TRANSACTION_TYPES.BONUS_TOKEN]: { // free cels NEMA
      title: () => `Bonus CEL`,
      color: STYLES.COLORS.RED,
      iconName: 'ReceiveArrowTransactions',
      statusText: 'Bonus'
    },
    [TRANSACTION_TYPES.CELPAY_PENDING]: { // T
      title: () => `Waiting to be accepted`,
      color: STYLES.COLORS.ORANGE,
      iconName: 'TransactionSent',
      statusText: 'Pending'
    },
    [TRANSACTION_TYPES.CELPAY_CLAIMED]: {
      title: () => `Waiting to be accepted`,
      color: STYLES.COLORS.ORANGE,
      iconName: 'TransactionSent',
      statusText: 'Claimed'
    },
    [TRANSACTION_TYPES.CELPAY_SENT]: {
      title: (coin) => `${coin} Sent`,
      color: STYLES.COLORS.RED,
      iconName: 'TransactionSent',
      statusText: 'Sent'
    },
    [TRANSACTION_TYPES.CELPAY_RECEIVED]: { // T
      title: () => `CelPay Received`,
      color: STYLES.COLORS.GREEN,
      iconName: 'TransactionReceived',
      statusText: 'Received'
    },
    [TRANSACTION_TYPES.CELPAY_RETURNED]: { // RETURNED
      title: () => `Canceled Transaction`,
      color: STYLES.COLORS.RED,
      iconName: 'TransactionCanceled',
      statusText: 'Returned'
    },
    // [TRANSACTION_TYPES.CELPAY_EXPIRED]: { // RETURNED
    //   title: (coin) => `${coin} Deposit`,
    //   color: STYLES.COLORS.RED,
    //   iconName: 'TransactionLocked',
    //   statusText: 'Expired'
    // },
    [TRANSACTION_TYPES.CELPAY_ONHOLD]: {
      title: (coin) => `Received ${coin}`,
      color: STYLES.COLORS.ORANGE,
      iconName: 'ReceiveArrowTransactions',
      statusText: 'On Hold'
    },

    [TRANSACTION_TYPES.REFERRED_HODL]: { // drugi locked
      title: () => `HODL Award`,
      color: STYLES.COLORS.CELSIUS_BLUE,
      iconName: 'TransactionLocked',
      statusText: 'Locked'
    },
    [TRANSACTION_TYPES.REFERRED]: { // T
      title: () => `Referral Award`,
      color: STYLES.COLORS.GREEN,
      iconName: 'TransactionReceived',
      statusText: 'Referral reward'
    },
    [TRANSACTION_TYPES.REFERRER_HODL]: { // prvi locked
      title: () => `Referral Award`,
      color: STYLES.COLORS.CELSIUS_BLUE,
      iconName: 'TransactionLocked',
      statusText: 'Locked'
    },
    [TRANSACTION_TYPES.REFERRER]: { // T
      title: () => `Referral Award`,
      color: STYLES.COLORS.GREEN,
      iconName: 'TransactionReceived',
      statusText: 'Referral reward'
    },

    [TRANSACTION_TYPES.CANCELED]: { // Gledam kao returned
      title: () => `Canceled Transaction`,
      color: STYLES.COLORS.RED,
      iconName: 'TransactionCanceled',
      statusText: 'Canceled'
    },

    [TRANSACTION_TYPES.IN]: { // default in
      title: (coin) => `Received ${coin}`,
      color: STYLES.COLORS.GREEN,
      iconName: 'TransactionReceived',
      statusText: 'Received'
    },
    [TRANSACTION_TYPES.OUT]: { // default in
      title: (coin) => `Sent ${coin}`,
      color: STYLES.COLORS.RED,
      iconName: 'TransactionSent',
      statusText: 'Sent'
    }

  }[transaction.type]
}

function getTransactionSections(transaction = []) {
  // return ['info', 'address:from', 'address:to', 'hodl:info', 'loan:rejected', 'date', 'date:deposited', 'time', 'status', 'loan:date', 'loan:amount', 'loan:collateral', 'loan:deadline', 'loan:annualInterestRate', 'loan:montlyInterest', 'loan:totalInterest', 'interest', 'button:back', 'button:deposit', 'button:celpay:another', 'button:celpay:friend', 'button:applyForLoan', 'button:refer', 'button:cancel', 'note']
  return {
    DEPOSIT_PENDING: ['info', 'address:from', 'date', 'time', 'status:noSeparator', 'button:deposit', 'button:back'],
    DEPOSIT_CONFIRMED: ['info', 'address:from', 'date', 'time', 'status:noSeparator', 'button:deposit', 'button:back'],
    WITHDRAWAL_PENDING: ['info', 'address:to', 'date', 'time', 'status:noSeparator', 'button:deposit', 'button:back'],
    WITHDRAWAL_CONFIRMED: ['info', 'address:to', 'date', 'time', 'status:noSeparator', 'button:deposit', 'button:back'],

    INTEREST: ['info', 'date', 'time', 'status:noSeparator', 'interest', 'button:deposit', 'button:back'],
    COLLATERAL: ['info', 'loan:date', 'time', 'status', 'loan:amount', 'loan:collateral', 'loan:deadline', 'loan:annualInterestRate', 'loan:montlyInterest', 'loan:totalInterest', 'button:applyForLoan', 'button:back'],
    BONUS_TOKEN: ['info', 'date', 'time', 'status'], // TODO

    CELPAY_PENDING: ['info', 'date', 'time', 'status', 'note', 'button:celpay:another', 'button:cancel', 'button:back'], // add sent to
    CELPAY_CLAIMED: ['info', 'date', 'time', 'status', 'note', 'button:celpay:another', 'button:back'], // add sent to
    CELPAY_SENT: ['info', 'date', 'time', 'status', 'note', 'button:celpay:another', 'button:back'], // add sent to
    CELPAY_RECEIVED: ['info', 'date', 'time', 'status', 'note', 'button:celpay:friend', 'button:back'], // add sent to
    CELPAY_RETURNED: ['info', 'date', 'time', 'status', 'note', 'button:celpay:another', 'button:back'], // add sent to
    CELPAY_EXPIRED: ['info', 'date', 'time', 'status', 'note', 'button:celpay:another', 'button:back'], // add sent to
    CELPAY_ONHOLD: ['info', 'date', 'time', 'status', 'note', 'button:celpay:friend', 'button:back'], // add sent to

    REFERRED_HODL: ['info', 'hodl:info', 'date:deposited', 'time', 'status:noSeparator', 'button:refer', 'button:back'],
    REFERRED: ['info', 'date', 'time', 'status:noSeparator', 'button:refer', 'button:back'], // add friend referred info
    REFERRER_HODL: ['info', 'hodl:info', 'date', 'time', 'status:noSeparator', 'button:refer', 'button:back'],  // add friend referred info with hodl:info
    REFERRER: ['info', 'date', 'time', 'status:noSeparator', 'button:refer', 'button:back'], // add friend referred info

    CANCELED: ['info', 'date', 'time', 'status'], // this is random!,

    IN: ['info', 'date', 'time', 'status'],
    OUT: ['info', 'date', 'time', 'status'],
  }[transaction.type]
}



export default transactionsUtil;
