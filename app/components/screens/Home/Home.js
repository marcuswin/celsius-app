import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import LoadingScreen from "../LoadingScreen/LoadingScreen";


@connect(
  state => ({
    appInitialized: state.app.appInitialized,
    user: state.user.profile
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Home extends Component {
  async componentWillMount() {
    const { actions, appInitialized } = this.props;
    if (!appInitialized) await actions.initCelsiusApp();
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.appInitialized === false && this.props.appInitialized === true) {
      if (user.id) {
        prevProps.actions.navigateTo('WalletLanding')
      } else {
        prevProps.actions.navigateTo('Login')
      }

    }
  }

  render = () => <LoadingScreen loadingState={{ heading: 'Celsius app initializing...' }} />
}

export default Home;