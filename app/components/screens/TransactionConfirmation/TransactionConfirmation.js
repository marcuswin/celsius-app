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
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

/**
 * @typedef {Object} WithdrawalAddress
 * @property {string} address
 * @property {boolean} manually_set
 */

const WithdrawalAddressSetInfo = ({address}) => (
  <View>
    <View style={TransactionConfirmationStyle.infoBubbleWrapper}>
      <InfoBubble
        renderContent={(textStyles) => (
          <View>
            <Text style={textStyles}>
              Please confirm this is the address you wish to send your funds to. If you transferred money from an exchange, this may not be the correct address to send coins or tokens to. If you need to change your withdrawal address, please contact Celsius support at <Text onPress={()=> Linking.openURL('mailto:app@celsius.network')} style={globalStyles.underlinedText}>app@celsius.network</Text>.
            </Text>
          </View>
        )}
      />
    </View>
    <View style={TransactionConfirmationStyle.addressViewWrapper}>
      <Text style={TransactionConfirmationStyle.toAddress}>YOUR COINS WILL BE SENT TO</Text>
      <Text style={TransactionConfirmationStyle.address}>{ address }</Text>
    </View>
  </View>
);

const WithdrawalAddressNeededBox = () => (
  <View>
    <Text>Testing mah skills</Text>
  </View>
);

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
      actions.getCoinWithdrawalAddress(formData.currency);
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
    actions.navigateTo('EnterPasscode', {
      amountCrypto: formData.amountCrypto,
      currency: formData.currency,
    });
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
              <Text style={[AmountInputStyle.newBalanceText, globalStyles.mediumText]}>{ formatter.usd(balanceUsd) }</Text>
            </View>
          </View>

          {(!isLoading && withdrawalAddressSet) && <WithdrawalAddressSetInfo withdrawalAddress={withdrawalAddress.address}/>}

          {(!isLoading && !withdrawalAddressSet) && <WithdrawalAddressNeededBox/>}

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
