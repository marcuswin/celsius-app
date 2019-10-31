import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import BorrowChooseLoanStyle from "./BorrowChooseLoan.styles";
import CelText from "../../atoms/CelText/CelText";
import HeadingProgressBar from "../../atoms/HeadingProgressBar/HeadingProgressBar";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { getPadding } from "../../../utils/styles-util";
import PaymentCard from "../../organisms/PaymentCard/PaymentCard";

@connect(
  state => ({
    loanCompliance: state.compliance.loan,
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    minimumLoanAmount: state.generalData.minimumLoanAmount,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowChooseLoan extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Borrow",
    right: "profile",
    left: "back",
  });

  getCardProps = () => {
    const { actions } = this.props;

    const cardDetails = [
      {
        cardTitle: "Borrow Dollars",
        cardCopy: "Take out a cash loan against your crypto.",
        lightImage: require("../../../../assets/images/illustration-borrow-dollars.png"),
        darkImage: require("../../../../assets/images/illustration-borrow-dollars.png"),
        onPressAction: () => actions.navigateTo("LoanPaymentCoin"),
      },
      {
        cardTitle: "Borrow Stablecoins",
        cardCopy: "Choose a stable coin to take your loan in.",
        lightImage: require("../../../../assets/images/illustration-borrow-stablecoins.png"),
        darkImage: require("../../../../assets/images/illustration-borrow-stablecoins.png"),
        onPressAction: () => actions.navigateTo("LoanPaymentCoin"),
      },
    ];

    return cardDetails;
  };

  render() {
    // const style = BorrowChooseLoanStyle();
    const cardDetails = this.getCardProps();

    return (
      <RegularLayout padding="0 0 0 0" fabType={"hide"}>
        <HeadingProgressBar steps={6} currentStep={1} />
        <View
          style={[
            { flex: 1, width: "100%", height: "100%" },
            { ...getPadding("20 20 100 20") },
          ]}
        >
          <CelText align="center" type="H4" weight="300" margin="0 0 20 0">
            What type of currency would you like to borrow?
          </CelText>
          {cardDetails.map(i => <PaymentCard {...i} key={i.cardTitle} />)}
        </View>
      </RegularLayout>
    );
  }
}

export default BorrowChooseLoan;
