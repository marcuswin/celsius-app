import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import _ from "lodash";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelText from "../../atoms/CelText/CelText";
import CoinCard from '../../molecules/CoinCard/CoinCard';
import cryptoUtil from '../../../utils/crypto-util';
import WalletDetailsCard from '../../organisms/WalletDetailsCard/WalletDetailsCard';
import WalletLandingStyle from './WalletLanding.styles';

@connect(
  state => ({
    currenciesRates: state.currencies.rates,
    walletSummary: state.wallet.summary,
    currenciesGraphs: state.currencies.graphs,
    user: state.user.profile,
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
        title: `Welcome ${props.user.first_name}!`,
        right: "profile"
      },
      coinWithAmount: [],
      coinWithoutAmount: []
    };
  }

  componentDidMount = () => {
    const { walletSummary } = this.props;

    const coinWithAmount = [];
    const coinWithoutAmount = [];

    walletSummary.coins.forEach((coin) => {
      const withoutAmountNoPrior = coin.amount_usd === 0 && cryptoUtil.priorityCoins.indexOf(coin.short) !== -1
      if (coin.amount_usd > 0) {
        coinWithAmount.push(coin)
      } else if (withoutAmountNoPrior) {
        coinWithoutAmount.push(coin)
      }
    });

    this.setState({ coinWithAmount, coinWithoutAmount });
  }

  // shouldComponentUpdate = (nextProps) => nextProps.activeScreen === 'WalletLanding';

  renderCoinWithAmount = () => {
    const { currenciesRates, currenciesGraphs, actions } = this.props;
    const { coinWithAmount } = this.state;

    return coinWithAmount.length ? coinWithAmount.map((coin) => {
      const currency = currenciesRates.find(c => c.short === coin.short.toUpperCase())
      const graphData = !_.isEmpty(currenciesGraphs[coin.short]) ? currenciesGraphs[coin.short] : null;

      return <CoinCard
        key={coin.short}
        coin={coin}
        displayName={currency.displayName}
        currencyRates={currency}
        onCardPress={() => actions.navigateTo('CoinDetails', { coin: coin.short })}
        graphData={graphData}
      />
    }) : null;
  }

  renderCoinWithoutAmount = () => {
    const { currenciesRates, currenciesGraphs, actions } = this.props;
    const { coinWithoutAmount } = this.state;

    return coinWithoutAmount.length ? coinWithoutAmount.map((coin) => {
      const currency = currenciesRates.find(c => c.short === coin.short.toUpperCase())
      const graphData = !_.isEmpty(currenciesGraphs[coin.short]) ? currenciesGraphs[coin.short] : null;

      return <CoinCard
        key={coin.short}
        coin={coin}
        displayName={currency.displayName}
        currencyRates={currency}
        onCardPress={() => actions.navigateTo('Deposit', { coin: coin.short })}
        graphData={graphData}
      />
    }) : null;
  }

  render() {
    const { header } = this.state
    const { actions, walletSummary } = this.props;
    const CoinWithAmount = this.renderCoinWithAmount;
    const CoinWithoutAmount = this.renderCoinWithoutAmount;
    const style = WalletLandingStyle();

    return (
      <RegularLayout header={header}>
        <View>
          <WalletDetailsCard walletSummary={walletSummary} navigateTo={actions.navigateTo} />

          <CelText weight='500'>Deposited coins</CelText>

          <View style={style.coinCardContainer}>
            <CoinWithAmount />
            <CoinWithoutAmount />
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WalletLanding);
