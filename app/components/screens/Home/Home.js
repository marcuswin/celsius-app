import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";

import { EMPTY_STATES } from "../../../constants/UI";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import StaticScreen from "../StaticScreen/StaticScreen";

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
  }

  render() {
    const { appInitialized } = this.props;

    if (!appInitialized) {
      return (
        <LoadingScreen
          loadingState={{ heading: 'Celsius app initializing...' }}
        />
      )
    }
    return (
      <StaticScreen
        emptyState={{ purpose: EMPTY_STATES.FIRST_TIME }}
      />
    );
  }
}

export default Home;
