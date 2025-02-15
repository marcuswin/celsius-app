export default {
  // api actions
  START_API_CALL: 'START_API_CALL',
  API_ERROR: 'API_ERROR',
  CLEAR_API_ERROR: 'CLEAR_API_ERROR',

  // branch actions
  BRANCH_LINK_REGISTERED: 'BRANCH_LINK_REGISTERED',
  GET_INDIVIDUAL_LINK_SUCCESS: 'GET_INDIVIDUAL_LINK_SUCCESS',
  GET_LINK_BY_URL_SUCCESS: 'GET_LINK_BY_URL_SUCCESS',
  CHECK_PROFILE_PROMO_CODE_SUCCESS: 'CHECK_PROFILE_PROMO_CODE_SUCCESS',
  SUBMIT_PROMO_CODE_SUCCESS: 'SUBMIT_PROMO_CODE_SUCCESS',

  // navigation actions
  NAVIGATE: 'Navigation/NAVIGATE',
  NAVIGATE_BACK: 'Navigation/BACK',
  SET_ACTIVE_SCREEN: 'SET_ACTIVE_SCREEN',

  // general data actions
  GET_KYC_DOC_TYPES_SUCCESS: 'GET_KYC_DOC_TYPES_SUCCESS',
  GET_BACKEND_STATUS_SUCCESS: 'GET_BACKEND_STATUS_SUCCESS',

  // currencies actions
  GET_CURRENCY_RATES_SUCCESS: 'GET_CURRENCY_RATES_SUCCESS',
  GET_CURRENCY_GRAPHS_SUCCESS: 'GET_CURRENCY_GRAPHS_SUCCESS',

  // ui actions
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE',
  FLIP_CAMERA: 'FLIP_CAMERA',
  TAKE_CAMERA_PHOTO: 'TAKE_CAMERA_PHOTO',

  UPDATE_FORM_FIELD: 'UPDATE_FORM_FIELD',
  UPDATE_FORM_FIELDS: 'UPDATE_FORM_FIELDS',
  ACTIVATE_CAMERA: 'ACTIVATE_CAMERA',
  RETAKE_PHOTO: 'RETAKE_PHOTO',
  INIT_FORM: 'INIT_FORM',
  CLEAR_FORM: 'CLEAR_FORM',
  SET_FORM_ERRORS: 'SET_FORM_ERRORS',
  CLEAR_FORM_ERRORS: 'CLEAR_FORM_ERRORS',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  OPEN_FAB_MENU: 'OPEN_FAB_MENU',
  CLOSE_FAB_MENU: 'CLOSE_FAB_MENU',
  SET_FAB_TYPE: 'SET_FAB_TYPE',
  TOGGLE_KEYPAD: 'TOGGLE_KEYPAD',
  ACTIVE_TAB:'ACTIVE_TAB',

  // auth actions
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  SOCIAL_REGISTER_SUCCESS: 'SOCIAL_REGISTER_SUCCESS',
  REGISTER_USER_FACEBOOK_SUCCESS: 'REGISTER_USER_FACEBOOK_SUCCESS',
  REGISTER_USER_GOOGLE_SUCCESS: 'REGISTER_USER_GOOGLE_SUCCESS',
  REGISTER_USER_TWITTER_SUCCESS: 'REGISTER_USER_TWITTER_SUCCESS',
  LOGIN_USER_GOOGLE_SUCCESS: 'LOGIN_USER_GOOGLE_SUCCESS',
  LOGIN_USER_FACEBOOK_SUCCESS: 'LOGIN_USER_FACEBOOK_SUCCESS',
  LOGIN_USER_TWITTER_SUCCESS: 'LOGIN_USER_TWITTER_SUCCESS',
  SEND_RESET_LINK_SUCCESS: 'SEND_RESET_LINK_SUCCESS',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
  LOGOUT_USER: 'LOGOUT_USER',
  EXPIRE_SESSION: 'EXPIRE_SESSION',
  LOGOUT_FROM_ALL_DEVICES_SUCCESS: 'LOGOUT_FROM_ALL_DEVICES_SUCCESS',
  CHANGE_PIN_SUCCESS: 'CHANGE_PIN_SUCCESS',

  // 3rd party user on-boarding
  TWITTER_GET_ACCESS_TOKEN: 'TWITTER_GET_ACCESS_TOKEN',
  TWITTER_CLOSE: 'TWITTER_CLOSE',
  TWITTER_OPEN: 'TWITTER_OPEN',

  // graph action
  GET_ACTIVE_TIMELINE: 'GET_ACTIVE_TIMELINE',
  GET_WALLET_BALANCE_DATA_SUCCESS: 'GET_WALLET_BALANCE_DATA_SUCCESS',
  GET_COIN_WALLET_BALANCE_DATA_SUCCESS: 'GET_COIN_WALLET_BALANCE_DATA_SUCCESS',
  GET_INTEREST_GRAPH_DATA_SUCCESS: 'GET_INTEREST_GRAPH_DATA_SUCCESS',
  GET_COIN_INTEREST_GRAPH_DATA_SUCCESS: 'GET_COIN_INTEREST_GRAPH_DATA_SUCCESS',

  // user actions
  GET_USER_PERSONAL_INFO_SUCCESS: 'GET_USER_PERSONAL_INFO_SUCCESS',
  GET_USER_TAXPAYER_INFO_SUCCESS: 'GET_USER_TAXPAYER_INFO_SUCCESS',
  UPDATE_USER_PERSONAL_INFO_SUCCESS: 'UPDATE_PERSONAL_USER_INFO_SUCCESS',
  UPDATE_USER_ADDRESS_INFO_SUCCESS: 'UPDATE_USER_ADDRESS_INFO_SUCCESS',
  UPDATE_USER_TAXPAYER_INFO_SUCCESS: 'UPDATE_USER_TAXPAYER_INFO_SUCCESS',
  UPLOAD_PLOFILE_IMAGE_SUCCESS: 'UPLOAD_PLOFILE_IMAGE_SUCCESS',
  CREATE_KYC_DOCUMENTS_SUCCESS: 'CREATE_KYC_DOCUMENTS_SUCCESS',
  GET_KYC_DOCUMENTS_SUCCESS: 'GET_KYC_DOCUMENTS_SUCCESS',
  SEND_VERIFICATION_SMS_SUCCESS: 'SEND_VERIFICATION_SMS_SUCCESS',
  VERIFY_SMS_SUCCESS: 'VERIFY_SMS_SUCCESS',
  START_KYC_SUCCESS: 'START_KYC_SUCCESS',
  GET_KYC_STATUS_SUCCESS: 'GET_KYC_STATUS_SUCCESS',
  GET_COMPLIANCE_INFO_SUCCESS: 'GET_COMPLIANCE_INFO_SUCCESS',
  CHECK_PIN_SUCCESS: 'CHECK_PIN_SUCCESS',
  CHECK_TWO_FACTOR_SUCCESS: 'CHECK_TWO_FACTOR_SUCCESS',
  DISABLE_TWO_FACTOR_SUCCESS: 'DISABLE_TWO_FACTOR_SUCCESS',
  CONNECT_PHONE_CONTACTS_SUCCESS: 'CONNECT_PHONE_CONTACTS_SUCCESS',
  GET_CONNECTED_CONTACTS_SUCCESS: 'GET_CONNECTED_CONTACTS_SUCCESS',
  GET_LINKED_BANK_ACCOUNT_SUCCESS: 'GET_LINKED_BANK_ACCOUNT_SUCCESS',
  LINK_BANK_ACCOUNT_SUCCESS: 'LINK_BANK_ACCOUNT_SUCCESS',
  GET_PREVIOUS_SCREEN_SUCCESS: "GET_PREVIOUS_SCREEN_SUCCESS",
  GET_LOYALTY_INFO_SUCCESS: "GET_LOYALTY_INFO_SUCCESS",
  GET_MEMBER_STATUS_SUCCESS: "GET_MEMBER_STATUS_SUCCESS",
  GET_APP_SETTINGS_SUCCESS: "GET_APP_SETTINGS_SUCCESS",
  SET_APP_SETTINGS_SUCCESS: "SET_APP_SETTINGS_SUCCESS",
  GET_USER_SECURITY_OVERVIEW_SUCCESS: "GET_USER_SECURITY_OVERVIEW_SUCCESS",

  // wallet actions
  GET_WALLET_SUMMARY_SUCCESS: 'GET_WALLET_SUMMARY_SUCCESS',
  GET_COIN_ADDRESS_SUCCESS: 'GET_COIN_ADDRESS_SUCCESS',
  SET_COIN_WITHDRAWAL_ADDRESS_SUCCESS: 'SET_COIN_WITHDRAWAL_ADDRESS_SUCCESS',
  SET_COIN_WITHDRAWAL_ADDRESS_LABEL_SUCCESS: 'SET_COIN_WITHDRAWAL_ADDRESS_LABEL_SUCCESS',
  SET_COIN_WITHDRAWAL_ADDRESS_LABELS: 'SET_COIN_WITHDRAWAL_ADDRESS_LABELS',
  WITHDRAW_CRYPTO_SUCCESS: 'WITHDRAW_CRYPTO_SUCCESS',
  GET_TRANSACTION_DETAILS_SUCCESS: 'GET_TRANSACTION_DETAILS_SUCCESS',
  GET_ALL_TRANSACTIONS_SUCCESS: 'GET_ALL_TRANSACTIONS_SUCCESS',
  SET_PIN: 'SET_PIN_SUCCESS', // TODO refactor
  SET_PIN_SUCCESS: 'SET_PIN_SUCCESS',
  GET_ALL_COIN_WITHDRAWAL_ADDRESSES_SUCCESS: "GET_ALL_COIN_WITHDRAWAL_ADDRESSES_SUCCESS",
  CANCEL_WITHDRAWAL_TRANSACTION_SUCCESS: 'CANCEL_WITHDRAWAL_TRANSACTION_SUCCESS',

  // interest actions
  GET_INTEREST_CHART_DATA_SUCCESS: 'GET_INTEREST_CHART_DATA_SUCCESS',

  // transfer actions
  GET_ALL_TRANSFERS_SUCCESS: 'GET_ALL_TRANSFERS_SUCCESS',
  GET_TRANSFER_SUCCESS: 'GET_TRANSFER_SUCCESS',
  CLAIM_TRANSFER_SUCCESS: 'CLAIM_TRANSFER_SUCCESS',
  CANCEL_TRANSFER_SUCCESS: 'CANCEL_TRANSFER_SUCCESS',
  CREATE_TRANSFER_SUCCESS: 'CREATE_TRANSFER_SUCCESS',

  // cameraRoll actions
  GET_CAMERA_ROLL_SUCCESS: 'GET_CAMERA_ROLL_SUCCESS',

  // loan actions
  APPLY_FOR_LOAN_SUCCESS: 'APPLY_FOR_LOAN_SUCCESS',
  GET_ALL_LOANS_SUCCESS: 'GET_ALL_LOANS_SUCCESS',

  // community statistics
  GET_COMMUNITY_STATISTICS_SUCCESS: "GET_COMMUNITY_STATISTICS_SUCCESS",

  // apy key actions
  CREATE_API_KEY_SUCCESS: 'CREATE_API_KEY_SUCCESS',
  DELETE_API_KEY_SUCCESS: 'DELETE_API_KEY_SUCCESS', // TODO refactor
  GET_API_KEYS_SUCCESS: 'GET_API_KEYS_SUCCESS',

  // app actions
  APP_INIT_START: 'APP_INIT_START',
  APP_INIT_DONE: 'APP_INIT_DONE',
  RESET_APP: 'RESET_APP',
  START_LOADING_ASSETS: 'START_LOADING_ASSETS',
  FINISH_LOADING_ASSETS: 'FINISH_LOADING_ASSETS',
  SET_INTERNET_CONNECTION: 'SET_INTERNET_CONNECTION',
  SET_APP_STATE: 'SET_APP_STATE',
  GET_INITIAL_CELSIUS_DATA_SUCCESS: 'GET_INITIAL_CELSIUS_DATA_SUCCESS',
  SHOW_VERIFY_SCREEN: 'SHOW_VERIFY_SCREEN',
  SET_GEOLOCATION: 'SET_GEOLOCATION'
}
