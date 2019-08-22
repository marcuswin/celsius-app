import React, { Component } from 'react';
import { TouchableOpacity, View } from "react-native";
import PropTypes from 'prop-types';
import _ from 'lodash'

import CoinCardsStyle from "./CoinCards.styles";
import CelText from '../../atoms/CelText/CelText';
import { WALLET_LANDING_VIEW_TYPES } from "../../../constants/UI";
import CoinGridCard from "../../molecules/CoinGridCard/CoinGridCard";
import CoinListCard from "../../molecules/CoinListCard/CoinListCard";
import Icon from "../../atoms/Icon/Icon";

class CoinCards extends Component {

  static propTypes = {
    activeView: PropTypes.string,
    walletSummary: PropTypes.instanceOf(Object),
    currenciesRates: PropTypes.instanceOf(Array),
    currenciesGraphs: PropTypes.instanceOf(Object),
    navigateTo: PropTypes.func,
    depositCompliance: PropTypes.instanceOf(Object)
  };

  renderCoinCards = () => {
    const { walletSummary, currenciesRates, currenciesGraphs, navigateTo, activeView, } = this.props
    const walletCoins = []

    if (walletSummary) {
      walletSummary.coins.forEach(coin => {
        walletCoins.push(coin)
      })
    }

    walletCoins.sort((a, b) => a.amount_usd < b.amount_usd)

    const isGrid = activeView === WALLET_LANDING_VIEW_TYPES.GRID

    return walletCoins.length
      ? walletCoins.map(coin => {
        let hasAmount = false;
        if (coin.amount_usd > 0) {
          hasAmount = true
        }
        const currency = currenciesRates.find(
          c => c.short === coin.short.toUpperCase()
        )
        const graphData = !_.isEmpty(currenciesGraphs[coin.short])
          ? currenciesGraphs[coin.short]
          : null
        const navigate = hasAmount ?
          () => navigateTo('CoinDetails', { coin: coin.short, title: currency.displayName }) :
          () => navigateTo('Deposit', { coin: coin.short })
        // Render grid item
        if (isGrid) {
          return (
            <CoinGridCard
              key={coin.short}
              coin={coin}
              displayName={currency.displayName}
              currencyRates={currency}
              onCardPress={navigate}
              graphData={graphData}
            />
          )
        }
        // Render list item
        return (
          <CoinListCard
            key={coin.short}
            coin={coin}
            displayName={currency.displayName}
            currencyRates={currency}
            onCardPress={navigate}
          />
        )
      })
      : null
  }

  renderAddMoreCoins = () => {
    const { navigateTo, activeView } = this.props
    const style = CoinCardsStyle()

    const isGrid = activeView === WALLET_LANDING_VIEW_TYPES.GRID
    const gridStyle = isGrid ? style.addMoreCoinsGrid : style.addMoreCoinsList

    return (
      <TouchableOpacity
        style={gridStyle}
        onPress={() =>
          navigateTo('Deposit')
        }
      >
        <Icon fill={'gray'} width='17' height='17' name='CirclePlus' />
        <CelText type='H5' margin={isGrid ? '5 0 0 0' : '0 0 0 5'}>
          Deposit coins
        </CelText>
      </TouchableOpacity>
    )
  }

  render() {
    const style = CoinCardsStyle();

    return (
      <View style={style.coinCardContainer}>
        { this.renderCoinCards() }
        { this.renderAddMoreCoins() }
      </View>
    )
  }
}

export default CoinCards
