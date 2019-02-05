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
import CelInput from '../../atoms/CelInput/CelInput';

@connect(
  state => ({
    lastSavedTheme: state.ui.theme,
    profilePicture: state.user.profile.profile_picture,
    message: state.ui.message,
    formData: state.forms.formData
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

  constructor(props) {
    super(props);
    this.state = {
      activeSearch: false
    }
  }

  getLeftContent = (currentTheme) => {
    const { left, actions } = this.props;
    const { activeSearch } = this.state;
    const leftType = activeSearch ? "search" : left;
    return {
      "back": <CelButton theme={currentTheme} basic onPress={() => { actions.navigateBack(); }} iconRight="IconChevronLeft" />,
      "search": <CelButton theme={currentTheme} basic onPress={() => { this.setState({ activeSearch: true }) }} iconRight="Search" />,
    }[leftType];
  }

  getRightContent = (currentTheme) => {
    const { right, actions, profilePicture } = this.props;
    const { activeSearch } = this.state;
    const rightType = activeSearch ? "cancel" : right;
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
      "search": <CelButton theme={currentTheme} basic onPress={() => { this.setState({ activeSearch: true }) }} iconRight="Search" />,
      "profile":
        <CelButton theme={currentTheme} basic onPress={() => { actions.navigateTo('Profile'); }}>
          <Image style={{ width: 35, height: 35, borderRadius: 17 }} source={{ uri: profilePicture }} resizeMethod="resize" />
        </CelButton>,
      "logout": <CelButton theme={currentTheme} basic onPress={() => { }}>Logout</CelButton>,
      "close": <CelButton theme={currentTheme} basic onPress={() => { actions.navigateBack(); }}>Close</CelButton>, // TODO(sb):
      "cancel": <CelButton theme={currentTheme} basic onPress={() => { this.setState({ activeSearch: false }); actions.updateFormField('search', "") }}>Cancel</CelButton>,
    }[rightType];
  }

  getStatusBarTextColor = (theme) => {
    const { message } = this.props;
    if (message) return 'light-content';

    switch (theme) {
      case THEMES.LIGHT:
        return 'dark-content'
      case THEMES.DARK:
        return 'light-content'
      case THEMES.CELSIUS:
        return 'light-content'
    }
  }

  getCenterContent = (currentTheme) => {
    const { children } = this.props;
    const style = CelHeadingStyle(currentTheme)
    return (
      <View style={style.center}>
        {children}
      </View>
    );
  }

  getContent = () => {
    const { formData, theme, lastSavedTheme } = this.props;
    const currentTheme = theme || lastSavedTheme;
    const style = CelHeadingStyle(currentTheme)
    const paddings = stylesUtil.getPadding("15 20 15 20")
    const { activeSearch } = this.state;
    const leftStyle = activeSearch ? [style.left, { flexDirection: 'row', flex: 2 }] : style.left;
    return (
      <View style={[style.content, paddings]}>
        <View style={leftStyle}>
          {this.getLeftContent(currentTheme)}
          {activeSearch && (
            <View style={[style.center, { marginLeft: 12 }]}>
              <CelInput autoFocus={activeSearch} basic margin="0 0 0 0" field="search" placeholder="Dialing code, country…" value={formData.search} />
            </View>
          )}
        </View>
        {!activeSearch && this.getCenterContent(currentTheme)}
        <View style={style.right}>
          {this.getRightContent(currentTheme)}
        </View>
      </View>
    )
  }

  render() {
    const { transparent, theme, lastSavedTheme } = this.props
    const currentTheme = theme || lastSavedTheme;
    const style = CelHeadingStyle(currentTheme)
    const statusBarColor = this.getStatusBarTextColor(currentTheme)
    const containerStyle = transparent ? style.transparentBackground : style.headingBackground;
    const Content = this.getContent;
    return (
      <SafeAreaView style={containerStyle}>
        <StatusBar barStyle={statusBarColor} />
        <Content />
      </SafeAreaView>
    );
  }
}

export default testUtil.hookComponent(CelHeading);
