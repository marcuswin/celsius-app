
import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

// import WiringBankInformationStyle from "./WiringBankInformation.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WiringBankInformation extends Component {

  static navigationOptions = () => ({
    title: "Wiring Information",
    right: "info"
  });

  render() {
    const { actions } = this.props;
    return (
      <RegularLayout fabType={"hide"}>
        <CelText align={"center"}>
          Use the wire transfer details provided below to complete your
          prepayment in USD.
        </CelText>
        <Separator text="Wiring Information" />
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>Beneficiary Account:</CelText>
          <CelText>1503222589</CelText>
        </View>
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>Beneficiary Name:</CelText>
          <CelText>Celsius Network Limited</CelText>
        </View>
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>Beneficiary Address:</CelText>
          <CelText>
            35 GREAT ST HELENS, LONDON, UNITED KINGDOM, EC3A 6AP
          </CelText>
        </View>
        <Separator text="Beneficiary bank details" />
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>Beneficiary Bank:</CelText>
          <CelText>Signature Bank</CelText>
        </View>
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>ABA / Routing Number:</CelText>
          <CelText>026013576</CelText>
        </View>
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>Beneficiary Bank Address:</CelText>
          <CelText>565 Fifth Avenue, New York, NY 10017</CelText>
        </View>

        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>(International) SWIFT Code:</CelText>
          <CelText>SIGNUS33XXX</CelText>
        </View>
        {/* <Card>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>Download Info</View>
            <View style={{ flex: 1 }}>Share Info</View>
          </View>
        </Card> */}
        <CelButton
          margin="50 0 30 0"
          iconRight="IconArrowRight"
          onPress={() => {
            actions.navigateTo("LoanPaymentCoin");
          }}
        >
          Continue
        </CelButton>
      </RegularLayout>
    );
  }
}

export default WiringBankInformation;
