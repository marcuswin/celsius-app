import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import WithdrawConfirmStyle from "./WithdrawConfirm.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";
import Separator from "../../atoms/Separator/Separator";
import formatter from "../../../utils/formatter";
import STYLES from "../../../constants/STYLES";


@connect(
  state => ({
    currencies: state.generalData.supportedCurrencies,
    walletSummary: state.wallet.summary,
    currenciesRates: state.currencies.rates,
    coin: state.wallet.currencies

  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WithdrawConfirm extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Withdraw Confirm",
        left: "back",
      }
    };
  }


  render() {
    const { header } = this.state;
    const { coin, walletSummary, actions } = this.props;
    const styles = WithdrawConfirmStyle();

    return (
      <RegularLayout header={header} padding={'20 0 40 0'}>
        <Card>
          <View>
            <View style={{ paddingVertical: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <CelText align="center" type="H5" color="color: rgba(61,72,83,0.7)">You are about to withdraw</CelText>
              <CelText align="center" type="H1" bold>{formatter.usd(coin.amount_usd)}</CelText>
              <CelText align="center" color={STYLES.COLORS.DARK_GRAY_OPACITY} type="H2">{formatter.crypto(coin.amount, coin.short)}</CelText>
            </View>
            <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY} />
            <View style={[styles.address]}>
              <CelText type="H6" color="color: rgba(61,72,83,0.7)">New wallet balance:</CelText>
              <CelText style={{ lineHeight: 23 }} type="H6" bold>{formatter.crypto(coin.amount, coin.short)} {"  |  "} {formatter.usd(walletSummary.total_amount_usd, walletSummary.coins.short)}</CelText>
            </View>
            <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY} />
            <View style={[styles.address]}>
              <CelText type="H6" color="color: rgba(61,72,83,0.7)">Withdrawal address:</CelText>
              <CelText style={{ lineHeight: 23 }} type="H6">0x4Bd09558fD8766E4BE77A98bC407da904e739502</CelText>
            </View>
          </View>
        </Card>
        <View style={[styles.bottom]}>
          <CelButton
            onPress={() => actions.navigateTo('Home')}
          >
            Withdraw
        </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawConfirm);
