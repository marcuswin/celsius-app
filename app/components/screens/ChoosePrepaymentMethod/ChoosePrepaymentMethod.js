import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import ChoosePrepaymentMethodStyle from "./ChoosePrepaymentMethod.styles";
import PaymentCard from "../../organisms/PaymentCard/PaymentCard";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import PrepayDollarInterestModal from "../../organisms/PrepayDollarInterestModal/PrepayDollarInterestModal";
import { MODALS } from "../../../constants/UI";

@connect(
  state => ({
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ChoosePrepaymentMethod extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Prepay interest",
    right: "profile",
    left: "back"
  });

  getCardProps = () => {
    const { actions } = this.props;
    const number = 12; // TODO (srdjan) this number is from BE, calculating based on cel ratio, or hardcoded?

    const cardProps = [
      {
        cardTitle: "Prepay with CEL",
        cardCopy: `Pay up to ${number}% less interest when you choose to prepay your monthly payment in CEL.`,
        onPressAction: () => actions.navigateTo("PaymentCel"),
        lightImage: require("../../../../assets/images/icons/cel.png"),
        darkImage: require("../../.././../assets/images/icons/cel-dark.png"),
        isPaymentCel: true
      },
      {
        cardTitle: "Prepay with crypto",
        cardCopy: "Use coins from your wallet to prepay your loan interest.",
        onPressAction: () => actions.navigateTo("LoanPaymentCoin"),
        lightImage: require("../../../../assets/images/icons/crypto.png"),
        darkImage: require("../../.././../assets/images/icons/crypto-dark.png"),
        isPaymentCel: false
      },
      {
        cardTitle: "Prepay with Dollars",
        cardCopy:
          "Get all the information necessary to prepay your interest in dollars.",
        onPressAction: () =>
          actions.openModal(MODALS.PREPAY_DOLLAR_INTEREST_MODAL),
        lightImage: require("../../../../assets/images/icons/dollars.png"),
        darkImage: require("../../.././../assets/images/icons/dollars-dark.png"),
        isPaymentCel: false
      }
    ];

    return cardProps;
  };

  render() {
    const style = ChoosePrepaymentMethodStyle();

    const cardProps = this.getCardProps();

    return (
      <View style={style.container}>
        <RegularLayout>
          {cardProps.map(i => (
            <PaymentCard
              key={i.cardTitle}
              cardTitle={i.cardTitle}
              cardCopy={i.cardCopy}
              onPressAction={i.onPressAction}
              lightImage={i.lightImage}
              isPaymentCel={i.isPaymentCel}
              darkImage={i.darkImage}
            />
          ))}
        </RegularLayout>
        <PrepayDollarInterestModal />
      </View>
    );
  }
}

export default ChoosePrepaymentMethod;
