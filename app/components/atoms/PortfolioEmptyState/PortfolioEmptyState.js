import React from 'react';
import { View, Text, Image } from 'react-native';
import PortfolioEmptyStateStyle from "./PortfolioEmptyState.styles";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";
import CelButton from "../CelButton/CelButton";

const PortfolioEmptyState = (props) => (
  <View style={PortfolioEmptyStateStyle.wrapper}>
    <View style={PortfolioEmptyStateStyle.imageWrapper}>
      {props.screen === 'DepositCoins' ?
        <Image source={require('../../../../assets/images/monkey-confused3x.png')} style={PortfolioEmptyStateStyle.image}/>
        :  <Image source={require('../../../../assets/images/deer-confused3x.png')} style={PortfolioEmptyStateStyle.image}/>
      }
    </View>

    <Text style={globalStyles.heading}>
      Add coins to see how much you can { props.screen === 'DepositCoins' ? 'lend' : 'borrow'}
    </Text>

    <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
      Please add some coins to your portfolio to see how big a loan you can get at 9% annual interest.
    </Text>

    <CelButton
      onPress={props.onPress}
      margin="30 0 30 0"
    >
      Add Your Coins
    </CelButton>

  </View>
)

export default PortfolioEmptyState;
