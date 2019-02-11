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
import STYLES from '../../../constants/STYLES';

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
    const transactionProps = transactionsUtil.getTransactionsProps(transaction);
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
        <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY} />
      </View>
    );
  }
}

export default testUtil.hookComponent(TransactionRow);
