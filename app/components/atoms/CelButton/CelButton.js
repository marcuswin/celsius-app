import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelButtonStyle from "./CelButton.styles";
import Icon from '../Icon/Icon';
import stylesUtil from '../../../utils/styles-util';
import CelText from '../CelText/CelText';

@connect(
  state => ({
    style: CelButtonStyle(state.ui.theme),
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
    basic: PropTypes.bool
  };
  static defaultProps = {
    iconRight: undefined,
    disabled: false,
    loading: false,
    margin: '0 0 0 0',
    basic: false
  }

  getButtonStyle = () => {
    const { style, margin, disabled, basic } = this.props;
    const buttonStyles = [style.container];
    buttonStyles.push(stylesUtil.getMargins(margin));
    if (disabled) buttonStyles.push(style.disabledButton);
    if (basic) buttonStyles.push(style.basicButton);

    return buttonStyles;
  }

  getTitleStyle = () => {
    const { style, disabled, basic } = this.props;
    const titleStyle = [style.baseTitle];
    if (disabled) titleStyle.push(style.disabledTitleColor);
    if (basic) titleStyle.push(style.basicTitle);

    return titleStyle;
  }

  renderIconRight = () => {
    const { iconRight } = this.props;
    return (
      <View style={{ marginLeft: 10 }}>
        <Icon
          name={iconRight}
          height='26'
          width='26'
          viewBox='0 0 26 26'
          fill={'rgba(255,255,255,0.3)'}
        />
      </View>
    )
  };

  render() {
    const { style, children, onPress, iconRight, disabled, loading } = this.props;
    const buttonStyle = this.getButtonStyle();
    const titleStyle = this.getTitleStyle();
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={0.8}>
        {loading ? (
          <View style={buttonStyle}>
            <Image source={require('../../../../assets/images/icons/animated-spinner.gif')} style={style.loader} />
          </View>
        ) : (
            <View style={buttonStyle}>
              <CelText style={titleStyle}>{children}</CelText>
              {iconRight ? this.renderIconRight() : null}
            </View>
          )}
      </TouchableOpacity>
    );
  }
}

export default testUtil.hookComponent(CelButton);
