import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Content } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import { COLORS, FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import TransactionDetailsStyle from "./TransactionDetails.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import Icon from "../../atoms/Icon/Icon";
import Separator from "../../atoms/Separator/Separator";
import Loader from "../../atoms/Loader/Loader";
import formatter from '../../../utils/formatter';
import HippoBubble from "../../molecules/HippoBubble/HippoBubble";
import Triangle from "../../atoms/Triangle/Triangle";

// const etherscanUrl = ENV === 'PRODUCTION' ? 'https://etherscan.io' : 'https://kovan.etherscan.io';
// const blockchainUrl = ENV === 'PRODUCTION' ? 'https://blockchain.info' : 'https://testnet.blockchain.info';

const TRANSACTION_TYPES = {
  DEPOSIT_PENDING: 'DEPOSIT_PENDING',
  DEPOSIT_CONFIRMED: 'DEPOSIT_CONFIRMED',
  WITHDRAWAL_PENDING: 'WITHDRAWAL_PENDING',
  WITHDRAWAL_CONFIRMED: 'WITHDRAWAL_CONFIRMED',
  INTEREST: 'INTEREST',
  COLLATERAL: 'COLLATERAL',
  TRANSFER_PENDING: 'TRANSFER_PENDING',
  TRANSFER_SENT: 'TRANSFER_SENT',
  TRANSFER_RECEIVED: 'TRANSFER_RECEIVED',
  TRANSFER_RETURNED: 'TRANSFER_RETURNED',
  TRANSFER_EXPIRED: 'TRANSFER_EXPIRED',
  TRANSFER_ONHOLD: 'TRANSFER_ONHOLD',
}

function getHeading(transaction, type) {
  return {
    DEPOSIT_PENDING: `Received ${transaction.coin && transaction.coin.toUpperCase()}`,
    DEPOSIT_CONFIRMED: `Received ${transaction.coin && transaction.coin.toUpperCase()}`,
    WITHDRAWAL_PENDING: `Withdrawn ${transaction.coin && transaction.coin.toUpperCase()}`,
    WITHDRAWAL_CONFIRMED: `Withdrawn ${transaction.coin && transaction.coin.toUpperCase()}`,
    INTEREST: `${transaction.interest_coin && transaction.interest_coin.toUpperCase()} Interest`,
    COLLATERAL: `${transaction.coin && transaction.coin.toUpperCase()} Collateral`,
    TRANSFER_PENDING: `${transaction.coin && transaction.coin.toUpperCase()} Sending`,
    TRANSFER_SENT: `${transaction.coin && transaction.coin.toUpperCase()} Sent`,
    TRANSFER_RECEIVED: `${transaction.coin && transaction.coin.toUpperCase()} Received`,
    TRANSFER_RETURNED: `${transaction.coin && transaction.coin.toUpperCase()} Sent`,
  }[type];
}

function getBadge(transaction, type) {
  return {
    TRANSFER_PENDING: <Badge color={COLORS.yellow} text="Pending" />,
    TRANSFER_SENT: <Badge color={COLORS.green} text="Sent" />,
    TRANSFER_RECEIVED: <Badge color={COLORS.green} text="Received" />,
    TRANSFER_RETURNED: <Badge color={COLORS.blue} text="Returned" />,
  }[type];
}

function getIcon(transaction, type, supportedCurrencies) {
  const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];
  const coinIcon = <Image source={{ uri: coin.image_url }} style={TransactionDetailsStyle.coinType}/>;

  return (type === 'INTEREST') ? '' : coinIcon;
}

function getSmallIcon(transaction, type) {
  return {
    DEPOSIT_PENDING: <Icon name="ReceiveArrow" fill={COLORS.yellow} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    DEPOSIT_CONFIRMED: <Icon name="ReceiveArrow" fill={COLORS.green} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    WITHDRAWAL_PENDING: <Icon name="SentArrow" fill={COLORS.yellow} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    WITHDRAWAL_CONFIRMED: <Icon name="SentArrow" fill={COLORS.red} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
  }[type];
}

function getStatusText(transaction, type) {
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
  }[type];
}

function getSections(transaction, type) {
  return {
    DEPOSIT_PENDING: ['date', 'time', 'status', 'address:from'],
    DEPOSIT_CONFIRMED: ['date', 'time', 'status', 'address:from'],
    WITHDRAWAL_PENDING: ['date', 'time', 'status', 'address:to'],
    WITHDRAWAL_CONFIRMED: ['date', 'time', 'status', 'address:to'],
    INTEREST: ['date', 'time', 'status', 'hippo'],
    COLLATERAL: ['date', 'time'],
    TRANSFER_PENDING: ['contact:to', 'date', 'time', 'status'],
    TRANSFER_SENT: ['contact:to', 'date', 'time', 'status'],
    TRANSFER_RECEIVED: ['contact:to', 'date', 'time', 'status'],
    TRANSFER_RETURNED: ['contact:to', 'date', 'time', 'status'],
  }[type];
}

