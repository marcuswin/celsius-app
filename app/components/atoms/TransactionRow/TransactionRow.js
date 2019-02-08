import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import TransactionRowStyle from "./TransactionRow.styles";
import DATA from '../../../constants/DATA';
import STYLES from '../../../constants/STYLES';
import Icon from '../Icon/Icon';
import CelText from '../CelText/CelText';
import formatter from '../../../utils/formatter';
import Separator from '../Separator/Separator';


const TYPES = DATA.TRANSACTION_TYPES;

function getTransactionsProps(transaction) {
  return {
    [TYPES.DEPOSIT_PENDING]: {
      color: STYLES.COLORS.ORANGE,
      iconName: 'TransactionReceived',
      statusText: 'Pending'
    },
    [TYPES.DEPOSIT_CONFIRMED]: { // Deposit
      color: STYLES.COLORS.GREEN,
      iconName: 'TransactionReceived',
      statusText: 'Received'
    },
    [TYPES.WITHDRAWAL_PENDING]: { // Withdrawn pending 
      color: STYLES.COLORS.ORANGE,
      iconName: 'TransactionSent',
      statusText: 'Pending'
    },
    [TYPES.WITHDRAWAL_CONFIRMED]: {
      color: STYLES.COLORS.RED,
      iconName: 'TransactionSent',
      statusText: 'Withdrawn'
    },

    [TYPES.INTEREST]: { // Interest
      color: STYLES.COLORS.CELSIUS_BLUE,
      iconName: 'TransactionInterest',
      statusText: `${transaction.interest_coin && transaction.interest_coin.toUpperCase()} interest`
    },
    [TYPES.COLLATERAL]: { // Loan Active ? locked ?
      color: STYLES.COLORS.CELSIUS_BLUE,
      iconName: 'TransactionLocked',
      statusText: 'Loan Collateral'
    },
    [TYPES.BONUS_TOKEN]: { // free cels NEMA
      color: STYLES.COLORS.RED,
      iconName: 'ReceiveArrowTransactions',
      statusText: 'Bonus'
    },

    [TYPES.CELPAY_PENDING]: { // T
      color: STYLES.COLORS.ORANGE,
      iconName: 'TransactionSent',
      statusText: 'Pending'
    },
    [TYPES.CELPAY_CLAIMED]: {
      color: STYLES.COLORS.RED,
      iconName: 'TransactionSent',
      statusText: 'Claimed'
    },
    [TYPES.CELPAY_SENT]: {
      color: STYLES.COLORS.RED,
      iconName: 'TransactionSent',
      statusText: 'Sent'
    },
    [TYPES.CELPAY_RECEIVED]: { // T
      color: STYLES.COLORS.GREEN,
      iconName: 'TransactionReceived',
      statusText: 'Received'
    },
    [TYPES.CELPAY_RETURNED]: { // RETURNED
      color: STYLES.COLORS.RED,
      iconName: 'TransactionLocked',
      statusText: 'Returned'
    },
    [TYPES.CELPAY_EXPIRED]: { // RETURNED
      color: STYLES.COLORS.RED,
      iconName: 'TransactionLocked',
      statusText: 'Expired'
    },
    [TYPES.CELPAY_ONHOLD]: {
      color: STYLES.COLORS.RED,
      iconName: 'ReceiveArrowTransactions',
      statusText: 'On Hold'
    },

    [TYPES.REFERRED_HODL]: { // drugi locked
      color: STYLES.COLORS.CELSIUS_BLUE,
      iconName: 'TransactionLocked',
      statusText: 'Locked'
    },
    [TYPES.REFERRED]: { // T
      color: STYLES.COLORS.GREEN,
      iconName: 'TransactionReceived',
      statusText: 'Referral reward'
    },
    [TYPES.REFERRER_HODL]: { // prvi locked
      color: STYLES.COLORS.CELSIUS_BLUE,
      iconName: 'TransactionLocked',
      statusText: 'Locked'
    },
    [TYPES.REFERRER]: { // T
      color: STYLES.COLORS.GREEN,
      iconName: 'TransactionReceived',
      statusText: 'Referral reward'
    },

    [TYPES.CANCELED]: { // Gledam kao returned
      color: STYLES.COLORS.RED,
      iconName: 'TransactionCanceled',
      statusText: 'Canceled'
    },

    [TYPES.IN]: { // default in
      color: STYLES.COLORS.GREEN,
      iconName: 'TransactionReceived',
      statusText: 'Received'
    },
    [TYPES.OUT]: { // default in
      color: STYLES.COLORS.RED,
      iconName: 'TransactionSent',
      statusText: 'Sent'
    }

  }[transaction.type]
}

class TransactionRow extends Component {

  static propTypes = {
    transaction: PropTypes.instanceOf(Object).isRequired,
    onPress: PropTypes.func.isRequired
  };
  static defaultProps = {
  }

  static getDerivedStateFromProps(nextProps) {
    const { transaction } = nextProps;
    if (!transaction) return {};
    const transactionProps = getTransactionsProps(transaction);
    if (!transactionProps) return {};

    return {
      type: transaction.type,
      color: transactionProps.color,
      iconName: transactionProps.iconName,
      statusText: transactionProps.statusText,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      color: '',
      iconName: '',
      statusText: ''
    };
  }

  render() {
    const { transaction, onPress } = this.props;
    const { type, color, iconName, statusText } = this.state;
    if (!type) return null;

    // console.log(transaction)
    // console.log({ type, color, iconName, statusText })

    const style = TransactionRowStyle()
    return (
      <View>
        <TouchableOpacity style={style.container} onPress={onPress}>
          <View style={style.leftSide}>
            <View style={style.iconStyle}>
              <Icon name={iconName} height='18' width='15' fill={color} />
            </View>
            <View style={style.amounts}>
              <View>
                <CelText bold type='H3'>{formatter.usd(transaction.amount_usd)}</CelText>
              </View>
              <View>
                <CelText type='H6'>{formatter.crypto(transaction.amount, transaction.coin.toUpperCase(), { precision: 5 })}</CelText>
              </View>
            </View>
          </View>

          <View style={style.rightSide}>
            <View style={style.statusText}>
              <CelText bold type='H6' color={color}>{statusText}</CelText>
            </View>
            <View>
              <CelText type='H6'>{transaction.time}</CelText>
            </View>
          </View>

        </TouchableOpacity>
        <View style={{ opacity: 0.1 }}><Separator /></View>
      </View>
    );
  }
}

export default testUtil.hookComponent(TransactionRow);
