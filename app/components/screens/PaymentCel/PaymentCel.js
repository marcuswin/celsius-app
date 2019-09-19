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
import { LOAN_PAYMENT_REASONS } from "../../../constants/UI";

@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo,
    loanSettings: state.loans.loanSettings
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

  static navigationOptions = ({ navigation }) => {
    const reason = navigation.getParam("reason");

    let title = "Pay with CEL"
    if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
      title = "Prepay with CEL"
    }

    return {
      title,
      right: "info"
    }
  };

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
    }
  }

  navigate = async () => {
    const {actions, navigation} = this.props;
    const reason = navigation.getParam("reason");
    const id = navigation.getParam("id");

    if (reason) {
       await actions.updateLoanSettings(id, {interest_payment_asset: "CEL"})
       actions.showMessage("success", "You have successfully changed interest payment method")

      return actions.navigateTo("LoanSettings")
     }

    actions.navigateTo("LoanPrepaymentPeriod", { coin: "CEL", id })
  };

  payInCel = async () => {
    const { actions, navigation } = this.props
    const reason = navigation.getParam("reason");
    const id = navigation.getParam("id");

    if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
      actions.updateFormField('coin', 'CEL')
      actions.navigateTo('LoanPrepaymentPeriod', { id, reason })
    }

    if (reason === LOAN_PAYMENT_REASONS.INTEREST) {
      this.setState({ isLoading: true })
      await actions.updateLoanSettings(id, {interest_payment_asset: "CEL"})
      actions.showMessage("success", "You have successfully changed interest payment method")
      actions.navigateTo('ChoosePaymentMethod', { id, reason })
      this.setState({ isLoading: false })
    }

  }

  render() {
    // const style = PaymentCelCelStyle();
    const { actions } = this.props;
    const { isLoading } = this.state;

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
          <Separator margin={"10 0 12 0"}/>
          <CelText>
            Decrease your monthly interest payment from{" "}
            <CelText weight={"500"}>$XX</CelText> to{" "}
            <CelText weight={"500"}>$XX</CelText> when paying with CEL.
          </CelText>
        </Card>
        <CelButton
          margin={"20 0 0 0"}
          onPress={this.payInCel}
          loading={isLoading}
          disabled={isLoading}
        >
          Pay with CEL
        </CelButton>
      </RegularLayout>
    );
  }
}

export default PaymentCel;
