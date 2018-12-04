import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Constants } from "expo";

import * as appActions from "../../../redux/actions";
import NoKyc from "../NoKyc/NoKyc";
import CreatePasscode from "../Passcode/CreatePasscode";
import { KYC_STATUSES } from "../../../config/constants/common";
import WelcomeScreen from "../Welcome/Welcome";
import SignupTwo from "../Signup/SignupTwo";
import WalletBalance from "../WalletBalance/WalletBalance";
import store from "../../../redux/store";
import { shouldRenderInitialIdVerification } from "../../../utils/user-util";
import VerifyIdentity from "../VerifyIdentity/VerifyIdentityScreen";
import Message from "../../atoms/Message/Message";

const { CLIENT_VERSION, ENV } = Constants.manifest.extra;

@connect(
  state => ({
    appInitialized: state.app.appInitialized,
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
    const { actions, appInitialized } = this.props;
    if (!appInitialized) actions.appInitStart();

    if (['PREPROD', 'PRODUCTION'].indexOf(ENV) !== -1 &&
      CLIENT_VERSION !== store.getState().generalData.backendStatus.client_version) {

      store.dispatch(actions.showMessage(
        'warning',
        ['When Update?', '', 'Right now! Please head to the app store and download the newest update. Stay cool.'].join('\n'),
      ));
    }

  }

  componentDidUpdate() {
    const { actions } = this.props;
    actions.refreshBottomNavigation();
  }

  loginPasscode = () => {
    const { actions, userActions } = this.props;

    if (!userActions.enteredInitialPin) {
      actions.fireUserAction('enteredInitialPin');
      actions.openInitialModal();
    }
  };

  renderLoadingScreen = () => (
    <View>
      <Message/>
      <Image source={require('../../../../assets/images/loading.png')} style={{ height: '100%', width: '100%' }}/>
    </View>
  )

  render() {
    const { user, userActions, appInitialized } = this.props;

    if (!appInitialized) return this.renderLoadingScreen();

    if (!user) return <WelcomeScreen />;

    if (!user.first_name || !user.last_name) return <SignupTwo />;
    if (!user.has_pin) return <CreatePasscode />;
    if (shouldRenderInitialIdVerification(userActions)) return <VerifyIdentity verificationCallback={this.loginPasscode} label="login" help backButton={false} />;
    if (!user.kyc || (user.kyc && user.kyc.status !== KYC_STATUSES.passed)) return <NoKyc />;

    return <WalletBalance />;
  }
}

export default HomeScreen;
