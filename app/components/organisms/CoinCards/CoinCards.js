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
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";

class CoinCards extends Component {

  static propTypes = {
    activeView: PropTypes.string,
    walletSummary: PropTypes.instanceOf(Object),
    currenciesRates: PropTypes.instanceOf(Array),
    currenciesGraphs: PropTypes.instanceOf(Object),
    navigateTo: PropTypes.func,
    depositCompliance: PropTypes.instanceOf(Object)
  };

  constructor (props) {
    super(props)
    this.state = {
      walletCoins: []
    }
  }

  componentDidMount () {
   this.filterCoins()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.walletSummary.total_amount_usd !== this.props.walletSummary.total_amount_usd) {
      this.filterCoins()
    }
  }

  filterCoins = async () => {
    const { walletSummary, currenciesRates, currenciesGraphs, navigateTo } = this.props
    const walletCoins = []

    if (walletSummary) {
      walletSummary.coins.forEach(coin => {
        walletCoins.push(coin)
      })
    }
    walletCoins.sort((a, b) => b.amount_usd - a.amount_usd)

    if (walletCoins) {
      const coins = []
      walletCoins.forEach(coin => {
        const tempCoin = coin
        let hasAmount = false;
        if (coin.amount_usd > 0) {
          hasAmount = true
        }

        tempCoin.currency = currenciesRates.find(
            c => c.short === coin.short.toUpperCase()
        )
        tempCoin.graphData = !_.isEmpty(currenciesGraphs[coin.short])
            ? currenciesGraphs[coin.short]
            : null
        tempCoin.navigate = hasAmount ?
            () => navigateTo('CoinDetails', {coin: coin.short, title: tempCoin.currency.displayName}) :
            () => navigateTo('Deposit', {coin: coin.short})

        coins.push(coin)
      })


      await this.setState({
        walletCoins: coins
      })
    }
  }

  renderCoinCards = (c) => {
    const { activeView } = this.props
    // const { walletCoins } = this.state
    // const coinsWithAmount = _.remove(walletCoins, c => c.amount !== 0)
    // const coinsWithoutAmount = _.remove(walletCoins, c => c.amount === 0)

    const isGrid = activeView === WALLET_LANDING_VIEW_TYPES.GRID

    // Render grid item
    if (isGrid) {
      return (
          c.map( coin => (
            <CoinGridCard
                key={coin.short}
                coin={coin}
                displayName={coin.currency.displayName}
                currencyRates={coin.currency}
                onCardPress={coin.navigate}
                graphData={coin.graphData}
            />
            )
          )
      )
    }
    // Render list item
    return (
        c.map(coin => (
            <CoinListCard
                key={coin.short}
                coin={coin}
                displayName={coin.currency.displayName}
                currencyRates={coin.currency}
                onCardPress={coin.navigate}
            />
        ))
    )
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

    const { walletCoins } = this.state
    const coinsWithAmount = _.remove(walletCoins, c => c.amount !== 0)
    const coinsWithoutAmount = _.remove(walletCoins, c => c.amount === 0)

    return (
      <View>
        <ExpandableItem
            heading={'DEPOSITS'}
            margin={'10 0 10 0'}
            childrenStyle={style.coinCardContainer}
            isExpanded
        >
          { this.renderCoinCards(coinsWithAmount) }
          { this.renderAddMoreCoins() }
        </ExpandableItem>

        <ExpandableItem
            heading={'AVAILABLE COINS'}
            margin={'10 0 10 0'}
            childrenStyle={style.coinCardContainer}
        >
          { this.renderCoinCards(coinsWithoutAmount) }
        </ExpandableItem>



      </View>
    )
  }
}

export default CoinCards
