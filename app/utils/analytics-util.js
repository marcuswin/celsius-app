import { mixpanelEvents } from "../services/mixpanel";
import branchService from "../services/branch-service";
import store from '../redux/store';


export const analyticsEvents = {
  signupButton: () => {
    mixpanelEvents.signupButton()
    branchService.createEvent({
      event: 'BUTTON_PRESSED',
      identity: 'no-user',
      metadata: {
        btn: 'Skip Intro',
        screen: 'Welcome'
      },
    })
  },
  startedSignup: (method) => {
    mixpanelEvents.startedSignup(method);
    branchService.createEvent({
      event: 'STARTED_SIGNUP',
      identity: 'no-user',
      metadata: {
        method,
      },
    })

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

}
