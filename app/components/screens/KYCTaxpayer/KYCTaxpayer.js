import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import KYCTaxpayerStyle from "./KYCTaxpayer.styles";
// import CelText from '../../atoms/CelText/CelText';
// import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import StaticScreen from "../StaticScreen/StaticScreen";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class KYCTaxpayer extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Taxpayer ID",
  });

  render() {
    const { actions } = this.props
    // const style = KYCTaxpayerStyle();

    return (
      <StaticScreen
        emptyState={{
          heading: 'Taxpayer ID screen coming soon',
          button: 'Verify ID',
          onPress: () => actions.navigateTo('KYCVerifyID'),
        }}
      />
    );
  }
}

export default testUtil.hookComponent(KYCTaxpayer);
