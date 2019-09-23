import React, { Component } from "react";
import { View } from "react-native";
import _ from "lodash";
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
import { LOAN_STATUS } from "../../../constants/DATA";
import formatter from "../../../utils/formatter";
import LoanApplicationSuccessModal from "../../organisms/LoanApplicationSuccessModal/LoanApplicationSuccessModal";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
    activeLoan: state.loans.activeLoan,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanRequestDetails extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = ({ navigation }) => {
    const hideBack = navigation.getParam("hideBack")

    return {
      title: `Loan Details`,
      right: "profile",
      hideBack,
    };
  }


  constructor(props) {
    super(props);

    const { navigation, actions } = props;
    const loanId = navigation.getParam("id");
    actions.setActiveLoan(loanId)
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.activeLoan, this.props.activeLoan)) {
      this.props.navigation.setParams({
        title: `${this.props.activeLoan.uiProps.displayText} Details`
      })
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { navigation, activeLoan, actions } = this.props
  //   const loanId = nextProps.navigation.getParam("id");
  //
  //   if (activeLoan) {}
  //
  //   actions.setActiveLoan(loanId)
  //
  //
  // }

  renderSection = (sectionType) => {
    const { activeLoan } = this.props;

    switch(sectionType) {
      case "completion:date":
        return <BasicSection key={sectionType} label={"Loan Completion Date"} value={moment(activeLoan.maturity_date).format("D MMM YYYY")}/>;
      case "rejection:date":
        return <BasicSection key={sectionType} label={"Loan Rejection Date"} value={moment(activeLoan.approved_at).format("D MMM YYYY")}/>;
      case "cancellation:date":
        return <BasicSection key={sectionType} label={"Loan Cancellation Date"} value={moment(activeLoan.canceled_at).format("D MMM YYYY")}/>;
      case "initiation:date":
        return <BasicSection key={sectionType} label={"Loan Initiation Date"} value={moment(activeLoan.created_at).format("D MMM YYYY")}/>;
      case "unlocked:collateral":
        return <BasicSection key={sectionType} label={"Unlocked Collateral"} value={formatter.crypto(activeLoan.amount_collateral_crypto, activeLoan.collateral_coin)}/>;
      case "estimated:collateral":
        return <CardSection key={sectionType}
                            title={activeLoan.uiProps.collateral}
                            cardText={[LOAN_STATUS.PENDING].includes(activeLoan.status) && "Exact collateral amount would be determined upon approval"}
                            coin={activeLoan.collateral_coin}
                            coinAmount={activeLoan.loan_collateral_crypto}/>;
      case "collateral":
        return <BasicSection key={sectionType} label={"Locked Collateral"} value={formatter.crypto(activeLoan.amount_collateral_crypto, activeLoan.collateral_coin)}/>;
      case "term":
        return <BasicSection key={sectionType} label={"Term Length"} value={`${activeLoan.term_of_loan} months`}/>;
      case "annualInterest":
        return <BasicCardSection key={sectionType} label={"Annual Interest Rate"} coin={activeLoan.coin_loan_asset}
                                 value={activeLoan.interest}
                                 monthly={activeLoan.monthly_payment}
                                 total={activeLoan.total_interest}/>;
      case "marginCall":
        return activeLoan.margin_call && <CardSection key={sectionType} title={`${activeLoan.margin_call.collateral_coin} Margin Call At:`} amount={activeLoan.margin_call.margin_call_usd_amount}
                            cardText={`If ${activeLoan.margin_call.collateral_coin} drops below ${formatter.usd(activeLoan.margin_call.margin_call_usd_amount)} you will get a notification asking for additional collateral.`} />;
      case "liquidation":
        return activeLoan.margin_call && <CardSection key={sectionType} title={"Liquidation At:"} amount={activeLoan.liquidation_call_price}
                             cardText={`If ${activeLoan.margin_call.collateral_coin} drops below ${formatter.usd(activeLoan.liquidation_call_price)} we will sell some of your collateral to cover the margin.`}/>;
      // case "firstInterest":
      //   return  <BasicSection key={sectionType} label={"First Interest Payment Due"} value={moment(transaction.loan_data.first_interest).format("D MMM YYYY")}/>;
      // case "nextInterest":
      //   return  <BasicSection key={sectionType} label={"Next Interest Payment Due"} value={moment(transaction.loan_data.next_interest).format("D MMM YYYY")}/>;
      case "maturity":
        return <BasicSection key={sectionType} label={"Maturity Date"} noSeparator value={moment(activeLoan.maturity_date).format("D MMM YYYY")}/>;
      default:
        break;
    }
  };

  render() {
    const { actions, activeLoan } = this.props;

    if (!activeLoan) return <LoadingScreen/>;

    const style = LoanRequestDetailsStyle();


    const sections = activeLoan.uiSections;

    return (
      <RegularLayout>
        <View style={style.container}>
          <View style={style.status}>
            <Icon name={"TransactionLoan"} fill={activeLoan.uiProps.color} width={"25"} height={"25"}/>
            <CelText type={"H5"} color={activeLoan.uiProps.color}
                     margin={"0 5 0 0"}>{activeLoan.uiProps.displayText}</CelText>
          </View>
          <CelText type={"H2"} weight={"600"} margin={"5 0 5 0"}>{`$ ${activeLoan.loan_amount}`}</CelText>
        </View>

         {sections.map(this.renderSection)}

        <CelButton
          basic
          onPress={() => actions.navigateTo("WalletLanding")}
          margin={"20 0 0 0"}
        >
          Go back to the wallet
        </CelButton>

        <LoanApplicationSuccessModal loanId={activeLoan.id} />
      </RegularLayout>
    );
  }
}

export default LoanRequestDetails;
