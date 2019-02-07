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

@connect(
  state => ({
    style: WalletLandingStyle(state.ui.theme),
    currencies: state.generalData.supportedCurrencies,
    // wallet: state.wallet.walletDetail,
    wallet: {
      total_amount_usd: 1200,
      wallet_diff_24h: -1.25,
      total_interest_earned: 142,
      coins: [
        {
          name: 'Bitcoin',
          short: 'BTC',
          amount_usd: 4200,
          amount: 1.2,
          interest_earned_usd: 123, 
          interest_earned: 12,
        },
        {
          name: 'Ethereum',
          short: 'ETH',
          amount_usd: 4200,
          amount: 1.2,
          interest_earned_usd: 123, 
          interest_earned: 12,
        },
        {
          name: 'Stellar Lumens',
          short: 'XLM',
          amount_usd: 4200,
          amount: 1.2,
          interest_earned_usd: 123, 
          interest_earned: 12,
        },
        {
          name: 'Ripple',
          short: 'XRP',
          amount_usd: 4200,
          amount: 1.2,
          interest_earned_usd: 123, 
          interest_earned: 12,
        },
        {
          name: 'Bitcoin Cahs',
          short: 'BCH',
          amount_usd: 4200,
          amount: 1.2,
          interest_earned_usd: 123, 
          interest_earned: 12,
        },
      ]
    },
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
        // right: "profile"
      }
    };
  }

  renderCard = (coin) => {
    const { actions } = this.props;
    // TODO(nk): create molecule component
    return (
      <Card key={coin.name} size="half" margin="5 5 5 5" onPress={() => actions.navigateTo('CoinDetails', { coin: coin.short })}>
        <CelText>{coin.name}</CelText>
        <CelText bold>{formatter.usd(coin.amount_usd)}</CelText>
        <CelText>{formatter.crypto(coin.amount, coin.short)}</CelText>
      </Card>
    )
  }

  render() {
    const { header } = this.state
    const { actions, wallet } = this.props


    return (
      <RegularLayout
        header={header}
      >
        <View>

          <Card>
            <View style={{ flexDirection: "row", }}>
              <TouchableOpacity onPress={() => actions.navigateTo('BalanceHistory')}>
                <CelText>Total Wallet balance</CelText>
                <CelText bold>{formatter.usd(wallet.total_amount_usd)}</CelText>
                <CelText color={STYLES.COLORS.RED}>{wallet.wallet_diff_24h}</CelText>
              </TouchableOpacity>
              <View style={{
                borderLeftWidth: 1,
                borderLeftColor: 'gray',
                borderRadius: 10,
              }} />
              <TouchableOpacity onPress={() => actions.navigateTo('WalletInterest')}>
                <CelText>Total Interest earned</CelText>
                <CelText bold>{formatter.usd(wallet.total_interest_earned)}</CelText>
                <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Todays rates</CelText>
              </TouchableOpacity>
            </View>
          </Card>

          <CelText bold>Deposited coins</CelText>

          <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}>
            {wallet.coins.map(this.renderCard)}
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WalletLanding);
