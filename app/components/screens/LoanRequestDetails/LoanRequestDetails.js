import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import LoanRequestDetailsStyle from "./LoanRequestDetails.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";

import { getLoanStatusDetails } from "../../../utils/loan-util";
import Icon from "../../atoms/Icon/Icon";
import { BasicCardSection, BasicSection, CardSection } from "../TransactionDetails/TransactionDetailsSections";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
    transaction: state.transactions.transactionDetails
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanRequestDetails extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = ({ navigation }) => {
    const loan = navigation.getParam("loan");
    const status = getLoanStatusDetails(loan.status);
    return {
      title: `${status.displayText} Details`,
      right: "profile"
    };
  };

  constructor(props) {
    super(props);

    const { navigation } = props;
    const loan = navigation.getParam("loan");
    const loanStatusDetails = getLoanStatusDetails(loan.status);

    this.state = {
      loan,
      loanStatusDetails
    };
  }

  componentDidMount() {
    const { actions, navigation } = this.props;
    const transactionId = navigation.getParam("id");
    actions.getTransactionDetails(transactionId);
  }

  render() {
    const { transaction, actions } = this.props;
    const { loan, loanStatusDetails } = this.state;
    const style = LoanRequestDetailsStyle();

    // console.log("transaction", transaction, "loan", loan);

    if (!transaction) return <LoadingScreen/>;

    return (
      <RegularLayout>
        <View style={style.container}>
          <View style={style.status}>
            <Icon name={"TransactionLoan"} fill={loanStatusDetails.color} width={"25"} height={"25"}/>
            <CelText type={"H5"} color={loanStatusDetails.color}
                     margin={"0 5 0 0"}>{loanStatusDetails.displayText}</CelText>
          </View>
          <CelText type={"H2"} weight={"600"} margin={"5 0 5 0"}>{`$ ${loan.loan_amount}`}</CelText>
        </View>
        {loanStatusDetails.displayText === "Loan rejected" &&
        <BasicSection label={"Loan Rejection Date"}
                      value={moment(transaction.loan_data.initiation_date).format("D MMM YYYY")}/>
        }
        <BasicSection label={"Loan Initiation Date"}
                      value={moment(transaction.loan_data.initiation_date).format("D MMM YYYY")}/>
        <CardSection title={loanStatusDetails.collateral}
                     cardText={loanStatusDetails.displayText === "Loan pending" ? "Exact collateral amount would be determined upon approval" : null}
                     coin={transaction.coin}
                     coinAmount={transaction.loan_data.loan_collateral_crypto}/>
        <BasicSection label={"Term Length"} value={`${loan.term_of_loan} months`}/>
        <BasicCardSection label={"Annual Interest Rate"} coin={transaction.coin}
                          value={transaction.loan_data.annual_interest_rate}
                          monthly={transaction.loan_data.monthly_interest_payment}
                          total={transaction.loan_data.total_interest_payment}/>
        {loanStatusDetails.displayText !== "Loan rejected" &&
        <View>
          <CardSection title={"BTC Margin Call At:"} amount={30}
                       cardText={"If BTC drops below $xxxx you will get a notification asking for additional collateral."}/>
          <CardSection title={"Liquidation At:"} amount={50}
                       cardText={"If BTC drops below $xxx we will sell some of your collateral to cover the margin."}/>
          <BasicSection label={"First Interest Payment Due"}/>
          <BasicSection label={"Maturity Date"} noSeparator/>
        </View>
        }
        <CelButton
          basic
          onPress={() => actions.navigateTo("WalletLanding")}
          margin={"20 0 0 0"}
        >
          Go back to the wallet
        </CelButton>
      </RegularLayout>
    );
  }
}

export default LoanRequestDetails;
