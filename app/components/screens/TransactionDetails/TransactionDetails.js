import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import { COLORS, FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import TransactionDetailsStyle from "./TransactionDetails.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import Badge from "../../../components/atoms/Badge/Badge";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import Icon from "../../atoms/Icon/Icon";
import Separator from "../../atoms/Separator/Separator";
import Loader from "../../atoms/Loader/Loader";
import formatter from '../../../utils/formatter';
import HippoBubble from "../../molecules/HippoBubble/HippoBubble";
import Triangle from "../../atoms/Triangle/Triangle";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

// const etherscanUrl = ENV === 'PRODUCTION' ? 'https://etherscan.io' : 'https://kovan.etherscan.io';
// const blockchainUrl = ENV === 'PRODUCTION' ? 'https://blockchain.info' : 'https://testnet.blockchain.info';

function getHeading(transaction) {
  return {
    DEPOSIT_PENDING: `Receiving ${transaction.coin && transaction.coin.toUpperCase()}`,
    DEPOSIT_CONFIRMED: `Received ${transaction.coin && transaction.coin.toUpperCase()}`,
    WITHDRAWAL_PENDING: `Withdrawing ${transaction.coin && transaction.coin.toUpperCase()}`,
    WITHDRAWAL_CONFIRMED: `Withdrawn ${transaction.coin && transaction.coin.toUpperCase()}`,
    INTEREST: `${transaction.interest_coin && transaction.interest_coin.toUpperCase()} Interest`,
    COLLATERAL: `${transaction.coin && transaction.coin.toUpperCase()} Collateral`,
    TRANSFER_PENDING: `${transaction.coin && transaction.coin.toUpperCase()} Sending`,
    TRANSFER_SENT: `${transaction.coin && transaction.coin.toUpperCase()} Sent`,
    TRANSFER_RECEIVED: `${transaction.coin && transaction.coin.toUpperCase()} Received`,
    TRANSFER_RETURNED: `${transaction.coin && transaction.coin.toUpperCase()} Sent`,
  }[transaction.type];
}

function getBadge(transaction) {
  return {
    TRANSFER_PENDING: <Badge color={COLORS.yellow} text="Pending" />,
    TRANSFER_SENT: <Badge color={COLORS.green} text="Sent" />,
    TRANSFER_RECEIVED: <Badge color={COLORS.green} text="Received" />,
    TRANSFER_RETURNED: <Badge color={COLORS.blue} text="Returned" />,
  }[transaction.type];
}

function getIcon(transaction, supportedCurrencies) {
  const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];
  const coinIcon = <Image source={{ uri: coin.image_url }} style={TransactionDetailsStyle.coinType}/>;

  return coinIcon;
}

function getSmallIcon(transaction) {
  return {
    INTEREST: (
      <View style={[{ height: 32, width: 32, borderRadius: 16, backgroundColor: COLORS.blue, paddingLeft: 3, alignItems: 'center', justifyContent: 'center' }]}>
        <Icon name='InterestIcon' height='24' width='24' viewBox="0 0 30 15" fill={STYLES.WHITE_TEXT_COLOR} />
      </View>
    ),
    COLLATERAL: (
      <View style={[{ height: 32, width: 32, borderRadius: 16, backgroundColor: COLORS.blue, paddingLeft: 3, alignItems: 'center', justifyContent: 'center' }]}>
        <Icon name='Lock' width='18' height='18' fill={STYLES.WHITE_TEXT_COLOR} />
      </View>
    ),
    DEPOSIT_PENDING: <Icon name="ReceiveArrow" fill={COLORS.yellow} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    DEPOSIT_CONFIRMED: <Icon name="ReceiveArrow" fill={COLORS.green} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    WITHDRAWAL_PENDING: <Icon name="SentArrow" fill={COLORS.yellow} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    WITHDRAWAL_CONFIRMED: <Icon name="SentArrow" fill={COLORS.red} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
  }[transaction.type];
}

function getStatusText(transaction) {
  return {
    DEPOSIT_PENDING: <Text style={[TransactionDetailsStyle.info, { color: COLORS.yellow }]}>In Progress</Text>,
    DEPOSIT_CONFIRMED: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>Received</Text>,
    WITHDRAWAL_PENDING: <Text style={[TransactionDetailsStyle.info, { color: COLORS.yellow }]}>In Progress</Text>,
    WITHDRAWAL_CONFIRMED: <Text style={[TransactionDetailsStyle.info, { color: COLORS.red }]}>Withdrawn</Text>,
    INTEREST: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>Received</Text>,
    COLLATERAL: <Text style={[TransactionDetailsStyle.info, { color: COLORS.red }]}>Locked</Text>,
    TRANSFER_PENDING: <Text style={[TransactionDetailsStyle.info, { color: COLORS.yellow }]}>• Not claimed</Text>,
    TRANSFER_SENT: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>• Funds sent</Text>,
    TRANSFER_RECEIVED: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>• Funds received</Text>,
    TRANSFER_RETURNED: <Text style={[TransactionDetailsStyle.info]}>• Returned</Text>,
  }[transaction.type];
}

