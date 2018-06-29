import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import WalletLanding from "../WalletLanding/WalletLanding";
import NoKyc from "../NoKyc/NoKyc";
import CreatePasscode from "../Passcode/CreatePasscode";
import { KYC_STATUSES } from "../../../config/constants/common";
import WelcomeScreen from "../Welcome/Welcome";
import SignupTwo from "../Signup/SignupTwo";
import { registerForPushNotificationsAsync } from "../../../utils/push-notifications-util";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    props.getProfileInfo();
  }
  render() {
    const { user } = this.props;

    if (!user) return <WelcomeScreen/>;

    // Anything beyond this point is considered as the user has logged in.
    registerForPushNotificationsAsync();

    if (!user.first_name || !user.last_name) return <SignupTwo/>;
    if (!user.has_pin) return <CreatePasscode />;
    if (!user.kyc || (user.kyc && user.kyc.status !== KYC_STATUSES.passed)) return <NoKyc />;
    return <WalletLanding />;
  }
}

export default HomeScreen;
