import React from 'react';
import { Text, View } from "react-native";

import BitcoinCashForkInfoStyle from "./BitcoinCashForkInfo.styles";

const BitcoinCashForkInfo = () => (
    <View style={BitcoinCashForkInfoStyle.alternateAddressWrapper}>
      <Text style={BitcoinCashForkInfoStyle.alternateAddressText}>BitcoinCash (BCH) Withdrawals and Deposits will be temporarily disabled in the Celsius Wallet from 11:40 AM EST to 11:40 PM EST.</Text>
    </View>
);

export default BitcoinCashForkInfo;
