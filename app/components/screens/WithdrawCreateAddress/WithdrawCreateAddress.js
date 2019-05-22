import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import cryptoUtil from "../../../utils/crypto-util";
import testUtil from "../../../utils/test-util";
import addressUtil from "../../../utils/address-util";
import * as appActions from "../../../redux/actions";
import WithdrawalAddressConfirmationStyle from "./WithdrawCreateAddress.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import BalanceView from "../../atoms/BalanceView/BalanceView";
import formatter from "../../../utils/formatter";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import CelInput from "../../atoms/CelInput/CelInput";


@connect(
  state => ({
    walletSummary: state.wallet.summary,
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawCreateAddress extends Component {

  static navigationOptions = () => ({
    title: "Withdrawal address",
    right: "profile"
  })

  constructor(props) {
    super(props);

    const { formData, walletSummary } = props;
    const coin = formData.coin;
    const coinData = walletSummary.coins.filter(c => c.short === coin.toUpperCase())[0];

    this.state = {
      coin,
      balanceCrypto: coinData.amount,
      balanceUsd: coinData.amount_usd,
    };
  }

  handleScan = (code) => {
    const { actions } = this.props;
    const address = addressUtil.splitAddressTag(code)
    actions.updateFormField("withdrawAddress", address.newAddress);
    actions.updateFormField("coinTag", address.newTag);
  };

  handleScanClick = () => {
    const { actions } = this.props;

    actions.navigateTo("QRScanner", {
      onScan: this.handleScan
    });
  };

  render() {
    const { coin, balanceCrypto, balanceUsd } = this.state;
    const { formData, actions } = this.props;
    const style = WithdrawalAddressConfirmationStyle();
    let tagText;
    let placeHolderText;

    if (formData.coin && formData.coin.toLowerCase() === "xrp") {
      tagText = "What is XRP Destination tag";
      placeHolderText = "Destination Tag";
    } else if (formData.coin && formData.coin.toLowerCase() === "xlm") {
      tagText = "What is XLM Memo Id";
      placeHolderText = "Memo Id";
    }

    const explainText = `Your ${formData.coin} withdrawal address is not set. Please, enter the address, or scan QR code.`;
    const hasTag = addressUtil.hasCoinTag(formData.coin)

    return (
      <RegularLayout>
        <BalanceView opacity={0.65} coin={coin} crypto={balanceCrypto} usd={balanceUsd} />

        <View style={style.coinAmountContainer}>
          <CelText type={"H2"}>{formData.coin}</CelText>
          <CelText type={"H1"} weight={"semi-bold"}>{formatter.getEllipsisAmount(formData.amountCrypto, -5)}</CelText>
          <CelText color={"gray"} type={"H3"}>{formatter.usd(formData.amountUsd)}</CelText>
        </View>

        <View style={style.containerWithMargin}>
          <CelText type={"H4"}>{explainText}</CelText>
        </View>

        <CelInput
          field="withdrawAddress"
          placeholder={"Withdrawal address"}
          value={formData.withdrawAddress}
          multiline
          returnKeyType={hasTag ? "next" : "done"}
          blurOnSubmiting={!hasTag}
          onSubmitEditing={() => {if(hasTag)this.tag.focus()}}
        />

        <View style={style.containerWithMargin}>
          <TouchableOpacity onPress={this.handleScanClick}>
            <CelText type={"H5"} style={style.tagText}>Scan QR Code</CelText>
          </TouchableOpacity>
        </View>

        {!!hasTag &&
          <React.Fragment>
            <CelInput
              placeholder={placeHolderText}
              value={formData.coinTag}
              field={`coinTag`}
              margin={"10 0 10 0"}
              refs={(input) => {this.tag = input}}
            />

            <View style={{ marginBottom: 10, alignSelf: "flex-start" }}>
              <CelText type={"H5"} style={style.tagText}>{tagText}</CelText>
            </View>
          </React.Fragment>
        }
        {cryptoUtil.isERC20(formData.coin.toLowerCase()) ? 
        <InfoBox
          color={"white"}
          backgroundColor={STYLES.COLORS.ORANGE}
          titleText={"Note: we use a smart-contract to send ERC20 tokens, some wallets do not support such transactions."}
          left
        />
        : 
        <InfoBox
          color={"white"}
          backgroundColor={STYLES.COLORS.ORANGE}
          titleText={"Once you choose a wallet address to withdraw to, you will not be able to change it without contacting our support at app@celsius.network."}
          left
        />
        }
        <View style={style.button}>
          <CelButton
            disabled={!formData.withdrawAddress}
            onPress={actions.setCoinWithdrawalAddress}
          >
            Confirm withdrawal
          </CelButton>
        </View>

      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawCreateAddress);
