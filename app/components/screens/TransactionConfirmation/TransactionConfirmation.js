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
import CelForm from "../../atoms/CelForm/CelForm";
import CelInput from "../../atoms/CelInput/CelInput";

/**
 * @typedef {Object} WithdrawalAddress
 * @property {string} address
 * @property {boolean} manually_set
 */

const WithdrawalAddressSetInfo = ({withdrawalAddress}) => (
    <View style={TransactionConfirmationStyle.screenContentWrapper}>
      <InfoBubble
        renderContent={(textStyles) => (
          <View>
            <Text style={textStyles}>
              Please confirm this is the address you wish to send your funds to. If you transferred money from an exchange, this may not be the correct address to send coins or tokens to. If you need to change your withdrawal address, please contact Celsius support at <Text onPress={()=> Linking.openURL('mailto:app@celsius.network')} style={globalStyles.underlinedText}>app@celsius.network</Text>.
            </Text>
          </View>
        )}
      />
      <View style={TransactionConfirmationStyle.addressViewWrapper}>
        <Text style={TransactionConfirmationStyle.toAddress}>YOUR COINS WILL BE SENT TO</Text>
        <Text style={TransactionConfirmationStyle.address}>{ withdrawalAddress }</Text>
      </View>
    </View>
);

const WithdrawalAddressNeededBox = ({value, onChange, onScanClick, coin}) => (
  <View style={TransactionConfirmationStyle.screenContentWrapper}>
    <Text style={[globalStyles.normalText, TransactionConfirmationStyle.withdrawalAddressNotSetText]}>Your ETH withdrawal address is not set. Please, enter the address, or scan QR code.</Text>
    <CelForm>
      <CelInput theme="white"
                value={value}
                field={`${coin}WithdrawalAddress`}
                labelText="Withdrawal Address"
                onChange={onChange}/>
      <Text onPress={onScanClick} style={[globalStyles.underlinedText, TransactionConfirmationStyle.scanQrCode]}>Scan QR Code</Text>
    </CelForm>
    <InfoBubble
      renderContent={(textStyles) => (
        <View>
          <Text style={[textStyles, globalStyles.boldText]}>
            Please note:
          </Text>
          <Text style={textStyles}>
            Once you choose a wallet address to withdraw to you will not be able to change it in the future without contacting us at <Text onPress={()=> Linking.openURL('mailto:app@celsius.network')} style={globalStyles.underlinedText}>app@celsius.network</Text>.
          </Text>
        </View>
      )}
    />
  </View>
);

