import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { Constants } from "expo";

import * as appActions from "../../../redux/actions";
import { COLORS, FONT_SCALE, STYLES } from "../../../config/constants/style";
import TransactionDetailsStyle from "./TransactionDetails.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import Badge from "../../../components/atoms/Badge/Badge";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import Icon from "../../atoms/Icon/Icon";
import Loader from "../../atoms/Loader/Loader";
import formatter from '../../../utils/formatter';
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";
import { BRANCH_LINKS, MODALS, TRANSACTION_TYPES } from "../../../config/constants/common";
import { createBUO } from "../../../redux/branch/branchActions";
import TransactionOptionsModal from "../../organisms/TransactionOptionsModal/TransactionOptionsModal";
import {
  BasicSection,
  StatusSection,
  InfoSection,
  LinkSection,
  BlockExplorerSection,
  AddressSection,
  ContactSection,
  HippoSection,
} from './TransactionDetailsSections';

function getHeading(transaction) {
  return {
    DEPOSIT_PENDING: `Receiving ${transaction.coin && transaction.coin.toUpperCase()}`,
    DEPOSIT_CONFIRMED: `Received ${transaction.coin && transaction.coin.toUpperCase()}`,
    WITHDRAWAL_PENDING: `Withdrawing ${transaction.coin && transaction.coin.toUpperCase()}`,
    WITHDRAWAL_CONFIRMED: `Withdrawn ${transaction.coin && transaction.coin.toUpperCase()}`,
    INTEREST: `${transaction.interest_coin && transaction.interest_coin.toUpperCase()} Interest`,
    COLLATERAL: `${transaction.coin && transaction.coin.toUpperCase()} Collateral`,
    BONUS_TOKEN: 'Bonus Tokens',
    TRANSFER_PENDING: `${transaction.coin && transaction.coin.toUpperCase()} Sending`,
    TRANSFER_CLAIMED: `${transaction.coin && transaction.coin.toUpperCase()} Claimed`,
    TRANSFER_SENT: `${transaction.coin && transaction.coin.toUpperCase()} Sent`,
    TRANSFER_RECEIVED: `${transaction.coin && transaction.coin.toUpperCase()} Received`,
    TRANSFER_RETURNED: `${transaction.coin && transaction.coin.toUpperCase()} Sent`,
    REFERRED_AWARD: `${transaction.coin && transaction.coin.toUpperCase()} Award`,

    IN: `${transaction.coin && transaction.coin.toUpperCase()} Received`,
    OUT: `${transaction.coin && transaction.coin.toUpperCase()} Sent`,
  }[transaction.type];
}

function getBadge(transaction) {
  return {
    TRANSFER_PENDING: <Badge color={COLORS.yellow} text="Pending" />,
    TRANSFER_CLAIMED: <Badge color={COLORS.yellow} text="Claimed" />,
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
    REFERRED_AWARD: (
      <View style={[{ height: 32, width: 32, borderRadius: 16, backgroundColor: COLORS.green, alignItems: 'center', justifyContent: 'center' }]}>
        <Icon name='Gift' width='20' height='20' fill={STYLES.WHITE_TEXT_COLOR} />
      </View>
    ),
    BONUS_TOKEN: <Icon name="ReceiveArrow" fill={COLORS.green} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    DEPOSIT_PENDING: <Icon name="ReceiveArrow" fill={COLORS.yellow} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    DEPOSIT_CONFIRMED: <Icon name="ReceiveArrow" fill={COLORS.green} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    WITHDRAWAL_PENDING: <Icon name="SentArrow" fill={COLORS.yellow} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    WITHDRAWAL_CONFIRMED: <Icon name="SentArrow" fill={COLORS.red} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    IN: <Icon name="ReceiveArrow" fill={COLORS.green} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
    OUT: <Icon name="SentArrow" fill={COLORS.red} stroke='white' height='32' width='32' viewBox="0 0 32 32"/>,
  }[transaction.type];
}

