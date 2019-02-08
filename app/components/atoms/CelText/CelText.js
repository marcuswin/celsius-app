import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import testUtil from "../../../utils/test-util";
import styleUtils, { getScaledFont } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES';
import CelTextStyle from './CelText.styles';

class CelText extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7']),
    bold: PropTypes.bool,
    color: PropTypes.string,
    margin: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.number, // StyleSheet.create() returns number
      PropTypes.instanceOf(Object)
    ]),
    align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
    allCaps: PropTypes.bool
  };
  static defaultProps = {
    type: 'H5',
    bold: false,
    margin: "0 0 0 0",
    style: {},
    align: 'left',
    allCaps: false
  }

  getFontSize = (type) => getScaledFont(STYLES.FONTSIZE[type])

  getFontStyle = () => {
    const { type, bold, margin, color, align } = this.props
    const cmpStyle = CelTextStyle();
    const fontSize = { fontSize: this.getFontSize(type) };
    const boldStyle = bold ? { fontFamily: 'barlow-bold' } : {}
    const colorStyle = color ? { color } : cmpStyle.textColor; // test this!
    const marginStyle = styleUtils.getMargins(margin);
    const alignStyle = { textAlign: align };
    return [cmpStyle.text, fontSize, boldStyle, colorStyle, marginStyle, alignStyle];
  }

  render() {
    const { children, style, allCaps } = this.props
    const fontStyle = this.getFontStyle();
    return (
      <Text style={[fontStyle, style]}>{allCaps ? children.toUpperCase() : children}</Text>
    );
  }
}

export default testUtil.hookComponent(CelText);
