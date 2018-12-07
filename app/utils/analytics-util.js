import { mixpanelEvents } from "../services/mixpanel";
import branchService from "../services/branch-service";
import store from '../redux/store';
import { branchEvents } from "./branch-util";


export const analyticsEvents = {
  signupButton: () => {
    mixpanelEvents.signupButton()
    const metadata = { btn: 'Skip Intro', screen: 'Welcome' }
    branchService.createEvent({ event: 'BUTTON_PRESSED', identity: 'no-user', metadata })
  },
  startedSignup: (method) => {
    mixpanelEvents.startedSignup(method);
    const metadata = { method }
    branchService.createEvent({ event: 'STARTED_SIGNUP', identity: 'no-user', metadata })
  },
  finishedSignup: (method) => {
    const { user } = store.getState().users;
    mixpanelEvents.finishedSignup(method)
    branchEvents.completeRegistration(user.id, method)
  },

  profileDetailsAdded: (profileDetails) => {
    const { user } = store.getState().users;
    mixpanelEvents.profileDetailsAdded(profileDetails)
    const metadata = {
      "First Name": profileDetails.first_name,
      "Last Name": profileDetails.last_name,
      "Date of Birth": profileDetails.date_of_birth,
      "Gender": profileDetails.gender,
      Citizenship: profileDetails.citizenship
    }
    branchService.createEvent({ event: 'PROFILE_DETAILS_ADDED', identity: user.id, metadata })
  },
  documentsAdded: () => {
    mixpanelEvents.documentsAdded()
    const { user } = store.getState().users;
    branchService.createEvent({ event: 'DOCUMENTS_ADDED', identity: user.id })
  },
  phoneVerified: () => {
    const { user } = store.getState().users;
    mixpanelEvents.phoneVerified()
    branchService.createEvent({ event: 'PHONE_VERIFIED', identity: user.id })
    branchEvents.achieveLevel(user.id, 'completed')
  },
  KYCStarted: () => {
    const { user } = store.getState().users;
    mixpanelEvents.KYCStarted()
    branchService.createEvent({ event: 'KYC_STARTED', identity: user.id })
  },

  pressWalletCard: (coinShort) => {
    const { user } = store.getState().users;
    mixpanelEvents.pressWalletCard(coinShort)
    branchService.createEvent({ event: 'WALLET_CARD_PRESSED', identity: user.id, metadata: { coin: coinShort } })
  },
  pressAddFunds: () => {
    const { user } = store.getState().users;
    mixpanelEvents.pressAddFunds()
    const metadata = { btn: 'Add funds', screen: 'AddFunds' }
    branchService.createEvent({ event: 'BUTTON_PRESSED', identity: user.id, metadata })
  },
  confirmWithdraw: (withdrawInfo) => {
    const { user } = store.getState().users;
    mixpanelEvents.confirmWithdraw(withdrawInfo)
    // branchService.createEvent({ event: 'CONFIRM_WITHDRAW', identity: user.id, metadata: withdrawInfo })
    branchEvents.addToWishlist(user.id, withdrawInfo)
  },

  changeTab: (tab) => {
    const { user } = store.getState().users;
    mixpanelEvents.changeTab(tab)
    const metadata = { tab };
    branchService.createEvent({ event: 'CHANGE_TAB', identity: user.id, metadata })
  },
  openApp: () => {
    const { user } = store.getState().users;
    mixpanelEvents.openApp()
    branchService.createEvent({ event: 'APP_OPENED', identity: user ? user.id : 'no-user' })
  },
  navigation: (screenName) => {
    const { user } = store.getState().users;
    mixpanelEvents.navigation(screenName)
    const metadata = { screen: screenName };
    branchService.createEvent({ event: 'NAVIGATE_TO', identity: user.id, metadata })
  },
  celPayTransfer: (celPayInfo) => {
    const { user } = store.getState().users;
    mixpanelEvents.celPayTransfer(celPayInfo);
    branchEvents.spendCredits(user.id, celPayInfo);
  },
  applyForLoan: (loanData) => {
    const { user } = store.getState().users;
    mixpanelEvents.applyForLoan(loanData);
    branchEvents.addToCart(user.id, loanData);
  },
  profileAddressAdded: (profileAddress) => {
    const { user } = store.getState().users;
    mixpanelEvents.profileAddressAdded(profileAddress)
    const metadata = {
      "Country": profileAddress.address.country,
      "Address filled": true
    }
    branchService.createEvent({ event: 'PROFILE_ADDRESS_ADDED', identity: user.id, metadata })
  },
  profileTaxpayerInfoAdded: (profileTaxpayerInfo) => {
    const { user } = store.getState().users;
    mixpanelEvents.profileTaxpayerInfoAdded(user.country, profileTaxpayerInfo)
    const metadata = {};
    if (user.country === "United States") {
      metadata["SSN filled"] = true;
    } else if (profileTaxpayerInfo.taxpayer_info.itin) {
      metadata["Tax ID"] = true;
    }
    branchService.createEvent({ event: 'PROFILE_TAXPAYERINFO_ADDED', identity: user.id, metadata })
  }
}
