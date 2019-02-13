import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";

import testUtil from "../../../utils/test-util";
import stylesUtil from "../../../utils/styles-util";

import CardStyle from "./Card.styles";

const Card = ({
  margin = "10 0 10 0",
  padding = "20 20 20 20",
  size = "full",
  opacity = 1,
  children,
  styles = {},
  onPress = null
}) => {
  const style = CardStyle();

  const paddingStyles = stylesUtil.getPadding(padding);
  const marginStyles = stylesUtil.getMargins(margin);
  const opacityStyles = { opacity };
  const cardStyles = [style.card, paddingStyles, marginStyles, opacityStyles, style[size], styles];

  const card = (
    <View style={cardStyles}>
      {children}
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
  opacity: PropTypes.number,
  padding: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.oneOf(['full', 'half'])
};

export default testUtil.hookComponent(Card);
