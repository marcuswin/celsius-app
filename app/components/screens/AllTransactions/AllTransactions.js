import React, { Component } from 'react';
import { View } from 'react-native';

import testUtil from "../../../utils/test-util";
import AllTransactionsStyle from "./AllTransactions.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import TransactionsHistory from '../../molecules/TransactionsHistory/TransactionsHistory';

class AllTransactions extends Component {
  static propTypes = {};
  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Transaction history",
        left: "back",
        right: "profile"
      }
    };
  }

  render() {
    const { header } = this.state;
    const style = AllTransactionsStyle();

    return (
      <RegularLayout header={header}>
        <View style={style.container}>
          <TransactionsHistory />
        </View>
      </RegularLayout>
    )
  }
}

export default testUtil.hookComponent(AllTransactions);
