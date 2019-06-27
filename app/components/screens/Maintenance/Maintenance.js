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
    // console.log("this.props.appCompliance.allowed", this.props.appCompliance.allowed)
    if ((prevProps.backendStatus.maintenance && !this.props.backendStatus.maintenance) || (!prevProps.appCompliance.allowed && this.props.appCompliance.allowed) ) {
      actions.navigateTo("WalletLanding");
    }
  }

  render() {

    return (
      <StaticScreen type={"hide"} emptyState={{ purpose: EMPTY_STATES.MAINTENANCE }}/>
    );
  }
}

export default Maintenance;
