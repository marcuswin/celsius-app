import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import BalanceHistoryStyle from "./BalanceHistory.styles";
import CelText from '../../atoms/CelText/CelText';
import Card from "../../atoms/Card/Card";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import TransactionsHistory from '../../molecules/TransactionsHistory/TransactionsHistory';
import transactionsUtil from "../../../utils/transactions-util";
import CelButton from "../../atoms/CelButton/CelButton";
import Graph from "../../atoms/Graph/Graph";

@connect(
  state => ({
    style: BalanceHistoryStyle(),
    walletSummary: state.wallet.summary,
    transactions: state.transactions,
    currencyRatesShort: state.currencies.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BalanceHistory extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Wallet",
        left: "back",
        right: "profile"
      }
    };
  }

  componentDidMount = () => {
    const { actions } = this.props;
    actions.getAllTransactions({ limit: 5 })
  }

  render() {
    const { transactions, actions, currencyRatesShort, walletSummary } = this.props
    const { header } = this.state;
    const transactionsArray = transactionsUtil.filterTransactions(transactions, { limit: 5 });

    return (
      <RegularLayout padding="20 0 20 0" header={header} >
        <View>
          <Card padding="15 15 15 15" margin="15 20 15 20">
            <CelText type="H6" color="color: rgba(61,72,83,0.7)">Total wallet balance</CelText>
            <CelText type="H2" bold>{formatter.usd(walletSummary.total_amount_usd)}</CelText>
          </Card>

          <Graph />

          <View style={{ paddingHorizontal: 20 }}>
            <TransactionsHistory
              transactions={transactionsArray}
              currencyRatesShort={currencyRatesShort}
              navigateTo={actions.navigateTo}
            />

            <CelButton
              basic
              margin="15 0 15 0"
              onPress={() => actions.navigateTo('AllTransactions')}
            >
              See all
            </CelButton>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BalanceHistory);
