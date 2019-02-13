import React, { Component, Fragment } from 'react';
import { View } from 'react-native';

import testUtil from "../../../utils/test-util";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon"

import STYLES from "../../../constants/STYLES";
import CoinCardStyle from './CoinCard.styles';

class CoinCard extends Component {
  static propTypes = {};
  static defaultProps = {};
  coinsWithAmount = []
  coinsWithAmount = []

  // cardNavigation = (coin) => {
  //   const { onCardPress } = this.props;
  //   const amount = coin.amount_usd > 0;

  //   if (amount) {
  //     onCardPress(coin.short)
  //     actions.navigateTo('CoinDetails', { coin: coin.short })
  //   } else {
  //     onCardPress()
  //     actions.navigateTo('Deposit')
  //   }
  // }

  
  coinCardEmpty = (coin, currencyRates) => {
    const marketValue = currencyRates.market_quotes_usd.price
    const text = `1 ${coin.short} = ${formatter.crypto(marketValue, "", { precision: 5 })}`
    
    return (
      <Fragment>
        <CelText style={{ lineHeight: 23 }} type="H5">{text}</CelText>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon fill={STYLES.COLORS.CELSIUS_BLUE} width="13" name="CirclePlus" />
          <CelText style={{ lineHeight: 23, marginLeft: 5 }} type="H6" color={STYLES.COLORS.CELSIUS_BLUE}>
            Deposit
        </CelText>
        </View>
      </Fragment>
    )
  }
  
  coinCardFull = (coin) => {
    const style = CoinCardStyle
    return (
      <Fragment>
      <CelText style={ style.lineHeight } type="H3" bold>{formatter.usd(coin.amount_usd)}</CelText>
      <CelText style={{ lineHeight: 23 }} type="H6">{formatter.crypto(coin.amount, coin.short)}</CelText>
    </Fragment>
    )
  }
  
  renderPriceChange = (currencyRates) => {
    const coinPriceChange = currencyRates.price_change_usd['1d']
    const textColor = coinPriceChange < 0 ? STYLES.COLORS.RED : STYLES.COLORS.GREEN
    const diff = coinPriceChange < 0 ? "" : "+"

    return (
      <CelText type="H7" color={textColor} >{diff} {coinPriceChange} %</CelText>
    )
  }
  
  render = () => {
    const { coin, displayName, currencyRates, onCardPress} = this.props;
    const amount = coin.amount_usd > 0;

    return (
      <Card style={{ flexDirection: 'row', flexWrap: 'wrap'}} size="half" margin="5 2 5 2" onPress={onCardPress}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <CelText style={{ lineHeight: 23 }} type="H6">{displayName}</CelText>
            {amount ? this.coinCardFull(coin) : this.coinCardEmpty(coin, currencyRates)}
          </View>
          <View style={{ position: 'absolute', right: 0 }} >
            {this.renderPriceChange(currencyRates)}
          </View>
        </View>
      </Card>
    )
  }
}

export default testUtil.hookComponent(CoinCard);
