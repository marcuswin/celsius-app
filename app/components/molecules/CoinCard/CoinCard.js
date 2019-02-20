import React, { Component, Fragment } from 'react';
import { View } from 'react-native';

import testUtil from "../../../utils/test-util";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";
import Graph from "../../atoms/Graph/Graph";

import STYLES from "../../../constants/STYLES";
import CoinCardStyle from './CoinCard.styles';
import { heightPercentageToDP, widthPercentageToDP } from '../../../utils/styles-util';

class CoinCard extends Component {
  static propTypes = {};
  static defaultProps = {};

  coinCardEmpty = (coin, currencyRates) => {
    const marketValue = currencyRates.market_quotes_usd.price
    const text = `1 ${coin.short} = ${formatter.crypto(marketValue, "", { precision: 5 })}`
    
    return (
      <Fragment>
        <CelText style={{ lineHeight: 23 }} type="H5">{text}</CelText>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon fill={STYLES.COLORS.CELSIUS_BLUE} width="13" height="13" name="CirclePlus"/>
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
    const { coin, displayName, currencyRates, onCardPress, graphData} = this.props;
    const amount = coin.amount_usd > 0;
    let dateArray;
    let priceArray;

    const coinPriceChange = currencyRates.price_change_usd['1d']
    if (graphData) {
      dateArray = graphData["1d"].map(data => data[0]);
      priceArray = graphData["1d"].map(data => data[1]);

    }

      //  if (currencyGraphs[coin.short]["1y"].length > 20) .filter((e, z) => z % 8 === 0)

    const padding = graphData ? '20 0 0 0' : '20 0 20 0';

    // Todo(ns): adjust graph size according to Card size prop

    return (
      <Card style={{ flexDirection: 'row', flexWrap: 'wrap'}} size="half" margin="5 5 5 5" padding={padding} onPress={onCardPress}>
        <View style={{ flexDirection: "row", paddingHorizontal: 12 }}>
          <View>
            <CelText style={{ lineHeight: 23 }} type="H6">{displayName}</CelText>
            {amount ? this.coinCardFull(coin) : this.coinCardEmpty(coin, currencyRates)}
          </View>
          <View style={{ position: 'absolute', right: 12 }} >
            {this.renderPriceChange(currencyRates)}
          </View>
        </View>
        {graphData ? 
          <View style={{ alignItems: "center" }}>
            <Graph key={coin.short} dateArray={dateArray} priceArray={priceArray}
                   rate={coinPriceChange}
                   height={heightPercentageToDP("10%")}
                   width={widthPercentageToDP("42%")}
            />
          </View>
        : null}
      </Card>
    )
  }
}

export default testUtil.hookComponent(CoinCard);