function getSections(transaction) {
  return {
    DEPOSIT_PENDING: ['date', 'time', 'status', 'address:from'],
    DEPOSIT_CONFIRMED: ['date', 'time', 'status', 'address:from'],
    WITHDRAWAL_PENDING: ['date', 'time', 'status', 'address:to'],
    WITHDRAWAL_CONFIRMED: ['date', 'time', 'status', 'address:to'],
    INTEREST: ['date', 'time', 'status', 'hippo'],
    COLLATERAL: ['date', 'time'],
    TRANSFER_PENDING: ['sent:to', 'date', 'time', 'status'],
    TRANSFER_SENT: ['sent:to', 'date', 'time', 'status'],
    TRANSFER_RECEIVED: ['received:from', 'date', 'time', 'status'],
    TRANSFER_RETURNED: ['sent:to', 'date', 'time', 'status'],
  }[transaction.type];
}

@connect(
  state => ({
    nav: state.nav,
    supportedCurrencies: state.generalData.supportedCurrencies,
    callsInProgress: state.api.callsInProgress,
    transaction: state.wallet.transactions[state.wallet.activeTransactionId],
    activeTransactionId: state.wallet.activeTransactionId,
    currencyRatesShort: state.generalData.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TransactionDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: '',
      heading: '',
      badge: '',
      icon: '',
      smallIcon: '',
      status: '',
      sections: [],
    }
  }
  // lifecycle methods
  componentDidMount() {
    const { actions, navigation, activeTransactionId } = this.props;
    actions.getSupportedCurrencies();
    const transactionId = navigation.getParam('id');
    actions.getTransactionDetails(transactionId || activeTransactionId);
  }

  componentWillReceiveProps(nextProps) {
    const { transaction, supportedCurrencies } = nextProps;

    if (transaction) {
      const type = transaction.type;
      this.setState({
        type,
        heading: getHeading(transaction),
        badge: getBadge(transaction),
        icon: getIcon(transaction, supportedCurrencies),
        smallIcon: getSmallIcon(transaction),
        status: getStatusText(transaction),
        sections: getSections(transaction) || [],
      })
    }
  }

  cameFromWithdrawalTransaction = routes => routes.reduce((hasRoute, route) => hasRoute || route.routeName === 'TransactionConfirmation', false);

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

  renderSection = (sectionType) => {
    const { type } = this.state;
    const { transaction, currencyRatesShort } = this.props;

    switch(sectionType) {
      case 'date':
        return <BasicSection key={sectionType} label="Date" value={moment(transaction.time).format("D MMM YYYY")} />;
      case 'time':
        return <BasicSection key={sectionType} label="Time" value={moment.utc(transaction.time).format("HH:mm A")} />;
      case 'status':
        return <StatusSection key={sectionType} type={type} transaction={transaction} />;
      case 'address:to':
        return transaction.to_address && <AddressSection key={sectionType} address={transaction.to_address} text="To"/>;
      case 'address:from':
        return transaction.from_address && <AddressSection key={sectionType} address={transaction.from_address} text="From"/>;
      case 'sent:to':
        return transaction.transfer_data.claimer && <ContactSection key={sectionType} contact={transaction.transfer_data.claimer} text="Sent to"/>;
      case 'received:from':
        return <ContactSection key={sectionType} contact={transaction.transfer_data.sender} text="Received from"/>;
      case 'hippo':
        return <HippoSection key={sectionType} transaction={transaction} currencyRatesShort={currencyRatesShort} />;
      default:
        return null;
    }
  }

  render() {
    const { sections, heading, icon, smallIcon, badge } = this.state;
    const { supportedCurrencies, transaction, actions, currencyRatesShort, nav, callsInProgress } = this.props;

    const showBackButton = !this.cameFromWithdrawalTransaction(nav.routes);
    const isLoading = apiUtil.areCallsInProgress([API.GET_TRANSACTION_DETAILS], callsInProgress);
    if (!supportedCurrencies || !transaction || isLoading) return this.renderLoader(showBackButton);

    const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];
    const letterSize = transaction.amount_usd && transaction.amount_usd.toString().length >= 10 ? FONT_SCALE * 32 : FONT_SCALE * 36;
    const amountUsd = transaction.amount_usd ? transaction.amount_usd : transaction.amount * currencyRatesShort[transaction.coin];

    return (
      <BasicLayout
        bottomNavigation
      >
        <MainHeader backButton={showBackButton}/>
        <CelHeading text={heading} />

        <Content>
          <View style={TransactionDetailsStyle.inputWrapper}>
            <View style={TransactionDetailsStyle.amountStatus}>
              <View style={TransactionDetailsStyle.amount}>
                { badge }
                <Text
                  style={[TransactionDetailsStyle.fiatAmount, {fontSize: letterSize}]}
                >
                  { formatter.usd(amountUsd) }
                </Text>
                <Text style={TransactionDetailsStyle.cryptoAmount}>{ formatter.crypto(transaction.amount, coin.short, { precision: 5 }) }</Text>
              </View>

              <View style={TransactionDetailsStyle.imageWrapper}>
                { icon }
                { smallIcon && <View style={TransactionDetailsStyle.iconBackground}>{smallIcon}</View> }
              </View>
            </View>
          </View>

          { sections.map(this.renderSection) }

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

const BasicSection = ({ label, value }) => (
  <View style={TransactionDetailsStyle.infoDetail}>
    <View style={TransactionDetailsStyle.row}>
      <Text style={TransactionDetailsStyle.text}>{ label }:</Text>
      <Text style={TransactionDetailsStyle.info}>{ value }</Text>
    </View>
    <Separator/>
  </View>
)

const StatusSection = ({ transaction }) => (
  <View style={TransactionDetailsStyle.infoDetail}>
    <View style={TransactionDetailsStyle.row}>
      <Text style={TransactionDetailsStyle.text}>Status:</Text>
      { getStatusText(transaction) }
    </View>
    <Separator/>
  </View>
)

const AddressSection = ({ text, address }) => (
  <View style={[TransactionDetailsStyle.infoDetail, { marginBottom: 20 }]}>
    <View style={{ flexDirection: "column" }}>
      <Text style={[TransactionDetailsStyle.text, { marginBottom: 10 }]}>
        { text }:
      </Text>
      <Text
        style={[TransactionDetailsStyle.info, {
          textAlign: "left",
          fontFamily: "inconsolata-regular",
          marginBottom: 5
        }]}
      >
        { address }
      </Text>
    </View>
  </View>
)

const ContactSection = ({ text, contact }) => (
  <View style={[TransactionDetailsStyle.infoDetail, { marginBottom: 20 }]}>
    <View style={[TransactionDetailsStyle.row, { flexDirection: 'column' }]}>
      <Text style={[TransactionDetailsStyle.text, { marginBottom: 10 }]}>
        { text }:
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{ uri: contact.profile_picture }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 20 }} />
        <Text style={TransactionDetailsStyle.info}>
          { contact.first_name } { contact.last_name }
        </Text>
      </View>
    </View>
    <Separator/>
  </View>
)

