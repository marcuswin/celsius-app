import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import WalletLanding from "../WalletLanding/WalletLanding";
import NoKyc from "../NoKyc/NoKyc";
import CreatePasscode from "../Passcode/CreatePasscode";
import { KYC_STATUSES } from "../../../config/constants/common";


@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    kycStatus: state.users.user.kyc ? state.users.user.kyc.status : KYC_STATUSES.collecting,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class HomeScreen extends Component {

  render() {

    if (!this.props.user.has_pin) return <CreatePasscode />
    return (this.props.kycStatus === KYC_STATUSES.passed) ? <WalletLanding /> : <NoKyc />
  }
}

export default HomeScreen;
