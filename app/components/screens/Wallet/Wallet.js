import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import WalletStyle from "./Wallet.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelInput from '../../atoms/CelInput/CelInput';
import CelButton from '../../atoms/CelButton/CelButton';

@connect(
  state => ({
    style: WalletStyle(state.ui.theme),
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Wallet extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData } = this.props
    return (
      <RegularLayout header={{
        title: "Welcome, Stefan!",
        right: "profile"
      }}>
        <CelButton onPress={() => { }}>Join Celsius</CelButton>
        <CelInput field="test" placeholder="Password" />
        <CelInput field="test1" placeholder="Password" type="password" value={formData.test1 || ""} />
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Wallet);
