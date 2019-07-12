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
    const status = loan.uiProps;
    return {
      title: `${status.displayText} Details`,
      right: "profile"
    };
  };

  constructor(props) {
    super(props);

    const { navigation } = props;
    const loan = navigation.getParam("loan");
    const loanStatusDetails = loan.uiProps;

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

  renderSection = (sectionType) => {
    const { transaction } = this.props;
    const { loan, loanStatusDetails } = this.state;

    switch(sectionType) {
      case "completion:date":
        return <BasicSection key={sectionType} label={"Loan Completion Date"} value={moment(transaction.loan_data.initiation_date).format("D MMM YYYY")}/>;
      case "rejection:date":
        return <BasicSection key={sectionType} label={"Loan Rejection Date"} value={moment(transaction.loan_data.initiation_date).format("D MMM YYYY")}/>;
      case "cancellation:date":
        return <BasicSection key={sectionType} label={"Loan Cancellation Date"} value={moment(transaction.loan_data.initiation_date).format("D MMM YYYY")}/>;
      case "initiation:date":
        return <BasicSection key={sectionType} label={"Loan Initiation Date"} value={moment(transaction.loan_data.initiation_date).format("D MMM YYYY")}/>;
      case "unlocked:collateral":
        return <CardSection key={sectionType}
                            title={loanStatusDetails.collateral}
                            coin={transaction.coin}
                            coinAmount={transaction.loan_data.loan_collateral_crypto}/>;
      case "estimated:collateral":
        return <CardSection key={sectionType}
                            title={loanStatusDetails.collateral}
                            cardText={["Loan rejected", "Loan canceled"].includes(loanStatusDetails.displayText) ? null : "Exact collateral amount would be determined upon approval"}
                            coin={transaction.coin}
                            coinAmount={transaction.loan_data.loan_collateral_crypto}/>;
      case "collateral":
        return <CardSection key={sectionType}
                            title={loanStatusDetails.collateral}
                            coin={transaction.coin}
                            coinAmount={transaction.loan_data.loan_collateral_crypto}/>;
      case "term":
        return <BasicSection key={sectionType} label={"Term Length"} value={`${loan.term_of_loan} months`}/>;
      case "annualInterest":
        return <BasicCardSection key={sectionType} label={"Annual Interest Rate"} coin={transaction.coin}
                                 value={transaction.loan_data.annual_interest_rate}
                                 monthly={transaction.loan_data.monthly_interest_payment}
                                 total={transaction.loan_data.total_interest_payment}/>;
      case "marginCall":
        return <CardSection key={sectionType} title={"BTC Margin Call At:"} amount={30}
                            cardText={"If BTC drops below $xxxx you will get a notification asking for additional collateral."}/>;
      case "liquidation":
        return  <CardSection key={sectionType} title={"Liquidation At:"} amount={50}
                             cardText={"If BTC drops below $xxx we will sell some of your collateral to cover the margin."}/>;
      case "firstInterest":
        return  <BasicSection key={sectionType} label={"First Interest Payment Due"}/>;
      case "nextInterest":
        return  <BasicSection key={sectionType} label={"Next Interest Payment Due"}/>;
      case "maturity":
        return <BasicSection key={sectionType} label={"Maturity Date"} noSeparator/>
      default:
        break;
    }
  };

  render() {
    const { transaction, actions } = this.props;
    const { loan, loanStatusDetails } = this.state;
    const style = LoanRequestDetailsStyle();

    if (!transaction) return <LoadingScreen/>;

    const sections = loan.uiSections;

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

         {sections.map(this.renderSection)}

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
