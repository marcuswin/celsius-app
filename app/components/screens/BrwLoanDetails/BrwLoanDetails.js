import React, {Component} from 'react';
import { Text, View } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import moment from 'moment';

import * as appActions from "../../../redux/actions";
// import BrwLoanDetailsStyle from "./BrwLoanDetails.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { COLORS, STYLES } from "../../../config/constants/style";
import Icon from "../../atoms/Icon/Icon";
import { BasicSection } from "../TransactionDetails/TransactionDetailsSections";
import formatter from '../../../utils/formatter';
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";

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

  render() {
    const { loan } = this.state;
    return (
      <SimpleLayout
        animatedHeading={{ text: `${loan.coin.toUpperCase()} Loan Collateral`}}
      >
        <CelScreenContent padding={"0 0 0 0"}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text>{ loan.amount_collateral_usd }</Text>
              <Text>{ loan.amount_collateral_crypto }</Text>
            </View>
            <View style={[{ height: 32, width: 32, borderRadius: 16, backgroundColor: COLORS.blue, paddingLeft: 3, alignItems: 'center', justifyContent: 'center' }]}>
              <Icon name='Lock' width='18' height='18' fill={STYLES.WHITE_TEXT_COLOR} />
            </View>
          </View>

          <View>
            <BasicSection label="Loan taken on" value={ moment(loan.id).format('DD MMMM YYYY') } />
            <BasicSection label="Status" value={ loan.status } />
            <BasicSection label="Loan amount" value={ formatter.usd(loan.amount_collateral_usd * loan.ltv.percentage) } />
            <BasicSection label="Pay off due date" value={ loan.id } />
            <BasicSection label="Annual interest rate" value={ `${loan.ltv.interest * 100}%` } />
            <BasicSection label="Monthly interest payment" value={ formatter.usd(loan.monthly_payment) } />
          </View>

        </CelScreenContent>
      </SimpleLayout>
    );
  }
}

export default BrwLoanDetails;
