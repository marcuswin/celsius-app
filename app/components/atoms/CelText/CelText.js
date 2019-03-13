import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import testUtil from "../../../utils/test-util";
import { getMargins, getScaledFont } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES';
import ASSETS from '../../../constants/ASSETS';
import CelTextStyle from './CelText.styles';

class CelText extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7']),
    font: PropTypes.oneOf(['barlow']),
    weight: PropTypes.oneOf(['100', '200', '300', '400', '500', '600', '700', '800', '900', 'thin', 'extra-light', 'light', 'regular', 'medium', 'semi-bold', 'bold', 'black']),
    italic: PropTypes.bool,
    color: PropTypes.string,
    margin: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.number, // StyleSheet.create() returns number
      PropTypes.instanceOf(Object)
    ]),
    align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
    allCaps: PropTypes.bool,
    onPress: PropTypes.func
  };
  static defaultProps = {
    font: 'barlow',
    weight: '400',
    type: 'H5',
    margin: "0 0 0 0",
    style: {},
    align: 'left',
    allCaps: false,
    italic: false,
  }

  getFontSize = (type) => getScaledFont(STYLES.FONTSIZE[type])

  getFontFamily = () => {
    const { font, weight, italic } = this.props

    let fontFamily = `${font}${ASSETS.WEIGHT[weight.toString()]}`;
    if (italic) fontFamily = `${fontFamily}-italic`

    return fontFamily;
  }

  getFontStyle = () => {
    const { type, margin, color, align, weight } = this.props
    const cmpStyle = CelTextStyle();
    const fontSize = { fontSize: this.getFontSize(type) };
    const fontFamily = { fontFamily: this.getFontFamily() };
    const colorStyle = color ? { color } : cmpStyle.textColor; // test this!
    const marginStyle = getMargins(margin);
    const alignStyle = { textAlign: align };

    return [weight, cmpStyle.text, fontSize, fontFamily, colorStyle, marginStyle, alignStyle];
  }

  render() {
    const { children, style, allCaps, onPress } = this.props
    const fontStyle = this.getFontStyle();
    return (
      <Text style={[fontStyle, style]} onPress={onPress}>{allCaps ? children.toUpperCase() : children}</Text>
    );
  }
}

export default testUtil.hookComponent(CelText);
