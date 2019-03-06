import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import BorrowLandingStyle from "./BorrowLanding.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';

import { EMPTY_STATES } from "../../../constants/UI";
import StaticScreen from "../StaticScreen/StaticScreen";

@connect(
  state => ({
    loanCompliance: state.user.compliance.loan,
    walletSummary: state.wallet.summary,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowLanding extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    const {walletSummary, loanCompliance} = this.props;

    const eligibleCoins = walletSummary.coins.filter(coinData => loanCompliance.coins.includes(coinData.short))

    this.state = {
      header: {
        title: "Borrow Landing",
        left: "back",
        right: "profile"
      },
      maxAmount: eligibleCoins.reduce((max, element) => element.amount_usd > max ? element.amount_usd : max, 0) / 2,
    };
  }

  render() {
    const { header, maxAmount } = this.state;
    const {loanCompliance} = this.props;
    // const style = BorrowLandingStyle();


    if (!loanCompliance.allowed) {
      return (
        <StaticScreen
          header={{
            title: "Borrow Landing",
          }}
          emptyState={{ purpose: EMPTY_STATES.COMPLIANCE }}
        />
      )
    }

    if(maxAmount < 5000) {
      return (
        <StaticScreen
          header={{
            title: "Borrow Landing",
          }}
          emptyState={{ purpose: EMPTY_STATES.INSUFFICIENT_FUNDS }}
        />
      )
    }
    
    return (
      <RegularLayout header={header}>
        <CelText>Hello BorrowLanding</CelText>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowLanding);
