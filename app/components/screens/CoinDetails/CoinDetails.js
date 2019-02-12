import React, { Component } from "react";
import { View, Image } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TransactionsHistory from "../../molecules/TransactionsHistory/TransactionsHistory";
import transactionsUtil from "../../../utils/transactions-util";
import CoinDetailsStyle from "./CoinDetails.styles";
import Separator from "../../atoms/Separator/Separator";
import Graph from "../../atoms/Graph/Graph";

@connect(
  state => ({
    style: CoinDetailsStyle(),
    currencies: state.currencies.rates,
    walletSummary: state.wallet.summary,
    transactions: state.transactions,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencyGraphs: state.currencies.graphs,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CoinDetails extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    const { navigation, currencyGraphs } = props;
    const coin = navigation.getParam("coin");
    const currency = props.currencies.filter(c => c.short === coin.toUpperCase())[0]

    const dateArray = currencyGraphs[coin.toUpperCase()]["1y"].map(data => data[0])
    const priceArray = currencyGraphs[coin.toUpperCase()]["1y"].map(data => data[1])

    this.state = {
      header: {
        title: `${currency.displayName} - ${coin}`,
        left: "back",
        right: "profile"
      },
      dateArray,
      priceArray,
      currency,
    };
  }

  componentDidMount() {
    const { actions, navigation } = this.props
    actions.getAllTransactions({ limit: 5, coin: navigation.getParam('coin').toUpperCase() });
  }

  getCoinDetails() {
    const { navigation, walletSummary } = this.props;
    const coin = navigation.getParam("coin");
    return walletSummary.coins.filter(c => c.short === coin.toUpperCase())[0];
  }

  render() {
    const { header, dateArray, priceArray, currency } = this.state;
    const { transactions, currencyRatesShort, actions } = this.props;
    const coinDetails = this.getCoinDetails();
    const transactionsArray = transactionsUtil.filterTransactions(transactions, { coin: coinDetails.short, limit: 5 })
    const style = CoinDetailsStyle();

    return (
      <RegularLayout header={header}>
        <View>
          <View style={style.container}>
            <Card padding="0 0 0 0">
              <View style={style.coinAmountWrapper}>
                <View style={style.amountFlexBox}>
                  <View style={style.imageWrapper}>
                    <Image source={{ uri: currency.image_url }} style={style.image}/>
                  </View>
                  <View>
                    <CelText type="H6" >{currency.displayName}</CelText>
                    <CelText type="H3" bold>{formatter.usd(coinDetails.amount_usd)}</CelText>
                    <CelText type="H6" >{formatter.crypto(coinDetails.amount, coinDetails.short)}</CelText>
                  </View>
                </View>

                <Separator vertical style={style.separator}/>

                <View style={style.buttons}>
                  <CelButton
                    basic
                    size="small"
                    onPress={() => actions.navigateTo('WalletLanding')}
                  >
                    Send
                  </CelButton>

                  <Separator />

                  <CelButton
                    basic
                    size="small"
                    onPress={() => actions.navigateTo('WalletLanding')}
                  >
                    Deposit
                  </CelButton>
                </View>
              </View>
            </Card>
          </View>

          <Graph
            dateArray={dateArray}
            priceArray={priceArray}
          />

          <View style={style.container}>
            <Card margin="10 0 10 0">
              <CelText type="H6" color="rgba(60,72,84,0.7)">Total interest earned</CelText>
              <CelText type="H3" bold>{formatter.usd(coinDetails.interest_earned_usd)}</CelText>
              <CelText type="H6" color="rgba(60,72,84,0.7)">{formatter.crypto(coinDetails.interest_earned, coinDetails.short)}</CelText>
            </Card>

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

            <View>
              <CelButton onPress={() => actions.navigateTo('AllTransactions')}>
                Withdraw
              </CelButton>
            </View>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(CoinDetails);
