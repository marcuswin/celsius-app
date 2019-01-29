import React from "react";
import moment from "moment";
import { Text, View, Image, Linking, TouchableOpacity } from "react-native";

import { COLORS, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import TransactionDetailsStyle from "./TransactionDetails.styles";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";
import Icon from "../../atoms/Icon/Icon";
import HippoBubble from "../../molecules/HippoBubble/HippoBubble";
import Triangle from "../../atoms/Triangle/Triangle";

export const BasicSection = ({ label, value }) => (
  <View style={TransactionDetailsStyle.infoDetail}>
    <View style={TransactionDetailsStyle.row}>
      <Text style={TransactionDetailsStyle.text}>{label}:</Text>
      <Text style={TransactionDetailsStyle.info}>{value}</Text>
    </View>
    <Separator />
  </View>
)

export const StatusSection = ({ transaction }) => (
  <View style={TransactionDetailsStyle.infoDetail}>
    <View style={TransactionDetailsStyle.row}>
      <Text style={TransactionDetailsStyle.text}>Status:</Text>
      {getStatusText(transaction)}
    </View>
    <Separator />
  </View>
)

export const InfoSection = ({ transaction }) => (
  <View style={{ marginHorizontal: 30 }}>
    <InfoBubble
      color="gray"
      margin={"22 0 25 0"}
      renderContent={(textStyles) => (
        <View>
          <Text style={textStyles}>
            {getInfoSectionText(transaction)}
          </Text>
        </View>
      )}
    />
  </View>
)

export const LinkSection = ({ url, onPress }) => (
  <TouchableOpacity
    style={TransactionDetailsStyle.infoDetail}
    onPress={onPress}
  >
    <View style={[TransactionDetailsStyle.row, { flexDirection: 'column' }]}>
      <Text style={TransactionDetailsStyle.text}>Transaction link:</Text>
      <Text
        style={[TransactionDetailsStyle.info, {
          textAlign: "left",
          fontFamily: "inconsolata-regular",
          marginBottom: 5,
          color: COLORS.blue,
        }]}
      >
        {url}
      </Text>
    </View>
    <Separator />
  </TouchableOpacity>
)

export const BlockExplorerSection = ({ transaction }) => (
  <View style={TransactionDetailsStyle.infoDetail}>
    <TouchableOpacity
      style={[TransactionDetailsStyle.row, { alignItems: 'flex-start' }]}
      onPress={() => Linking.openURL(getBlockExplorerLink(transaction).link)}>
      <Text
        style={TransactionDetailsStyle.info}
      >
        View on {getBlockExplorerLink(transaction).text}
      </Text>
      <Icon name='NewWindowIcon' height='17' width='17' fill={COLORS.blue} />
    </TouchableOpacity>
    <Separator />
  </View>
)

export const ManageTransactionSection = ({ onPress }) => (
  <View style={TransactionDetailsStyle.infoDetail}>
    <TouchableOpacity
      style={[TransactionDetailsStyle.row, { alignItems: 'flex-start' }]}
      onPress={onPress}>
      <Text
        style={TransactionDetailsStyle.info}
      >
        Manage transaction
      </Text>
      <Icon name='NewWindowIcon' height='17' width='17' fill={COLORS.blue} />
    </TouchableOpacity>
    <Separator />
  </View>
)

export const AddressSection = ({ text, address }) => (
  <View style={[TransactionDetailsStyle.infoDetail, { marginBottom: 20 }]}>
    <View style={{ flexDirection: "column" }}>
      <Text style={[TransactionDetailsStyle.text, { marginBottom: 10 }]}>
        {text}:
      </Text>
      <Text
        style={[TransactionDetailsStyle.info, {
          textAlign: "left",
          fontFamily: "inconsolata-regular",
          marginBottom: 5
        }]}
      >
        {address}
      </Text>
    </View>
  </View>
)

export const TransactionLinkSection = ({ transactionLink }) => (
  <View style={[TransactionDetailsStyle.infoDetail, { marginBottom: 20 }]}>
    <View style={{ flexDirection: "column" }}>
      <Text style={[TransactionDetailsStyle.text, { marginBottom: 10 }]}>
        Transaction link:
      </Text>
      <Text
        style={[TransactionDetailsStyle.info, {
          textAlign: "left",
          fontFamily: "inconsolata-regular",
          marginBottom: 5
        }]}
      >
        {transactionLink}
      </Text>
    </View>
  </View>
)

export const CanceledTransactionLinkSection = ({ transactionLink }) => (
  <View style={[TransactionDetailsStyle.infoDetail, { marginBottom: 20 }]}>
  <Text style={[TransactionDetailsStyle.text, { marginBottom: 10 }]}>
        Transaction link:
      </Text>
    <Text
      style={[TransactionDetailsStyle.info, {
        textAlign: "left",
        fontFamily: "inconsolata-regular",
        marginBottom: 5
      }]}
    >
      {transactionLink}
    </Text>
  </View>
)

export const ContactSection = ({ text, contact }) => (
  <View style={[TransactionDetailsStyle.infoDetail, { marginBottom: 20 }]}>
    <View style={[TransactionDetailsStyle.row, { flexDirection: 'column' }]}>
      <Text style={[TransactionDetailsStyle.text, { marginBottom: 10 }]}>
        {text}:
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: contact.profile_picture || 'https://api.staging.celsius.network/profile-images/avatar/avatar-cat.jpg' }}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 20 }}
        />

        <Text style={TransactionDetailsStyle.info}>
          {contact.first_name} {contact.last_name}
        </Text>
      </View>
    </View>
    <Separator />
  </View>
)

