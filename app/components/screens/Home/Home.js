import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import { Constants } from "expo";

import * as appActions from "../../../redux/actions";
import NoKyc from "../NoKyc/NoKyc";
import CreatePasscode from "../Passcode/CreatePasscode";
import { KYC_STATUSES } from "../../../config/constants/common";
import WelcomeScreen from "../Welcome/Welcome";
import SignupTwo from "../Signup/SignupTwo";
import { registerForPushNotificationsAsync } from "../../../utils/push-notifications-util";
import { getSecureStoreKey } from "../../../utils/expo-storage";
import WalletBalance from "../WalletBalance/WalletBalance";
import store from "../../../redux/store";
import { shouldRenderInitialIdVerification } from "../../../utils/user-util";
import VerifyIdentity from "../VerifyIdentity/VerifyIdentityScreen";

const {SECURITY_STORAGE_AUTH_KEY, CLIENT_VERSION, ENV} = Constants.manifest.extra;

@connect(
  state => ({
    user: state.users.user,
    expiredSession: state.users.expiredSession,
    displayedRatesModal: state.ui.showedTodayRatesOnOpen,
    appSettings: state.users.appSettings,
    openedModal: state.ui.openedModal,
    userActions: state.ui.userActions,
    callsInProgress: state.api.callsInProgress,
    branchHashes: state.transfers.branchHashes,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class HomeScreen extends Component {
  async componentWillMount() {
    const { actions, expiredSession } = this.props;

    if (expiredSession) {
      await actions.logoutUser();
    } else {
      try {
        // get user token
        const token = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
        // get user from db
        if (token) {
          await actions.getProfileInfo();

          // Anything beyond this point is considered as the user has logged in.
          registerForPushNotificationsAsync();
        }
      } catch(err) {
        console.log(err);
      }
    }

    if (['PREPROD', 'PRODUCTION'].indexOf(ENV) !== -1 &&
      CLIENT_VERSION !== store.getState().generalData.backendStatus.client_version) {

      store.dispatch(actions.showMessage(
        'warning',
        ['When Update?', '', 'Right now! Please head to the app store and download the newest update. Stay cool.'].join('\n'),
      ));
    }

  }

  verificationCallback = () => {
    const { actions, userActions } = this.props;

    if (!userActions.enteredInitialPin) {
      actions.fireUserAction('enteredInitialPin');
      actions.openInitialModal();
    }
  };

  render() {
    const { user, userActions } = this.props;

    if (!user) return <WelcomeScreen/>;

    if (!user.first_name || !user.last_name) return <SignupTwo/>;
    if (!user.has_pin) return <CreatePasscode />;
    if (shouldRenderInitialIdVerification(userActions)) return <VerifyIdentity verificationCallback={this.verificationCallback} label="login" help backButton={false}/>;
    if (!user.kyc || (user.kyc && user.kyc.status !== KYC_STATUSES.passed)) return <NoKyc />;

    return <WalletBalance/>;
  }
}

export default HomeScreen;
