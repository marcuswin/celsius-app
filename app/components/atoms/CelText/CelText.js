import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import testUtil from "../../../utils/test-util";

import styleUtils from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES';

class CelText extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7']),
    bold: PropTypes.bool,
    color: PropTypes.string,
    margin: PropTypes.string,
    style: PropTypes.instanceOf(Object),
    align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
    allCaps: PropTypes.bool
  };
  static defaultProps = {
    type: 'H5',
    bold: false,
    color: "#fff",
    margin: "0 0 0 0",
    style: {},
    align: 'left',
    allCaps: false
  }

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  getFontSize = (type) => styleUtils.getScaledFont(STYLES.FONTSIZE[type])

  getFontStyle = () => {
    const { type, bold, color, margin, align, allCaps } = this.props
    const fontSize = { fontSize: this.getFontSize(type) };
    const boldStyle = bold ? { fontWeight: 'bold' } : {}
    const colorStyle = { color };
    const marginStyle = styleUtils.getMargins(margin);
    const alignStyle = { textAlign: align };
    const allCapsStyle = allCaps ? { textTransform: 'uppercase' } : {};
    return [fontSize, boldStyle, colorStyle, marginStyle, alignStyle, allCapsStyle];
  }

  render() {
    const { children, style } = this.props
    // const style = CelTextStyle(theme);
    const fontStyle = this.getFontStyle();
    return (
      <Text style={[fontStyle, style]}>{children}</Text>
    );
  }
}

export default testUtil.hookComponent(CelText);
