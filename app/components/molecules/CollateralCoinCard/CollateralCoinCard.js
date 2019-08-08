import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import * as appActions from "../../../redux/actions";

import { getTheme } from "../../../utils/styles-util";
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";

import STYLES from "../../../constants/STYLES";
import CollateralCoinCardStyle from './CollateralCoinCard.styles';
import Separator from '../../atoms/Separator/Separator';

@connect(
  state => ({
    coins: state.compliance.loan.coins,
    currencies: state.currencies.rates,
    formData: state.forms.formData,
    marginCalls: state.loans.marginCalls
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class CollateralCoinCard extends Component {
  static propTypes = {
    coin: PropTypes.instanceOf(Object).isRequired,
    value: PropTypes.number,
    isMarginCall: PropTypes.bool,
  };
  static defaultProps = {
    isMarginCall: false

  }


  constructor(props) {
    super(props)
    this.state = {
      currency: null
    }
    const { formData, coin } = this.props
    this.name = formatter.capitalize(coin.name);
    this.crypto = formatter.crypto(coin.amount, coin.short, { precision: 2 });
    this.fiat = formatter.usd(coin.amount_usd);
    this.collateralAmount = formData.loanAmount * 2

    this.color = coin.amount_usd < this.collateralAmount ? STYLES.COLORS.RED : STYLES.COLORS.MEDIUM_GRAY;
    this.isAllowed = coin.amount_usd >= this.collateralAmount
  }

  componentDidMount() {
    const { currencies, coin } = this.props
    const currency = currencies.filter(c => c.short === coin.short.toUpperCase())[0];
    this.setState({ currency })
  }

  handleDepositCalculation = () => {
    const { formData, coin, isMarginCall, marginCalls } = this.props
    const { currency } = this.state
    let value
    if (isMarginCall && marginCalls[0].allCoins[coin.short] > coin.amount) {
      return formatter.crypto(marginCalls[0].allCoins[coin.short] - coin.amount)
    }
    if (currency) {
      value = (formData.loanAmount * 2 - coin.amount_usd) / currency.market_quotes_usd.price
    }
    const cryptoAmount = formatter.crypto(value, coin.short, { precision: 2 })
    return cryptoAmount
  }

  render = () => {
    const { actions, coin, handleSelectCoin, marginCalls, value } = this.props
    const style = CollateralCoinCardStyle();
    const theme = getTheme();
    const { currency } = this.state

    return (
      <Card
        onPress={this.isAllowed ? () => handleSelectCoin(coin.short) : null}
        color={this.isAllowed ? null : style.cardStyle.color}
      >
        <View key={coin.name} style={style.mainContainer}>
          <View style={style.iconContainer}>
            {currency && currency.image_url ? (
              <CoinIcon
                customStyles={[style.coinImage, { opacity: this.isAllowed ? 1 : 0.4 }]}
                theme={theme}
                url={currency.image_url}
                coinShort={currency.short}
              />
            ) : null
            }
          </View>
          <View style={style.textContainer}>
            <View style={{ opacity: this.isAllowed ? 1 : 0.4 }}>
              <CelText weight={"600"} align="left" type='H3' >{this.name}</CelText>
              <CelText weight={"300"} align="left" style={{ color: this.color }}>
                {this.crypto}
                <CelText weight={"300"} align="left">{' | '}
                  <CelText weight={"300"} align="left" style={{ color: this.color }}>
                    {this.fiat} USD
                  </CelText>
                </CelText>
              </CelText>
              {marginCalls && this.isAllowed &&
                <View style={style.marginRequired}>
                  <CelText align='left' weight='300' type='H7'>{formatter.crypto(value)} required to cover margin call</CelText>
                </View>}
            </View>

            {!this.isAllowed ?
              <View>
                <Separator size={2} margin={"10 0 5 0"} />
                <View>
                  <CelText weight={"300"} align="left" >
                    Additional
                  <CelText weight={"500"} align="left" >
                      {` ${this.handleDepositCalculation()} `}
                      <CelText weight={"300"} align="left" >
                        required
                    </CelText>
                    </CelText>
                  </CelText>
                  <TouchableOpacity
                    onPress={() => actions.navigateTo('Deposit', { coin: coin.short })}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                      <Icon fill={STYLES.COLORS.CELSIUS_BLUE} width="13" height="13" name="CirclePlus" />
                      <CelText margin={'0 0 0 5'} color={STYLES.COLORS.CELSIUS_BLUE}>
                        Deposit more
                    </CelText>
                    </View>
                  </TouchableOpacity>

                </View>
              </View>
              : null}
          </View>

        </View>
      </Card>

    )
  }
}

export default CollateralCoinCard
