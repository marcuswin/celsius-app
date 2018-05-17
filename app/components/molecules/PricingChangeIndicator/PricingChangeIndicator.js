import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { STYLES, FONT_SCALE } from "../../../config/constants/style";

const commonStyles = {
  text: {
    fontSize: FONT_SCALE * 14,
  },
  percentageAmount: {
    marginLeft: 3,
    marginRight: 3,
  },
  triangle: {
    width: 9,
    height: 5,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    marginTop: 5,
    borderTopWidth: 0,
    borderRightWidth: 4.5,
    borderBottomWidth: 6,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  }
}

const styles = StyleSheet.create({
  text: {
    ...commonStyles.text,
  },
  redText: {
    ...commonStyles.text,
    ...commonStyles.percentageAmount,
    color: STYLES.PRIMARY_RED,
  },
  greenText: {
    ...commonStyles.text,
    ...commonStyles.percentageAmount,
    color: STYLES.COIN_DATA_GREEN,
  },
  triangleUp: {
    ...commonStyles.triangle,
    borderBottomColor: STYLES.COIN_DATA_GREEN,
  },
  triangleDown: {
    ...commonStyles.triangle,
    borderBottomColor: STYLES.PRIMARY_RED,
    marginTop: 5,
    transform: [
      {rotate: '180deg'}
    ]
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});


const PricingChangeIndicator = (props) => 
  <View style={[styles.wrapper, {marginLeft: 'auto'}]}>
    <View style={props.isPercentChangeNegative ? styles.triangleDown : styles.triangleUp} />
    <Text style={props.isPercentChangeNegative ? styles.redText : styles.greenText}>{props.percentChange24h}%</Text><Text style={styles.text}>(24h)</Text>
  </View>

export default PricingChangeIndicator;