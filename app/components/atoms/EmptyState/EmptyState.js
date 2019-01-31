import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import testUtil from "../../../utils/test-util";

import EmptyStateStyle from "./EmptyState.styles";
import CelText from "../CelText/CelText";
import CelButton from "../CelButton/CelButton";
import { THEMES } from "../../../constants/UI";

const EmptyState = (props) => {
  const style = EmptyStateStyle(props.theme || THEMES.LIGHT);
  return (
    <View style={style.container}>
      <CelText align="center" type="H1">{props.heading}</CelText>

      {props.paragraphs.map(paragraph => <CelText key={paragraph}>{paragraph}</CelText>)}

      {props.button && props.onPress ? (
        <CelButton onPress={props.onPress}>{props.button}</CelButton>
      ) : null}
    </View>
  );
};

EmptyState.propTypes = {
  theme: PropTypes.oneOf(Object.values(THEMES)),
  heading: PropTypes.string,
  paragraphs: PropTypes.instanceOf(Array),
  button: PropTypes.string,
  onPress: PropTypes.func
};

export default testUtil.hookComponent(EmptyState);
