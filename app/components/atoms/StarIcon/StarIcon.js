// TODO(fj) move to atom library

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { STYLES } from '../../../config/constants/style';

const styles = StyleSheet.create({
  circle: {
    position: 'relative',
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: STYLES.GRAY_5,
  },
  star: {
    fontSize: 33.5,
    color: STYLES.GRAY_4,
    position: 'absolute', 
    left: 0,
    top: -15.5
  }
});

const StarIcon = () => 
  <View style={styles.circle}>
    <Text style={styles.star}>⋆</Text>
  </View>

export default StarIcon;
