import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import WalletLandingStyle from "./WalletLanding.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    style: WalletLandingStyle(state.ui.theme),
    currencies: state.generalData.supportedCurrencies,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Settings extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Welcome Andrew!",
        // right: "profile"
      }
    };
  }

  render() {
    const { header } = this.state
    const { actions } = this.props

    return (
      <RegularLayout
        header={header}
      >
        <View>

          <Card>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => actions.navigateTo('BalanceHistory')}>
                <CelText>Total Wallet balance</CelText>
                <CelText bold>{formatter.usd(47013.14)}</CelText>
                <CelText color={STYLES.COLORS.RED}>- 1.2%</CelText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => actions.navigateTo('WalletInterest')}>
                <CelText>Total Interest earned</CelText>
                <CelText bold>{formatter.usd(213.14)}</CelText>
                <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Todays rates</CelText>
              </TouchableOpacity>
            </View>
          </Card>

          <CelText bold>Deposited coins</CelText>

          <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
            <Card size="half" margin="5 5 5 5" onPress={() => actions.navigateTo('CoinDetails', { coin: 'BTC' })}>
              <CelText>Bitcoin</CelText>
              <CelText bold>{formatter.usd(12313.14)}</CelText>
              <CelText>{formatter.crypto(13.45, 'BTC')}</CelText>
            </Card>
            <Card size="half" margin="5 5 5 5" onPress={() => actions.navigateTo('CoinDetails', { coin: 'ETH' })}>
              <CelText>Ethereum</CelText>
              <CelText bold>{formatter.usd(12313.14)}</CelText>
              <CelText>{formatter.crypto(13.45, 'ETH')}</CelText>
            </Card>
            <Card size="half" margin="5 5 5 5" onPress={() => actions.navigateTo('CoinDetails', { coin: 'XRP' })}>
              <CelText>Ripple</CelText>
              <CelText bold>{formatter.usd(12313.14)}</CelText>
              <CelText>{formatter.crypto(13.45, 'XRP')}</CelText>
            </Card>
            <Card size="half" margin="5 5 5 5" onPress={() => actions.navigateTo('CoinDetails', { coin: 'LTC' })}>
              <CelText>Litecoin</CelText>
              <CelText bold>{formatter.usd(12313.14)}</CelText>
              <CelText>{formatter.crypto(13.45, 'LTC')}</CelText>
            </Card>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Settings);
