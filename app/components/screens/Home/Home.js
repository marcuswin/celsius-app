import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import LoadingScreen from "../LoadingScreen/LoadingScreen";


@connect(
  state => ({
    appInitialized: state.app.appInitialized,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Home extends Component {
  async componentWillMount() {
    const { actions, appInitialized } = this.props;
    if (!appInitialized) actions.initCelsiusApp();
    actions.loginUser({ email: 'filip.jovakaric+wlt2@mvpworkshop.co', password: 'filip123' })
  }

  componentDidUpdate(prevProps){
    if (prevProps.appInitialized === false && this.props.appInitialized === true) {
      prevProps.actions.navigateTo('WalletLanding')
    }
  }

  render = () => <LoadingScreen loadingState={{ heading: 'Celsius app initializing...' }} />
}

export default Home;
