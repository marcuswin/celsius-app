import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from "react-native";
import { ListItem } from 'native-base';
import { Grid, Col } from "react-native-easy-grid";

import TransactionRowStyle from "./TransactionRow.styles";
import formatter from "../../../utils/formatter";
import { COLORS, STYLES } from "../../../config/constants/style";
import Icon from "../Icon/Icon";

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

function getTransactionStatusText(transaction) {
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
  }[transaction.type];
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
    TRANSFER_RETURNED: (
      <View style={[TransactionRowStyle.iconWrapper, { backgroundColor: COLORS.red }]}>
        <Icon name='ReturnArrow' height='16' width='16' fill={STYLES.WHITE_TEXT_COLOR} />
      </View>
    ),
    TRANSFER_EXPIRED: receiveArrow,
    TRANSFER_ONHOLD: receiveArrow,
  }[transactionType];
}

class TransactionRow extends Component {
  static propTypes = {
    transaction: PropTypes.instanceOf(Object)
  }

  constructor(props) {
    super(props);

    const type = props.transaction.type;
    this.state = {
      type,
      color: getTransactionColor(type),
      icon: getTransactionIcon(type),
      statusText: getTransactionStatusText(props.transaction),
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
