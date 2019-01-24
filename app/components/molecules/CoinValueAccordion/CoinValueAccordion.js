import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import Accordion from "../Accordion/Accordion";
import formatter from "../../../utils/formatter";
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

@connect(
  state => ({
    eligibleCoins: state.users.compliance.app.coins
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CoinValueAccordion extends Component {
  static propTypes = {
    estimatedCoinValue: PropTypes.number,
    portfolio: PropTypes.instanceOf(Array),
  }

  constructor(props) {
    super(props);

    this.state = {};
    // binders
    this.renderCoinValueText = this.renderCoinValueText.bind(this);
  }

  // rendering methods
  renderCoinValueText(styles) {
    const { portfolio, eligibleCoins } = this.props;
    const btcAndEth = portfolio.filter(p => eligibleCoins.indexOf(p.currency.short) !== -1);

    let coinValueText = '';
    if (btcAndEth.length) {
      const loanDeposits = btcAndEth.map((c, i) => (
        <Text style={styles} key={c.currency.short}>
          {i !== 0 ? ' and ' : ''}
          <Text style={[styles, globalStyles.boldText]}>{formatter.crypto(c.amount, c.currency.short)} </Text>
          at a rate of
          <Text style={[styles, globalStyles.boldText]}> {formatter.usd(c.currency.market.quotes.USD.price)}</Text>
        </Text>
      ));

      coinValueText = (
        <Text style={styles}>
          Your total coin value is calculated based on {loanDeposits} according to the latest rates on
          <Text style={[styles, { color: '#88A2C7' }]} onPress={() => Linking.openURL('https://coinmarketcap.com/')}> coinmarketcap.com</Text>
        </Text>
      )
    } else {
      coinValueText = (
        <Text style={styles}>
          You don't have any BTC or ETH eligible for a loan.
        </Text>
      )
    }

    return coinValueText;
  }

  render() {
    const { estimatedCoinValue } = this.props;
    const letterSize = Math.round(estimatedCoinValue).toString().length >= 10 ?
      FONT_SCALE * 26 : FONT_SCALE * 36;

    return (
      <Accordion
        name="coinValue"
        renderHeader={(styles) =>
          <Text style={styles}>
            <Text style={[styles, { fontSize: letterSize }]}>${formatter.usd(estimatedCoinValue, { symbol: '' })}</Text>

          </Text>
        }
        renderContent={this.renderCoinValueText}
      />
    );
  }
}

export default CoinValueAccordion;
