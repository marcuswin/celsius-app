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
    coin: state.wallet.currencies,
    formData: state.forms.formData
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
    const { walletSummary, actions, formData } = this.props;
    const styles = WithdrawConfirmStyle();

    const coinData = walletSummary.coins.filter(c => c.short === formData.coin.toUpperCase())[0];
    const newBalanceCrypto = coinData.amount - formData.amountCrypto
    const newBalanceUsd = coinData.amount_usd - formData.amountUsd

    return (
      <RegularLayout header={header} padding={'20 0 40 0'}>
        <Card>
          <View>
            <View style={styles.amountWrapper}>
              <CelText align="center" type="H5" color="color: rgba(61,72,83,0.7)">You are about to withdraw</CelText>
              <CelText align="center" type="H1" bold>{formatter.usd(formData.amountUsd)}</CelText>
              <CelText align="center" color={STYLES.COLORS.DARK_GRAY_OPACITY} type="H2">{formatter.crypto(formData.amountCrypto, formData.coin)}</CelText>
            </View>
            <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY} />
            <View style={styles.address}>
              <CelText type="H6" color="color: rgba(61,72,83,0.7)">New wallet balance:</CelText>
              <CelText style={{ lineHeight: 23 }} type="H6" bold>{formatter.crypto(newBalanceCrypto, formData.coin)}   |   {formatter.usd(newBalanceUsd)}</CelText>
            </View>
            <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY} />
            <View style={styles.address}>
              <CelText type="H6" color="color: rgba(61,72,83,0.7)">Withdrawal address:</CelText>
              <CelText style={{ lineHeight: 23 }} type="H6">{ formData.withdrawAddress }</CelText>
            </View>
          </View>
        </Card>
        <View style={styles.bottom}>
          <CelButton
            onPress={() => actions.withdrawCrypto()}
          >
            Withdraw
        </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawConfirm);
