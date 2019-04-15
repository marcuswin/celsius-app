import React, { Component } from 'react';
import { Text, View } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import moment from 'moment';

import * as appActions from "../../../redux/actions";
import BrwLoanDetailsStyle from "./BrwLoanDetails.styles";
import { COLORS, STYLES } from "../../../config/constants/style";
import Icon from "../../atoms/Icon/Icon";
import formatter from '../../../utils/formatter';
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import Separator from "../../atoms/Separator/Separator";
import { LOAN_STATUSES } from "../../../config/constants/common";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BrwLoanDetails extends Component {
  constructor(props) {
    super(props);
    const { navigation, allLoans } = props;
    const loanId = navigation.getParam('id');

    this.state = {
      loan: allLoans.filter(l => l.id === loanId)[0]
    };
  }

  componentWillReceiveProps(nexProps) {
    const { loan } = this.state;
    const { navigation, allLoans } = nexProps;
    const loanId = navigation.getParam('id');

    if (loanId !== loan.id) {
      this.setState({
        loan: allLoans.filter(l => l.id === loanId)[0]
      })
    }
  }

  getTextColor = () => {
    const { loan } = this.state;
    let textColor;

    switch (loan.status) {
      case LOAN_STATUSES.pending:
        textColor = COLORS.yellow;
        break;
      case LOAN_STATUSES.rejected:
        textColor = COLORS.red;
        break;
      case LOAN_STATUSES.active:
      case LOAN_STATUSES.approved:
        textColor = COLORS.green;
        break;
      case LOAN_STATUSES.completed:
      default:
        textColor = COLORS.blue;
    }

    return textColor
  }


  getMonthlyInterestPayment = () => {
    const { loan } = this.state;
    const isZero = loan.monthly_interest === "0" || !loan.monthly_interest
    return !isZero ? loan.monthly_interest : loan.amount_collateral_usd * loan.interest / loan.term_of_loan
  }

  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  render() {
    const { loan } = this.state;

    const payOffDate = moment(loan.created_at).add(loan.term_of_loan, 'months').format('DD MMMM YYYY')
    const monthlyInterestPayment = this.getMonthlyInterestPayment()
    return (
      <BasicLayout>
        <MainHeader backButton />
        <CelHeading text={`${loan.coin.toUpperCase()} Loan Collateral`} />

        <CelScreenContent padding={"0 0 0 0"}>
          <View style={BrwLoanDetailsStyle.amountWrapper}>
            <View>
              <Text style={BrwLoanDetailsStyle.usdAmount}>{formatter.usd(loan.amount_collateral_usd)}</Text>
              <Text style={BrwLoanDetailsStyle.cryptoAmount}>{formatter.crypto(loan.amount_collateral_crypto, loan.coin, { precision: 5 })}</Text>
            </View>
            <View style={BrwLoanDetailsStyle.iconWrapper}>
              <Icon name='Lock' width='18' height='18' fill={STYLES.WHITE_TEXT_COLOR} />
            </View>
          </View>

          <View style={{ marginHorizontal: -20 }}>

            <View style={BrwLoanDetailsStyle.infoDetail}>
              <View style={BrwLoanDetailsStyle.row}>
                <Text style={BrwLoanDetailsStyle.text}>Loan taken on:</Text>
                <Text style={BrwLoanDetailsStyle.info}>{moment(loan.created_at).format('DD MMMM YYYY')}</Text>
              </View>
              <Separator />
            </View>

            <View style={BrwLoanDetailsStyle.infoDetail}>
              <View style={BrwLoanDetailsStyle.row}>
                <Text style={BrwLoanDetailsStyle.text}>Status:</Text>
                <Text style={[BrwLoanDetailsStyle.info, { fontFamily: 'agile-bold', color: this.getTextColor() }]}>
                  {this.capitalize(loan.status)}
                </Text>
              </View>
              <Separator />
            </View>

            <View style={BrwLoanDetailsStyle.infoDetail}>
              <View style={BrwLoanDetailsStyle.row}>
                <Text style={BrwLoanDetailsStyle.text}>Loan amount:</Text>
                <Text style={BrwLoanDetailsStyle.info}>{formatter.usd(loan.amount_collateral_usd * loan.ltv)}</Text>
              </View>
              <Separator />
            </View>

            <View style={BrwLoanDetailsStyle.infoDetail}>
              <View style={BrwLoanDetailsStyle.row}>
                <Text style={BrwLoanDetailsStyle.text}>Pay off due date:</Text>
                <Text style={BrwLoanDetailsStyle.info}>{payOffDate}</Text>
              </View>
              <Separator />
            </View>

            <View style={BrwLoanDetailsStyle.infoDetail}>
              <View style={BrwLoanDetailsStyle.row}>
                <Text style={BrwLoanDetailsStyle.text}>Annual interest rate:</Text>
                <Text style={BrwLoanDetailsStyle.info}>{`${Math.round(loan.interest * 10000) / 100}%`}</Text>
              </View>
              <Separator />
            </View>

            <View style={BrwLoanDetailsStyle.infoDetail}>
              <View style={BrwLoanDetailsStyle.row}>
                <Text style={BrwLoanDetailsStyle.text}>Monthly interest payment:</Text>
                <Text style={BrwLoanDetailsStyle.info}>{formatter.usd(monthlyInterestPayment)}</Text>
              </View>
              <Separator />
            </View>
          </View>

        </CelScreenContent>
      </BasicLayout>
    );
  }
}

export default BrwLoanDetails;
