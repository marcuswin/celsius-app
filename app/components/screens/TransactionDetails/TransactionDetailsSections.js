import React from "react";
import { View, TouchableOpacity, Linking } from "react-native";

import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import Icon from "../../atoms/Icon/Icon";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";

export const InfoSection = ({ transaction, transactionProps }) => (
  <View>
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Icon width="12" fill={transactionProps.color} name={transactionProps.iconName} style={{ marginRight: 5 }} />
      <CelText color={transactionProps.color}>{transactionProps.statusText}</CelText>
    </View>

    <CelText type="H1" bold align="center">{formatter.crypto(transaction.amount, transaction.coin.toUpperCase(), { precision: 5 })}</CelText>
    <CelText color={STYLES.COLORS.MEDIUM_GRAY} type="H3" align="center">{`${formatter.usd(transaction.amount_usd)} USD`}</CelText>
  </View>
)

export const BasicSection = ({ label, value, noSeparator = false }) => (
  <View style={{ width: '100%', paddingHorizontal: 20 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
      <CelText type="H6">{label}:</CelText>
      <CelText type="H6">{value}</CelText>
    </View>
    {!noSeparator && <Separator />}
  </View>
)

export const CollateralSection = ({ dollarAmount, coinAmount, coin }) => (
  <View style={{ width: '100%', paddingHorizontal: 20, backgroundColor: STYLES.COLORS.DARK_GRAY_OPACITY, paddingVertical: 20 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
      <CelText type="H6">Locked Collateral:</CelText>
      <CelText type="H6">{`${formatter.usd(dollarAmount)} (at the time of initiation)`}</CelText>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <CelText type="H6">{formatter.crypto(coinAmount, coin.toUpperCase())}</CelText>
    </View>
  </View>
)

export const StatusSection = ({ transactionProps, noSeparator = false }) => (
  <View style={{ width: '100%', paddingHorizontal: 20 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
      <CelText type="H6">Status:</CelText>
      <CelText type="H6" color={transactionProps.color}>{transactionProps.statusText}</CelText>
    </View>
    {!noSeparator && <Separator />}
  </View>
)

export const AddressSection = ({ transaction, text, address }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <Card margin={'20 0 20 0'}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
        <CelText>{text}</CelText>
        {!!transaction.transaction_id &&
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'flex-start' }}
            onPress={() => Linking.openURL(getBlockExplorerLink(transaction).link)}>
            <CelText color={STYLES.COLORS.CELSIUS_BLUE}>View on {getBlockExplorerLink(transaction).text}</CelText>
            <Icon name='NewWindowIcon' height='17' width='17' fill={STYLES.COLORS.CELSIUS_BLUE} style={{ marginLeft: 5 }} />
          </TouchableOpacity>
        }
      </View>
      <CelText type="H3">{address}</CelText>
    </Card>
  </View>
)

export const NoteSection = ({ text }) => (
  text ? (
    <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 20 }}>
      <CelText>Note:</CelText>
      <CelText italic>{text}</CelText>
    </View>
  ) : null
)

export const InterestSection = ({ interestEarned, coin, navigateTo }) => (
  <View style={{ width: '100%', paddingHorizontal: 20 }}>
    <Card>
      <CelText type="H6" align="center" color={STYLES.COLORS.MEDIUM_GRAY} style={{ marginBottom: 2 }}>So far you earned</CelText>
      <CelText type="H3" weight="600" bold align="center">{formatter.crypto(interestEarned, coin, { precision: 5 })}</CelText>
    </Card>
    <Card>
      <View style={{ alignItems: 'flex-start', marginVertical: 10, marginHorizontal: 10 }}>
        <CelText type="H4" weight="500" bold style={{ marginBottom: 5 }}>Want to earn better interest rates?</CelText>
        <CelText type="H4" weight="300" style={{ marginBottom: 10}} color={STYLES.COLORS.MEDIUM_GRAY}>Earn interest in CEL! Simply go to your settings and change the way you receive interest.</CelText>
        <CelButton basic onPress={() => navigateTo('Settings')}>Change settings</CelButton>
      </View>
    </Card>
  </View>
)

export const LoanInfoSection = ({ navigateTo }) => (
  <Card>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <CelText type="H4" color={STYLES.COLORS.MEDIUM_GRAY}>Your loan application was rejected, please apply for a new loan or</CelText>
      <TouchableOpacity onPress={() => Linking.openURL("mailto:app@celsius.network")}>
        <CelText type="H4" color={STYLES.COLORS.CELSIUS_BLUE}>contact our support </CelText>
      </TouchableOpacity>
      <CelText type="H4" color={STYLES.COLORS.MEDIUM_GRAY}>for more details.</CelText>
    </View>
    <CelButton margin="16 0 10 0" onPress={() => navigateTo('Borrow')}>Apply for another loan</CelButton>
  </Card>
)

export const HodlInfoSection = ({ date, amount, coin }) => (
  <View style={{ width: '100%', paddingHorizontal: 20 }}>
    <Card>
      <CelText type="H4" color={STYLES.COLORS.MEDIUM_GRAY}>Keep your initial deposit of {formatter.crypto(amount, coin.toUpperCase())} until
          <CelText type="H4" color={STYLES.COLORS.MEDIUM_GRAY} bold>{` ${date} `}</CelText>to unlock your HODL reward.
        </CelText>
    </Card>
  </View>
)

function getBlockExplorerLink(transaction) {
  return {
    eth: { link: `https://etherscan.io/tx/${transaction.transaction_id}`, text: 'etherscan' },
    btc: { link: `https://blockchain.info/btc/tx/${transaction.transaction_id}`, text: 'blockchain' },
    bch: { link: `https://blockdozer.com/tx/${transaction.transaction_id}`, text: 'blockdozer' },
    ltc: { link: `https://chainz.cryptoid.info/ltc/tx.dws?${transaction.transaction_id}`, text: 'chainz' },
    xrp: { link: `https://xrpcharts.ripple.com/#/transactions/${transaction.transaction_id}`, text: 'xrpcharts' },
    cel: { link: `https://etherscan.io/tx/${transaction.transaction_id}`, text: 'etherscan' },
    omg: { link: `https://etherscan.io/tx/${transaction.transaction_id}`, text: 'etherscan' },
    xlm: { link: `https://stellarchain.io/tx/${transaction.transaction_id}`, text: 'stellarchain' }
  }[transaction.coin];
}
