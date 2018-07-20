import React, {Component} from 'react';
import { Linking, Text, View } from "react-native";
import {Content} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import TransactionConfirmationStyle from "./TransactionConfirmation.styles";
import AmountInputStyle from "../AmountInput/AmountInput.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import formatter from "../../../utils/formatter";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";
import { actions as mixpanelActions } from "../../../services/mixpanel";

@connect(
  state => ({
    formData: state.ui.formData,
    ethOriginatingAddress: state.wallet.addresses.ethOriginatingAddress,
    btcOriginatingAddress: state.wallet.addresses.btcOriginatingAddress,
    celOriginatingAddress: state.wallet.addresses.celOriginatingAddress,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TransactionConfirmation extends Component {
  // lifecycle methods
  componentDidMount() {
    const { formData, actions } = this.props;

    if (!this.props[`${formData.currency}OriginatingAddress`]) {
      actions.getCoinOriginatingAddress(formData.currency);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { lastCompletedCall, actions } = this.props;

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.WITHDRAW_CRYPTO) {
      actions.navigateTo('TransactionDetails')
    }
  }

  // event hanlders
  confirmWithdrawal = () => {
    const { formData, actions } = this.props;
    actions.withdrawCrypto(formData.currency, formData.amountCrypto);
    mixpanelActions.confirmWithdraw(formData.amountCrypto, formData.currency);
  }
  // rendering methods
  render() {
    const { formData, callsInProgress } = this.props;

    const mainAmountText = formData.inUsd ? formatter.usd(formData.amountUsd) : formatter.crypto(formData.amountCrypto, formData.currency.toUpperCase(), { precision: 5 });
    const secondaryAmountText = !formData.inUsd ? formatter.usd(formData.amountUsd) : formatter.crypto(formData.amountCrypto, formData.currency.toUpperCase(), { precision: 5 });

    const balanceCrypto = formData.balance - formData.amountCrypto;
    const balanceUsd = balanceCrypto * formData.rateUsd;

    const isLoading = apiUtil.areCallsInProgress([API.WITHDRAW_CRYPTO], callsInProgress);

    const originatingAddress = this.props[`${formData.currency.toLowerCase()}OriginatingAddress`];

    return (
      <BasicLayout
        bottomNavigation={false}
      >
        <MainHeader backButton/>
        <CelHeading text={`Withdraw ${formData.currency.toUpperCase()}`} />
        <Content>
          <View style={AmountInputStyle.inputWrapper}>
            <Text
              style={AmountInputStyle.fiatAmount}
            >
              { mainAmountText }
            </Text>
            <Text style={AmountInputStyle.cryptoAmount}>{ secondaryAmountText }</Text>
            <View style={AmountInputStyle.separator}/>
            <View style={AmountInputStyle.newBalance}>
              <Text style={AmountInputStyle.newBalanceText}> New balance:</Text>
              <Text style={AmountInputStyle.newBalanceText}>{ formatter.crypto(balanceCrypto, formData.currency.toUpperCase(), { precision: 5 }) } = </Text>
              <Text style={AmountInputStyle.newBalanceText}>{ formatter.usd(balanceUsd) }</Text>
            </View>
          </View>

          <Text style={TransactionConfirmationStyle.explanationText}>
            This is the only address you can make withdrawals to. If you want to change the address, please <Text onPress={()=> Linking.openURL('mailto:hello@celsius.network')} style={TransactionConfirmationStyle.contactText}>contact Celsius support.</Text>
          </Text>

          <View style={TransactionConfirmationStyle.addresViewWrapper}>
            <Text style={TransactionConfirmationStyle.toAddress}>TO ADDRESS</Text>
            <Text style={TransactionConfirmationStyle.address}>{ originatingAddress }</Text>
          </View>

          <CelButton
            onPress={this.confirmWithdrawal}
            margin='50 36 50 36'
            loading={isLoading}
            disabled={isLoading}
          >
            Confirm withdrawal
          </CelButton>
        </Content>
      </BasicLayout>
    );
  }
}

export default TransactionConfirmation;
