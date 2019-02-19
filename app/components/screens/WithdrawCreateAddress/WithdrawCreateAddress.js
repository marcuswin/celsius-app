import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import addressUtil from "../../../utils/address-util";
import * as appActions from "../../../redux/actions";
// import WithdrawalAddressConfirmationStyle from "./WithdrawCreateAddress.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import BalanceView from "../../atoms/BalanceView/BalanceView";
import { heightPercentageToDP } from "../../../utils/styles-util";
import formatter from "../../../utils/formatter";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import CelInput from "../../atoms/CelInput/CelInput";
import { COLORS } from "../../../config/constants/style";


@connect(
  state => ({
    walletSummary: state.wallet.summary,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    formData: state.forms.formData,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawCreateAddress extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    const { formData, walletSummary } = props;
    const coin = formData.coin;
    const coinData = walletSummary.coins.filter(c => c.short === coin.toUpperCase())[0];

    this.state = {
      header: {
        title: "Withdrawal address",
        left: "back",
        right: "profile"
      },
      coin,
      balanceCrypto: coinData.amount,
      balanceUsd: coinData.amount_usd
    };
  }

  handleWithdrawalAddressChange = (field, text) => {
    const { actions } = this.props;

    actions.updateFormField(field, text);
  };

  handleScan = (code) => {
    const { coin } = this.state;
    const fieldName = `${coin}WithdrawalAddress`;

    this.handleWithdrawalAddressChange(fieldName, code);
  };

  handleScanClick = () => {
    const { actions } = this.props;

    actions.navigateTo("QrScanner", {
      onScan: this.handleScan
    });
  };

  confirmWithdrawal = () => {
    const {formData, actions} = this.props;
    const address = addressUtil.joinAddressTag(formData)

    actions.setCoinWithdrawalAddress(formData.coin, address)
  };

  renderInputFields(tag) {
    const { formData } = this.props;
    let tagText;
    let placeHolderText;

    if (formData.coin.toLowerCase() === "xrp") {
      tagText = "What is XRP Destination tag";
      placeHolderText = "Destination Tag";
    } else if (formData.coin.toLowerCase() === "xlm") {
      tagText = "What is XLM Memo Id";
      placeHolderText = "Memo Id";
    }

    if (["xrp", "xlm"].includes(formData.coin.toLowerCase())) {
      return (
        <React.Fragment>
          <CelInput
            placeholder={placeHolderText}
            value={tag}
            field={`coinTag`}
            margin={"10 0 10 0"}
          />

          <View style={{ marginBottom: 10, alignSelf: "flex-start" }}>
            <TouchableOpacity>
              <CelText type={"H5"} style={[{
                color: COLORS.blue,
                textAlign: "left"
              }]}>{tagText}</CelText>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      );
    }
  };


  render() {
    const { header, coin, balanceCrypto, balanceUsd } = this.state;
    const { formData } = this.props;
    let tagText;
    let placeHolderText;


    if (formData.coin.toLowerCase() === "xrp") {
      tagText = "What is XRP Destination tag";
      placeHolderText = "Destination Tag";
    } else if (formData.coin.toLowerCase() === "xlm") {
      tagText = "What is XLM Memo Id";
      placeHolderText = "Memo Id";
    }

    const explainText = `Your ${formData.coin} withdrawal address is not set. Please, enter the address, or scan QR code.`;

    const hasTag = addressUtil.hasCoinTag(formData.coin)
    const address = {}


    return (
      <RegularLayout header={header}>
        <BalanceView opacity={0.65} coin={coin} crypto={balanceCrypto} usd={balanceUsd}/>

        <View style={{
          marginTop: heightPercentageToDP("5.56%"),
          marginBottom: heightPercentageToDP("5.56%"),
          alignItems: "center"
        }}>
          <CelText type={"H2"}>{formData.coin}</CelText>
          <CelText type={"H1"}>{formatter.crypto(formData.amountCrypto)}</CelText>
          <CelText color={"gray"} type={"H3"}>{formatter.usd(formData.amountUsd)}</CelText>
        </View>

        <View style={{ alignSelf: "flex-start" }}>
          <CelText type={"H4"} style={{ marginBottom: 10 }}>{explainText}</CelText>
        </View>

          <CelInput
            field="withdrawAddress"
            placeholder={"Withdrawal address"}
            value={formData.withdrawAddress}
            multiline
          />

        <View style={{ marginBottom: 10, alignSelf: "flex-start" }}>
          <TouchableOpacity onPress={this.handleScanClick}>
            <CelText type={"H5"} style={[{
              color: COLORS.blue,
              textAlign: "left"
            }]}>Scan QR Code</CelText>
          </TouchableOpacity>
        </View>

        { !!hasTag &&
          <React.Fragment>
            <CelInput
              placeholder={placeHolderText}
              value={address.newTag}
              field={`coinTag`}
              margin={"10 0 10 0"}
            />

            <View style={{ marginBottom: 10, alignSelf: "flex-start" }}>
              <TouchableOpacity>
                <CelText type={"H5"} style={[{
                  color: COLORS.blue,
                  textAlign: "left"
                }]}>{tagText}</CelText>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        }

        <InfoBox
          color={"white"}
          backgroundColor={STYLES.COLORS.ORANGE}
          titleText={"Once you choose a wallet address to withdraw to, you will not be able to change it without contacting our support."}
          left
        />
        <View style={{ marginBottom: heightPercentageToDP("7%"), marginTop: heightPercentageToDP("3.26%") }}>
          <CelButton
            onPress={() => this.confirmWithdrawal}
          >
            Confirm withdrawal
          </CelButton>
        </View>

      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawCreateAddress);
