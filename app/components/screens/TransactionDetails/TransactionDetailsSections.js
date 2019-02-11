import React from "react";
import { View } from "react-native";

import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import Icon from "../../atoms/Icon/Icon";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";

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

export const BasicSection = ({ label, value }) => (
  <View style={{ width: '100%' }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
      <CelText>{label}:</CelText>
      <CelText>{value}</CelText>
    </View>
    <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY} />
  </View>
)

export const StatusSection = ({ transactionProps }) => (
  <View style={{ width: '100%' }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
      <CelText>Status:</CelText>
      <CelText color={transactionProps.color}>{transactionProps.statusText}</CelText>
    </View>
    <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY} />
  </View>
)
