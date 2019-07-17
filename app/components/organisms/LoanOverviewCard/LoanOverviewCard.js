import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import LoanOverviewCardStyle from "./LoanOverviewCard.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import Icon from "../../atoms/Icon/Icon";
import formatter from "../../../utils/formatter";
import CircularProgressBar from "../../graphs/CircularProgressBar/CircularProgressBar";

class LoanOverviewCard extends Component {

  static propTypes = {
    loan: PropTypes.instanceOf(Object),
    onPressDetails: PropTypes.func,
  };
  static defaultProps = {
    payed: false,
    loanSettings: false
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loan, onPressDetails } = this.props;
    const style = LoanOverviewCardStyle();

    return (
      <View style={style.container}>
        <Card padding={"0 0 0 0"}>
          <View style={style.info}>
            <View style={style.status}>
              <Icon name={"TransactionLoan"} fill={loan.color} width={"25"} height={"25"}/>
              <CelText type={"H5"} color={loan.color} margin={"0 5 0 0"}>{loan.displayText}</CelText>
            </View>
            <CelText type={"H2"} weight={"600"} margin={"5 0 5 0"}>{`$ ${loan.loan_amount}`}</CelText>
            <CelText type={"H6"}>{`Loan initiated: ${moment(loan.created_at).format("MMMM DD, YYYY")}`}</CelText>
            {loan.displayText === "Loan pending" &&
            <Card color={"#737A82"} margin={"30 0 0 0"}>
              <CelText type={"H7"}>Someone from our team is already reviewing your request. You will be notified when
                your request is approved.</CelText>
            </Card>
            }
          </View>

          {(Number(loan.monthly_payment) !== 0) &&
          <View>
            <Separator size={2} margin={"0 0 10 0"}/>
            <View style={style.interest}>
              <View>
                <CelText type={"H6"} weight={"300"}>Monthly interest</CelText>
                <CelText type={"H3"} weight={"600"}>{formatter.usd(loan.monthly_payment)}</CelText>
                <CelText type={"H6"} weight={"300"} margin={"15 0 0 0"}>Total interest</CelText>
                <CelText type={"H3"} weight={"600"}>{formatter.usd(loan.total_interest)}</CelText>
                <Card color={"#737A82"} padding={"5 5 5 5"}>
                  <CelText type={"H7"} weight={"300"}>{"-XX if payed in CEL"}</CelText>
                </Card>
              </View>
              <View style={style.progress}>
                <CircularProgressBar amountLoaned={100} amountPaid={50}/>
              </View>
            </View>
          </View>
          }
          <Separator size={2} margin={"30 0 0 0"}/>
          <View style={style.buttonContainer}>
            <CelButton
              onPress={onPressDetails}
              basic
              textSize={"H6"}
            >
              Loan Details
            </CelButton>
            {loan.settings &&
            <View>
              <Separator vertical/>
              <CelButton
                onPress={onPressDetails}
                basic
                textSize={"H6"}
              >
                Loan Settings
              </CelButton>
            </View>
            }
          </View>
          {loan.paid &&
          <View>
            <Separator size={2} margin={"0 0 0 0"}/>
            <CelButton
              onPress={onPressDetails}
              margin={"15 0 15 0"}
              color="green"
            >
              Payout Principal
            </CelButton>
          </View>
          }
        </Card>
      </View>
    );
  }
}

export default LoanOverviewCard;

