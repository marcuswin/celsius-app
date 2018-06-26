import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Passcode from './Passcode'

import * as actions from "../../../redux/actions";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class CreatePasscode extends Component {
  render() {
    return <Passcode type={'createPasscode'} />
  }
}

export default CreatePasscode;