function getSections(transaction) {
  return {
    DEPOSIT_PENDING: ['date', 'time', 'status', 'address:from', 'explorer'],
    DEPOSIT_CONFIRMED: ['date', 'time', 'status', 'address:from', 'explorer'],
    WITHDRAWAL_PENDING: ['date', 'time', 'status', 'address:to', 'explorer'],
    WITHDRAWAL_CONFIRMED: ['date', 'time', 'status', 'address:to', 'explorer'],
    INTEREST: ['date', 'time', 'status', 'hippo'],
    COLLATERAL: ['date', 'time'],
    BONUS_TOKEN: ['date', 'time', 'status'],
    REFERRED_AWARD: ['date', 'time', 'status', 'referrer'],
    TRANSFER_PENDING: ['info', 'date', 'time', 'status', 'transfer-link'],
    TRANSFER_CLAIMED: ['sent:to', 'date', 'time', 'status'],
    TRANSFER_SENT: ['sent:to', 'date', 'time', 'status'],
    TRANSFER_RECEIVED: ['received:from', 'date', 'time', 'status'],
    TRANSFER_RETURNED: ['sent:to', 'date', 'time', 'status'],

    IN: ['date', 'time'],
    OUT: ['date', 'time'],
  }[transaction.type];
}

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
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
      badge: undefined,
      icon: undefined,
      smallIcon: undefined,
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

  async componentWillReceiveProps(nextProps) {
    const { transaction, supportedCurrencies } = nextProps;

    if (transaction) {
      const type = transaction.type;
      const branchLink = await this.createTransferBranchLink();
      this.setState({
        type,
        heading: getHeading(transaction),
        badge: getBadge(transaction),
        icon: getIcon(transaction, supportedCurrencies),
        smallIcon: getSmallIcon(transaction),
        sections: getSections(transaction) || [],
        branchLink,
      })
    }
  }

  createTransferBranchLink = async () => {
    const { transaction, user } = this.props;
    if (transaction.type && transaction.type !== TRANSACTION_TYPES.TRANSFER_PENDING) return;

    const branchLink = await createBUO(
      `transfer:${transaction.transfer_data.hash}`,
      {
        locallyIndex: true,
        title: `You received ${transaction.amount} ${transaction.coin.toUpperCase()}`,
        contentImageUrl: 'https://image.ibb.co/kFkHnK/Celsius_Device_Mock_link.jpg',
        contentDescription: 'Click on the link to get your money!',
        contentMetadata: {
          customMetadata: {
            amount: transaction.amount,
            coin: transaction.coin,
            from_name: `${user.first_name} ${user.last_name}`,
            from_profile_picture: user.profile_picture,
            transfer_hash: transaction.transfer_data.hash,
            link_type: BRANCH_LINKS.TRANSFER,
          }
        }
      },
      user.email
    );

  return branchLink;
  }

  cameFromWithdrawalTransaction = routes => routes.reduce((hasRoute, route) => hasRoute || route.routeName === 'TransactionConfirmation' || route.routeName === 'EnterPasscode', false);

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
    const { ENV } = Constants;
    const { type, branchLink } = this.state;
    const { transaction, currencyRatesShort, actions } = this.props;
    let shouldRenderSection;
    switch(sectionType) {
      case 'info':
        return <InfoSection key={sectionType} transaction={transaction} />;
      case 'date':
        return <BasicSection key={sectionType} label="Date" value={moment(transaction.time).format("D MMM YYYY")} />;
      case 'time':
        return <BasicSection key={sectionType} label="Time" value={moment.utc(transaction.time).format("HH:mm A")} />;
      case 'referrer':
        return <BasicSection key={sectionType} label="Referred by" value={transaction.referrer} />;
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
      case 'transfer-link':
        return branchLink && (
          <LinkSection
            key={sectionType}
            transaction={transaction}
            url={branchLink.url}
            onPress={() => actions.openModal(MODALS.TRANSACTION_OPTIONS)}
          />
        );
      case 'explorer':
        shouldRenderSection = ['PRODUCTION', 'PREPROD'].indexOf(ENV) !== -1 && transaction.transaction_id;
        return  shouldRenderSection && <BlockExplorerSection key={sectionType} transaction={transaction}/>;
      case 'hippo':
        return <HippoSection key={sectionType} transaction={transaction} currencyRatesShort={currencyRatesShort} />;
      default:
        return null;
    }
  }

  render() {
    const { sections, heading, icon, smallIcon, badge, branchLink } = this.state;
    const { supportedCurrencies, transaction, actions, currencyRatesShort, nav, callsInProgress } = this.props;

    const showBackButton = !this.cameFromWithdrawalTransaction(nav.routes);
    const isLoading = apiUtil.areCallsInProgress([API.GET_TRANSACTION_DETAILS], callsInProgress);
    if (
      !supportedCurrencies || !transaction || isLoading ||
      (transaction.type === TRANSACTION_TYPES.TRANSFER_PENDING && !branchLink && Constants.appOwnership === 'standalone')
    ) return this.renderLoader(showBackButton);

    const coin = supportedCurrencies.filter(sc => sc.short.toLowerCase() === transaction.coin)[0];
    const letterSize = transaction.amount_usd && transaction.amount_usd.toString().length >= 10 ? FONT_SCALE * 32 : FONT_SCALE * 36;
    const amountUsd = transaction.amount_usd ? transaction.amount_usd : transaction.amount * currencyRatesShort[transaction.coin];

    return (
      <BasicLayout
        bottomNavigation
      >
        <MainHeader backButton={showBackButton}/>
        <CelHeading text={heading} />

        <CelScreenContent padding={"0 0 0 0"}>
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
            onPress={() => actions.navigateTo('Home', true)}
            margin='10 36 0 36'
          >
            Close
          </CelButton>
        </CelScreenContent>

        { branchLink && transaction.type === TRANSACTION_TYPES.TRANSFER_PENDING && <TransactionOptionsModal link={branchLink.url} hash={transaction.transfer_data.hash} />}
      </BasicLayout>
    );
  }
}

export default TransactionDetails;
