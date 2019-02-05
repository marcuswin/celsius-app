import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelButtonStyle from "./CelButton.styles";
import Icon from '../Icon/Icon';
import stylesUtil from '../../../utils/styles-util';
import CelText from '../CelText/CelText';
import { THEMES } from '../../../constants/UI';
import Spinner from '../Spinner/Spinner';
import STYLES from '../../../constants/STYLES';

@connect(
  state => ({
    lastSavedTheme: state.ui.theme,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelButton extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    iconRight: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    margin: PropTypes.string,
    basic: PropTypes.bool,
    theme: PropTypes.oneOf(Object.values(THEMES))
  };
  static defaultProps = {
    iconRight: undefined,
    disabled: false,
    loading: false,
    margin: '0 0 0 0',
    basic: false
  }

  getButtonStyle = (style) => {
    const { margin, disabled, basic } = this.props;
    const buttonStyles = [style.container];
    buttonStyles.push(stylesUtil.getMargins(margin));
    if (disabled) buttonStyles.push(style.disabledButton);
    if (basic) buttonStyles.push(style.basicButton);

    return buttonStyles;
  }

  getTitleStyle = (style) => {
    const { disabled, basic } = this.props;
    const titleStyle = [style.baseTitle];
    if (disabled) titleStyle.push(style.disabledTitleColor);
    if (basic) titleStyle.push(style.basicTitle);

    return titleStyle;
  }

  renderIconRight = () => {
    const { iconRight, basic } = this.props;
    return (
      <View style={{ marginLeft: 10 }}>
        <Icon
          name={iconRight}
          height='26'
          width='26'
          viewBox='0 0 26 26'
          fill={basic ? STYLES.COLORS.DARK_GRAY_OPACITY : STYLES.COLORS.WHITE_OPACITY3}
        />
      </View>
    )
  };

  renderLoader = () => {
    const { theme, lastSavedTheme } = this.props;
    const currentTheme = theme || lastSavedTheme;
    const style = CelButtonStyle(currentTheme);
    const buttonStyle = this.getButtonStyle(style);

    return (
      <View style={buttonStyle}>
        <Spinner theme={THEMES.DARK} size={30} />
      </View>
    )
  }

  renderButton = () => {
    const { children, iconRight, theme, lastSavedTheme } = this.props;
    const currentTheme = theme || lastSavedTheme;
    const style = CelButtonStyle(currentTheme);
    const buttonStyle = this.getButtonStyle(style);
    const titleStyle = this.getTitleStyle(style);

    return (
      <View style={buttonStyle}>
        {!!children && <CelText style={titleStyle}>{children}</CelText>}
        {!!iconRight && this.renderIconRight()}
      </View>
    )
  }

  render() {
    const { onPress, disabled, loading, basic } = this.props;
    const Loader = this.renderLoader;
    const Button = this.renderButton;
    const activeOpacity = basic ? 0.3 : 0.8;

    return (
      <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={activeOpacity} style={{ alignItems: 'center' }}>
        {loading ? <Loader /> : <Button />}
      </TouchableOpacity>
    );
  }
}

export default testUtil.hookComponent(CelButton);
