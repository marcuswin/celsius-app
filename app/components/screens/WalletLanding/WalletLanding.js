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
    walletSummary: state.wallet.summary,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletLanding extends Component {

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

  renderCard = (coin) => {
    const { actions } = this.props;
    // TODO(nk): create molecule component
    return (
      <Card key={coin.name} size="half" margin="5 5 5 5" onPress={() => actions.navigateTo('CoinDetails', { coin: coin.short })}>
        <CelText>{coin.name}</CelText>
        <CelText bold>{formatter.usd(coin.amount_usd)}</CelText>
        <CelText>{formatter.crypto(coin.amount, coin.short)}</CelText>
      </Card>
    )
  }

  render() {
    const { header } = this.state
    const { actions, walletSummary } = this.props


    return (
      <RegularLayout
        header={header}
      >
        <View>

          <Card>
            <View style={{ flexDirection: "row", }}>
              <TouchableOpacity onPress={() => actions.navigateTo('BalanceHistory')}>
                <CelText>Total Wallet balance</CelText>
                <CelText bold>{formatter.usd(walletSummary.total_amount_usd)}</CelText>
                <CelText color={STYLES.COLORS.RED}>{walletSummary.wallet_diff_24h}</CelText>
              </TouchableOpacity>
              <View style={{
                borderLeftWidth: 1,
                borderLeftColor: 'gray',
                borderRadius: 10,
              }} />
              <TouchableOpacity onPress={() => actions.navigateTo('WalletInterest')}>
                <CelText>Total Interest earned</CelText>
                <CelText bold>{formatter.usd(walletSummary.total_interest_earned)}</CelText>
                <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Todays rates</CelText>
              </TouchableOpacity>
            </View>
          </Card>

          <CelText bold>Deposited coins</CelText>

          <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}>
            {walletSummary.coins.map(this.renderCard)}
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WalletLanding);
