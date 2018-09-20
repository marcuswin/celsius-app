import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from "react-native";
import { ListItem } from 'native-base';
import { Grid, Col } from "react-native-easy-grid";

import TransactionRowStyle from "./TransactionRow.styles";
import formatter from "../../../utils/formatter";
import { COLORS, STYLES } from "../../../config/constants/style";
import Icon from "../Icon/Icon";


const TRANSACTION_TYPES = {
  DEPOSIT_PENDING: 'DEPOSIT_PENDING',
  DEPOSIT_CONFIRMED: 'DEPOSIT_CONFIRMED',
  WITHDRAWAL_PENDING: 'WITHDRAWAL_PENDING',
  WITHDRAWAL_CONFIRMED: 'WITHDRAWAL_CONFIRMED',
  INTEREST: 'INTEREST',
  COLLATERAL: 'COLLATERAL',
  TRANSFER_PENDING: 'TRANSFER_PENDING',
  TRANSFER_SENT: 'TRANSFER_SENT',
  TRANSFER_RECEIVED: 'TRANSFER_RECEIVED',
  TRANSFER_RETURNED: 'TRANSFER_RETURNED',
  TRANSFER_EXPIRED: 'TRANSFER_EXPIRED',
  TRANSFER_ONHOLD: 'TRANSFER_ONHOLD',
}

function getTransactionColor(transactionType) {
  return {
    DEPOSIT_PENDING: COLORS.yellow,
    DEPOSIT_CONFIRMED: COLORS.green,
    WITHDRAWAL_PENDING: COLORS.yellow,
    WITHDRAWAL_CONFIRMED: COLORS.red,
    INTEREST: COLORS.blue,
    COLLATERAL: COLORS.blue,
    TRANSFER_PENDING: COLORS.yellow,
    TRANSFER_SENT: COLORS.blue,
    TRANSFER_RECEIVED: COLORS.blue,
    TRANSFER_RETURNED: COLORS.red,
    TRANSFER_EXPIRED: COLORS.red,
    TRANSFER_ONHOLD: COLORS.yellow,
  }[transactionType];
}

function getTransactionStatusText(transactionType, transaction) {
  return {
    DEPOSIT_PENDING: 'Pending',
    DEPOSIT_CONFIRMED: 'Received',
    WITHDRAWAL_PENDING: 'Pending',
    WITHDRAWAL_CONFIRMED: 'Withdrawn',
    INTEREST: `${transaction.interest_coin && transaction.interest_coin.toUpperCase()} interest`,
    COLLATERAL: 'Loan Collateral',
    TRANSFER_PENDING: 'Pending',
    TRANSFER_SENT: 'Sent',
    TRANSFER_RECEIVED: 'Received',
    TRANSFER_RETURNED: 'Returned',
    TRANSFER_EXPIRED: 'Expired',
    TRANSFER_ONHOLD: 'On Hold',
  }[transactionType];
}

function getTransactionIcon(transactionType) {
  const receiveArrow = <Icon name='ReceiveArrow' height='36' width='36' viewBox="0 0 36 36" fill={getTransactionColor(transactionType)} stroke='white' />;
  const sentArrow = <Icon name='SentArrow' height='36' width='36' viewBox="0 0 36 36" fill={getTransactionColor(transactionType)} stroke='white' />;

  return {
    DEPOSIT_PENDING: receiveArrow,
    DEPOSIT_CONFIRMED: receiveArrow,
    WITHDRAWAL_PENDING: sentArrow,
    WITHDRAWAL_CONFIRMED: sentArrow,
    INTEREST: (
      <View style={[TransactionRowStyle.iconWrapper, { paddingLeft: 3 }]}>
        <Icon name='InterestIcon' height='24' width='24' viewBox="0 0 30 15" fill={STYLES.WHITE_TEXT_COLOR} />
      </View>
    ),
    COLLATERAL: (
      <View style={[TransactionRowStyle.iconWrapper, { paddingLeft: 1 }]}>
        <Icon name='Lock' width='14' height='16' fill={STYLES.WHITE_TEXT_COLOR} />
      </View>
    ),
    TRANSFER_PENDING: sentArrow,
    TRANSFER_SENT: sentArrow,
    TRANSFER_RECEIVED: receiveArrow,
    // TODO
    TRANSFER_RETURNED: <Icon name='InterestIcon' height='24' width='24' viewBox="0 0 30 15" fill={STYLES.WHITE_TEXT_COLOR} />,
    TRANSFER_EXPIRED: receiveArrow,
    TRANSFER_ONHOLD: receiveArrow,
  }[transactionType];
}

