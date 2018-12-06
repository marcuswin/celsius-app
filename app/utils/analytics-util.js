import { mixpanelEvents } from "../services/mixpanel";
import branchService from "../services/branch-service";
import store from '../redux/store';


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
    const metadata = { method };
    branchService.createEvent({ event: 'FINISHED_SIGNUP', identity: user.id, metadata })
  },

  profileDetailsAdded: (profileDetails) => {
    const { user } = store.getState().users;
    mixpanelEvents.profileDetailsAdded(profileDetails)
    const metadata = profileDetails;
    branchService.createEvent({ event: 'PROFILE_DETAILS_ADDED', identity: user.id, metadata })
  },
  documentsAdded: () => {
    const { user } = store.getState().users;
    mixpanelEvents.documentsAdded()
    branchService.createEvent({ event: 'DOCUMENTS_ADDED', identity: user.id })
  },
  phoneVerified: () => {
    const { user } = store.getState().users;
    mixpanelEvents.phoneVerified()
    branchService.createEvent({ event: 'PHONE_VERIFIED', identity: user.id })
  },
  KYCStarted: () => {
    const { user } = store.getState().users;
    mixpanelEvents.KYCStarted()
    branchService.createEvent({ event: 'KYC_STARTED', identity: user.id })
  },

  pressWalletCard: (coinShort) => {
    const { user } = store.getState().users;
    mixpanelEvents.pressWalletCard()
    branchService.createEvent({ event: 'WALLET_CARD_PRESSED', identity: user.id, metadata: { coin: coinShort }})
  },
  pressAddFunds: () => {
    const { user } = store.getState().users;
    mixpanelEvents.pressAddFunds()
    const metadata = { btn: 'Skip Intro', screen: 'Welcome' }
    branchService.createEvent({ event: 'BUTTON_PRESSED', identity: user.id, metadata })
  },
  confirmWithdraw: (withdrawInfo) => {
    const { user } = store.getState().users;
    mixpanelEvents.confirmWithdraw(withdrawInfo)
    branchService.createEvent({ event: 'CONFIRM_WITHDRAW', identity: user.id, metadata: withdrawInfo })
  },

  changeTab: (tab) => {
    const { user } = store.getState().users;
    mixpanelEvents.changeTab(tab)
    const metadata = { tab };
    branchService.createEvent({ event: 'WALLET_CARD_PRESSED', identity: user.id, metadata })
  },
  openApp: () => {
    const { user } = store.getState().users;
    mixpanelEvents.openApp()
    branchService.createEvent({ event: 'BUTTON_PRESSED', identity: user ? user.id : 'no-user' })
  },
  navigation: (screenName) => {
    const { user } = store.getState().users;
    mixpanelEvents.navigation(screenName)
    const metadata = { screen: screenName };
    branchService.createEvent({ event: 'NAVIGATE_TO', identity: user.id, metadata })
  },


}
