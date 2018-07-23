import React from 'react';
import { View, Dimensions } from 'react-native';

import Icon from "../../atoms/Icon/Icon";

const { width, height } = Dimensions.get('window');

const wrapperStyles = {
  justifyContent: 'center',
  alignItems: 'center',
  height: height/2,
  width: width/2
};


const Loader = () =>
  <View style={wrapperStyles}>
      <Icon name='CelsiusWithCircle' width='150' height='150' fill={'#c8c8c8'}
            style={{marginLeft: width/3}}
      />
  </View>;


export default Loader;
