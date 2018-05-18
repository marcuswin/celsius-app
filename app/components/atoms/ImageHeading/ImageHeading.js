import React from 'react';
import { View, Image } from 'react-native';
// import {} from 'native-base';

// import {STYLES} from "../../config/constants/style";
import ImageHeadingStyle from "./ImageHeading.styles";

const defaultImage = require('../../../../assets/images/Headshot-cat.jpg');

const ImageHeading = (props) => (
  <View style={ImageHeadingStyle.wrapper}>
    <View style={ImageHeadingStyle.coloredSection}/>
    <View style={ImageHeadingStyle.greySection}/>
    <View style={ImageHeadingStyle.imageWrapper}>
      <Image
        source={props.image || defaultImage}
        style={ImageHeadingStyle.image}
      />
    </View>
  </View>
)

export default ImageHeading;
