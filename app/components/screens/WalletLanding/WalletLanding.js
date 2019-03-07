import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
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
import CoinListCard from '../../molecules/CoinListCard/CoinListCard';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

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

    const { walletSummary } = props;
    const coinWithAmount = [];
    const coinWithoutAmount = [];
    if (walletSummary) {
      walletSummary.coins.forEach((coin) => {
        const withoutAmountNoPrior = coin.amount_usd === 0 && cryptoUtil.priorityCoins.indexOf(coin.short) !== -1
        if (coin.amount_usd > 0) {
          coinWithAmount.push(coin)
        } else if (withoutAmountNoPrior) {
          coinWithoutAmount.push(coin)
        }
      });
    }
    
    this.state = {
      header: {
        title: `Welcome ${props.user.first_name}!`,
        right: "profile"
      },
      coinWithAmount,
      coinWithoutAmount,
      activeView: 'Grid'
    };
  }

  componentDidMount = async () => {
    const { actions, currenciesRates, currenciesGraphs } = this.props;

    const coinWithAmount = [];
    const coinWithoutAmount = [];

    await actions.getWalletSummary()
    if (!currenciesRates) actions.getCurrencyRates()
    if (!currenciesGraphs) actions.getCurrencyGraphs()
    const { walletSummary } = this.props;

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

  setGridView = () => {
    const selectedView = 'Grid';
    const { activeView } = this.state;
    if (activeView !== selectedView) this.setState({ activeView: selectedView })
  }

  setListView = () => {
    const selectedView = 'List';
    const { activeView } = this.state;
    if (activeView !== selectedView) this.setState({ activeView: selectedView })
  }

  renderCoinWithAmount = () => {
    const { currenciesRates, currenciesGraphs, actions } = this.props;
    const { coinWithAmount, activeView } = this.state;

    if (activeView === 'Grid') {
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

    if (activeView === 'List') {
      return coinWithAmount.length ? coinWithAmount.map((coin) => {
        const currency = currenciesRates.find(c => c.short === coin.short.toUpperCase())
        const graphData = !_.isEmpty(currenciesGraphs[coin.short]) ? currenciesGraphs[coin.short] : null;

        return <CoinListCard
          key={coin.short}
          coin={coin}
          displayName={currency.displayName}
          currencyRates={currency}
          onCardPress={() => actions.navigateTo('CoinDetails', { coin: coin.short })}
          graphData={graphData}
        />
      }) : null;
    }

    return null;
  }

  renderCoinWithoutAmount = () => {
    const { currenciesRates, currenciesGraphs, actions } = this.props;
    const { coinWithoutAmount, activeView } = this.state;

    if (activeView === 'Grid') {
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

    if (activeView === 'List') {
      return coinWithoutAmount.length ? coinWithoutAmount.map((coin) => {
        const currency = currenciesRates.find(c => c.short === coin.short.toUpperCase())
        const graphData = !_.isEmpty(currenciesGraphs[coin.short]) ? currenciesGraphs[coin.short] : null;

        return <CoinListCard
          key={coin.short}
          coin={coin}
          displayName={currency.displayName}
          currencyRates={currency}
          onCardPress={() => actions.navigateTo('Deposit', { coin: coin.short })}
          graphData={graphData}
        />
      }) : null;
    }

    return null;

  }

  renderCoinsCard = () => {
    const CoinWithAmount = this.renderCoinWithAmount;
    const CoinWithoutAmount = this.renderCoinWithoutAmount;
    const style = WalletLandingStyle();
    return (
      <View style={style.coinCardContainer}>
        <CoinWithAmount />
        <CoinWithoutAmount />
      </View>
    )
  }

  render() {
    const { header } = this.state
    const { actions, walletSummary, currenciesRates, currenciesGraphs, user } = this.props;

    if (!walletSummary || !currenciesRates || !currenciesGraphs || !user) return <LoadingScreen />;

    const CoinsCard = this.renderCoinsCard;
    return (
      <RegularLayout header={header}>
        <View>
          <WalletDetailsCard walletSummary={walletSummary} navigateTo={actions.navigateTo} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CelText weight='500'>Deposited coins</CelText>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={this.setGridView}><CelText margin="0 12 0 0">Grid</CelText></TouchableOpacity>
              <TouchableOpacity onPress={this.setListView}><CelText>List</CelText></TouchableOpacity>
            </View>
          </View>

          <CoinsCard />

        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WalletLanding);
