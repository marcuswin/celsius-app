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

@connect(
  state => ({
    style: CelHeadingStyle(state.ui.theme),
    theme: state.ui.theme,
    profilePicture: state.user.profile.profile_picture
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelHeading extends Component {

  static propTypes = {
    left: PropTypes.oneOf(['back']),
    right: PropTypes.oneOf(['action', 'settings', 'info', 'search', 'profile', 'logout', 'close']),
    transparent: PropTypes.bool,
    statusBarTheme: PropTypes.oneOf(['light', 'dark', 'celsius']),
  };
  static defaultProps = {
    transparent: false
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  getLeftContent = () => {
    const { left, actions } = this.props;
    return {
      "back": <CelButton basic onPress={() => { actions.navigateBack(); }}>Back</CelButton>
    }[left];
  }

  getRightContent = () => {
    const { right, actions, profilePicture } = this.props;
    return {
      "action": <CelButton basic onPress={() => { }}>Action</CelButton>,
      "settings":
        <CelButton basic onPress={() => { actions.navigateTo('Settings'); }}>
          <View>
            <Icon name="Settings" width="35" height="35" />
          </View>
        </CelButton>,
      "info": <CelButton basic onPress={() => { }}>Info</CelButton>,
      "search": <CelButton basic onPress={() => { }}>Search</CelButton>,
      "profile":
        <CelButton basic onPress={() => { actions.navigateTo('Profile'); }}>
          <Image style={{ width: 35, height: 35, borderRadius: 17 }} source={{ uri: profilePicture }} resizeMethod="resize" />
        </CelButton>,
      "logout": <CelButton basic onPress={() => { }}>Logout</CelButton>,
      "close": <CelButton basic onPress={() => { actions.navigateBack(); }}>Close</CelButton>, // TODO(sb):
    }[right];
  }

  getStatusBarTextColor = (theme) => ({
    'light': 'dark-content',
    'dark': 'light-content',
    'celsius': 'light-content'
  }[theme])

  render() {
    const { style, children, transparent, statusBarTheme, theme } = this.props
    const paddings = stylesUtil.getPadding("15 20 15 20")
    const statusBarColor = this.getStatusBarTextColor(statusBarTheme || theme)
    return (
      <SafeAreaView style={transparent ? {} : style.headingBackground}>
        <StatusBar barStyle={statusBarColor} />
        <View style={[style.content, paddings]}>
          <View style={style.left}>
            {this.getLeftContent()}
          </View>
          <View style={style.center}>
            {children}
          </View>
          <View style={style.right}>
            {this.getRightContent()}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default testUtil.hookComponent(CelHeading);
