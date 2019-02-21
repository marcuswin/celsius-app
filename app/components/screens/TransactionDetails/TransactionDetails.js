import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import moment from 'moment';

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import transactionsUtil from '../../../utils/transactions-util';
import {
  BasicSection,
  StatusSection,
  InfoSection,
  AddressSection,
  NoteSection,
  InterestSection,
  LoanInfoSection,
  HodlInfoSection,
  CollateralSection,
} from './TransactionDetailsSections';
import CelButton from '../../atoms/CelButton/CelButton';
import STYLES from '../../../constants/STYLES';
import apiUtil from '../../../utils/api-util';
import API from '../../../constants/API';
import LoadingState from '../../atoms/LoadingState/LoadingState';

@connect(
  state => ({
    coins: state.wallet.summary.coins,
    activeScreen: state.nav.activeScreen,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
    transaction: state.transactions.transactionDetails
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TransactionDetails extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  state = {
    loading: true
  }

  componentDidMount = () => {
    const { actions, navigation } = this.props;
    const transactionId = navigation.getParam('id');
    actions.getTransactionDetails(transactionId);
  }

  shouldComponentUpdate = (nextProps) => nextProps.activeScreen === 'TransactionDetails';

  renderSection = (sectionType) => {
    const { actions, coins, transaction } = this.props;

    const transactionProps = transactionsUtil.getTransactionsProps(transaction);
    const interestEarned = coins.filter((coin) => coin.short === transaction.coin.toUpperCase())[0].interest_earned
    // const interestEarned = coins.find((coin) => coin === transaction.coin.toUpperCase()).interest_earned

    switch (sectionType) {
      case 'info':
        return <InfoSection key={sectionType} transaction={transaction} transactionProps={transactionProps} />;
      case 'date':
        return <BasicSection key={sectionType} label="Date" value={moment(transaction.time).format("D MMM YYYY")} />;
      case 'date:deposited':
        return <BasicSection key={sectionType} label="Date deposited" value={moment(transaction.time).format("D MMM YYYY")} />;
      case 'time':
        return <BasicSection key={sectionType} label="Time" value={moment.utc(transaction.time).format("HH:mm A")} />;
      case 'status':
        return <StatusSection key={sectionType} transactionProps={transactionProps} />;
      case 'status:noSeparator':
        return <StatusSection key={sectionType} transactionProps={transactionProps} noSeparator />;
      case 'address:from':
        return <AddressSection key={sectionType} transaction={transaction} address={transaction.from_address} text="Received from:" />;
      case 'address:to':
        return <AddressSection key={sectionType} transaction={transaction} address={transaction.to_address} text="Withdrawn to:" />;
      case 'button:back':
        return <CelButton key={sectionType} onPress={() => actions.navigateBack()} basic>Go back to wallet</CelButton>;
      case 'button:deposit':
        return <CelButton margin="16 0 10 0" key={sectionType} onPress={() => actions.navigateTo('Deposit')}>Deposit coins</CelButton>;
      case 'button:celpay:another':
        return <CelButton margin="16 0 10 0" key={sectionType} onPress={() => actions.navigateTo('CelPayChoseFriends')}>CelPay another friend</CelButton>;
      case 'button:celpay:friend':
        return <CelButton margin="16 0 10 0" key={sectionType} onPress={() => actions.navigateTo('CelPayChoseFriends')}>CelPay a friend</CelButton>;
      case 'button:cancel':
        return <CelButton margin="16 0 10 0" textColor={STYLES.COLORS.RED} key={sectionType} onPress={() => actions.cancelTransfer(transaction.transfer_data.hash)} basic>Cancel transaction</CelButton>;
      case 'button:applyForLoan':
        return <CelButton margin="16 0 10 0" key={sectionType} onPress={() => actions.navigateTo('Borrow')}>Apply for another loan</CelButton>
      case 'button:refer':
        return <CelButton margin="16 0 10 0" key={sectionType} onPress={() => actions.navigateTo('Borrow')}>Refer more friends</CelButton> // TODO(sb): link to refer a friend
      case 'note':
        return <NoteSection key={sectionType} text={"Test this out!"} />;
      case 'interest':
        return <InterestSection key={sectionType} navigateTo={actions.navigateTo} interestEarned={interestEarned} coin={transaction.coin.toUpperCase()} />;
      case 'loan:rejected':
        return <LoanInfoSection key={sectionType} navigateTo={actions.navigateTo} />;
      // TODO(sb): Value need to be changed
      case 'loan:date':
        return <BasicSection key={sectionType} label="Loan Initiation Date" value={moment.utc(transaction.time).format("HH:mm A")} />;
      case 'loan:amount':
        return <BasicSection key={sectionType} label="Loan Amount" value={""} noSeparator />;
      case 'loan:collateral':
        return <CollateralSection key={sectionType} dollarAmount="30000" coinAmount="8.57" coin="BTC" />;
      case 'loan:deadline':
        return <BasicSection key={sectionType} label="Repayment Deadline" value={""} />;
      case 'loan:annualInterestRate':
        return <BasicSection key={sectionType} label="Annual Interest Rate" value={""} />;
      case 'loan:montlyInterest':
        return <BasicSection key={sectionType} label="Monthly Interest" value={""} />;
      case 'loan:totalInterest':
        return <BasicSection key={sectionType} label="Total Interest Payment" value={""} noSeparator />;
      case 'hodl:info':
        return <HodlInfoSection key={sectionType} date="April 29th" amount="20" coin="ETH" />;
      default:
        return null;
    }
  }

  render() {
    const { transaction, callsInProgress } = this.props;
    const header = {
      title: "Transaction details",
      left: "back",
      right: "profile"
    };
    const loadingTransactionDetails = apiUtil.areCallsInProgress([API.GET_TRANSACTION_DETAILS], callsInProgress);

    if (loadingTransactionDetails || !transaction) return (
      <RegularLayout header={header} padding="0 0 0 0">
        <LoadingState />
      </RegularLayout>
    )

    const transactionProps = transactionsUtil.getTransactionsProps(transaction);
    const sections = transactionsUtil.getTransactionSections(transaction);
    const transactionHeader = {
      ...header,
      title: transaction.coin ? transactionProps.title(transaction.coin.toUpperCase()) : header.title
    }

    // return null;

    return (
      <RegularLayout header={transactionHeader} padding="0 0 0 0">
        {sections.map(this.renderSection)}
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(TransactionDetails);
