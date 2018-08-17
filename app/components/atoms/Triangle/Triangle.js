import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { COLORS } from "../../../config/constants/style";

const commonStyles = {
  triangle: {
    width: 9,
    height: 5,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    marginTop: 5,
    marginRight: 3,
    borderTopWidth: 0,
    borderRightWidth: 4.5,
    borderBottomWidth: 6,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  }
};

const TriangleStyle = StyleSheet.create({
  triangleUp: {
    ...commonStyles.triangle,
  },
  triangleDown: {
    ...commonStyles.triangle,
    marginTop: Platform.OS === 'ios' ? 5 : 9,
    transform: [
      {rotate: '180deg'}
    ]
  },
});


const Triangle = ({direction, color}) => {
  let triangleDirection;
  const triangleColor = {
    borderBottomColor: COLORS.gray,
  };

  if (direction === 'down') {
    triangleDirection = TriangleStyle.triangleDown;
  } else {
    triangleDirection = TriangleStyle.triangleUp;
  }

  if (color) {
    triangleColor.borderBottomColor = color;
  }

  return (
    <View style={[triangleDirection, triangleColor]} />
  )
};

export default Triangle;
