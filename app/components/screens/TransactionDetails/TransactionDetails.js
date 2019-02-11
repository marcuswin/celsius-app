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
} from './TransactionDetailsSections';

@connect(
  state => ({
    transaction: state.wallet.transactions[state.wallet.activeTransactionId],
    activeTransactionId: state.wallet.activeTransactionId
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TransactionDetails extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  static getDerivedStateFromProps(nextProps) {
    const { transaction } = nextProps;
    if (!transaction) return {};
    const transactionProps = transactionsUtil.getTransactionsProps(transaction);
    if (!transactionProps) return {};

    return {
      transactionProps,
      sections: transactionsUtil.getTransactionSections(transaction) || []
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "TransactionDetails Screen",
        left: "back",
        right: "profile"
      },
      transactionProps: {},
      sections: []
    };
  }

  componentDidMount = () => {
    const { actions, navigation, activeTransactionId } = this.props;

    actions.getSupportedCurrencies();
    const transactionId = navigation.getParam('id');
    actions.getTransactionDetails(transactionId || activeTransactionId);
  }



  renderSection = (sectionType) => {
    const { transactionProps } = this.state;
    const { transaction } = this.props;
    if (!transaction) return null;

    switch (sectionType) {
      case 'info':
        return <InfoSection key={sectionType} transaction={transaction} transactionProps={transactionProps} />;
      case 'date':
        return <BasicSection key={sectionType} label="Date" value={moment(transaction.time).format("D MMM YYYY")} />;
      case 'time':
        return <BasicSection key={sectionType} label="Time" value={moment.utc(transaction.time).format("HH:mm A")} />;
      case 'status':
        return <StatusSection key={sectionType} transactionProps={transactionProps} />;
      default:
        return null;
    }
  }

  render() {
    const { header, sections } = this.state;
    return (
      <RegularLayout header={header}>
        {sections.map(this.renderSection)}
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(TransactionDetails);
