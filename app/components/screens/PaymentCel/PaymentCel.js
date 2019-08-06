import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

// import PaymentCelStyle from "./PaymentCel.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PaymentCel extends Component {
  static propTypes = {
    payInCelRatio: PropTypes.number
  };
  static defaultProps = {
    payInCelRatio: 0.1
  };

  static navigationOptions = () => ({
    title: "Pay with CEL",
    right: "info"
  });

  // TODO (srdjan) make interest in cel ratio calculation
  // getPayInCelRatio = () => {
  //   const { loyaltyInfo } = this.props
  //
  // }

  render() {
    // const style = PaymentCelCelStyle();
    const { actions } = this.props;

    const percentageNumber = 16; // TODO (srdjan) this number is from BE, calculated or hardcoded?

    return (
      <RegularLayout fabType={"hide"}>
        <Card>
          <CelText align={"center"}>
            Based on your current{" "}
            <CelText
              onPress={() => actions.navigateTo("LoyaltyProgram")}
              style={{ color: STYLES.COLORS.CELSIUS_BLUE }}
            >
              Loyalty Level
            </CelText>, your next interest payment would be:
          </CelText>
          <CelText type={"H1"} weight={"700"} align={"center"}>
            {percentageNumber}% less
          </CelText>
          <Separator margin={"10 0 12 0"} />
          <CelText>
            Decrease your monthly interest payment from{" "}
            <CelText weight={"500"}>$XX</CelText> to{" "}
            <CelText weight={"500"}>$XX</CelText> when paying with CEL.
          </CelText>
        </Card>
        <CelButton
          margin={"20 0 0 0"}
          onPress={() => {
            actions.navigateTo("LoanPrepaymentPeriod", { coin: "CEL" });
          }}
        >
          Pay with CEL
        </CelButton>
      </RegularLayout>
    );
  }
}

export default PaymentCel;
