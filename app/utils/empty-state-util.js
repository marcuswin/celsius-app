import { EMPTY_STATES, MODALS } from "../constants/UI";


function getDefaultEmptyState(purpose, actions) {
  if (!purpose) return {};

  switch (purpose) {
    case EMPTY_STATES.FIRST_TIME:
      return {
        image: require("../../assets/images/bear-happyKYC3x.png"),
        heading: "Welcome",
        paragraphs: ["Ready to start exploring Celsius"],
        button: "Go to Wallet",
        onPress: () => actions.navigateTo("WalletLanding")
      };
    case EMPTY_STATES.ERROR:
      return {
        image: require("../../assets/images/illuNoKYC3x.png"),
        heading: "Oooops...",
        paragraphs: ["Something broke. We apologize for any inconvenience."],
        button: "Go Home",
        onPress: () => actions.navigateTo("Home")
      };
    case EMPTY_STATES.NO_DATA:
      return {
        image: require("../../assets/images/deerTransactionHistory.png"),
        heading: "Sorry!",
        paragraphs: ["No data to show!"],
        button: "Go Home",
        onPress: () => actions.navigateTo("Home")
      };
    case EMPTY_STATES.USER_CLEARED:
      return {
        image: require("../../assets/images/bear-happyKYC3x.png"),
        heading: "Great job!",
        paragraphs: ["Ready to start exploring Celsius"],
        button: "Go Home",
        onPress: () => actions.navigateTo("Home")
      };
    case EMPTY_STATES.NON_VERIFIED_WITHDRAW: 
      return {
        image: require("../../assets/images/diane-sad3x.png"),
        title: status => status,
        heading: "Withdraw",
        paragraphs: ["Withdraw pain (and fee!) free with Celsius Network. Complete your KYC verification to take full advantage."],
        button: "Verify profile",
        onPress: () => actions.navigateTo("KYCProfileDetails")
      };
    case EMPTY_STATES.COMPLIANCE:
      return {
        image: require("../../assets/images/diane-sad3x.png"),
        heading: "Sorry!",
        paragraphs: ["We apologize for any inconvenience, but due to local laws and regulations, we are unable to work with users from your region."]
      };
    case EMPTY_STATES.UNDER_CONSTRUCTION:
      return {
        image: require("../../assets/images/diane-sad3x.png"),
        title: status => status,
        heading: "Under Construction!",
        paragraphs: ["We are working really hard on this feature!"]
      };
    case EMPTY_STATES.INSUFFICIENT_FUNDS:
      return {
        image: require("../../assets/images/diane-sad3x.png"),
        heading: "Insufficient funds!",
        paragraphs: ["Please deposit more funds in order to gain eligibility to use this feature."]
      };
    case EMPTY_STATES.ZERO_INTEREST:
      return {
        image: require("../../assets/images/money-bear3x.png"),
        heading: "Your Turn To Earn", 
        paragraphs: ["Earn up to 7.5% on your wallet balance. Complete KYC verification to start earning!"],
        button: "Check this week's rates",
        onPress: () => actions.openModal(MODALS.TODAY_INTEREST_RATES_MODAL)
      };
    case EMPTY_STATES.NON_VERIFIED_CELPAY:
      return {
        title: status => status,
        heading: "Send crypto to your friends",
        paragraphs: ["Quickly, easily and with no fees or keys required. All you have to do is become a Celsius member by verifying your profile."],
        button: "Verify profile",
        onPress: () => actions.navigateTo("KYCProfileDetails")
      };
    case EMPTY_STATES.NON_VERIFIED_DEPOSIT:
      return {
        title: status => status,
        heading: "Start earning interest",
        paragraphs: ["Start earning 7% a year on your coin. All you have to do is become a Celsius member by verifying your profile."],
        button: "Verify profile",
        onPress: () => actions.navigateTo("KYCProfileDetails")
      };
    case EMPTY_STATES.NON_VERIFIED_BORROW: 
      return {
        title: status => status,
        heading: "In-Your-Best-Interest Rates",
        paragraphs: ["Borrow cash at the lowest interest rates on the market. Complete KYC Verification today!"],
        button: "Verify profile",
        onPress: () => actions.navigateTo("KYCProfileDetails")
      };
    case EMPTY_STATES.NON_MEMBER_CELPAY:
      return {
        heading: "Send crypto to your friends",
        paragraphs: ["Quickly, easily and with no fees or keys required. All you have to do is become a Celsius member by adding some CEL to your wallet"],
        button: "Deposit CEL",
        onPress: () => actions.navigateTo("Deposit", { coin: "CEL" })
      };
    case EMPTY_STATES.NON_MEMBER_INTEREST:
      return {
        heading: "Start earning interest",
        paragraphs: ["Start earning 7% a year on your coin. All you have to do is become a Celsius member by adding some CEL to your wallet"],
        button: "Deposit CEL",
        onPress: () => actions.navigateTo("Deposit", { coin: "CEL" })
      };
    case EMPTY_STATES.NON_MEMBER_BORROW:
      return {
        heading: "Borrow Dollars for Crypto",
        paragraphs: ["Start using your coins as collateral and get a dollar loan at just 4.95% APR. All you have to do is become a Celsius member by adding some CEL to your wallet"],
        button: "Deposit CEL",
        onPress: () => actions.navigateTo("Deposit", { coin: "CEL" })
      };
    case EMPTY_STATES.NO_CONTACTS:
      return {
        image: require("../../assets/images/diane-sad3x.png"),
        heading: "No friends",
        paragraphs: ["None of your friends has installed Celsius app. You can still CelPay them with a link"],
        button: "Send link",
        onPress: () => actions.navigateTo("CelPayEnterAmount")
      };
    case EMPTY_STATES.NO_LOANS:
      return {
        image: require("../../assets/images/diane-sad3x.png"),
        heading: "Borrow dollars by using crypto",
        paragraphs: ["You can apply for as many loans as you like, as long as you have enough collateral in your wallet."],
        button: "Apply for a loan",
        onPress: () => actions.navigateTo("BorrowEnterAmount")
      };
    default:
      return {};
  }

}

export default getDefaultEmptyState;
