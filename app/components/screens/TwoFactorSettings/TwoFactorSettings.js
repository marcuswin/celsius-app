import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';

@connect(
  () => ({
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TwoFactorSettings extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "TwoFactorSettings Screen",
    right: "profile"
  });

  render() {

    return (
      <RegularLayout>
        <CelText>Hello TwoFactorSettings</CelText>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(TwoFactorSettings);
