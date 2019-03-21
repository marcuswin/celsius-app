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
import Icon from '../../atoms/Icon/Icon';
import STYLES from '../../../constants/STYLES';
import CelPayReceivedModal from "../../organisms/CelPayReceivedModal/CelPayReceivedModal";

@connect(
  state => {
    const branchTransfer = state.branch.transferHash && state.transfers.transfers[state.branch.transferHash]
      ? state.transfers.transfers[state.branch.transferHash]
      : null

    return {
      branchTransfer,
      currenciesRates: state.currencies.rates,
      walletSummary: state.wallet.summary,
      currenciesGraphs: state.currencies.graphs,
      user: state.user.profile,
    }
  },
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletLanding extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params && params.title ? params.title : 'Welcome',
      right: 'profile'
    }
  };

  constructor(props) {
    super(props);

    const { walletSummary, navigation } = props;
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

    navigation.setParams({
      title: `Welcome ${props.user.first_name}!`
    })

    this.state = {
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

  getIconFillColor = (cond) => cond ? STYLES.COLORS.DARK_GRAY : STYLES.COLORS.DARK_GRAY_OPACITY;

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
          onCardPress={() => actions.navigateTo('CoinDetails', { coin: coin.short, title: currency.displayName })}
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
          onCardPress={() => actions.navigateTo('CoinDetails', { coin: coin.short, title: currency.displayName })}
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

  renderAddMoreCoins = () => {
    const { actions } = this.props;
    const { activeView } = this.state
    const style = WalletLandingStyle();

    if (activeView === "Grid") {
      return (
        <TouchableOpacity style={[style.addMoreCoinsGrid]} onPress={() => actions.navigateTo('Deposit')}>
          <Icon fill={'gray'} width="17" height="17" name="CirclePlus"/>
          <CelText type="H5" margin='5 0 0 0'>Deposit coins</CelText>
        </TouchableOpacity>
      )
    }

    if (activeView === "List") {
      return (
        <TouchableOpacity style={[style.addMoreCoinsList]} onPress={() => actions.navigateTo('Deposit')}>
          <Icon fill={'gray'} width="17" height="17" name="CirclePlus" paddingTo='10' />
          <CelText type="H5" margin='0 0 0 5'>Deposit coins</CelText>
        </TouchableOpacity>
      )
    }
  }


  renderCoinsCard = () => {
    const CoinWithAmount = this.renderCoinWithAmount;
    const CoinWithoutAmount = this.renderCoinWithoutAmount;
    const AddMoreCoins = this.renderAddMoreCoins;
    const style = WalletLandingStyle();
    return (
      <View style={style.coinCardContainer}>
        <CoinWithAmount />
        <CoinWithoutAmount />
        <AddMoreCoins />
      </View>
    )
  }

  render() {
    const { activeView } = this.state
    const { actions, walletSummary, currenciesRates, currenciesGraphs, user, branchTransfer } = this.props;
    // const style = WalletLandingStyle();

    if (!walletSummary || !currenciesRates || !currenciesGraphs || !user) return <LoadingScreen />;

    const CoinsCard = this.renderCoinsCard;
    return (
      <RegularLayout>
        <View>
          <WalletDetailsCard walletSummary={walletSummary} navigateTo={actions.navigateTo} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CelText style={{ alignSelf: 'center' }} weight='500'>Deposited coins</CelText>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={this.setGridView} >
                <Icon fill={this.getIconFillColor(activeView === "Grid")} name="GridView" width="18" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 16 }} onPress={this.setListView}>
                <Icon fill={this.getIconFillColor(activeView === "List")} name="ListView" width="18" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <CoinsCard />
          </View>
        </View>
        <CelPayReceivedModal
          navigateTo={actions.navigateTo}
          closeModal={actions.closeModal}
          transfer={branchTransfer}
        />
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WalletLanding);
