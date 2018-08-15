import React, { Component } from "react";
import { Text, View, Image, Linking } from "react-native";
import { Constants } from "expo";
import { Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import { FONT_SCALE } from "../../../config/constants/style";
import TransactionDetailsStyle from "./TransactionDetails.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import Icon from "../../atoms/Icon/Icon";
import Separator from "../../atoms/Separator/Separator";
import Loader from "../../atoms/Loader/Loader";
import formatter from '../../../utils/formatter';
import { actions as mixpanelActions } from "../../../services/mixpanel";

const {ENV} = Constants.manifest.extra;

const etherscanUrl = ENV === 'PRODUCTION' ? 'https://etherscan.io' : 'https://kovan.etherscan.io';
const blockchainUrl = ENV === 'PRODUCTION' ? 'https://blockchain.info' : 'https://testnet.blockchain.info';

@connect(
  state => ({
    nav: state.nav,
    supportedCurrencies: state.generalData.supportedCurrencies,
    transaction: state.wallet.transactions[state.wallet.activeTransactionId],
    activeTransactionId: state.wallet.activeTransactionId,
    currencyRatesShort: state.generalData.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TransactionDetails extends Component {
  // lifecycle methods
  componentDidMount() {
    const { actions, navigation, activeTransactionId } = this.props;
    actions.getSupportedCurrencies();
    const transactionId = navigation.getParam('id');
    actions.getTransactionDetails(transactionId || activeTransactionId);
    mixpanelActions.viewTransaction(transactionId || activeTransactionId);
  }

  cameFromWithdrawalTransaction = routes => routes.reduce((hasRoute, route) => hasRoute || route.routeName === 'TransactionConfirmation', false);

  isInterestIncomeTransaction = () => {
    const { transaction } = this.props;

    return transaction.type === 'incoming' && transaction.nature === 'interest';
  };

  renderCelHeading() {
    const { supportedCurrencies, transaction } = this.props;
    const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];

    const isUserReceiving = transaction.type === 'incoming';
    const isInterestIncome = this.isInterestIncomeTransaction();
    let text;

    if (isInterestIncome) {
      text = `${ transaction.interest_coin.toUpperCase()} Interest`;
    } else if (isUserReceiving) {
      text = `Received ${ coin.short.toUpperCase()}`;
    } else {
      text = `Withdrawn ${ coin.short.toUpperCase()}`;
    }

    return (
      <CelHeading text={text}/>
    )
  }

  renderCoinIcon() {
    const { supportedCurrencies, transaction } = this.props;

    const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];
    const isUserReceiving = transaction.type === 'incoming';

    const coinIcon = <Image source={{ uri: coin.image_url }} style={TransactionDetailsStyle.coinType}/>;
    let iconName;
    let iconColor;

    if (isUserReceiving) {
      iconName = 'ReceiveArrow';
      iconColor = 'rgba(79,184,149,1)';
    } else {
      iconName = 'SentArrow';
      iconColor = 'rgba(239,70,26,1)';
    }

    if (!transaction.is_confirmed) {
      iconColor = 'rgba(225,159,48,1)';
    }

    return (
      <View style={TransactionDetailsStyle.imageWrapper}>
        {coinIcon}
        <View style={TransactionDetailsStyle.iconBackground}>
          <Icon name={iconName} fill={iconColor} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>
        </View>
      </View>
    );
  }

  renderStatus() {
    const { transaction } = this.props;
    const isUserReceiving = transaction.type === 'incoming';
    let status;

    if (transaction.is_confirmed) {
      status = <Text style={TransactionDetailsStyle.infoWithdrawn}>Withdrawn</Text>;
    }
    if (isUserReceiving) {
      status = <Text style={TransactionDetailsStyle.infoReceived}>Received</Text>;
    }
    if (!transaction.is_confirmed) {
      status = <Text style={TransactionDetailsStyle.infoInProgress}>In Progress</Text>;
    }

    return status;
  }

  renderAddressLink() {
    const { transaction } = this.props;

    let webPage;
    let namePage;

    if (transaction.transaction_id && transaction.coin === 'eth') {
      webPage = `${etherscanUrl}/tx/${ transaction.transaction_id}`;
      namePage = 'View on Etherscan';
    }
    if (transaction.transaction_id && transaction.coin === 'btc') {
      webPage = `${blockchainUrl}/tx/${ transaction.transaction_id}`;
      namePage = "View on Blockchain";
    }

    return webPage && namePage ? (
      <View style={TransactionDetailsStyle.linkWrapper}>
        <Text onPress={()=> Linking.openURL(webPage)} style={TransactionDetailsStyle.link}>
          {namePage}
        </Text>
        <Icon
          style={{marginLeft: 5}}
          name='NewWindowIcon'
          height='12' width='12'
          fill='white'
          stroke="rgba(65,86,166,1)"
        />
      </View>
    ) : null;
  }

  renderLoader = (showBackButton) => (
    <BasicLayout
      bottomNavigation
    >
      <MainHeader backButton={showBackButton}/>
      <CelHeading text="Transaction details..." />
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Loader/>
      </View>
    </BasicLayout>
  )

  render() {
    const { supportedCurrencies, transaction, actions, currencyRatesShort, nav } = this.props;

    const showBackButton = !this.cameFromWithdrawalTransaction(nav.routes);

    if (!supportedCurrencies || !transaction) return this.renderLoader(showBackButton);

    const isInterestIncome = this.isInterestIncomeTransaction();

    console.log(isInterestIncome);

    const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];
    const letterSize = transaction.amount_usd && transaction.amount_usd.toString().length >= 10 ? FONT_SCALE * 32 : FONT_SCALE * 36;
    const amountUsd = transaction.amount_usd ? formatter.usd(transaction.amount_usd) : formatter.usd(transaction.amount * currencyRatesShort[transaction.coin]);

    return (
      <BasicLayout
        bottomNavigation
      >
        <MainHeader backButton={showBackButton}/>
        {this.renderCelHeading()}

        <Content>
          <View style={TransactionDetailsStyle.inputWrapper}>
            <View style={TransactionDetailsStyle.amountStatus}>
              <View style={TransactionDetailsStyle.amount}>
                <Text
                  style={[TransactionDetailsStyle.fiatAmount, {fontSize: letterSize}]}
                >
                  { amountUsd }
                </Text>
                <Text style={TransactionDetailsStyle.cryptoAmount}>{ formatter.crypto(transaction.amount, coin.short, { precision: 5 }) }</Text>
              </View>
              {this.renderCoinIcon()}
            </View>
          </View>

          <View style={TransactionDetailsStyle.infoDetail}>
            <View style={TransactionDetailsStyle.row}>
              <Text style={TransactionDetailsStyle.text}>Date:</Text>
              <Text style={TransactionDetailsStyle.info}>{moment(transaction.time).format("D MMM YYYY")}</Text>
            </View>
            <Separator/>
          </View>

          <View style={TransactionDetailsStyle.infoDetail}>
            <View style={TransactionDetailsStyle.row}>
              <Text style={TransactionDetailsStyle.text}>Time:</Text>
              <Text style={TransactionDetailsStyle.info}>{moment.utc(transaction.time).format("HH:mm A")}</Text>
            </View>
            <Separator/>
          </View>

          <View style={TransactionDetailsStyle.infoDetail}>
            <View style={TransactionDetailsStyle.row}>
              <Text style={TransactionDetailsStyle.text}>Status:</Text>
              {this.renderStatus()}
            </View>
            <Separator/>
          </View>

          { (transaction.type === 'incoming' && !isInterestIncome) && (
            <View style={[TransactionDetailsStyle.infoDetail, { marginBottom: 20 }]}>
              <View style={{ flexDirection: "column" }}>
                <Text style={[TransactionDetailsStyle.text, { marginBottom: 10 }]}>From:</Text>
                <Text
                  style={[TransactionDetailsStyle.info, {
                    textAlign: "left",
                    fontFamily: "inconsolata-regular",
                    marginBottom: 5
                  }]}>{transaction.from_address}
                </Text>
                {this.renderAddressLink()}
              </View>
            </View>
          )}
          { transaction.type ==='outgoing' && (
            <View style={[TransactionDetailsStyle.infoDetail, { marginBottom: 20 }]}>
              <View style={{ flexDirection: "column" }}>
                <Text style={[TransactionDetailsStyle.text, { marginBottom: 10 }]}>To:</Text>
                <Text
                  style={[TransactionDetailsStyle.info, {
                    textAlign: "left",
                    fontFamily: "inconsolata-regular",
                    marginBottom: 5
                  }]}>{transaction.to_address}
                  </Text>

              </View>
            </View>
          )}

          { isInterestIncome &&
            <View>
              <Text>Hippo goes here</Text>
            </View>
          }

          <CelButton
            onPress={() => actions.navigateTo('Home')}
            margin='10 36 45 36'
          >
            Close
          </CelButton>

        </Content>
      </BasicLayout>
    );
  }
}

export default TransactionDetails;
