import React, { Component } from 'react';
import { View } from 'react-native';
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
import CelButton from "../../atoms/CelButton/CelButton";
import WalletInterestStyle from "./WalletInterest.styles";
import TodayInterestRatesModal from "../../organisms/TodayInterestRatesModal/TodayInterestRatesModal";
import UI from "../../../constants/UI";
import GraphContainer from "../../GraphComponent/GraphContainer/GraphContainer";

const { MODALS } = UI

@connect(
  (state) => ({
    walletSummary: state.wallet.summary,
    currencyGraphs: state.currencies.graphs
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletInterest extends Component {

  constructor(props) {
    super(props);

    const { currencyGraphs } = props;

    const dateArray = currencyGraphs.LTC["1y"].map(data => data[0])
    const priceArray = currencyGraphs.LTC["1y"].map(data => data[1])

    this.state = {
      header: {
        title: "Interest earned",
        left: "back",
        right: "profile"
      },
      dateArray,
      priceArray,
    };
  }

  openInterestModal = () => {
    const { actions } = this.props;
    actions.openModal(MODALS.TODAY_INTEREST_RATES_MODAL);
  }

  navigateToAllTransactions = () => {
    const { actions } = this.props;
    actions.navigateTo('AllTransactions');
  }

  render() {
    const { header, dateArray, priceArray } = this.state;
    const { walletSummary } = this.props;
    const style = WalletInterestStyle();

    return (
      <RegularLayout header={header} >
        <View>
          <View style={style.container}>
            <Card padding="15 15 15 15" onPress={this.openInterestModal}>
              <CelText type="H6" color="rgba(61,72,83,0.7)">Total interest earned</CelText>
              <View style={style.amountWrapper}>
                <CelText type="H2" bold>{formatter.usd(walletSummary.total_interest_earned)}</CelText>
                <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Todays rates</CelText>
              </View>
            </Card>
          </View>

          <GraphContainer
            dateArray={dateArray}
            priceArray={priceArray}
            showCursor
            showPeriods
            showXTicks
            interest
          />

          <View style={style.container}>
            <TransactionsHistory
              hasFilter={false}
              additionalFilter={{ type: 'interest', limit: 5 }}
            />

            <CelButton
              basic
              margin="15 0 15 0"
              onPress={this.navigateToAllTransactions}
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
