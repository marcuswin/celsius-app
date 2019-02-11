import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";

import CoinCardStyle from "./CoinCard.styles";

@connect(
  state => ({
    style: CoinCardStyle(state.ui.theme),
    currencies: state.generalData.supportedCurrencies,
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

  renderCard = (coin) => {
    const { actions, walletSummary } = this.props;

    return (
      <Card key={coin.name} size="half" margin="5 2 5 2" onPress={() => actions.navigateTo('CoinDetails', { coin: coin.short })}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <CelText>{coin.name}</CelText>
            <CelText bold>{formatter.usd(coin.amount_usd)}</CelText>
            <CelText>{formatter.crypto(coin.amount, coin.short)}</CelText>
          </View>
          <View style={{ position: 'absolute', right: 0 }} >
            <CelText >{walletSummary.wallet_diff_24h}</CelText>
          </View>
        </View>
      </Card>
    );
  }

  render() {
    const { walletSummary } = this.props;

    return (
      <View>
        {walletSummary.coins.map(this.renderCard)}
      </View>

    )
  }
}

export default testUtil.hookComponent(CoinCard);
