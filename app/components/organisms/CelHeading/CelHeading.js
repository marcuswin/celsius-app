import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelHeadingStyle from "./CelHeading.styles";
import stylesUtil from '../../../utils/styles-util';
import CelButton from '../../atoms/CelButton/CelButton';
import Icon from '../../atoms/Icon/Icon';
import { THEMES } from '../../../constants/UI';

@connect(
  state => ({
    lastSavedTheme: state.ui.theme,
    profilePicture: state.user.profile.profile_picture
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelHeading extends Component {

  static propTypes = {
    left: PropTypes.oneOf(['back']),
    right: PropTypes.oneOf(['action', 'signup', 'login', 'settings', 'info', 'search', 'profile', 'logout', 'close']),
    transparent: PropTypes.bool,
    theme: PropTypes.oneOf(Object.values(THEMES)),
  };
  static defaultProps = {
    transparent: false
  }

  getLeftContent = (currentTheme) => {
    const { left, actions } = this.props;
    return {
      "back": <CelButton theme={currentTheme} basic onPress={() => { actions.navigateBack(); }} iconRight="IconChevronLeft" />
    }[left];
  }

  getRightContent = (currentTheme) => {
    const { right, actions, profilePicture } = this.props;
    return {
      "action": <CelButton theme={currentTheme} basic onPress={() => { }}>Action</CelButton>,
      "signup": <CelButton theme={currentTheme} basic onPress={() => { actions.navigateTo('Register') }}>Sign up</CelButton>,
      "login": <CelButton theme={currentTheme} basic onPress={() => { actions.navigateTo('Login') }}>Log in</CelButton>,
      "settings":
        <CelButton theme={currentTheme} basic onPress={() => { actions.navigateTo('Settings'); }}>
          <View>
            <Icon name="Settings" width="35" height="35" />
          </View>
        </CelButton>,
      "info": <CelButton theme={currentTheme} basic onPress={() => { }}>Info</CelButton>,
      "search": <CelButton theme={currentTheme} basic onPress={() => { }}>Search</CelButton>,
      "profile":
        <CelButton theme={currentTheme} basic onPress={() => { actions.navigateTo('Profile'); }}>
          <Image style={{ width: 35, height: 35, borderRadius: 17 }} source={{ uri: profilePicture }} resizeMethod="resize" />
        </CelButton>,
      "logout": <CelButton theme={currentTheme} basic onPress={() => { }}>Logout</CelButton>,
      "close": <CelButton theme={currentTheme} basic onPress={() => { actions.navigateBack(); }}>Close</CelButton>, // TODO(sb):
    }[right];
  }

  getStatusBarTextColor = (theme) => {
    switch (theme) {
      case THEMES.LIGHT:
        return 'dark-content'
      case THEMES.DARK:
        return 'light-content'
      case THEMES.CELSIUS:
        return 'light-content'
    }
  }

  render() {
    const { children, transparent, theme, lastSavedTheme } = this.props
    const currentTheme = theme || lastSavedTheme;
    const style = CelHeadingStyle(currentTheme)
    const paddings = stylesUtil.getPadding("15 20 15 20")
    const statusBarColor = this.getStatusBarTextColor(currentTheme)
    const containerStyle = transparent ? style.transparentBackground : style.headingBackground;
    return (
      <SafeAreaView style={containerStyle}>
        <StatusBar barStyle={statusBarColor} />
        <View style={[style.content, paddings]}>
          <View style={style.left}>
            {this.getLeftContent(currentTheme)}
          </View>
          <View style={style.center}>
            {children}
          </View>
          <View style={style.right}>
            {this.getRightContent(currentTheme)}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default testUtil.hookComponent(CelHeading);
