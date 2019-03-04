import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

import testUtil from "../../../utils/test-util";

import CoinListCardStyle from "./CoinListCard.styles";
import CelText from '../../atoms/CelText/CelText';
import Icon from '../../atoms/Icon/Icon';
import STYLES from '../../../constants/STYLES';
import formatter from '../../../utils/formatter';
import Card from '../../atoms/Card/Card';

class CoinListCard extends Component {

  static propTypes = {
    coin: PropTypes.instanceOf(Object).isRequired,
    displayName: PropTypes.string.isRequired,
    currencyRates: PropTypes.instanceOf(Object).isRequired,
    onCardPress: PropTypes.func
  };

  coinCardEmpty = (coin, currencyRates) => {
    const marketValue = currencyRates.market_quotes_usd.price
    const text = `1 ${coin.short} = ${formatter.crypto(marketValue, "", { precision: 5 })}`

    return (
      <Fragment>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon fill={STYLES.COLORS.CELSIUS_BLUE} width="13" height="13" name="CirclePlus" />
          <CelText weight='400' style={{ lineHeight: 23, marginLeft: 5 }} type="H5" color={STYLES.COLORS.CELSIUS_BLUE}>
            Deposit
        </CelText>
        </View>
        <CelText style={{ lineHeight: 23 }} type="H5">{text}</CelText>
      </Fragment>
    )
  }

  coinCardFull = (coin) => (
    <Fragment>
      <CelText weight='600' type="H3" bold>{formatter.usd(coin.amount_usd)}</CelText>
      <CelText weight='300' style={{ lineHeight: 23 }} type="H6">{formatter.crypto(coin.amount, coin.short)}</CelText>
    </Fragment>
  )
  
  renderPriceChange = (currencyRates) => {
    const coinPriceChange = currencyRates.price_change_usd['1d']
    const textColor = coinPriceChange < 0 ? STYLES.COLORS.RED : STYLES.COLORS.GREEN
    const diff = coinPriceChange < 0 ? "" : "+"

    return (
      <CelText weight='500' type="H7" color={textColor} >{diff} {coinPriceChange} %</CelText>
    )
  }

  render() {
    const { coin, displayName, currencyRates, onCardPress } = this.props;
    const amount = coin.amount_usd > 0;
    const style = CoinListCardStyle();

    const padding = '20 0 20 0';
    return (
      <Card margin="5 5 5 5" padding={padding} onPress={onCardPress}>
        <View style={{ flexDirection: "row", paddingHorizontal: 12 }}>
          <Image source={{ uri: currencyRates.image_url }} style={style.coinImage} />
          {/* <Icon name={`Icon${coin.short}`} style={{ marginRight: 12 }} /> */}
          <View>
            <CelText style={{ lineHeight: 23 }} type="H6">{displayName}</CelText>
            {amount ? this.coinCardFull(coin) : this.coinCardEmpty(coin, currencyRates)}
          </View>
          <View style={{ position: 'absolute', right: 12, alignSelf: 'center' }} >
            {this.renderPriceChange(currencyRates)}
          </View>
        </View>
      </Card >
    )
  }
}

export default testUtil.hookComponent(CoinListCard);
