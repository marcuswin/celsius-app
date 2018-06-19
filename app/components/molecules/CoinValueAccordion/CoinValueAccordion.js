import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Linking, Text} from 'react-native';

import Accordion from "../Accordion/Accordion";
import formatter from "../../../utils/formatter";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";
import {ELIGIBLE_COINS} from "../../../config/constants/common";

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
    const { portfolio } = this.props;
    const btcAndEth = portfolio.filter(p => ELIGIBLE_COINS.indexOf(p.currency.short) !== -1);

    let coinValueText = '';
    if (btcAndEth.length) {
      const loanDeposits = btcAndEth.map((c, i) => (
        <Text style={styles} key={c.currency.short}>
          { i !== 0 ? ' and ' : ''}
          <Text style={[styles, globalStyles.boldText]}>{formatter.crypto(c.amount, c.currency.short)} </Text>
          at a rate of
          <Text style={[styles, globalStyles.boldText]}> {formatter.usd(c.currency.market.quotes.USD.price)}</Text>
        </Text>
      ));

      coinValueText = (
        <Text style={styles}>
          Your total coin value is calculated based on { loanDeposits } according to the latest rates on
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
    return (
      <Accordion
        renderHeader={ (styles) =>
          <Text style={styles}>
            <Text style={[styles, { opacity: 0.5 }]}>$</Text>
            {formatter.usd(estimatedCoinValue, {symbol: ''})}
          </Text>
        }
        renderContent={ this.renderCoinValueText }
      />
    );
  }
}

export default CoinValueAccordion;
