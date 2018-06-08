import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import WalletLanding from "../WalletLanding/WalletLanding";
import NoKyc from "../NoKyc/NoKyc";
import CreatePasscode from "../Passcode/CreatePasscode";


@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    kycStatus: undefined,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class HomeScreen extends Component {

  render() {

    if (!this.props.user.has_pin) return <CreatePasscode />

    return (this.props.kycStatus === 'completed') ? <WalletLanding /> : <NoKyc />
  }
}

export default HomeScreen;
