import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import testUtil from "../../../utils/test-util";

import SeparatorStyle from "./Separator.styles";
import CelText from '../CelText/CelText';

class Separator extends Component {

  static propTypes = {
    text: PropTypes.string,
    vertical: PropTypes.bool,
    size: PropTypes.number,
    fontType: PropTypes.oneOf(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7']),
    allCaps: PropTypes.bool,
    dashed: PropTypes.bool,
    color: PropTypes.string,
    opacity: PropTypes.number
  };
  static defaultProps = {
    vertical: false,
    size: 1,
    fontType: 'H6',
    allCaps: true,
    dashed: false,
    color: "",
    opacity: 1
  }

  getSeparatorColor = (style) => StyleSheet.flatten(style.separatorColor).color; // get color from raw json depending on style theme

  renderVertical = () => {
    const { size, color, dashed, opacity } = this.props
    const style = SeparatorStyle();
    const separatorColor = color || this.getSeparatorColor(style);

    return (
      <View style={[style.separatorVertical, { borderColor: separatorColor, width: size, borderWidth: size / 2, borderStyle: dashed ? 'dashed' : 'solid', opacity }]} />
    )
  }

  renderLine = () => {
    const { size, color, dashed, opacity } = this.props
    const style = SeparatorStyle();
    const separatorColor = color || this.getSeparatorColor(style);

    return (
      <View style={[style.separator, { borderColor: separatorColor, borderWidth: size / 2, borderStyle: dashed ? 'dashed' : 'solid', opacity }]} />
    )
  }

  renderWithText = () => {
    const { text, size, allCaps, fontType, color, dashed } = this.props
    const style = SeparatorStyle();
    const separatorColor = color || this.getSeparatorColor(style);

    return (
      <View style={[style.content]} >
        <View style={[style.left, { borderColor: separatorColor, borderWidth: size / 2, borderStyle: dashed ? 'dashed' : 'solid' }]} />
        <View style={style.center}>
          <CelText allCaps={allCaps} color={separatorColor} align="center" type={fontType}>{text}</CelText>
        </View>
        <View style={[style.right, { borderColor: separatorColor, borderWidth: size / 2, borderStyle: dashed ? 'dashed' : 'solid' }]} />
      </View>
    );
  }

  render() {
    const { text, vertical } = this.props
    const VerticalSeparator = this.renderVertical;
    const HorizontalSeparator = this.renderLine;
    const TextSeparator = this.renderWithText;

    if (vertical) {
      return <VerticalSeparator />
    }

    if (!text) {
      return <HorizontalSeparator />
    }

    return <TextSeparator />
  }
}

export default testUtil.hookComponent(Separator);