export const HippoSection = ({ transaction, currencyRatesShort }) => {
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
            <View style={[TransactionDetailsStyle.interestValueTextWrapper, { marginBottom: 10 }]}>
              <Text style={textStyle}>Initial interest value</Text>
              <Text style={[textStyle, globalStyles.boldText]}>{formatter.usd(amountUsd)}</Text>
            </View>
            <View style={TransactionDetailsStyle.interestValueTextWrapper}>
              <Text style={textStyle}>Today's value</Text>
              <Text style={[textStyle, globalStyles.boldText]}>{formatter.usd(currentInterestAmount)}</Text>
            </View>
          </View>
        }
        sideContent={textStyle =>
          <View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              {interestChangePositive && <Triangle direction="up" color={COLORS.green} />}
              {(!interestChangePositive && !!interestChangePercentage) && <Triangle direction="down" color={COLORS.yellow} />}
              <Text style={[textStyle, globalStyles.boldText, interestChangeStyle]}>{Math.abs(interestChangePercentage).toFixed(2)}%</Text>
              <Text style={textStyle}> change</Text>
            </View>
            <Text style={textStyle}>in value since the time of depositing CEL to your wallet.</Text>
          </View>
        } />
    </View>
  )
}

function getStatusText(transaction) {
  return {
    DEPOSIT_PENDING: <Text style={[TransactionDetailsStyle.info, { color: COLORS.yellow }]}>In Progress</Text>,
    DEPOSIT_CONFIRMED: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>Received</Text>,
    WITHDRAWAL_PENDING: <Text style={[TransactionDetailsStyle.info, { color: COLORS.yellow }]}>In Progress</Text>,
    WITHDRAWAL_CONFIRMED: <Text style={[TransactionDetailsStyle.info, { color: COLORS.red }]}>Withdrawn</Text>,
    INTEREST: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>Received</Text>,
    COLLATERAL: <Text style={[TransactionDetailsStyle.info, { color: COLORS.red }]}>Locked</Text>,
    BONUS_TOKEN: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>ICO Bonus Received</Text>,
    REFERRED_HODL: <Text style={[TransactionDetailsStyle.info, { color: COLORS.blue }]}>HODL reward</Text>,
    REFERRED: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>Referral reward</Text>,
    REFERRER_HODL: <Text style={[TransactionDetailsStyle.info, { color: COLORS.blue }]}>HODL reward</Text>,
    REFERRER: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>Referral reward</Text>,
    TRANSFER_PENDING: <Text style={[TransactionDetailsStyle.info, { color: COLORS.yellow }]}>• Not claimed</Text>,
    TRANSFER_CLAIMED: <Text style={[TransactionDetailsStyle.info, { color: COLORS.yellow }]}>• Verifying user</Text>,
    TRANSFER_SENT: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>• Funds sent</Text>,
    TRANSFER_RECEIVED: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>• Funds received</Text>,
    TRANSFER_RETURNED: <Text style={[TransactionDetailsStyle.info]}>• Returned</Text>,
    CANCELED: <Text style={[TransactionDetailsStyle.info, { color: COLORS.yellow }]}>• Canceled</Text>,

    IN: <Text style={[TransactionDetailsStyle.info, { color: COLORS.green }]}>• Received</Text>,
    OUT: <Text style={[TransactionDetailsStyle.info, { color: COLORS.red }]}>• Sent</Text>,
  }[transaction.type];
}

function getBlockExplorerLink(transaction) {
  return {
    eth: { link: `https://etherscan.io/tx/${transaction.transaction_id}`, text: 'etherscan' },
    btc: { link: `https://blockchain.info/btc/tx/${transaction.transaction_id}`, text: 'blockchain' },
    bch: { link: `https://blockdozer.com/tx/${transaction.transaction_id}`, text: 'blockdozer' },
    ltc: { link: `https://chainz.cryptoid.info/ltc/tx.dws?${transaction.transaction_id}`, text: 'chainz' },
    xrp: { link: `https://xrpcharts.ripple.com/#/transactions/${transaction.transaction_id}`, text: 'xrpcharts' },
    cel: { link: `https://etherscan.io/tx/${transaction.transaction_id}`, text: 'etherscan' },
    omg: { link: `https://etherscan.io/tx/${transaction.transaction_id}`, text: 'etherscan' },
  }[transaction.coin];
}

function getInfoSectionText(transaction) {
  return {
    TRANSFER_PENDING: 'This transaction is connected to the link you\'ve shared to a friend. If nobody accepts this transaction within 7 days the money will get back to you.',
    REFERRED_HODL: `Keep your initial deposit of $1,000.00 until ${moment(transaction.time).format("MMM Do")} to unlock your HODL reward.`,
    REFERRER_HODL: `If a friend you referred keeps their initial deposit until ${moment(transaction.time).format("MMM Do")} your HODL reward will unlock.`,
  }[transaction.type];
}
