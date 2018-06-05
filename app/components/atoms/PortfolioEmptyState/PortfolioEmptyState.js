import React from 'react';
import { View, Text, Image } from 'react-native';
import PortfolioEmptyStateStyle from "./PortfolioEmptyState.styles";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";
import CelButton from "../CelButton/CelButton";

const PortfolioEmptyState = (props) => (
  <View style={PortfolioEmptyStateStyle.wrapper}>
    <View style={PortfolioEmptyStateStyle.imageWrapper}>
      <Image source={require('../../../../assets/images/monkey-empty.png')} style={PortfolioEmptyStateStyle.image} />
    </View>

    <Text style={globalStyles.heading}>
      No coins to lend, at the moment
    </Text>

    <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
      Please, add eligible coins (BTC, ETH, CEL) to be able to lend out your coins and earn interest.
    </Text>

    <CelButton onPress={props.onPress} margin="30 0 0 0" style={{marginBottom: 30}}>
      Manage your coins
    </CelButton>
  </View>
)

export default PortfolioEmptyState;
