import React from 'react';
import { View, Text, Dimensions } from 'react-native';

// import {STYLES} from "../../config/constants/style";
import CelHeadingStyle from "./CelHeading.styles";
import {FONT_SCALE} from "../../../config/constants/style";

const {height} = Dimensions.get('window');

const CelHeading = (props) => {
  const containerStyle = {};
  const headingStyle = {};
  const subheadingStyle = {};

  if (height < 600) {
    containerStyle.paddingBottom = 16;
    containerStyle.paddingTop = 8;
    headingStyle.fontSize = FONT_SCALE * 30;
    subheadingStyle.fontSize = FONT_SCALE * 16;
  }

  return (
    <View style={[CelHeadingStyle.container, containerStyle, CelHeadingStyle[props.color]]}>
      <Text style={[CelHeadingStyle.heading, headingStyle, {textAlign: props.textAlign || 'left'}]}>{ props.text }</Text>
      { props.subheading ? <Text style={[CelHeadingStyle.subheading, subheadingStyle]}>{ props.subheading.toUpperCase() }</Text> : null }
    </View>
  );
};

export default CelHeading;
