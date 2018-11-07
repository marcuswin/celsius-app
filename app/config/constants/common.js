export const KEYBOARD_TYPE = {
  DEFAULT: 'default',
  NUMERIC: 'numeric',
  EMAIL: 'email-address',
  PHONE: 'phone-pad'
};

export const AUTO_CAPITALIZE = {
  CHARACTERS: 'characters',   // all characters
  WORDS: 'words',             // first letter of each word
  SENTENCES: 'sentences',     // first letter of each sentence
  NONE: 'none'                // don't auto capitalize anything
};

export const GENDER = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'}
];

export const ELIGIBLE_COINS = ['CEL', 'BTC', 'ETH', 'LTC', 'XRP', 'OMG', 'BCH'];
export const INTEREST_ELIGIBLE_COINS = ['BTC', 'ETH', 'LTC', 'XRP', 'OMG', 'BCH'];
export const LOAN_ELIGIBLE_COINS = ['BTC', 'ETH', 'LTC', 'XRP'];
export const KYC_STATUSES = {
  collecting: 'collecting',
  pending: 'pending',
  sending: 'sending',
  sent: 'sent',
  passed: 'passed',
  rejected: 'rejected',
};

export const PERSON_TITLE = [
  {label: 'Mr.', value: 'mr'},
  {label: 'Ms.', value: 'ms'},
  {label: 'Mrs.', value: 'mrs'}
];

export const CAMERA_COPY = {
  DOCUMENT: 'Please center your document in the marked area. Ensure that there’s enough light in the room for better picture quality.',
  SELFIE: 'Please center your face in the circle and take a selfie. We need your recent picture to compare it with the one on the document.',
}

export const MODALS = {
  REFERRAL_MODAL: 'REFERRAL_MODAL',
  TODAY_RATES_MODAL: 'TODAY_RATES_MODAL',
  TRANSFER_RECEIVED: 'TRANSFER_RECEIVED',
  DESTINATION_TAG_MODAL: 'DESTINATION_TAG_MODAL',
  TRANSACTION_OPTIONS: 'TRANSACTION_OPTIONS'
};

export const BRANCH_LINKS = {
  TRANSFER: 'TRANSFER',
  REFERRAL: 'REFERRAL',
};

export const TRANSFER_STATUSES = {
  expired: 'expired',
  claimed: 'claimed',
  cleared: 'cleared',
  pending: 'pending',
};

export const TRANSACTION_TYPES = {
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

  IN: 'IN',
  OUT: 'OUT',
}

