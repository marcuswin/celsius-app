import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Constants } from "expo";
import get from 'lodash/get';

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import CelInput from "../../atoms/CelInput/CelInput";
import CelForm from "../../atoms/CelForm/CelForm";
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import Steps from "../../molecules/Steps/Steps";
import CelSlider from "../../molecules/CelSlider/CelSlider";
import formatter from "../../../utils/formatter";
import testUtil from "../../../utils/test-util";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/scale";
import BrwEnterAmountStyle from "./BrwEnterAmount.styles";
import Separator from "../../atoms/Separator/Separator";

const { MIN_LOAN_AMOUNT } = Constants.manifest.extra;

@connect(
  state => ({
    eligibleCurrencies: state.wallet.currencies.filter(wc => state.users.compliance.loan.coins.indexOf(wc.currency.short.toUpperCase()) !== -1),
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
    walletTotal: state.wallet.total,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class BRWEnterAmount extends Component {
  constructor(props) {
    super(props);

    const { eligibleCurrencies } = props;
    this.state = {
      maxAmount: eligibleCurrencies.reduce((max, element) => element.total > max ? element.total : max, 0) / 2
    };
  }

  submitAmount = () => {
    const { formData, actions } = this.props;
    const { maxAmount } = this.state;

    if (!formData.amount) return actions.showMessage("error", "Please enter an amount you wish to borrow");
    if (Number(formData.amount) < MIN_LOAN_AMOUNT) return actions.showMessage("warning", `Minimum loan starts at ${formatter.usd(MIN_LOAN_AMOUNT)}`);
    if (Number(formData.amount) > maxAmount) return actions.showMessage("warning", "Insufficient funds");

    actions.navigateTo("BRWChooseCollateral");
  };

  render() {
    const { formData, actions, walletTotal } = this.props;
    const { maxAmount } = this.state;

    const total = get(walletTotal, 'quotes.USD.total', 0);

    if (maxAmount < MIN_LOAN_AMOUNT) {
      return (
        <SimpleLayout
          animatedHeading={{ text: "Enter the amount" }}
        >
          <View style={{ alignItems: "center" }}>
            <Image source={require("../../../../assets/images/happy-monkey3x.png")} style={{
              resizeMode: "contain",
              height: widthPercentageToDP("33%"),
              width: widthPercentageToDP("33%"),
              marginTop: 20,
              marginBottom: 20
            }}/>

            <Text style={BrwEnterAmountStyle.heading}>{`To apply for a loan you only need ${formatter.usd(10000 - total)} in crypto to deposit`}</Text>

            <Text style={BrwEnterAmountStyle.explanation}>Deposit more coins to start your first loan application</Text>

            <View style={{ marginTop: 20 }}>
              <CelButton
                ref={testUtil.generateTestHook(this, "WalletTransactions.AddFunds")}
                onPress={() => actions.navigateTo("AddFunds")}
              >
                Deposit more coins
              </CelButton>
            </View>
          </View>

          <Separator margin="20 0 20 0"/>

          <View style={{ marginTop: 20, backgroundColor: "white", flexDirection: "row",height: heightPercentageToDP("12%"), justifyContent: "space-around", alignItems: "center", borderRadius: 8 }}>
            <View style={{backgroundColor: "white", width: widthPercentageToDP("35%"), height: heightPercentageToDP("10%"), borderRadius: 8, justifyContent: "center", alignItems: "center",}}>
              <Text style={{fontFamily: "agile-medium", fontSize: FONT_SCALE * 14, color: STYLES.GRAY_2,}}>With coin value of:</Text>
              <Text style={{fontFamily: "agile-medium" , fontSize: FONT_SCALE * 26, color: "rgba(65,86,166,1)"}}>{formatter.usd(formData.amountCheck, {precision: 0})}</Text>
            </View>
            <View style={{backgroundColor: '#EEEEEE', width: widthPercentageToDP("35%"), height: heightPercentageToDP("10%"), borderRadius: 8, justifyContent: "center", alignItems: "center",}}>
              <Text style={{fontFamily: "agile-medium" , fontSize: FONT_SCALE * 14, color: STYLES.GRAY_2,}}>You can borrow:</Text>
              <Text style={{fontFamily: "agile-medium" , fontSize: FONT_SCALE * 26}}>{formatter.usd(formData.amountCheck / 2, {precision: 0})}</Text>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <CelSlider
              minimumValue={10000}
              maximumValue={20000}
              step={500}
              value={formData.amountCheck}
              field={"amountCheck"}
              items={[{ label: formatter.usd(10000) }, { label: formatter.usd(20000) }]}
            />
          </View>
        </SimpleLayout>
      );
    }

    return (
      <SimpleLayout
        animatedHeading={{ text: "Enter the amount" }}
      >
        <Steps current={1} totalSteps={5}/>
        <CelForm margin="20 0 0 0">
          <Text style={[globalStyles.normalText, { marginVertical: 15 }]}>How much do you want to borrow?</Text>

          <CelInput
            theme="white"
            type="number"
            labelText={`${formatter.usd(MIN_LOAN_AMOUNT)}`}
            value={formData.amount ? formData.amount.toString() : ""}
            field="amount"
          />

          <CelSlider
            minimumValue={MIN_LOAN_AMOUNT}
            maximumValue={maxAmount}
            step={100}
            value={formData.amount}
            field={"amount"}
            items={[{ label: formatter.usd(MIN_LOAN_AMOUNT) }, { label: formatter.usd(maxAmount) }]}
          />
        </CelForm>

        <CelButton
          margin="40 0 0 0"
          color="blue"
          onPress={this.submitAmount}
        >
          Choose a collateral
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default testUtil.hookComponent(BRWEnterAmount);
