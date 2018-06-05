import React from 'react';
import { Image, View, Text } from 'react-native';

import {STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

const wrapperStyles = {
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  backgroundColor: STYLES.PRIMARY_BLUE,
}

const imageStyles = {
  height: 200,
  width: 200,
}

// const spinner = require('../../../../assets/images/icons/celsius-spinner.gif');
const logo = require('../../../../assets/images/icons/celsius_symbol_white.png');

const Loader = (props) =>
  <View style={wrapperStyles}>
    <Image source={logo} style={imageStyles} />
    { props.text ? <Text style={[globalStyles.heading, { color: 'white' }]}>{ props.text }</Text> : null }
    <Text style={[globalStyles.normalText, { color: 'white' }]}>Please wait...</Text>
  </View>

export default Loader;
