import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import testUtil from "../../../utils/test-util";

import SeparatorStyle from "./Separator.styles";
import STYLES from '../../../constants/STYLES';
import CelText from '../CelText/CelText';
import { THEMES } from '../../../constants/UI';

class Separator extends Component {

  static propTypes = {
    text: PropTypes.string,
    theme: PropTypes.oneOf(Object.values(THEMES)),
    vertical: PropTypes.bool,
    size: PropTypes.number,
    fontType: PropTypes.oneOf(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7']),
    allCaps: PropTypes.bool,
  };
  static defaultProps = {
    theme: THEMES.LIGHT,
    vertical: false,
    size: 1,
    fontType: 'H6',
    allCaps: true,
  }

  getSeparatorColor = () => {
    const { theme } = this.props;
    switch (theme) {
      case THEMES.LIGHT:
        return STYLES.COLORS.MEDIUM_GRAY
      case THEMES.DARK:
        return STYLES.COLORS.WHITE_OPACITY3
      case THEMES.CELSIUS:
        return STYLES.COLORS.MEDIUM_GRAY
    }
  }

  renderVertical = () => {
    const { theme, size } = this.props
    const style = SeparatorStyle(theme);
    const separatorColor = this.getSeparatorColor();
    
    return (
      <View style={[style.separatorVertical, { backgroundColor: separatorColor, width: size }]} />
    )
  }

  renderLine = () => {
    const { theme, size } = this.props
    const style = SeparatorStyle(theme);
    const separatorColor = this.getSeparatorColor();

    return (
      <View style={[style.separator, { backgroundColor: separatorColor, height: size }]} />
    )
  }

  renderWithText = () => {
    const { theme, text, size, allCaps, fontType } = this.props
    const style = SeparatorStyle(theme);
    const separatorColor = this.getSeparatorColor();

    return (
      <View style={[style.content]} >
        <View style={[style.left, { backgroundColor: separatorColor, height: size }]} />
        <View style={style.center}>
          <CelText allCaps={allCaps} color={separatorColor} align="center" type={fontType}>{text}</CelText>
        </View>
        <View style={[style.right, { backgroundColor: separatorColor, height: size }]} />
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
