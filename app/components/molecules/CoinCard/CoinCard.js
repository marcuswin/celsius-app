import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon"

import STYLES from "../../../constants/STYLES";


@connect(
  state => ({
    currencies: state.currencies.rates,
    walletSummary: state.wallet.summary,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CoinCard extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  emptyCard = (coin) => {
    const { currencies } = this.props
    const marketValue = currencies.filter(c => c.short === coin.short.toUpperCase())[0].market_quotes_usd.price
    const text = `1 ${coin.short} = ${formatter.crypto(marketValue, "", { precision: 5 })}`

    return (
      <Fragment>
        <CelText style={{ lineHeight: 23 }} type="H5">{text}</CelText>
        <View style={{flexDirection:"row", alignItems: "center"}}>
          <Icon fill={STYLES.COLORS.CELSIUS_BLUE} width="13" name="CirclePlus" />
          <CelText style={{ lineHeight: 23, marginLeft: 5 }} type="H6" color={STYLES.COLORS.CELSIUS_BLUE}>
            Deposit </CelText>
        </View>
      </Fragment>
    )
  }

  cardNavigation = (coin) => {
    const { actions } = this.props;
    const amount = coin.amount_usd > 0;

    if (amount) {
      actions.navigateTo('CoinDetails', { coin: coin.short })
    } else {
      actions.navigateTo('Deposit')
    }
  }

  renderAmount = (coin) => (
    <Fragment>
      <CelText style={{ lineHeight: 23 }} type="H3" bold>{formatter.usd(coin.amount_usd)}</CelText>
      <CelText style={{ lineHeight: 23 }} type="H6">{formatter.crypto(coin.amount, coin.short)}</CelText>
    </Fragment>
  )

  renderPriceChange = (coin) => {
    const { currencies } = this.props
    const coinPriceChange = currencies.filter(c => c.short === coin.short.toUpperCase())[0].price_change_usd['1d']
    const textColor = coinPriceChange < 0 ? STYLES.COLORS.RED : STYLES.COLORS.GREEN
    const diff = coinPriceChange < 0 ? "" : "+"

    return (
      <CelText type="H7" color={textColor} >{diff} {coinPriceChange} %</CelText>
    )
  }

  renderCard = (coin) => {
    const { currencies } = this.props
    const currency = currencies.filter(c => c.short === coin.short.toUpperCase())[0]
    const amount = coin.amount_usd > 0;

    return (
      <Card key={coin.name} size="half" margin="5 2 5 2" onPress={() => this.cardNavigation(coin)}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <CelText style={{ lineHeight: 23 }} type="H6">{currency.displayName}</CelText>
            {amount ? this.renderAmount(coin) : this.emptyCard(coin)}
          </View>
          <View style={{ position: 'absolute', right: 0 }} >
            {this.renderPriceChange(coin)}
          </View>
        </View>
      </Card>
    );
  }

  render() {
    const { walletSummary } = this.props;

    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        {walletSummary.coins.map(this.renderCard)}
      </View>

    )
  }
}

export default testUtil.hookComponent(CoinCard);
