// TODO(fj): add PropTypes
// TODO(fj): move styles
// TODO(fj): maybe create a mini atom library with many small atoms?


import React from 'react';
import { View, Text } from 'react-native';

const Badge = ({ text, color }) => (
  <View style={{
    height: 20, borderRadius: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: color, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start',
  }}>
    <Text style={{
      fontSize: 12,
      fontFamily: 'agile-medium',
      color: 'white',
      textAlign: 'center',
    }}>
      { text }
    </Text>
  </View>
)

export default Badge;
