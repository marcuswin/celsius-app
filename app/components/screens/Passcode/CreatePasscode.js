import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Passcode from './Passcode'

import * as appActions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class CreatePasscode extends Component {
  render() {
    return <Passcode type={'createPasscode'} />
  }
}

export default CreatePasscode;
