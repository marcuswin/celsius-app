import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import Card from "../../atoms/Card/Card";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import STYLES from "../../../constants/STYLES";
import TransactionsHistory from "../../molecules/TransactionsHistory/TransactionsHistory";
import transactionsUtil from "../../../utils/transactions-util";
import CelButton from "../../atoms/CelButton/CelButton";
import Graph from "../../atoms/Graph/Graph";
import WalletInterestStyle from "./WalletInterest.styles";
import TodayInterestRatesModal from "../../organisms/TodayInterestRatesModal/TodayInterestRatesModal";
import UI from "../../../constants/UI";

const { MODALS } = UI

@connect(
  (state) => ({
    style: WalletInterestStyle(),
    walletSummary: state.wallet.summary,
    transactions: state.transactions,
    currencyRatesShort: state.currencies.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletInterest extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Interest earned",
        left: "back",
        right: "profile"
      }
    };
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getAllTransactions({ limit: 5, type: 'interest' })
  }

  render() {
    const { header } = this.state;
    const { currencyRatesShort, actions, transactions, walletSummary, style } = this.props;
    const transactionsArray = transactionsUtil.filterTransactions(transactions, { type: 'interest', limit: 5 })

    return (
      <RegularLayout header={header} >
        <View>
          <View style={style.container}>
            <Card padding="15 15 15 15" onPress={() => actions.openModal(MODALS.TODAY_INTEREST_RATES_MODAL)}>
              <CelText type="H6" color="color: rgba(61,72,83,0.7)">Total interest earned</CelText>
              <View style={style.amountWrapper}>
                <CelText type="H2" bold>{formatter.usd(walletSummary.total_interest_earned)}</CelText>
                <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Todays rates</CelText>
              </View>
            </Card>
          </View>

          <Graph />

          <View style={style.container}>
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

        <TodayInterestRatesModal />
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WalletInterest);
