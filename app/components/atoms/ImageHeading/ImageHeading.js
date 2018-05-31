import React from 'react';
import isBase64 from 'is-base64';
import {Image, View} from 'react-native';

import ImageHeadingStyle from "./ImageHeading.styles";

const defaultImage = require('../../../../assets/images/avatar-cat.jpg');

const ImageHeading = (props) => {
  let imageSource;

  // check if base64
  if (isBase64(props.image)) imageSource = { uri: `data:image/png;base64,${props.image}` };
  // check if url
  if (props.image && props.image.includes('https://')) imageSource = { uri: props.image };
  // check if url
  if (!isNaN(props.image)) imageSource = props.image ;

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
