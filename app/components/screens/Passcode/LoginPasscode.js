import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as appActions from "../../../redux/actions";
import store from "../../../redux/store";
import VerifyIdentity from "../VerifyIdentity/VerifyIdentityScreen";

@connect(
  state => ({
    userActions: state.ui.userActions,
    previousScreen: state.nav.routes[state.nav.index - 1] ? state.nav.routes[state.nav.index - 1].routeName : null
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class EnterPasscode extends Component {

  componentWillMount() {
    const { actions } = this.props;

    store.dispatch(actions.updateFormField('pin', ''));
  }

  loginPasscode = () => {
    const { actions, userActions, previousScreen } = this.props;

    if (previousScreen === null) {
      actions.navigateTo('Home');
    } else {
      actions.navigateTo(previousScreen);
    }

    if (!userActions.enteredInitialPin) {
      actions.fireUserAction('enteredInitialPin');
      actions.openInitialModal();
    }

  };

  render() {

    return <VerifyIdentity verificationCallback={this.loginPasscode} label="login" help backButton={false} />;
  }
}

export default EnterPasscode;

