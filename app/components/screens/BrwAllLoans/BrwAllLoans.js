import React, {Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import Loader from "../../atoms/Loader/Loader";
import { LOAN_STATUSES } from "../../../config/constants/common";
import { COLORS, STYLES } from "../../../config/constants/style";
import Icon from "../../atoms/Icon/Icon";
import formatter from "../../../utils/formatter";
import BRWAllLoansStyle from "./BrwAllLoans.styles";
// import API from "../../../config/constants/API";

const tabs = [
  { screen: 'BRWEnterAmount', label: 'Apply for a loan'},
  { screen: 'BRWAllLoans', label: 'Your loans'},
]


@connect(
  state => ({
    allLoans: state.loans.allLoans,
    // allLoans: [
    //   { amount_collateral_usd: 1000, amount_collateral_crypto: 12.5, coin: 'BTC', status: LOAN_STATUSES.pending, created_at: new Date() },
    //   { amount_collateral_usd: 20000, amount_collateral_crypto: 122.5, coin: 'ETH', status: LOAN_STATUSES.rejected, created_at: new Date() },
    //   { amount_collateral_usd: 15000, amount_collateral_crypto: 120, coin: 'ETH', status: LOAN_STATUSES.approved, created_at: new Date() },
    //   { amount_collateral_usd: 10000, amount_collateral_crypto: 125, coin: 'XRP', status: LOAN_STATUSES.active, created_at: new Date() },
    //   { amount_collateral_usd: 12000, amount_collateral_crypto: 155, coin: 'LTC', status: LOAN_STATUSES.completed, created_at: new Date() },
    // ],
    activeScreen: state.nav.routes[state.nav.index].routeName,
    lastCompletedCall: state.api.lastCompletedCall,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BrwAllLoans extends Component {
  componentWillReceiveProps(nextProps) {
    const { activeScreen, actions } = this.props;

    if (nextProps.activeScreen === 'BRWAllLoans' && activeScreen !== 'BRWAllLoans') {
      // TODO: fetch loans
    }

    // TODO: go to enter amount if no loans and lastCompleted call is GET_ALL_LOANS
    if (nextProps.activeScreen === 'BRWAllLoans' && !nextProps.allLoans.length) {
      actions.navigateTo('BRWEnterAmount')
    }
  }

  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  renderLoader = () => (
    <SimpleLayout
      animatedHeading={{ text: 'All loans' }}
      tabs={tabs}
    >
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Loader />
      </View>

    </SimpleLayout>
  )

  renderLoanRow = (loan, i) => {
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
    return (
      <TouchableOpacity key={`${loan.status}${i}`}>
        <View style={BRWAllLoansStyle.loanRowWrapper}>
          <View style={{ width: '20%'}}>
            <View style={BRWAllLoansStyle.lockIconWrapper}>
              <Icon name='Lock' width='14' height='16' fill={STYLES.WHITE_TEXT_COLOR} />
            </View>
          </View>
          <View style={{ width: '40%'}}>
            <Text style={BRWAllLoansStyle.usdAmount}>{formatter.usd(loan.amount_collateral_usd)}</Text>
            <Text style={BRWAllLoansStyle.coinAmount}>{formatter.crypto(loan.amount_collateral_crypto, loan.coin.toUpperCase(), { precision: 5 })}</Text>
          </View>
          <View style={{ width: '40%'}}>
            <Text style={[BRWAllLoansStyle.time, { alignSelf: 'flex-end' }]}>{ moment(loan.created_at).format('MMM DD, YYYY')}</Text>
            <Text style={[BRWAllLoansStyle.status, { color: textColor }]}>{ this.capitalize(loan.status) }</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { allLoans } = this.props

    if (!allLoans.length) return this.renderLoader();

    return (
      <SimpleLayout
        animatedHeading={{ text: 'All loans' }}
        tabs={tabs}
      >
        { allLoans.map(this.renderLoanRow) }
      </SimpleLayout>
    );
  }
}

export default BrwAllLoans;
