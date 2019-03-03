import React, { Component } from "react";
import { Linking, Text, View, Switch, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import testUtil from "../../../utils/test-util";

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
import Icon from "../../atoms/Icon/Icon";
import cryptoUtil from "../../../utils/crypto-util";
import MemoIdExplanationModal from "../../organisms/MemoIdExplanationModal/MemoIdExplanationModal";

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
        onChange={onChange} />
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
        <View style={TransactionConfirmationStyle.messageWrapper}>
          <View style={TransactionConfirmationStyle.errorCircle}>
            <Icon
              name={"ErrorIcon"}
              width='15'
              height='15'
              fill={"white"}
              stroke={"white"}
              viewBox="0 0 14.2 12.87"
            />
          </View>
          <View style={{ width: '80%' }}>
            {!formData.hasTagValue ?
              <Text style={[globalStyles.normalText, { textAlign: 'left' }]}>To prevent a <Text style={{ fontFamily: 'agile-book', }}>permanent loss</Text> of your funds, please specify a correct destination tag.</Text> :
              <Text style={[globalStyles.normalText, { textAlign: 'left' }]}>To prevent a <Text style={{ fontFamily: 'agile-book', }}>permanent loss</Text> of your funds, please check if your address has a destination tag.</Text>
            }
          </View>
        </View>
      </View>
    }

    {coin === "xlm" &&
      <View style={{ marginTop: 35, marginBottom: 35, justifyContent: "flex-start" }}>
        <Text style={[globalStyles.normalText, { marginBottom: 20 }]}>You need to enter a memo id or turn off
          this
        option</Text>
        <View>
          <CelInput theme="white"
            value={formData.coinMemoId}
            field={`coinMemoId`}
            labelText="XLM memoId"
            editable={!formData.hasMemoIdValue}
          />
          <View style={{ position: "absolute", right: 14, top: 15 }}>
            <Switch
              onValueChange={() => actions.updateFormField("hasMemoIdValue", !formData.hasMemoIdValue)}
              value={!formData.hasMemoIdValue}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => actions.openModal(MODALS.MEMO_ID_MODAL)}
        >
          <Text style={{ color: "rgba(136,162,199,1)", fontFamily: "agile-book", fontSize: 16 }}>
            What is XLM memoId?
        </Text>
        </TouchableOpacity>
        <View style={TransactionConfirmationStyle.messageWrapper}>
          <View style={TransactionConfirmationStyle.errorCircle}>
            <Icon
              name={"ErrorIcon"}
              width='15'
              height='15'
              fill={"white"}
              stroke={"white"}
              viewBox="0 0 14.2 12.87"
            />
          </View>
          <View style={{ width: '80%' }}>
            {!formData.hasMemoIdValue ?
              <Text style={[globalStyles.normalText, { textAlign: 'left' }]}>To prevent a <Text style={{ fontFamily: 'agile-book', }}>permanent loss</Text> of your funds, please specify a correct memoId.</Text> :
              <Text style={[globalStyles.normalText, { textAlign: 'left' }]}>To prevent a <Text style={{ fontFamily: 'agile-book', }}>permanent loss</Text> of your funds, please check if your address has a memoId.</Text>
            }
          </View>
        </View>
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
    if (formData.currency === "xlm" && formData[`${formData.currency}WithdrawalAddress`]) {
      const addressArray = formData[`${formData.currency}WithdrawalAddress`].split("?memoId=");
      const newAddress = addressArray[0];
      const newMemoId = addressArray[1];
      actions.updateFormField(`${formData.currency}WithdrawalAddress`, newAddress);
      actions.updateFormField(`coinMemoId`, newMemoId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { lastCompletedCall, actions, formData } = this.props;

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.WITHDRAW_CRYPTO) {
      actions.navigateTo("TransactionDetails");
    }

    if (formData.currency === "xrp" &&
      nextProps.formData[`${formData.currency}WithdrawalAddress`] &&
      formData[`${formData.currency}WithdrawalAddress`] !== nextProps.formData[`${formData.currency}WithdrawalAddress`]) {

      const addressArray = nextProps.formData[`${formData.currency}WithdrawalAddress`].split("?dt=");

      const newAddress = addressArray[0];
      const newTag = addressArray[1] || nextProps.formData.coinTag;

      actions.updateFormField(`${formData.currency}WithdrawalAddress`, newAddress);
      actions.updateFormField(`coinTag`, newTag);
    }

    if (formData.currency === "xlm" &&
      nextProps.formData[`${formData.currency}WithdrawalAddress`] &&
      formData[`${formData.currency}WithdrawalAddress`] !== nextProps.formData[`${formData.currency}WithdrawalAddress`]) {

      const addressArray = nextProps.formData[`${formData.currency}WithdrawalAddress`].split("?memoId=");

      const newAddress = addressArray[0];
      const newMemoId = addressArray[1] || nextProps.formData.coinMemoId;

      actions.updateFormField(`${formData.currency}WithdrawalAddress`, newAddress);
      actions.updateFormField(`coinMemoId`, newMemoId);
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

  withdrawFunds = async (verificationCode) => {
    const { formData, actions } = this.props;
    //
    const coin = this.getCoinShorthand();
    const withdrawalAddress = this.getCoinWithdrawalAddressInfo();
    let newWithdrawalAddress;

    if (formData.currency === "xrp") {
      if (formData[`${coin}WithdrawalAddress`]) {
        newWithdrawalAddress = formData.hasTagValue ? formData[`${coin}WithdrawalAddress`] : formData[`${coin}WithdrawalAddress`].concat("?dt=").concat(formData.coinTag);
      }
    } else if (formData.currency === "xlm") {
      if (formData[`${coin}WithdrawalAddress`]) {
        newWithdrawalAddress = formData.hasMemoIdValue ? formData[`${coin}WithdrawalAddress`] : formData[`${coin}WithdrawalAddress`].concat("?memoId=").concat(formData.coinMemoId);
      }
    } else {
      newWithdrawalAddress = withdrawalAddress.address;
    }

    if (!["xrp", "xlm"].includes(formData.currency)) {
      if (formData[`${coin}WithdrawalAddress`]) {
        newWithdrawalAddress = formData[`${coin}WithdrawalAddress`];
      } else {
        newWithdrawalAddress = withdrawalAddress.address;
      }
    }

    try {
      if ((!withdrawalAddress.manually_set || !withdrawalAddress.address) && newWithdrawalAddress) {
        await actions.setCoinWithdrawalAddressAndWithdrawCrypto(coin, newWithdrawalAddress, formData.amountCrypto, verificationCode);
      } else {
        await actions.withdrawCrypto(coin, formData.amountCrypto, verificationCode);
      }
      return true;
    } catch (error) {
      actions.showMessage('error', error.error);
      return true;
    }
  };

  // event hanlders
  confirmWithdrawal = () => {
    const { actions } = this.props;

    actions.navigateTo("VerifyIdentity", {
      verificationCallback: false,
      backButton: true,
      actionLabel: 'withdraw',
      verificationAction: this.withdrawFunds,
    });
  };

  /**
   * @param {WithdrawalAddress} withdrawalAddress
   * @returns {boolean}
   */
  isConfirmButtonDisabled = (withdrawalAddress) => {
    const { formData } = this.props;

    const coin = this.getCoinShorthand();
    const withdrawalAddressValue = formData[`${coin}WithdrawalAddress`];

    if (this.isScreenLoading()) {
      return true;
    }

    if (!withdrawalAddress) {
      return true;
    }

    if (withdrawalAddressValue && formData.currency === "xrp" && formData.hasTagValue) {
      return !formData.coinTag;
    }

    if (withdrawalAddressValue && formData.currency === "xlm" && formData.hasMemoIdValue) {
      return !formData.coinMemoId;
    }

    if (withdrawalAddressValue) return false;
    return !withdrawalAddress.address || !withdrawalAddress.manually_set;
  };

  withdrawalAddressSetInfo = () => {
    const coin = this.getCoinShorthand();
    const address = this.getCoinWithdrawalAddressInfo();

    const addressArrayXrp = address.address.split("?dt=");
    const newAddressXrp = addressArrayXrp[0];
    const newTag = addressArrayXrp[1];

    const addressArrayXlm = address.address.split("?memoId=");
    const newAddressXlm = addressArrayXlm[0];
    const newMemoId = addressArrayXlm[1];

    return (
      <View style={TransactionConfirmationStyle.screenContentWrapper}>
        {cryptoUtil.isERC20(coin) &&
          <InfoBubble
            title={"Warning"}
            shouldClose
            onPressClose={this.onCloseBCHInfo}
            color={"gray"}
            renderContent={() => (
              <View>
                <Text style={[globalStyles.normalText, { color: 'white' }]}>
                  {"Withdrawals are made via a "}<Text style={[globalStyles.boldText, { color: 'white' }]}>smart contract</Text>{", please make sure your account provider supports smart-contract deposits."}
                </Text>
              </View>
            )}
          />
        }
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
        {coin === "xrp" &&
          <View>
            <View style={[TransactionConfirmationStyle.addressViewWrapper, { marginBottom: 10 }]}>
              <Text style={TransactionConfirmationStyle.toAddress}>YOUR COINS WILL BE SENT TO</Text>
              <Text style={TransactionConfirmationStyle.address}>{newAddressXrp}</Text>
            </View>
            <View style={TransactionConfirmationStyle.addressViewWrapper}>
              <Text style={TransactionConfirmationStyle.toAddress}>DESTINATION TAG</Text>
              <Text ref={testUtil.generateTestHook(this, 'TransactionConfirmation.destinationTag')} style={TransactionConfirmationStyle.address}>{newTag}</Text>
            </View>
          </View>
        }
        {coin === "xlm" &&
          <View>
            <View style={[TransactionConfirmationStyle.addressViewWrapper, { marginBottom: 10 }]}>
              <Text style={TransactionConfirmationStyle.toAddress}>YOUR COINS WILL BE SENT TO</Text>
              <Text style={TransactionConfirmationStyle.address}>{newAddressXlm}</Text>
            </View>
            <View style={TransactionConfirmationStyle.addressViewWrapper}>
              <Text style={TransactionConfirmationStyle.toAddress}>MEMO ID</Text>
              <Text ref={testUtil.generateTestHook(this, 'TransactionConfirmation.destinationTag')} style={TransactionConfirmationStyle.address}>{newMemoId}</Text>
            </View>
          </View>
        }
        {!["xrp", "xlm"].includes(coin) &&
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
    const decimal = formData.inUsd ? 2 : 5;
    const secondaryDecimal = formData.inUsd ? 5 : 2;

    let mainAmountText;
    mainAmountText = formData.inUsd ? formatter.usd(formData.amount) : formatter.round(formData.amount, { precision: 5 });
    if (!formData.inUsd) {
      mainAmountText += ` ${formData.currency.toUpperCase()}`;
    }

    const amountCryptoStr = formData.amountCrypto ? formData.amountCrypto.toString() : "";
    let secondaryAmountText;
    secondaryAmountText = !formData.inUsd ? formatter.usd(formData.amountUsd) : formatter.round(formData.amountCrypto, { precision: 5 });
    if (formData.amountCrypto && formData.inUsd && amountCryptoStr.indexOf('.') > 0 && (amountCryptoStr.length - amountCryptoStr.indexOf('.') > secondaryDecimal + 1)) {
      secondaryAmountText = `*${secondaryAmountText}`;
    }
    if (formData.inUsd) {
      secondaryAmountText += ` ${formData.currency.toUpperCase()}`;
    }

    const balanceCrypto = formData.balance - formData.amountCrypto;
    const balanceUsd = balanceCrypto * formData.rateUsd;

    const isLoading = this.isScreenLoading();

    const withdrawalAddress = this.getCoinWithdrawalAddressInfo();
    const withdrawalAddressSet = !!withdrawalAddress && !!withdrawalAddress.address && withdrawalAddress.manually_set;

    return (
      <BasicLayout
      >
        <MainHeader backButton />
        <CelHeading text={`Withdraw ${coinUpperCase}`} />
        <CelScreenContent padding='0 0 0 0'>
          <View style={AmountInputStyle.inputWrapper}>
            {(formData.amount && !formData.inUsd && formData.amount.indexOf('.') > 0 && (formData.amount.length - formData.amount.indexOf('.') > decimal + 1)) ?
              <View style={{ flexDirection: 'row' }}>
                <Text style={[AmountInputStyle.primaryAmount, AmountInputStyle.primaryAmountAsterix]}>*</Text>
                <Text style={AmountInputStyle.primaryAmount}>{mainAmountText}</Text>
              </View>
              :
              <Text style={AmountInputStyle.primaryAmount}>
                {mainAmountText}
              </Text>
            }
            <Text style={AmountInputStyle.secondaryAmount}>{secondaryAmountText}</Text>
            <View style={AmountInputStyle.separator} />
            <View style={AmountInputStyle.newBalance}>
              <Text style={AmountInputStyle.newBalanceText}> New balance:</Text>
              <Text
                style={AmountInputStyle.newBalanceText}>{formatter.crypto(balanceCrypto, coinUpperCase, { precision: 5 })} = </Text>
              <Text
                style={[AmountInputStyle.newBalanceText, globalStyles.mediumText]}>{formatter.usd(balanceUsd)}</Text>
            </View>
          </View>
          {(formData.amountCrypto && amountCryptoStr.indexOf('.') > 0 && (amountCryptoStr.length - amountCryptoStr.indexOf('.') > 5 + 1)) &&
            <View style={[TransactionConfirmationStyle.screenContentWrapper, { marginTop: 20, marginBottom: 20 }]}>
              <Text style={[globalStyles.normalText]}>*This is the full amount to withdraw:</Text>
              <Text style={[globalStyles.normalText]}>
                {`${amountCryptoStr} ${formData.currency.toUpperCase()}`}
              </Text>
            </View>
          }
          <View style={AmountInputStyle.separator} />

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
            ref={testUtil.generateTestHook(this, 'TransactionConfirmation.confirmWithdraw')}
            onPress={this.confirmWithdrawal}
            margin='30 36 50 36'
            loading={isLoading}
            disabled={this.isConfirmButtonDisabled(withdrawalAddress)}
          >
            Confirm withdrawal
          </CelButton>
        </CelScreenContent>
        <DestinationTagExplanationModal />
        <MemoIdExplanationModal />
      </BasicLayout >
    );
  }
}

export default testUtil.hookComponent(TransactionConfirmation);