function getTransactionType(transaction) {
  if (transaction.nature === 'deposit' && transaction.status === 'pending') return TRANSACTION_TYPES.DEPOSIT_PENDING;
  if (transaction.nature === 'deposit' && transaction.status !== 'pending') return TRANSACTION_TYPES.DEPOSIT_CONFIRMED;
  if (transaction.nature === 'withdrawal' && transaction.status === 'pending') return TRANSACTION_TYPES.WITHDRAWAL_PENDING;
  if (transaction.nature === 'withdrawal' && transaction.status !== 'pending') return TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED;
  if (transaction.nature === 'interest') return TRANSACTION_TYPES.INTEREST;
  if (transaction.nature === 'collateral') return TRANSACTION_TYPES.COLLATERAL;

  if (transaction.nature === 'inbound_transfer' && transaction.transfer_data) return TRANSACTION_TYPES.TRANSFER_RECEIVED;
  if (transaction.nature === 'outbound_transfer' && transaction.transfer_data) {
    if (!transaction.transfer_data.claimed_at && !transaction.transfer_data.cleared_at && !transaction.transfer_data.expired_at) return TRANSACTION_TYPES.TRANSFER_PENDING;
    if (transaction.transfer_data.claimed_at && transaction.transfer_data.cleared_at) return TRANSACTION_TYPES.TRANSFER_SENT;
    if (transaction.transfer_data.expired_at) return TRANSACTION_TYPES.TRANSFER_RETURNED;
  }
}

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
      const type = getTransactionType(transaction);
      this.setState({
        type,
        heading: getHeading(transaction, type),
        badge: getBadge(transaction, type),
        icon: getIcon(transaction, type, supportedCurrencies),
        smallIcon: getSmallIcon(transaction, type),
        status: getStatusText(transaction, type),
        sections: getSections(transaction, type) || [],
      })
    }
  }

  cameFromWithdrawalTransaction = routes => routes.reduce((hasRoute, route) => hasRoute || route.routeName === 'TransactionConfirmation', false);

  isInterestIncomeTransaction = () => {
    const { transaction } = this.props;

    return transaction.type === 'incoming' && transaction.nature === 'interest';
  };

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
    const { transaction } = this.props;
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
      case 'interest':
        return null;
      default:
        return null;
    }
  }

  render() {
    const { supportedCurrencies, transaction, actions, currencyRatesShort, nav } = this.props;

    const showBackButton = !this.cameFromWithdrawalTransaction(nav.routes);
    if (!supportedCurrencies || !transaction) return this.renderLoader(showBackButton);


    const isInterestIncome = this.isInterestIncomeTransaction();

    const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];
    const letterSize = transaction.amount_usd && transaction.amount_usd.toString().length >= 10 ? FONT_SCALE * 32 : FONT_SCALE * 36;
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

    const { sections, heading, icon, smallIcon, badge } = this.state;

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

          { isInterestIncome &&
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

const BasicSection = ({ label, value }) => (
  <View style={TransactionDetailsStyle.infoDetail}>
    <View style={TransactionDetailsStyle.row}>
      <Text style={TransactionDetailsStyle.text}>{ label }:</Text>
      <Text style={TransactionDetailsStyle.info}>{ value }</Text>
    </View>
    <Separator/>
  </View>
)

const StatusSection = ({ transaction, type }) => (
  <View style={TransactionDetailsStyle.infoDetail}>
    <View style={TransactionDetailsStyle.row}>
      <Text style={TransactionDetailsStyle.text}>Status:</Text>
      { getStatusText(transaction, type) }
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
        { contact.name }
      </Text>
    </View>
  </View>
)

// const HippoSection = ({ transaction }) => {
//   const currencyRatesShort = {};
//   const amountUsd = transaction.amount_usd ? transaction.amount_usd : transaction.amount * currencyRatesShort[transaction.coin];
//   const currentInterestAmount = transaction.amount * currencyRatesShort[transaction.coin];
//   const interestChangePercentage = (currentInterestAmount / amountUsd - 1) * 100;
//   const interestChangePositive = interestChangePercentage > 0;
//   const interestChangeStyle = {
//     color: COLORS.yellow,
//   };
//
//   if (interestChangePositive) {
//     interestChangeStyle.color = COLORS.green;
//   }
//   return (
//     <View style={TransactionDetailsStyle.hippoInfoWrapper}>
//       <HippoBubble
//         bubbleContent={textStyle =>
//           <View>
//             <View style={[TransactionDetailsStyle.interestValueTextWrapper, {marginBottom: 10}]}>
//               <Text style={textStyle}>Initial interest value</Text>
//               <Text style={[textStyle, globalStyles.boldText]}>{ formatter.usd(amountUsd) }</Text>
//             </View>
//             <View style={TransactionDetailsStyle.interestValueTextWrapper}>
//               <Text style={textStyle}>Today's value</Text>
//               <Text style={[textStyle, globalStyles.boldText]}>{ formatter.usd(currentInterestAmount) }</Text>
//             </View>
//           </View>
//         }
//         sideContent={textStyle =>
//           <View>
//             <View style={{display: 'flex', flexDirection: 'row'}}>
//               {interestChangePositive && <Triangle direction="up" color={COLORS.green}/>}
//               {(!interestChangePositive && !!interestChangePercentage) && <Triangle direction="down" color={COLORS.yellow}/>}
//               <Text style={[textStyle, globalStyles.boldText, interestChangeStyle]}>{Math.abs(interestChangePercentage).toFixed(2)}%</Text>
//               <Text style={textStyle}> change</Text>
//             </View>
//             <Text style={textStyle}>in value since the time of depositing CEL to your wallet.</Text>
//           </View>
//         }/>
//     </View>
//   )
// }

const Badge = ({ text, color }) => (
  <View style={{
    height: 20, borderRadius: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: color, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start',
  }}>
    <Text style={{
      fontSize: 12,
      fontFamily: 'agile-medium',
      color: 'white',
      textAlign: 'center',
    }}>
      { text }
    </Text>
  </View>
)
