import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import testUtil from "../../../utils/test-util";
import CelButtonStyle from "./CelButton.styles";
import Icon from '../Icon/Icon';
import { getMargins } from '../../../utils/styles-util';
import CelText from '../CelText/CelText';
import { THEMES } from '../../../constants/UI';
import Spinner from '../Spinner/Spinner';
import STYLES from '../../../constants/STYLES';

const buttonSizes = ['small', 'medium'];

class CelButton extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    iconRight: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    margin: PropTypes.string,
    basic: PropTypes.bool,
    size: PropTypes.oneOf(buttonSizes),
    textColor: PropTypes.string,
    iconRightHeight: PropTypes.string,
    iconRightWidth: PropTypes.string,
    iconRightColor: PropTypes.string
  };

  static defaultProps = {
    iconRight: undefined,
    disabled: false,
    loading: false,
    margin: '0 0 0 0',
    basic: false,
    size: 'medium',
    textColor: '',
    iconRightHeight: '46',
    iconRightWidth: '26'
  }

  getButtonStyle = (style) => {
    const { margin, disabled, basic, size } = this.props;
    const buttonStyles = [style.container, style[`${size}Container`]];

    buttonStyles.push(getMargins(margin));

    if (disabled) buttonStyles.push(style.disabledButton);
    if (basic) buttonStyles.push(style.basicButton);

    return buttonStyles;
  }

  getTitleStyle = (style) => {
    const { disabled, basic, size, textColor } = this.props;
    const titleStyle = [style.baseTitle, style[`${size}Title`]];
    if (disabled) titleStyle.push(style.disabledTitleColor);
    if (basic) titleStyle.push(style.basicTitle);
    if (textColor) titleStyle.push({ color: textColor })

    return titleStyle;
  }

  renderIconRight = () => {
    const { iconRight, basic, children, iconRightHeight, iconRightWidth, iconRightColor } = this.props;
    let color
    if (iconRightColor) {
      color = iconRightColor
    } else {
      color = basic ? STYLES.COLORS.DARK_GRAY_OPACITY : STYLES.COLORS.WHITE_OPACITY3
    }

    return (
      <View style={{ paddingLeft: children ? 10 : 0 }}>
        <Icon
          name={iconRight}
          height={iconRightHeight}
          width={iconRightWidth}
          fill={color}
        />
      </View>
    )
  };

  renderLoader = () => {
    const style = CelButtonStyle();
    const buttonStyle = this.getButtonStyle(style);

    return (
      <View style={buttonStyle}>
        <Spinner theme={THEMES.DARK} size={30} />
      </View>
    )
  }

  renderButton = () => {
    const { children, iconRight, style } = this.props;
    const celBtnStyle = CelButtonStyle();
    const buttonStyle = this.getButtonStyle(celBtnStyle);
    const titleStyle = this.getTitleStyle(celBtnStyle);

    return (
      <View style={[buttonStyle, style]}>
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
      <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={activeOpacity} style={{ alignItems: 'center'}}>
        {loading ? <Loader /> : <Button />}
      </TouchableOpacity>
    );
  }
}

export default testUtil.hookComponent(CelButton);
