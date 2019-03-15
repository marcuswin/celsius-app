import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import KYCLandingStyle from "./KYCLanding.styles";
// import CelText from '../../atoms/CelText/CelText';
// import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import StaticScreen from "../StaticScreen/StaticScreen";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class KYCLanding extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "KYC Landing Screen",
  });

  render() {
    const { actions } = this.props
    // const style = KYCLandingStyle();
    
    return (
      <StaticScreen
        emptyState={{
          heading: 'KYC Landing screen coming soon',
          button: 'Add profile details',
          onPress: () => actions.navigateTo('KYCProfileDetails'),
        }}
      />
    );
  }
}

export default testUtil.hookComponent(KYCLanding);
