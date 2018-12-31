// TODO(fj) used once, probably going to the trash

import React from 'react';
import { View, Image } from "react-native";

import HippoBubbleStyle from './HippoBubble.styles';

const HippoBubble = ({bubbleContent, sideContent}) => (
  <View>
    <View style={HippoBubbleStyle.bubbleWrapper}>
      {bubbleContent(HippoBubbleStyle.bubbleText)}
    </View>
    <View stye={HippoBubbleStyle.bubblePointerWrapper}>
      <Image source={require('../../../../assets/images/bubble-pointer.png')} style={HippoBubbleStyle.bubblePointer}/>
    </View>
    <View style={HippoBubbleStyle.hippoImageWrapper}>
      <Image source={require('../../../../assets/images/two-thumbs-up.png')} style={HippoBubbleStyle.hippoImage}/>

      <View style={HippoBubbleStyle.sideContentWrapper}>
        {(!!sideContent) && sideContent(HippoBubbleStyle.sideContentText)}
      </View>
    </View>
  </View>
);

export default HippoBubble;
