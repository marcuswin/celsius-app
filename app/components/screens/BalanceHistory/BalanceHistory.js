import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import BalanceHistoryStyle from "./BalanceHistory.styles";
import CelText from '../../atoms/CelText/CelText';
import Card from "../../atoms/Card/Card";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';

@connect(
  state => ({
    style: BalanceHistoryStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BalanceHistory extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Wallet",
        left: "back",
        right: "profile"
      }
    };
  }

  render() {
    // const { style } = this.props
    const { header } = this.state

    return (
      <RegularLayout header={header}>
        <View >
          <Card>
            <CelText>Total wallet balance</CelText>
            <CelText bold>{formatter.usd(12313.14)}</CelText>
          </Card>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BalanceHistory);
