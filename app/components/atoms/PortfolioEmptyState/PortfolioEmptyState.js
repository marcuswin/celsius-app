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
      Add coins to earn up to 5% interest
    </Text>

    <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
      Please add eligible coins (BTC or ETH) to see how much interest you could earn per year.
    </Text>

    <CelButton onPress={props.onPress} margin="30 0 0 0" style={{marginBottom: 30}}>
      Add Your Coins
    </CelButton>
  </View>
)

export default PortfolioEmptyState;
