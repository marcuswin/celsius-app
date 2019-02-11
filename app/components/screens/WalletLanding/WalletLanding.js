import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import WalletLandingStyle from "./WalletLanding.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import CoinCard from '../../molecules/CoinCard/CoinCard';

@connect(
  state => ({
    style: WalletLandingStyle(state.ui.theme),
    currencies: state.generalData.supportedCurrencies,
    walletSummary: state.wallet.summary,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletLanding extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Welcome Andrew!",
        right: "profile"
      }
    };
  }

  render() {
    const { header } = this.state
    const { actions, walletSummary } = this.props
    const walletStyle = WalletLandingStyle();

    return (
      <RegularLayout
        header={header}
      >
        <View>
          <Card>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={[walletStyle.balance]} onPress={() => actions.navigateTo('BalanceHistory')}>
                <CelText style={walletStyle.text}>Total Wallet balance</CelText>
                <CelText bold style={walletStyle.usd}>{formatter.usd(walletSummary.total_amount_usd)}</CelText>
                <CelText color={STYLES.COLORS.RED}>{walletSummary.wallet_diff_24h}</CelText>
              </TouchableOpacity>
              <View style={{
                marginRight: 10,
                borderLeftWidth: 1,
                borderLeftColor: '#F3F3F3',
                borderRadius: 10,
              }} />
              <TouchableOpacity style={walletStyle.interest} onPress={() => actions.navigateTo('WalletInterest')}>
                <CelText style={walletStyle.text}>Total Interest earned</CelText>
                <CelText bold style={walletStyle.usd}>{formatter.usd(walletSummary.total_interest_earned)}</CelText>
                <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Todays rates</CelText>
              </TouchableOpacity>
            </View>
          </Card>

          <CelText bold>Deposited coins</CelText>
          <CoinCard/>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WalletLanding);
