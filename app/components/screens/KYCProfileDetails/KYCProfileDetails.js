import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import KYCProfileDetailsStyle from "./KYCProfileDetails.styles";
// import CelText from '../../atoms/CelText/CelText';
// import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import StaticScreen from "../StaticScreen/StaticScreen";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class KYCProfileDetails extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Profile Details",
  });

  render() {
    const { actions } = this.props;
    // const style = KYCProfileDetailsStyle();
    
    return (
      <StaticScreen
        emptyState={{
          heading: 'Profile Details screen coming soon',
          button: 'Add address info',
          onPress: () => actions.navigateTo('KYCAddressInfo'),
        }}
      />
    );
  }
}

export default testUtil.hookComponent(KYCProfileDetails);
