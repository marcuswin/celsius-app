import React, { Component } from 'react';
import { View } from 'react-native';
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
import apiUtil from "../../../utils/api-util"
import API from "../../../constants/API";
import addressUtil from "../../../utils/address-util";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    walletSummary: state.wallet.summary,
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WithdrawConfirm extends Component {

  static navigationOptions = () => ({
    title: "Withdraw Confirm"
  })

  render() {
    const { walletSummary, actions, formData, callsInProgress } = this.props;
    const styles = WithdrawConfirmStyle();

    const coinData = walletSummary.coins.find(c => c.short === formData.coin.toUpperCase());
    const newBalanceCrypto = coinData.amount - formData.amountCrypto
    const newBalanceUsd = coinData.amount_usd - formData.amountUsd

    const isLoading = apiUtil.areCallsInProgress([API.WITHDRAW_CRYPTO], callsInProgress)

    const address = addressUtil.joinAddressTag(formData.coin.toLowerCase(), formData.withdrawAddress, formData.coinTag)

    return (
      <RegularLayout padding={'20 0 40 0'}>
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
              <CelText style={styles.lineHeight} type="H6" bold>{formatter.crypto(newBalanceCrypto, formData.coin)}   |   {formatter.usd(newBalanceUsd)}</CelText>
            </View>
            <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY} />
            <View style={styles.address}>
              <CelText type="H6" color="color: rgba(61,72,83,0.7)">Withdrawal address:</CelText>
              <CelText style={styles.lineHeight} type="H6">{address}</CelText>
            </View>
          </View>
        </Card>
        <View style={styles.bottom}>
          <CelButton
            loading={isLoading}
            onPress={actions.withdrawCrypto}
          >
            Withdraw
        </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawConfirm);
