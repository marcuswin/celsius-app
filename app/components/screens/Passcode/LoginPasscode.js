import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Passcode from './Passcode'

import * as appActions from "../../../redux/actions";
import store from "../../../redux/store";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class EnterPasscode extends Component {

  componentWillMount() {
    const {actions} = this.props;

    store.dispatch(actions.updateFormField('pin', ''));
  }

  render() {

    return <Passcode
      {...this.props} testSelector={'CelTextInput.pin'}
      type={'loginPasscode'}
    />
  }
}

export default EnterPasscode;

