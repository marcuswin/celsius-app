import React, { Component } from "react";
import { Linking, Text, View, Switch, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import TransactionConfirmationStyle from "./TransactionConfirmation.styles";
import AmountInputStyle from "../AmountInput/AmountInput.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import formatter from "../../../utils/formatter";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import CelForm from "../../atoms/CelForm/CelForm";
import CelInput from "../../atoms/CelInput/CelInput";
import { MODALS } from "../../../config/constants/common";
import DestinationTagExplanationModal
  from "../../organisms/DestinationTagExplanationModal/DestinationTagExplanationModal";
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";

/**
 * @typedef {Object} WithdrawalAddress
 * @property {string} address
 * @property {boolean} manually_set
 */

const WithdrawalAddressNeededBox = ({ onChange, onScanClick, coin, actions, formData }) => (
  <View style={TransactionConfirmationStyle.screenContentWrapper}>
    <Text
      style={[globalStyles.normalText, TransactionConfirmationStyle.withdrawalAddressNotSetText]}>Your {coin.toUpperCase()} withdrawal
      address is not set. Please, enter the address, or scan QR code.</Text>
    <CelForm>
      <CelInput theme="white"
                value={formData[`${coin}WithdrawalAddress`]}
                field={`${coin}WithdrawalAddress`}
                labelText="Withdrawal Address"
                onChange={onChange}/>
      <Text onPress={onScanClick} style={[TransactionConfirmationStyle.scanQrCode, {
        fontFamily: "agile-book",
        fontSize: 16,
        color: "rgba(136,162,199,1)"
      }]}>Scan
        QR
        Code</Text>
    </CelForm>

    {coin === "xrp" &&
    <View style={{ marginTop: 35, marginBottom: 35, justifyContent: "flex-start" }}>
      <Text style={[globalStyles.normalText, { marginBottom: 20 }]}>You need to enter a destination tag or turn off
        this
        option</Text>
      <View>
        <CelInput theme="white"
                  value={formData.coinTag}
                  field={`coinTag`}
                  labelText="XRP Destination Tag"
                  editable={!formData.hasTagValue}
        />
        <View style={{ position: "absolute", right: 14, top: 15 }}>
          <Switch
            onValueChange={() => actions.updateFormField("hasTagValue", !formData.hasTagValue)}
            value={!formData.hasTagValue}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => actions.openModal(MODALS.DESTINATION_TAG_MODAL)}
      >
        <Text style={{ color: "rgba(136,162,199,1)", fontFamily: "agile-book", fontSize: 16 }}>
          What is XRP Destination Tag?
        </Text>
      </TouchableOpacity>
    </View>
    }

    <InfoBubble
      renderContent={(textStyles) => (
        <View>
          <Text style={[textStyles, globalStyles.boldText]}>
            Please note:
          </Text>
          <Text style={textStyles}>
            Once you choose a wallet address to withdraw to you will not be able to change it in the future without
            contacting us at <Text onPress={() => Linking.openURL("mailto:app@celsius.network")}
                                   style={globalStyles.underlinedText}>app@celsius.network</Text>.
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
    lastCompletedCall: state.api.lastCompletedCall
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionConfirmation extends Component {


  // lifecycle methods
  componentDidMount() {
    const { formData, actions, addresses } = this.props;

    if (!addresses[formData.currency] || !addresses[formData.currency].address) {
      actions.getCoinWithdrawalAddress(formData.currency);
    }
    if (formData.currency === "xrp" && formData[`${formData.currency}WithdrawalAddress`]) {
      const addressArray = formData[`${formData.currency}WithdrawalAddress`].split("?dt=");
      const newAddress = addressArray[0];
      const newTag = addressArray[1];
      actions.updateFormField(`${formData.currency}WithdrawalAddress`, newAddress);
      actions.updateFormField(`coinTag`, newTag);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { lastCompletedCall, actions, formData } = this.props;

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.WITHDRAW_CRYPTO) {
      actions.navigateTo("TransactionDetails");
    }

    if (
      formData.currency === "xrp" &&
      nextProps.formData[`${formData.currency}WithdrawalAddress`] &&
      formData[`${formData.currency}WithdrawalAddress`] !== nextProps.formData[`${formData.currency}WithdrawalAddress`]
    ) {

      const addressArray = nextProps.formData[`${formData.currency}WithdrawalAddress`].split("?dt=");

      const newAddress = addressArray[0];
      const newTag = addressArray[1] || nextProps.formData.coinTag;

      actions.updateFormField(`${formData.currency}WithdrawalAddress`, newAddress);
      actions.updateFormField(`coinTag`, newTag);

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

    if (addresses[coin]) {
      return addresses[coin] || {};
    }
  };

  /**
   * @returns {boolean}
   */
  isScreenLoading = () => {
    const { callsInProgress } = this.props;

    return apiUtil.areCallsInProgress([API.WITHDRAW_CRYPTO, API.GET_COIN_ORIGINATING_ADDRESS], callsInProgress);
  };

  /**
   * @param {string} field
   * @param {string} text
   */
  handleWithdrawalAddressChange = (field, text) => {
    const { actions } = this.props;

    actions.updateFormField(field, text);
  };

  handleScan = (code) => {
    const coin = this.getCoinShorthand();
    const fieldName = `${coin}WithdrawalAddress`;

    this.handleWithdrawalAddressChange(fieldName, code);
  };

  handleScanClick = () => {
    const { actions } = this.props;

    const coin = this.getCoinShorthand(true);

    actions.navigateTo("QRScanner", {
      onScan: this.handleScan,
      scanTitle: `Withdrawal ${coin} address`
    });
  };

  // event hanlders
  confirmWithdrawal = () => {
    const { formData, actions } = this.props;

    const coin = this.getCoinShorthand();
    const withdrawalAddress = this.getCoinWithdrawalAddressInfo();
    let newWithdrawalAddress;

    if (formData.currency === "xrp") {
      if (formData[`${coin}WithdrawalAddress`]) {
        newWithdrawalAddress = formData.hasTagValue === true ? formData[`${coin}WithdrawalAddress`] : formData[`${coin}WithdrawalAddress`].concat("?dt=").concat(formData.coinTag);
      } else {
        newWithdrawalAddress = withdrawalAddress.address;
      }
    }

    if (formData.currency !== "xrp") {
      if (formData[`${coin}WithdrawalAddress`]) {
        newWithdrawalAddress = formData[`${coin}WithdrawalAddress`];
      } else {
        newWithdrawalAddress = withdrawalAddress.address;
      }
    }

    actions.navigateTo("EnterPasscode", {
      amountCrypto: formData.amountCrypto,
      currency: coin,
      purpose: "withdraw",
      newWithdrawalAddress
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

  withdrawalAddressSetInfo = () => {
    const coin = this.getCoinShorthand();
    const address = this.getCoinWithdrawalAddressInfo();

    const addressArray = address.address.split("?dt=");
    const newAddress = addressArray[0];
    const newTag = addressArray[1];

    return (
      <View style={TransactionConfirmationStyle.screenContentWrapper}>
        <InfoBubble
          renderContent={(textStyles) => (
            <View>
              <Text style={textStyles}>
                Please confirm this is the address you wish to send your funds to. If you transferred money from an
                exchange, this may not be the correct address to send coins or tokens to. If you need to change your
                withdrawal address, please contact Celsius support at <Text
                onPress={() => Linking.openURL("mailto:app@celsius.network")}
                style={globalStyles.underlinedText}>app@celsius.network</Text>.
              </Text>
            </View>
          )}
        />
        {coin === "xrp" ?
          <View>
            <View style={[TransactionConfirmationStyle.addressViewWrapper, {marginBottom:10}]}>
              <Text style={TransactionConfirmationStyle.toAddress}>YOUR COINS WILL BE SENT TO</Text>
              <Text style={TransactionConfirmationStyle.address}>{newAddress}</Text>
            </View>
            <View style={TransactionConfirmationStyle.addressViewWrapper}>
              <Text style={TransactionConfirmationStyle.toAddress}>DESTINATION TAG</Text>
              <Text style={TransactionConfirmationStyle.address}>{newTag}</Text>
            </View>
          </View>
          :
          <View style={TransactionConfirmationStyle.addressViewWrapper}>
            <Text style={TransactionConfirmationStyle.toAddress}>YOUR COINS WILL BE SENT TO</Text>
            <Text style={TransactionConfirmationStyle.address}>{address.address}</Text>
          </View>
        }
      </View>
    );
  };

  // rendering methods
  render() {
    const { formData, actions } = this.props;

    const coinUpperCase = this.getCoinShorthand(true);
    const coinLowerCase = this.getCoinShorthand();

    const mainAmountText = formData.inUsd ? formatter.usd(formData.amountUsd) : formatter.crypto(formData.amountCrypto, coinUpperCase, { precision: 5 });
    const secondaryAmountText = !formData.inUsd ? formatter.usd(formData.amountUsd) : formatter.crypto(formData.amountCrypto, coinUpperCase, { precision: 5 });

    const balanceCrypto = formData.balance - formData.amountCrypto;
    const balanceUsd = balanceCrypto * formData.rateUsd;

    const isLoading = this.isScreenLoading();

    const withdrawalAddress = this.getCoinWithdrawalAddressInfo();
    const withdrawalAddressSet = !!withdrawalAddress && !!withdrawalAddress.address && withdrawalAddress.manually_set;

    return (
      <BasicLayout
        bottomNavigation={false}
      >
        <MainHeader backButton/>
        <CelHeading text={`Withdraw ${coinUpperCase}`}/>
        <CelScreenContent padding='0 0 0 0'>
          <View style={AmountInputStyle.inputWrapper}>
            <Text
              style={AmountInputStyle.primaryAmount}
            >
              {mainAmountText}
            </Text>
            <Text style={AmountInputStyle.secondaryAmount}>{secondaryAmountText}</Text>
            <View style={AmountInputStyle.separator}/>
            <View style={AmountInputStyle.newBalance}>
              <Text style={AmountInputStyle.newBalanceText}> New balance:</Text>
              <Text
                style={AmountInputStyle.newBalanceText}>{formatter.crypto(balanceCrypto, coinUpperCase, { precision: 5 })} = </Text>
              <Text
                style={[AmountInputStyle.newBalanceText, globalStyles.mediumText]}>{formatter.usd(balanceUsd)}</Text>
            </View>
          </View>

          {(!isLoading && withdrawalAddressSet) && this.withdrawalAddressSetInfo()}

          {(!isLoading && !withdrawalAddressSet) &&
          <WithdrawalAddressNeededBox
            onScanClick={this.handleScanClick}
            formData={formData}
            actions={actions}
            coin={coinLowerCase}
            onChange={this.handleWithdrawalAddressChange}
          />
          }

          <CelButton
            onPress={this.confirmWithdrawal}
            margin='30 36 50 36'
            loading={isLoading}
            disabled={this.isConfirmButtonDisabled(withdrawalAddress) || (formData.hasTagValue === false && !formData.coinTag)}
          >
            Confirm withdrawal
          </CelButton>
        </CelScreenContent>
        <DestinationTagExplanationModal/>
      </BasicLayout>
    );
  }
}

export default TransactionConfirmation;
