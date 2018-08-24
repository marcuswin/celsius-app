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

export const ELIGIBLE_COINS = ['CEL', 'BTC', 'ETH', 'LTC', 'XRP', 'OMG'];
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
