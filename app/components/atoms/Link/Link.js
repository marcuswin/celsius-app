import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
          
const Link = ({children, onPress}) => <TouchableOpacity onPress={onPress}><Text style={{color: '#88A2C7', textAlign: 'center'}}>{children}</Text></TouchableOpacity>;

export default Link;