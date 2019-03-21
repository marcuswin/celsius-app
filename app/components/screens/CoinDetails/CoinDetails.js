import React, { Component } from "react";
import { View, Image } from "react-native";
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
import CoinDetailsStyle from "./CoinDetails.styles";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import Badge from "../../atoms/Badge/Badge";
import { widthPercentageToDP } from "../../../utils/styles-util";
import GraphContainer from "../../graphs/GraphContainer/GraphContainer";

const { COLORS } = STYLES;

@connect(
  state => ({
    currencies: state.currencies.rates,
    walletSummary: state.wallet.summary,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencyGraphs: state.currencies.graphs,
    interestRates: state.generalData.interestRates
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CoinDetails extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params && params.title && params.coin ? `${params.title}  (${params.coin})` : 'Coin Details',
      right: 'profile'
    }
  };

  constructor(props) {
    super(props);
    const { navigation, currencyGraphs } = props;
    const coin = navigation.getParam("coin");
    const currency = props.currencies.filter(c => c.short === coin.toUpperCase())[0];

    const dateArray = currencyGraphs[coin.toUpperCase()] ? currencyGraphs[coin.toUpperCase()]["1y"].map(data => data[0]) : [];
    const priceArray = currencyGraphs[coin.toUpperCase()] ? currencyGraphs[coin.toUpperCase()]["1y"].map(data => data[1]) : [];

    this.state = {
      dateArray,
      priceArray,
      currency
    };
  }

  getCoinDetails() {
    const { navigation, walletSummary } = this.props;
    const coin = navigation.getParam("coin");
    if (walletSummary.coins) {
      return walletSummary.coins.find(c => c.short === coin.toUpperCase());
    }
    return null;
  }

  navigateToAllTransactions = () => {
    const { actions } = this.props;
    actions.navigateTo('AllTransactions');
  }

  render() {
    const { currency} = this.state;
    const { actions, interestRates } = this.props;
    const coinDetails = this.getCoinDetails();
    const style = CoinDetailsStyle();

    return (
      <RegularLayout padding={'20 0 100 0'}>
        <View style={style.container}>
          <Card padding={'0 0 0 0'}>
            <View style={style.coinAmountWrapper}>
              <View style={style.amountFlexBox}>
                <View style={style.imageWrapper}>
                  <Image source={{ uri: currency.image_url }} style={style.coinImage} />
                </View>
                <View style={{marginLeft: 12}}>
                  <CelText weight='300' type="H6">{currency.displayName}</CelText>
                  <CelText weight='600' type="H3" bold margin={'3 0 3 0'}>{formatter.usd(coinDetails.amount_usd)}</CelText>
                  <CelText weight='300' type="H6">{formatter.crypto(coinDetails.amount, coinDetails.short)}</CelText>
                </View>
              </View>

              <View style={style.buttonWrapper}>
                <Separator vertical/>

                <View style={style.buttons}>
                  <CelButton
                    basic
                    size="small"
                    onPress={() => actions.navigateTo('CelPayEnterAmount')}
                  >
                    Send
                  </CelButton>

                  <Separator />

                  <CelButton
                    basic
                    size="small"
                    onPress={() => actions.navigateTo("Deposit", { coin: coinDetails.short })}
                  >
                    Deposit
                  </CelButton>
                </View>
              </View>
            </View>
          </Card>
        </View>

        <GraphContainer
          showCursor
          showPeriods
          type={'coin-balance'}
          coin={currency.short}
        />

        <View style={style.container}>
          <Card margin="10 0 10 0">
            <View>
              <View style={style.interestCardWrapper}>
                <View>
                  <CelText type="H6" color="rgba(60,72,84,0.7)">Total interest earned</CelText>
                  <CelText type="H3" bold>{formatter.usd(coinDetails.interest_earned_usd)}</CelText>
                  <CelText type="H6"
                    color="rgba(60,72,84,0.7)">{formatter.crypto(coinDetails.interest_earned, coinDetails.short)}</CelText>
                </View>
                {!!coinDetails && !!interestRates[coinDetails.short] && (
                  <View style={style.interestRateWrapper}>
                    <CelText type="H6" color="rgba(60,72,84,0.7)">Today's rate</CelText>
                    <Badge color={COLORS.GREEN}>
                      <CelText type="H5"
                        color="white">{(interestRates[coinDetails.short].rate * 100).toFixed(2)}%</CelText>
                    </Badge>
                  </View>
                )}
              </View>
              <Separator margin={"20 0 10 0"}/>
              <GraphContainer
                periods={["MONTH", "YEAR"]}
                showCursor
                showPeriods
                interest
                backgroundColor={"#FFFFFF"}
                width={widthPercentageToDP("78%")}
                type={"coin-interest"}
                coin={currency.short}
              />
            </View>
          </Card>
        </View>
        <View style={style.container}>
          <TransactionsHistory
            additionalFilter={{ coin: coinDetails && coinDetails.short, limit: 5 }}
          />

          <CelButton
            basic
            margin="0 0 15 0"
            onPress={this.navigateToAllTransactions}
          >
            See all
          </CelButton>
        </View>

        <View>
          <CelButton onPress={() => actions.navigateTo("WithdrawEnterAmount", { coin: coinDetails.short })}>
            Withdraw
            </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(CoinDetails);
