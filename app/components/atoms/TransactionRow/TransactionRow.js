import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import TransactionRowStyle from "./TransactionRow.styles";
import Icon from '../Icon/Icon';
import CelText from '../CelText/CelText';
import formatter from '../../../utils/formatter';
import Separator from '../Separator/Separator';
import transactionsUtil from "../../../utils/transactions-util";

class TransactionRow extends Component {

  static propTypes = {
    transaction: PropTypes.instanceOf(Object).isRequired,
    onPress: PropTypes.func.isRequired
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.state = {
      transactionProps: {
        color: '',
        iconName: '',
        statusText: ''
      }
    };
  }

  render() {
    const { transaction, onPress } = this.props;
    if (!transaction) return null;

    const { color, iconName, statusText } = transactionsUtil.getTransactionsProps(transaction);

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
        <Separator />
      </View>
    );
  }
}

export default testUtil.hookComponent(TransactionRow);
