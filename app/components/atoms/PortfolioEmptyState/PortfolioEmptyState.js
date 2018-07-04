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
      Add coins to see how much you can borrow
    </Text>

    <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
      Please add some coins to your portfolio to see how big a loan you can get at 9% annual interest.
    </Text>

    <CelButton onPress={props.onPress} margin="20 0 20 0" style={{marginBottom: 30}}>
      Add Your Coins
    </CelButton>
  </View>
)

export default PortfolioEmptyState;
