import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import _ from "lodash";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import WalletLandingStyle from "./WalletLanding.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import CoinCard from '../../molecules/CoinCard/CoinCard';
import Separator from "../../atoms/Separator/Separator";

@connect(
  state => ({
    currenciesRates: state.currencies.rates,
    walletSummary: state.wallet.summary,
    currenciesGraphs: state.currencies.graphs
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletLanding extends Component {
  static propTypes = {};
  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Welcome Andrew!",
        right: "profile"
      }
    };
  }
  priorityCoins = ["CEL", "BTC", "ETH", "XRP", "LTC", "ZRX"]

  render() {
    const { header } = this.state
    const { actions, walletSummary, currenciesRates, currenciesGraphs } = this.props
    const walletStyle = WalletLandingStyle();

    const coinWithAmount = [];
    const coinWithoutAmount = [];

    walletSummary.coins.forEach((coin) => {
      const noammountAndIn = coin.amount_usd === 0 && this.priorityCoins.indexOf(coin.short) !== -1
      if (coin.amount_usd > 0) {
        coinWithAmount.push(coin)
      } else if (noammountAndIn) {
        coinWithoutAmount.push(coin)
      }
    });

    return (
      <RegularLayout
        header={header}
      >
        <View>
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

              <TouchableOpacity style={[walletStyle.balance]} onPress={() => actions.navigateTo('BalanceHistory')}>
                <CelText type="H6" color="color: rgba(61,72,83,0.7)">Total Wallet balance</CelText>
                <CelText type="H3" bold>{formatter.usd(walletSummary.total_amount_usd)}</CelText>
                <CelText color={STYLES.COLORS.RED}>{walletSummary.wallet_diff_24h}</CelText>
              </TouchableOpacity>

              <Separator vertical />

              <TouchableOpacity style={walletStyle.interest} onPress={() => actions.navigateTo('WalletInterest')}>
                <CelText type="H6" color="color: rgba(61,72,83,0.7)">Total Interest earned</CelText>
                <CelText type="H3" bold>{formatter.usd(walletSummary.total_interest_earned)}</CelText>
                <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Todays rates</CelText>
              </TouchableOpacity>
            </View>
          </Card>

          <CelText bold>Deposited coins</CelText>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }} >
            {coinWithAmount.length ? coinWithAmount.map((coin) => {
              const currency = currenciesRates.filter(c => c.short === coin.short.toUpperCase())[0]

              return <CoinCard
                key={coin.short}
                coin={coin}
                displayName={currency.displayName}
                currencyRates={currency}
                onCardPress={() => actions.navigateTo('CoinDetails', { coin: coin.short })}
                graphData={!_.isEmpty(currenciesGraphs[coin.short]) ? currenciesGraphs[coin.short] : null}
              />
            }) : null}

            {coinWithoutAmount.length ? coinWithoutAmount.map((coin) => {
              const currency = currenciesRates.filter(c => c.short === coin.short.toUpperCase())[0]

              return <CoinCard
                key={coin.short}
                coin={coin}
                displayName={currency.displayName}
                currencyRates={currency}
                onCardPress={() => actions.navigateTo('Deposit', { coin: coin.short })}
                graphData={!_.isEmpty(currenciesGraphs[coin.short]) ? currenciesGraphs[coin.short] : null}
              />
            }) : null}
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WalletLanding);
