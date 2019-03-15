import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import KYCVerifyIDStyle from "./KYCVerifyID.styles";
// import CelText from '../../atoms/CelText/CelText';
// import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import StaticScreen from "../StaticScreen/StaticScreen";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class KYCVerifyID extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Verify ID",
  });

  render() {
    const { actions } = this.props
    // const style = KYCVerifyIDStyle();

    return (
      <StaticScreen
        emptyState={{
          heading: 'Verify ID screen coming soon',
          button: 'Start KYC',
          onPress: () => actions.navigateTo('KYCLanding'),
        }}
      />
    );
  }
}

export default testUtil.hookComponent(KYCVerifyID);
