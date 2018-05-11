import React from 'react';
import { View } from 'react-native';

import {COLORS} from "../../../config/constants/style";
import InfoBubbleStyle from "./InfoBubble.styles";

const InfoBubble = (props) => (
  <View style={[InfoBubbleStyle.infoWrapper, { backgroundColor: COLORS[props.color || 'yellow'] || COLORS.yellow }]}>
    { props.renderContent(InfoBubbleStyle.infoText) }
  </View>
)

export default InfoBubble;