const HippoSection = ({ transaction, currencyRatesShort }) => {
  const amountUsd = transaction.amount_usd ? transaction.amount_usd : transaction.amount * currencyRatesShort[transaction.coin];
  const currentInterestAmount = transaction.amount * currencyRatesShort[transaction.coin];
  const interestChangePercentage = (currentInterestAmount / amountUsd - 1) * 100;
  const interestChangePositive = interestChangePercentage > 0;
  const interestChangeStyle = {
    color: COLORS.yellow,
  };

  if (interestChangePositive) {
    interestChangeStyle.color = COLORS.green;
  }
  return (
    <View style={TransactionDetailsStyle.hippoInfoWrapper}>
      <HippoBubble
        bubbleContent={textStyle =>
          <View>
            <View style={[TransactionDetailsStyle.interestValueTextWrapper, {marginBottom: 10}]}>
              <Text style={textStyle}>Initial interest value</Text>
              <Text style={[textStyle, globalStyles.boldText]}>{ formatter.usd(amountUsd) }</Text>
            </View>
            <View style={TransactionDetailsStyle.interestValueTextWrapper}>
              <Text style={textStyle}>Today's value</Text>
              <Text style={[textStyle, globalStyles.boldText]}>{ formatter.usd(currentInterestAmount) }</Text>
            </View>
          </View>
        }
        sideContent={textStyle =>
          <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {interestChangePositive && <Triangle direction="up" color={COLORS.green}/>}
              {(!interestChangePositive && !!interestChangePercentage) && <Triangle direction="down" color={COLORS.yellow}/>}
              <Text style={[textStyle, globalStyles.boldText, interestChangeStyle]}>{Math.abs(interestChangePercentage).toFixed(2)}%</Text>
              <Text style={textStyle}> change</Text>
            </View>
            <Text style={textStyle}>in value since the time of depositing CEL to your wallet.</Text>
          </View>
        }/>
    </View>
  )
}
