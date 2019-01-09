// TODO(fj): not used anywhere?

import React from 'react';
import { View, Image } from 'react-native';

import {STYLES} from "../../../config/constants/style";

const viewStyles = {
  backgroundColor: STYLES.PRIMARY_BLUE,
  width: '100%',
  height: 80,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: -10,
};
const imageStyles = {
  height: 30,
  width: 30,
};

const TopPageLoader = (props) => {
  if (!props.isLoading) return null;
  return (
    <View style={viewStyles}>
      <Image source={require('../../../../assets/images/icons/animated-spinner.gif')} style={imageStyles}/>
    </View>
  )
}

export default TopPageLoader;
