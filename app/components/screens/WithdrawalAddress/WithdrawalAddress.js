import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import WithdrawalAddressStyle from "./WithdrawalAddress.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import BalanceView from "../../atoms/BalanceView/BalanceView";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import { heightPercentageToDP } from "../../../utils/styles-util";
import CelInput from "../../atoms/CelInput/CelInput";
import { COLORS } from "../../../config/constants/style";
import addressUtil from "../../../utils/address-util";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawalAddress extends Component {

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

  render() {
    const { header, coin, balanceCrypto, balanceUsd } = this.state;
    const { formData, actions } = this.props;
    let tagText;
    let placeHolderText;

    if (formData.coin.toLowerCase() === "xrp") {
      tagText = "What is XRP Destination tag";
      placeHolderText = "Destination Tag";
    } else if (formData.coin.toLowerCase() === "xlm") {
      tagText = "What is XLM Memo Id";
      placeHolderText = "Memo Id";
    }

    const address = formData[`${coin}WithdrawalAddress`] ? addressUtil.addressTag(formData[`${coin}WithdrawalAddress`]) : "";
    // const style = WithdrawalAddressStyle();

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

        <View style={{ alignSelf: "flex-start", marginBottom: 10 }}>
          <CelText>Your coins will be sent to:</CelText>
        </View>

        <CelInput
          field={`${coin}WithdrawalAddress`}
          placeholder={"Withdrawal address"}
          value={address.newAddress}
          multiline
          numberOfLines={2}
        />

        <InfoBox
          triangle
          color={"white"}
          backgroundColor={STYLES.COLORS.ORANGE}
          titleText={"Your withdrawal address"}
          left
          explanationText={"Confirm this is the address you wish to send your funds to. If you transferred money from an exchange, this may not be the correct address. If you need to change your withdrawal address, please contact our support."}
        />

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

        <InfoBox
          left
          color={"white"}
          backgroundColor={STYLES.COLORS.ORANGE}
          titleText={"To prevent a permanent loss of your funds, please check if your address has a destination tag."}
        />

        <View style={{ marginBottom: heightPercentageToDP("7%"), marginTop: heightPercentageToDP("3.26%") }}>
          <CelButton
            onPress={() => actions.navigateTo("WithdrawalAddressConfirmation")}
          >
            Confirm withdrawal
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawalAddress);
