import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import DepositStyle from "./Deposit.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelText from '../../atoms/CelText/CelText';
import CircleButton from '../../atoms/CircleButton/CircleButton';

@connect(
  state => ({
    style: DepositStyle(state.ui.theme),
    theme: state.ui.theme
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Deposit extends Component {

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
    const { theme } = this.props
    return (
      <RegularLayout header={{
        title: "Deposit coins",
        left: "back",
        right: "profile"
      }}>
        <CelText type="H4">Choose coin to deposit</CelText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CircleButton theme={theme} type="coin" icon="IconBTC" text="Bitcoin" />
          <CircleButton theme={theme} type="coin" icon="IconETH" text="Ethereum" />
          <CircleButton theme={theme} type="coin" icon="IconLTC" text="Litecoin" />
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Deposit);
