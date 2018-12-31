export default {
  GENDER,
  FORBIDEN_COUNTRIES,
  ELIGIBLE_COINS,
  INTEREST_ELIGIBLE_COINS,
  LOAN_ELIGIBLE_COINS,
  KYC_STATUSES,
  PERSON_TITLE,
  BRANCH_LINKS,
  TRANSFER_STATUSES,
  TRANSACTION_TYPES,
}

const GENDER = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' }
];

const FORBIDEN_COUNTRIES = ['Cuba', 'North Korea', 'Iran', 'Sudan', 'Syria', 'Lebanon', 'Japan', 'New York'];

const COINS = [
  { coin: 'CEL', interest: false, loan: false },
  { coin: 'BTC', interest: true, loan: true },
  { coin: 'ETH', interest: true, loan: true },
  { coin: 'LTC', interest: true, loan: true },
  { coin: 'XRP', interest: true, loan: true },
  { coin: 'OMG', interest: true, loan: false },
  { coin: 'BCH', interest: true, loan: false },
  { coin: 'ZRX', interest: true, loan: false },
  { coin: 'ZEC', interest: false, loan: false },
  { coin: 'BTG', interest: false, loan: false },
  { coin: 'XLM', interest: false, loan: false },
]
const ELIGIBLE_COINS = COINS.map(c => c.coin);
const INTEREST_ELIGIBLE_COINS = COINS.filter(c => c.interest).map(c => c.coin);
const LOAN_ELIGIBLE_COINS = COINS.filter(c => c.loan).map(c => c.coin);

const KYC_STATUSES = {
  collecting: 'collecting',
  pending: 'pending',
  sending: 'sending',
  sent: 'sent',
  passed: 'passed',
  rejected: 'rejected',
  ico_passed: 'ico_passed'
};

const PERSON_TITLE = [
  { label: 'Mr.', value: 'mr' },
  { label: 'Ms.', value: 'ms' },
  { label: 'Mrs.', value: 'mrs' }
];

const BRANCH_LINKS = {
  TRANSFER: 'TRANSFER',
  INDIVIDUAL_REFERRAL: 'INDIVIDUAL_REFERRAL',
  COMPANY_REFERRAL: 'COMPANY_REFERRAL',
};

const TRANSFER_STATUSES = {
  expired: 'expired',
  claimed: 'claimed',
  cleared: 'cleared',
  pending: 'pending',
};

const TRANSACTION_TYPES = {
  DEPOSIT_PENDING: 'DEPOSIT_PENDING',
  DEPOSIT_CONFIRMED: 'DEPOSIT_CONFIRMED',
  WITHDRAWAL_PENDING: 'WITHDRAWAL_PENDING',
  WITHDRAWAL_CONFIRMED: 'WITHDRAWAL_CONFIRMED',
  INTEREST: 'INTEREST',
  COLLATERAL: 'COLLATERAL',
  BONUS_TOKEN: 'BONUS_TOKEN',
  TRANSFER_PENDING: 'TRANSFER_PENDING',
  TRANSFER_CLAIMED: 'TRANSFER_CLAIMED',
  TRANSFER_SENT: 'TRANSFER_SENT',
  TRANSFER_RECEIVED: 'TRANSFER_RECEIVED',
  TRANSFER_RETURNED: 'TRANSFER_RETURNED',
  TRANSFER_EXPIRED: 'TRANSFER_EXPIRED',
  TRANSFER_ONHOLD: 'TRANSFER_ONHOLD',
  REFERRED_AWARD: 'REFERRED_AWARD',
  CANCELED: 'CANCELED',

  IN: 'IN',
  OUT: 'OUT',
};
