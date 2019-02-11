import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
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

@connect(
  state => ({
    currencies: state.currencies.rates,
    walletSummary: state.wallet.summary,
    transactions: state.transactions,
    currencyRatesShort: state.currencies.currencyRatesShort
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
    const { navigation } = props;
    const coin = navigation.getParam("coin");
    const coinName = props.currencies.filter(c => c.short === coin.toUpperCase())[0].name

    this.state = {
      header: {
        title: `${coinName}-${coin}`,
        left: "back",
        right: "profile"
      }
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

  renderCard = (coin) => {
    const { actions } = this.props;
    // TODO(nk): create molecule component

    return (
      <View key={coin.name} size="half" onPress={() => actions.navigateTo(coin)}>
        <CelText>{coin.name}</CelText>
        <CelText bold>{formatter.usd(coin.amount_usd)}</CelText>
        <CelText>{formatter.crypto(coin.amount, coin.short)}</CelText>
      </View>
    );
  };

  render() {
    const { header } = this.state;
    const { transactions, currencyRatesShort, actions } = this.props;
    const coinDetails = this.getCoinDetails();
    const transactionsArray = transactionsUtil.filterTransactions(transactions, { coin: coinDetails.short, limit: 5 })
    const style = CoinDetailsStyle();

    return (
      <RegularLayout header={header}>
        <View>
          <Card>
            <View style={{ flexDirection: "row" }}>
              <View>
                <CelText>{coinDetails.name}</CelText>
                <CelText>{formatter.usd(coinDetails.amount_usd)}</CelText>
                <CelText>{formatter.crypto(coinDetails.amount, coinDetails.short)}</CelText>
              </View>

              <View style={[style.buttons]}>
                <TouchableOpacity>
                  <CelText> Send </CelText>
                </TouchableOpacity>
                <View style={{
                  borderBottomWidth: 1,
                  borderLeftColor: "gray",
                  borderRadius: 10
                }} />
                <TouchableOpacity>
                  <CelText> Deposit </CelText>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          <Card margin="10 0 10 0">
            <CelText>Total interest earned</CelText>
            <CelText>{formatter.usd(coinDetails.interest_earned_usd)}</CelText>
            <CelText>{formatter.crypto(coinDetails.interest_earned, coinDetails.short)}</CelText>
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
            <CelButton>
              Withdraw
            </CelButton>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(CoinDetails);
