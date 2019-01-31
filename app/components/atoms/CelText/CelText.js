import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import styleUtils, { getScaledFont } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES';
import CelTextStyle from './CelText.styles';

@connect(
  state => ({
    cmpStyle: CelTextStyle(state.ui.theme),
    lastSavedTheme: state.ui.theme
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
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
    const { theme, type, bold, margin, color, align, lastSavedTheme } = this.props
    const cmpStyle = CelTextStyle(theme || lastSavedTheme)
    const fontSize = { fontSize: this.getFontSize(type) };
    const boldStyle = bold ? { fontWeight: 'bold' } : {}
    const colorStyle = color ? { color } : cmpStyle.textColor; // test this!
    const marginStyle = styleUtils.getMargins(margin);
    const alignStyle = { textAlign: align };
    return [fontSize, boldStyle, colorStyle, marginStyle, alignStyle];
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
