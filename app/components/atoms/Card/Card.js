import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import { THEMES } from "../../../constants/UI";

import testUtil from "../../../utils/test-util";
import stylesUtil from "../../../utils/styles-util";

import CardStyle from "./Card.styles";

const Card = ({
  theme = THEMES.LIGHT,
  margin = "10 0 10 0",
  padding = "20 20 20 20",
  size = "full",
  children,
  styles = {},
  onPress = null
}) => {
  const style = CardStyle(theme);

  const paddingStyles = stylesUtil.getPadding(padding);
  const marginStyles = stylesUtil.getMargins(margin);
  const cardStyles = [style.card, paddingStyles, marginStyles, style[size], styles];

  const card = (
    <View style={cardStyles}>
      { children }
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        {card}
      </TouchableOpacity>
    );
  }

  return card;
};

Card.propTypes = {
  margin: PropTypes.string,
  padding: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  theme: PropTypes.oneOf(Object.keys(THEMES)),
  size: PropTypes.oneOf(['full', 'half'])
};

export default testUtil.hookComponent(Card);
