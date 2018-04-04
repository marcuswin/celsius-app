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
  {label: 'Other', value: 'value'}
];

export const PERSON_TITLE = [
  {label: 'Mr.', value: 'mr'},
  {label: 'Ms.', value: 'ms'},
  {label: 'Mrs.', value: 'mrs'}
];

export const DOCUMENT_TYPE = [
  {label: 'Passport', value: 'passport', bothSides: false},
  {label: 'Driving License', value: 'driving_license', bothSides: true},
  {label: 'National Identity Card', value: 'identity_card', bothSides: true}
];

export const CAMERA_PHOTOS = {
  DOCUMENT_FRONT: 'DOCUMENT_FRONT',
  DOCUMENT_BACK: 'DOCUMENT_BACK',
  SELFIE: 'SELFIE',
}
