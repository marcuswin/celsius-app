import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import Loader from "../../atoms/Loader/Loader";
import SelectCoinStyle from "./SelectCoin.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import formatter from "../../../utils/formatter";
import testUtil from "../../../utils/test-util";
import { KYC_STATUSES } from "../../../config/constants/common";
import EmptyState from "../../atoms/EmptyState/EmptyState";

@connect(
  state => ({
    // map state to props
    walletCurrencies: state.wallet.currencies,
    user: state.users.user,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class SelectCoin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
      animatedHeading: {
        text: 'CelPay'
      },
    };
  }

  // lifecycle methods
  // event hanlders
  onSelectCoin = (coin) => {
    const { actions } = this.props;

    actions.initForm({
      currency: coin.short.toLowerCase(),
    });
    actions.navigateTo('AmountInput', { purpose: 'send' });
  }

  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // rendering methods
  renderCoin = (walletCurrency) => {
    const { currency } = walletCurrency;

    const wrapperStyle = Number(walletCurrency.total.toFixed(2)) ? SelectCoinStyle.coinWrapper : [SelectCoinStyle.coinWrapper, { opacity: 0.2 }];
    return (
      <View key={currency.id} style={wrapperStyle}>
        <TouchableOpacity ref={testUtil.generateTestHook(this, `SelectCoin.${currency.short}`)} key={currency.id} style={SelectCoinStyle.button} onPress={() => this.onSelectCoin(currency)}>
          <Image key={currency.id} source={{ uri: currency.image_url }} style={SelectCoinStyle.coin}/>
        </TouchableOpacity>
        <Text style={SelectCoinStyle.coinName}>{this.capitalize(currency.name)}</Text>
        <Text style={SelectCoinStyle.amountTextUSD}>{ formatter.crypto(walletCurrency.amount, currency.short, { precision: 5 }) }</Text>
        <Text style={SelectCoinStyle.amountText}>{ formatter.usd(walletCurrency.total) }</Text>
      </View>
    )
  }

  render() {
    const {animatedHeading} = this.state;
    const {walletCurrencies, user} = this.props;

    if (!user.kyc || (user.kyc && user.kyc.status !== KYC_STATUSES.passed)) {
      return (
        <EmptyState/>
      )
    }

    if (!walletCurrencies) {
      return (
        <SimpleLayout
          mainHeader={{ backButton: false }}
          animatedHeading={animatedHeading}
        >
          <Loader />
        </SimpleLayout>
      )
    }

    return (
      <SimpleLayout
        mainHeader={{ backButton: false }}
        animatedHeading={animatedHeading}
      >
        <Text style={SelectCoinStyle.text}>
          Select a coin to send to your friends.
        </Text>
        <View style={SelectCoinStyle.coinContent}>
          {walletCurrencies.map(this.renderCoin)}
        </View>
      </SimpleLayout>

    );
  }
}

export default testUtil.hookComponent(SelectCoin);

