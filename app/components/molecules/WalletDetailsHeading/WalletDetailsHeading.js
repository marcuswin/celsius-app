import React, { Component } from "react";
import { View, Text } from "native-base";
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Proptypes from 'prop-types';
import get from 'lodash/get';
import testUtil from "../../../utils/test-util";

import CelButton from "../../atoms/CelButton/CelButton";
import formatter from "../../../utils/formatter"

import * as appActions from "../../../redux/actions";
import WalletDetailsHeadingStyle from "./WalletDetailsHeading.styles";
import Icon from "../../atoms/Icon/Icon";
import { FONT_SCALE } from "../../../config/constants/style";

@connect(
  state => ({
    nav: state.nav,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    appSettings: state.users.appSettings,
    wallet: state.wallet,
    walletTotal: state.wallet.total,
    walletCurrencies: state.wallet.currencies,
    coinOrder: state.wallet.coinOrder,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)


class WalletDetailsHeading extends Component {
  static propTypes = {
    type: Proptypes.oneOf(['single-coin']),
  }

  static defaultProps = {
    type: 'single-coin'
  }

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     isPressed: false,
  //   };
  // }
  //
  // componentDidMount() {
  //     this.setState({
  //       isPressed: false,
  //     })
  // }

  // componentWillReceiveProps(nextProps) {
  //   const {activeScreen} = this.props;
  //
  //   if ((activeScreen !== nextProps.activeScreen && nextProps.activeScreen === "WalletDetails")) {
  //     this.componentDidMount();
  //   }
  // }

  onPressNavigation = (type) => {
    const { coinOrder } = this.props;
    const screens = coinOrder;

    const { currency, actions } = this.props;
    const screenIndex = screens.indexOf(currency.toUpperCase());

    const types = {
      next: screenIndex + 1,
      previous: screenIndex - 1,
    }

    if (screenIndex === screens.length - 1 && type === 'next') {
      return actions.navigateTo('WalletDetails', {currency: screens[0]})
    }

    if (screenIndex === 0 && type === 'previous') {
      return actions.navigateTo('WalletDetails', {currency: screens[screens.length - 1]})
    }

    return actions.navigateTo('WalletDetails', {currency: screens[types[type]]})
  }

  goToAddFunds = () => {
    const { appSettings, actions, currency } = this.props;
    if (appSettings.showSecureTransactionsScreen) {
      actions.navigateTo('SecureTransactions', { currency: currency.toLowerCase() })
    } else {
      actions.navigateTo('AddFunds', { currency: currency.toLowerCase() })
    }
  };

  // goToSend = () => {
  //   const { actions, currency } = this.props;
  //   actions.initForm({
  //     currency: currency.toLowerCase(),
  //   });
  //   actions.navigateTo('AmountInput', { purpose: 'send' });
  //   this.state.isPressed = true;
  // };

  render() {
    const { currency, type, walletTotal, walletCurrencies } = this.props;
    // const { isPressed } = this.state;
    const total = get(walletTotal, 'quotes.USD.total', 0)
    const walletDataCurrency = (walletCurrencies != null && currency !== 'total') && walletCurrencies.find(w => w.currency.short.toLowerCase() === currency);
    const fiatTotalSize = total.toString().length >= 10 ? FONT_SCALE * 31 : FONT_SCALE * 40;

    const totalText = type === 'total' ? formatter.usd(total) : formatter.usd(walletDataCurrency.total);

    return <View style={WalletDetailsHeadingStyle.root}>
      <View style={{position: "relative", width: '100%'}}>
        <Text style={[WalletDetailsHeadingStyle.totalValueAmount, {fontSize: fiatTotalSize}]}>{formatter.usd(totalText)}</Text>
        <View style={WalletDetailsHeadingStyle.totalCoinAmountWrapper}>
          {type === 'single-coin' && <Icon name={`Icon${walletDataCurrency.currency.short}`} height='25' width='25' fill="white" style={{ opacity: .6 }} />}
          <Text style={WalletDetailsHeadingStyle.totalCoinAmount}>
            {type === 'single-coin'
              ? formatter.crypto(walletDataCurrency.amount, currency.toUpperCase(), { precision: 5 })
              : 'TOTAL AMOUNT'
            }
          </Text>
        </View>
        <TouchableOpacity style={{ position: 'absolute', top: 0, bottom: 0, left: 15, opacity: .4, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.onPressNavigation('previous')}>
          <Icon name="IconChevronLeft" height='20' width='20' fill="white" viewBox="0 0 22 22" />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', top: 0, bottom: 0, right: 15, opacity: .4, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.onPressNavigation('next')}>
          <Icon name="IconChevronRight" height='20' width='20' fill="white" viewBox="0 0 22 22" />
        </TouchableOpacity>
      </View>
      {type === 'single-coin' && <View style={WalletDetailsHeadingStyle.buttonWrapper}>
        <CelButton ref={testUtil.generateTestHook(this, `WalletDetailsHeading.add`)} width={110} size="mini" white onPress={this.goToAddFunds}>Add {currency.toUpperCase()}</CelButton>
      </View>}
    </View>
  }
}

export default testUtil.hookComponent(WalletDetailsHeading);

