import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import BalanceHistoryStyle from "./BalanceHistory.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TransactionsHistory from "../../molecules/TransactionsHistory/TransactionsHistory";
import CelButton from "../../atoms/CelButton/CelButton";
import GraphContainer from "../../graphs/GraphContainer/GraphContainer";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    currencyGraphs: state.currencies.graphs,
    walletTotalChartData: state.graph.walletTotalChartData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BalanceHistory extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = {
      title: 'Wallet',
      right: 'profile'
  };

  constructor(props) {
    super(props);

    this.state = {
      header: {
        title: "Wallet",
        left: "back",
        right: "profile"
      },
      dateArray: [],
      priceArray: [],
      timeInterval: "1d"
    };
  }

  render() {
    const { actions, walletSummary } = this.props;
    const style = BalanceHistoryStyle();

    return (
      <RegularLayout padding="20 0 20 0">
        <View>
          <View style={style.container}>
            <Card styles={{ alignSelf: 'center' }} margin="0 0 0 0">
              <CelText type="H6" color={STYLES.COLORS.DARK_GRAY7}>Total wallet balance</CelText>
              <CelText type="H2" weight="semi-bold">{formatter.usd(walletSummary.total_amount_usd)}</CelText>
            </Card>

            <View style={{ alignItems: "center" }}>
              <GraphContainer
                showCursor
                showPeriods
                type={"total-balance"}
              />
            </View>

            <View style={[{ width: "100%", paddingHorizontal: 20 }]}>
              <TransactionsHistory
                additionalFilter={{ limit: 5 }}
              />

              <CelButton
                basic
                onPress={() => actions.navigateTo("AllTransactions")}
              >
                See all
              </CelButton>
            </View>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BalanceHistory);
