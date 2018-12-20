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
    const {navigation} = this.props;

    const currency = navigation.getParam('currency');
    const amountCrypto = navigation.getParam('amountCrypto');
    const withdrawalAddress = navigation.getParam('withdrawalAddress');
    const newWithdrawalAddress = navigation.getParam('newWithdrawalAddress');
    const purpose = navigation.getParam('purpose');

    return <Passcode {...this.props} testSelector={'CreatePasscode.pin'} 
                     type={'enterPasscode'}
                     currency={currency}
                     amountCrypto={amountCrypto}
                     purpose={purpose}
                     newWithdrawalAddress={newWithdrawalAddress}
                     withdrawalAddress={withdrawalAddress} />
  }
}

export default EnterPasscode;
