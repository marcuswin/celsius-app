import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import testUtil from "../../../utils/test-util";

import SeparatorStyle from "./Separator.styles";
import STYLES from '../../../constants/STYLES';
import CelText from '../CelText/CelText';

class Separator extends Component {

  static propTypes = {
    text: PropTypes.string,
    theme: PropTypes.oneOf(['dark', 'light', 'celsius']).isRequired,
    vertical: PropTypes.bool,
    size: PropTypes.number,
    fontType: PropTypes.oneOf(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7']),
    allCaps: PropTypes.bool,
  };
  static defaultProps = {
    vertical: false,
    size: 1,
    fontType: 'H6',
    allCaps: true,
  }

  getSeparatorColor = () => {
    const { theme } = this.props;
    return {
      'light': STYLES.COLORS.MEDIUM_GRAY,
      'celsius': STYLES.COLORS.MEDIUM_GRAY,
      'dark': STYLES.COLORS.WHITE_OPACITY3,
    }[theme]
  }

  render() {
    const { theme, text, vertical, size, allCaps, fontType } = this.props
    const style = SeparatorStyle(theme);
    const separatorColor = this.getSeparatorColor();
    if (vertical) {
      return (
        <View style={[style.separatorVertical, { backgroundColor: separatorColor, width: size }]} />
      )
    }
    if (!text) {
      return (
        <View style={[style.separator, { backgroundColor: separatorColor, height: size }]} />
      )
    }
    return (
      <View style={[style.content]}>
        <View style={[style.left, { backgroundColor: separatorColor, height: size }]} />
        <View style={style.center}>
          <CelText allCaps={allCaps} color={separatorColor} align="center" type={fontType}>{text}</CelText>
        </View>
        <View style={[style.right, { backgroundColor: separatorColor, height: size }]} />
      </View>
    );
  }
}

export default testUtil.hookComponent(Separator);
