import React, { Component } from "react";
// import { Image } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
// import MaintenanceStyle from "./Maintenance.styles";
import { EMPTY_STATES } from "../../../constants/UI";
import StaticScreen from "../StaticScreen/StaticScreen";


@connect(
  state => ({
    backendStatus: state.generalData.backendStatus,
    appCompliance: state.user.compliance.app,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Maintenance extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    header: null
  });

  componentDidUpdate(prevProps) {
    const {actions} = this.props;
    if ((prevProps.backendStatus.maintenance && !this.props.backendStatus.maintenance) || (!prevProps.appCompliance.allowed && this.props.appCompliance.allowed) ) {
      actions.navigateTo("WalletLanding");
    }
  }

  render() {
    const {navigation, backendStatus} = this.props;
    const maintenance = navigation.getParam("maintenance");

      const title = maintenance && backendStatus.title ? 'Hello' : "Be back soon!";
      const explanation = maintenance && backendStatus.explanation ? ["Be back soon"] : ["Celsius is currently down for maintenance. We expect to be back in a couple of hours. Thanks for your patience."];

    return (
      <StaticScreen type={"hide"} emptyState={{ purpose: maintenance ? EMPTY_STATES.MAINTENANCE : EMPTY_STATES.COMPLIANCE, heading: title, paragraphs: explanation}}/>
    );
  }
}

export default Maintenance;
