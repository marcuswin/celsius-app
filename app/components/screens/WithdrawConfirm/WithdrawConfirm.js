import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import WithdrawConfirmStyle from "./WithdrawConfirm.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";
import Separator from "../../atoms/Separator/Separator";
import formatter from "../../../utils/formatter";
import STYLES from "../../../constants/STYLES";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import addressUtil from "../../../utils/address-util";
import InfoBox from "../../atoms/InfoBox/InfoBox";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    walletSummary: state.wallet.summary,
    formData: state.forms.formData,
    user: state.user.profile,
    loyaltyInfo: state.user.loyaltyInfo
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawConfirm extends Component {
  static navigationOptions = () => ({
    title: "Confirm withdrawal details "
  });

  componentDidMount() {
    const { actions, formData } = this.props;
    if (formData.coin === "CEL") actions.getLoyaltyInfo();
  }

  renderInfoBox = () => {
    const { walletSummary, formData, user, loyaltyInfo } = this.props;
    const coinData = walletSummary.coins.filter(c => c.short === formData.coin.toUpperCase())[0];
    const newBalance = coinData.amount - formData.amountCrypto;

    if (user.celsius_member && formData.coin === "CEL" && newBalance < 1) return (
      <InfoBox
        backgroundColor={STYLES.COLORS.RED}
        padding='15 15 15 15'
        color='white'
      >
        <CelText color={STYLES.COLORS.WHITE}>
          Withdrawing will leave you with less than 1 CEL in your wallet, which result in losing your Celsius
          membership. This will restrict you from using all the available Celsius features. Are you sure that you want
          to withdraw?
        </CelText>
      </InfoBox>
    );

    if (formData.coin === "CEL" && loyaltyInfo && newBalance < loyaltyInfo.min_for_tier) return (
      <InfoBox
        backgroundColor={STYLES.COLORS.ORANGE}
        padding='15 15 15 15'
        color='white'
      >
        <CelText color={STYLES.COLORS.WHITE}>
          Withdrawing CEL will affect your{' '}
          <CelText weight='bold' color='white'>
            { loyaltyInfo.tier } Loyalty level
          </CelText>{' '}
          and lower your{' '}
          <CelText weight='bold' color='white'>
            HODL ratio
          </CelText>{' '}
          . Are you sure that you want to withdraw?
        </CelText>
      </InfoBox>
    );

    return null
  };

  render() {
    const {
      walletSummary,
      actions,
      formData,
      callsInProgress,
    } = this.props;
    const styles = WithdrawConfirmStyle();

    const coinData = walletSummary.coins.find(
      c => c.short === formData.coin.toUpperCase()
    );
    const newBalanceCrypto = coinData.amount - formData.amountCrypto;
    const newBalanceUsd = coinData.amount_usd - formData.amountUsd;

    const isLoading = apiUtil.areCallsInProgress(
      [API.WITHDRAW_CRYPTO],
      callsInProgress
    );

    const address = addressUtil.joinAddressTag(
      formData.coin.toLowerCase(),
      formData.withdrawAddress,
      formData.coinTag
    );

    const infoBox = this.renderInfoBox()

    return (
      <RegularLayout>
        <Card>
          <View>
            <View style={styles.amountWrapper}>
              <CelText
                align='center'
                type='H5'
                color='color: rgba(61,72,83,0.7)'
              >
                You are about to withdraw
              </CelText>
              <CelText align='center' type='H1' bold>
                {formatter.usd(formData.amountUsd)}
              </CelText>
              <CelText
                align='center'
                color={STYLES.COLORS.DARK_GRAY_OPACITY}
                type='H2'
              >
                {formatter.crypto(formData.amountCrypto, formData.coin)}
              </CelText>
            </View>
            <Separator/>
            <View style={styles.address}>
              <CelText type='H6' color='color: rgba(61,72,83,0.7)'>
                New wallet balance:
              </CelText>
              <CelText style={styles.lineHeight} type='H6' bold>
                {formatter.crypto(newBalanceCrypto, formData.coin)} |{" "}
                {formatter.usd(newBalanceUsd)}
              </CelText>
            </View>
            <Separator/>
            <View style={styles.address}>
              <CelText type='H6' color='color: rgba(61,72,83,0.7)'>
                Withdrawal address:
              </CelText>
              <CelText style={styles.lineHeight} type='H6'>
                {address}
              </CelText>
            </View>
          </View>
        </Card>
        <View style={styles.bottom}>
          { infoBox }

          <CelButton
            margin='10 0 0 0'
            loading={isLoading}
            onPress={actions.withdrawCrypto}
          >
            Send email verification
          </CelButton>
          <CelText margin= '30 0 0 0' color='gray' style={{ paddingVertical: 10, paddingHorizontal: 10, borderRadius: 8, backgroundColor: STYLES.COLORS.MEDIUM_GRAY1}}> Follow instructions in email to complete this withdrawal.</CelText>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawConfirm);
