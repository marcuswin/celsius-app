import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Passcode from './Passcode'
import testUtil from "../../../utils/test-util";

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

export default testUtil.hookComponent(RepeatPasscode);
