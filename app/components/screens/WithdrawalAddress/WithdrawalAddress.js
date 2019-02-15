import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import WithdrawalAddressStyle from "./WithdrawalAddress.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import BalanceView from "../../atoms/BalanceView/BalanceView";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import { heightPercentageToDP } from "../../../utils/styles-util";

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

        <View>
          <CelText>Your coins will be sent to:</CelText>
          <Card><CelText>120948102931023u4-12341283u481234</CelText></Card>
        </View>

        <InfoBox
          triangle
          color={"white"}
          backgroundColor={STYLES.COLORS.ORANGE}
          titleText={"Your withdrawal address"}
          left
          explanationText={"Confirm this is the address you wish to send your funds to. If you transferred money from an exchange, this may not be the correct address. If you need to change your withdrawal address, please contact our support."}
        />
        <CelButton
          onPress={() => actions.navigateTo("WithdrawalAddressConfirmed")}
        >
          Confirm withdrawal
        </CelButton>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawalAddress);
