import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import KYCAddressInfoStyle from "./KYCAddressInfo.styles";
// import CelText from '../../atoms/CelText/CelText';
// import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import StaticScreen from "../StaticScreen/StaticScreen";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class KYCAddressInfo extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Address info",
  });

  render() {
    const { actions } = this.props
    // const style = KYCAddressInfoStyle();
    
    return (
      <StaticScreen
        emptyState={{
          heading: 'Address Info screen coming soon',
          button: 'Add taxpayer info',
          onPress: () => actions.navigateTo('KYCTaxpayer'),
        }}
      />
    );
  }
}

export default testUtil.hookComponent(KYCAddressInfo);