function getTransactionType(transaction) {
  if (transaction.nature === 'deposit' && transaction.status === 'pending') return TRANSACTION_TYPES.DEPOSIT_PENDING;
  if (transaction.nature === 'deposit' && transaction.status !== 'pending') return TRANSACTION_TYPES.DEPOSIT_CONFIRMED;
  if (transaction.nature === 'withdrawal' && transaction.status === 'pending') return TRANSACTION_TYPES.WITHDRAWAL_PENDING;
  if (transaction.nature === 'withdrawal' && transaction.status !== 'pending') return TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED;
  if (transaction.nature === 'interest') return TRANSACTION_TYPES.INTEREST;
  if (transaction.nature === 'collateral') return TRANSACTION_TYPES.COLLATERAL;

  if (transaction.nature === 'inbound_transfer' && transaction.transfer_data) return TRANSACTION_TYPES.TRANSFER_RECEIVED;
  if (transaction.nature === 'outbound_transfer' && transaction.transfer_data) {
    if (!transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at && !transaction.transfer_data.expired_at) return TRANSACTION_TYPES.TRANSFER_PENDING;
    if (transaction.transfer_data.claimed_at && transaction.transfer_data.cleared_at) return TRANSACTION_TYPES.TRANSFER_SENT;
    if (transaction.transfer_data.expired_at) return TRANSACTION_TYPES.TRANSFER_RETURNED;
  }
}

class TransactionRow extends Component {
  static propTypes = {
    transaction: PropTypes.instanceOf(Object)
  }

  constructor(props) {
    super(props);

    const type = getTransactionType(props.transaction);
    this.state = {
      type,
      color: getTransactionColor(type),
      icon: getTransactionIcon(type),
      statusText: getTransactionStatusText(type, props.transaction),
    };

    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const { transaction, onPress } = this.props;
    const { type, color, icon, statusText } = this.state;

    if (!type) return null;

    return (
      <ListItem style={TransactionRowStyle.listItem}>
        <TouchableOpacity style={{width: '100%'}} onPress={onPress}>
          <Grid style={{paddingLeft: 0, marginLeft: 0}}>
            <Col size={70} style={{paddingLeft: 0, marginLeft: 0}}>
              <Col style={{ width: 40, position: "absolute" }}>
                { icon }
              </Col>
              <Col style={{paddingLeft: 40}}>
                <Text style={TransactionRowStyle.usdAmount}>{formatter.usd(transaction.amount_usd)}</Text>
                <Text style={TransactionRowStyle.coinAmount}>{formatter.crypto(transaction.amount, transaction.coin.toUpperCase(), { precision: 5 })}</Text>
              </Col>
            </Col>
            <Col size={50}>
              <View style={{display: 'flex', alignSelf: 'flex-end'}}>
                <Text style={[TransactionRowStyle.time, { alignSelf: 'flex-end' }]}>{transaction.time}</Text>
                <Text
                  style={[TransactionRowStyle.status, { color }]}>
                  { statusText }
                </Text>
              </View>
            </Col>
          </Grid>
        </TouchableOpacity>
      </ListItem>
    );
  }
}

export default TransactionRow;
