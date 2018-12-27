// TODO(fj) probably remove in v3

import React from 'react';
import {Image, View} from 'react-native';

import imageUtil from '../../../utils/image-util'

import ImageHeadingStyle from "./ImageHeading.styles";

const defaultImage = require('../../../../assets/images/avatar-cat.jpg');

const ImageHeading = (props) => {
  const imageSource = props.image ? imageUtil.getSource(props.image) : null;

  return (
    <View style={ImageHeadingStyle.wrapper}>
      <View style={ImageHeadingStyle.coloredSection}/>
      <View style={ImageHeadingStyle.greySection}/>
      <View style={ImageHeadingStyle.imageWrapper}>
        <Image
          resizeMethod="resize"
          source={imageSource || defaultImage}
          style={ImageHeadingStyle.image}
        />
      </View>
    </View>
  )
};

export default ImageHeading;
