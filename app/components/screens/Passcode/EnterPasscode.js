import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Passcode from './Passcode'

import * as appActions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class EnterPasscode extends Component {
  render() {
    const currency = this.props.navigation.getParam('currency');
    const amountCrypto = this.props.navigation.getParam('amountCrypto');
    const withdrawalAddress = this.props.navigation.getParam('withdrawalAddress');
    const newWithdrawalAddress = this.props.navigation.getParam('newWithdrawalAddress');

    return <Passcode type={'enterPasscode'}
                     currency={currency}
                     amountCrypto={amountCrypto}
                     newWithdrawalAddress={newWithdrawalAddress}
                     withdrawalAddress={withdrawalAddress} />
  }
}

export default EnterPasscode;
