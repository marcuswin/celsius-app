import React, { Component } from "react";
import { Text, View, Image, Linking } from "react-native";
import { Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as actions from "../../../redux/actions";
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

@connect(
  state => ({
    nav: state.nav,
    supportedCurrencies: state.generalData.supportedCurrencies,
    ethOriginatingAddress: state.wallet.addresses.ethOriginatingAddress,
    btcOriginatingAddress: state.wallet.addresses.btcOriginatingAddress,
    transaction: state.wallet.transactions[state.wallet.activeTransactionId],
    activeTransactionId: state.wallet.activeTransactionId,
    currencyRatesShort: state.generalData.currencyRatesShort,
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class TransactionDetails extends Component {
  // lifecycle methods
  componentDidMount() {
    const { getTransactionDetails, navigation, getSupportedCurrencies, activeTransactionId } = this.props;
    getSupportedCurrencies();
    const transactionId = navigation.getParam('id');
    getTransactionDetails(transactionId || activeTransactionId);
  }

  renderCelHeading() {
    const { supportedCurrencies, transaction, userOriginatingAddress } = this.props;
    const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];
    const isUserReceiving = transaction.to_address === userOriginatingAddress;
    let text;


    if (isUserReceiving) {
      text = `Received ${ coin.short.toUpperCase()}`;
    } else {
      text=`Withdrawn ${ coin.short.toUpperCase()}`
    }

    return (
      <CelHeading text={text}/>
    )
  }

  renderCoinIcon() {
    const { supportedCurrencies, transaction, userOriginatingAddress } = this.props;

    const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];
    const isUserReceiving = transaction.to_address === userOriginatingAddress;

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
    const { transaction, userOriginatingAddress } = this.props;
    const isUserReceiving = transaction.to_address === userOriginatingAddress;
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
    const { transaction, supportedCurrencies } = this.props;
    const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];


    let webPage;
    let namePage

    if (transaction.transacton_id && coin.short.toLowerCase() === 'eth') {
      webPage = `https://etherscan.io/tx/${ transaction.transaction_id}`;
      namePage = 'View on Etherscan';
    }
    if (transaction.transacton_id && coin.short.toLowerCase() === 'btc') {
      webPage = `https://blockchain.info/tx/${ transaction.transaction_id}`;
      namePage = "View on Blockchain";
    }

    return webPage && namePage ? (
      <Text onPress={()=> Linking.openURL(webPage)} style={TransactionDetailsStyle.link}>
        {namePage} <Icon
        name='NewWindowIcon'
        height='12' width='12'
        fill='white'
        stroke="rgba(65,86,166,1)"
      />
      </Text>
    ) : null;
  }

  render() {
    const { supportedCurrencies, transaction, navigateTo, currencyRatesShort } = this.props;

    if (!supportedCurrencies || !transaction) return <Loader text="Checking Data"/>;

    const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];
    const letterSize = transaction.amount_usd && transaction.amount_usd.toString().length >= 10 ? FONT_SCALE * 32 : FONT_SCALE * 36;
    const amountUsd = transaction.amount_usd ? formatter.usd(transaction.amount_usd) : formatter.usd(transaction.amount * currencyRatesShort[transaction.coin]);

    return (
      <BasicLayout
        bottomNavigation
      >
        <MainHeader backButton/>
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
              {this.renderAddressLink()}
            </View>
          </View>

          <CelButton
            onPress={() => navigateTo('Home')}
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
