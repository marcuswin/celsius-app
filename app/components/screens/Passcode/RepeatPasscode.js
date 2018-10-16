import { hook } from 'cavy';
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Passcode from './Passcode'

import * as appActions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class RepeatPasscode extends Component {
  render() {
    return <Passcode {...this.props}
    testSelector={'repeatPasscode.pin'}  type={'repeatPasscode'} />
  }
}

// export default RepeatPasscode;
const TestHook = hook(RepeatPasscode)
export default TestHook;