@connect(
  state => ({
    formData: state.ui.formData,
    addresses: state.wallet.withdrawalAddresses,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TransactionConfirmation extends Component {
  // lifecycle methods
  componentDidMount() {
    const { formData, actions, addresses } = this.props;

    if (!addresses[formData.currency]) {
      actions.getCoinWithdrawalAddress(formData.currency);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { lastCompletedCall, actions } = this.props;

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.WITHDRAW_CRYPTO) {
      actions.navigateTo('TransactionDetails')
    }
  }

  /**
   * @param {boolean} [uppercase]
   * @returns {string}
   */
  getCoinShorthand = (uppercase = false) => {
    const { formData } = this.props;

    if (uppercase) {
      return formData.currency.toUpperCase();
    }

    return formData.currency.toLowerCase();
  };

  /**
   * @returns {WithdrawalAddress|{}}
   */
  getCoinWithdrawalAddressInfo = () => {
    const { addresses } = this.props;
    const coin = this.getCoinShorthand();

    return addresses[coin] || {};
  };

  /**
   * @returns {boolean}
   */
  isScreenLoading = () => {
    const { callsInProgress } = this.props;

    return apiUtil.areCallsInProgress([API.WITHDRAW_CRYPTO, API.GET_COIN_ORIGINATING_ADDRESS], callsInProgress);
  };

  handleWithdrawalAddressChange = (field, text) => {
    const { actions } = this.props;

    actions.updateFormField(field,text);
  };

  handleScan = (code) => {
    const coin = this.getCoinShorthand();
    const fieldName = `${coin}WithdrawalAddress`;

    this.handleWithdrawalAddressChange(fieldName, code);
  };

  handleScanClick = () => {
    const { actions } = this.props;

    const coin = this.getCoinShorthand(true);

    actions.navigateTo('QRScanner', {
      onScan: this.handleScan,
      scanTitle: `Withdrawal ${coin} address`
    });
  };

  // event hanlders
  confirmWithdrawal = () => {
    const { formData, actions } = this.props;

    const coin = this.getCoinShorthand();
    const withdrawalAddress = this.getCoinWithdrawalAddressInfo();
    const newWithdrawalAddress = formData[`${coin}WithdrawalAddress`];

    actions.navigateTo('EnterPasscode', {
      amountCrypto: formData.amountCrypto,
      currency: coin,
      withdrawalAddress,
      newWithdrawalAddress,
    });
  };

  /**
   * @param {WithdrawalAddress} withdrawalAddress
   * @returns {boolean}
   */
  isConfirmButtonDisabled = (withdrawalAddress) => {
    const { formData } = this.props;

    const coin = this.getCoinShorthand();

    if (this.isScreenLoading()) {
      return true;
    }

    if (!withdrawalAddress) {
      return true;
    }

    const withdrawalAddressValue = formData[`${coin}WithdrawalAddress`];

    if (withdrawalAddressValue) {
      return false;
    }

    return !withdrawalAddress.address || !withdrawalAddress.manually_set;
  };
  // rendering methods
  render() {
    const { formData } = this.props;

    const coinUpperCase = this.getCoinShorthand(true);
    const coinLowerCase = this.getCoinShorthand();

    const mainAmountText = formData.inUsd ? formatter.usd(formData.amountUsd) : formatter.crypto(formData.amountCrypto, coinUpperCase, { precision: 5 });
    const secondaryAmountText = !formData.inUsd ? formatter.usd(formData.amountUsd) : formatter.crypto(formData.amountCrypto, coinUpperCase, { precision: 5 });

    const balanceCrypto = formData.balance - formData.amountCrypto;
    const balanceUsd = balanceCrypto * formData.rateUsd;

    const isLoading = this.isScreenLoading();

    const withdrawalAddress = this.getCoinWithdrawalAddressInfo();
    const withdrawalAddressSet = !!withdrawalAddress && !!withdrawalAddress.address && withdrawalAddress.manually_set;
    const withdrawalAddressValue = formData[`${coinLowerCase}WithdrawalAddress`];

    return (
      <BasicLayout
        bottomNavigation={false}
      >
        <MainHeader backButton/>
        <CelHeading text={`Withdraw ${coinUpperCase}`} />
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
              <Text style={AmountInputStyle.newBalanceText}>{ formatter.crypto(balanceCrypto, coinUpperCase, { precision: 5 }) } = </Text>
              <Text style={[AmountInputStyle.newBalanceText, globalStyles.mediumText]}>{ formatter.usd(balanceUsd) }</Text>
            </View>
          </View>

          {(!isLoading && withdrawalAddressSet) && <WithdrawalAddressSetInfo withdrawalAddress={withdrawalAddress.address}/>}

          {(!isLoading && !withdrawalAddressSet) &&
            <WithdrawalAddressNeededBox onScanClick={this.handleScanClick}
                                        value={withdrawalAddressValue}
                                        coin={coinLowerCase}
                                        onChange={this.handleWithdrawalAddressChange}/>
          }

          <CelButton
            onPress={this.confirmWithdrawal}
            margin='30 36 50 36'
            loading={isLoading}
            disabled={this.isConfirmButtonDisabled(withdrawalAddress)}
          >
            Confirm withdrawal
          </CelButton>
        </Content>
      </BasicLayout>
    );
  }
}

export default TransactionConfirmation;
