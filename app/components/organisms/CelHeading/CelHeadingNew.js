import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelHeadingStyle from "./CelHeading.styles";
import stylesUtil from '../../../utils/styles-util';
import CelButton from '../../atoms/CelButton/CelButton';
import { THEMES } from '../../../constants/UI';
import CelInput from '../../atoms/CelInput/CelInput';
import CelText from '../../atoms/CelText/CelText'
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    profilePicture: state.user.profile.profile_picture,
    message: state.ui.message,
    theme: state.ui.theme
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelHeadingNew extends Component {

  /**
   * List of possible scene props (props that comes through navigationOptions)
   *
   * @type {boolean}
   * hideBack
   *
   * @type {string}
   * right: oneOf(['action', 'signup', 'login', 'settings', 'info', 'search', 'profile', 'logout', 'close'])
   *
   * @type {function}
   * onInfo
   *
   * @type {boolean}
   * transparent
   */

  constructor(props) {
    super(props);
    this.state = {
      activeSearch: false,
      searchValue: ''
    }
  }

  getLeftContent = (sceneProps) => {
    const { hideBack, right } = sceneProps;
    const { actions } = this.props;
    const { activeSearch } = this.state;

    // if search is active and right part of header is type of search
    if (right === "search" && activeSearch) return <CelButton basic onPress={() => { this.setState({ activeSearch: true }) }} iconRight="Search" />

    // By default if scene prop hideBack is true or it's first screen in the stack, hide back arrow
    return this.props.scene.index === 0 || hideBack === true ? null : <CelButton basic onPress={() => { actions.navigateBack(); }} iconRight="IconChevronLeft" />
  }

  getRightContent = (sceneProps) => {
    const { right, onInfo } = sceneProps;
    const { profilePicture } = this.props;
    const { activeSearch } = this.state;
    const rightType = activeSearch ? "cancel" : right;

    return {
      "action": <CelButton basic onPress={() => { }}>Action</CelButton>,
      "signup": <CelButton basic onPress={() => { this.props.actions.navigateTo('Register') }}>Sign up</CelButton>,
      "login": <CelButton basic onPress={() => { this.props.actions.navigateTo('Login') }}>Log in</CelButton>,
      "settings":
        <CelButton basic
                   onPress={() => { this.props.actions.navigateTo('Settings'); }}
                   iconRight="Settings"
                   iconRightHeight='35'
                   iconRightWidth='35'
                   iconRightColor={STYLES.COLORS.DARK_BACKGROUND}
        />,
      "info": onInfo && <CelButton basic onPress={onInfo}>Info</CelButton>,
      "search": <CelButton basic onPress={() => { this.setState({ activeSearch: true }) }} iconRight="Search" />,
      "profile":
        <CelButton basic onPress={() => { this.props.actions.navigateTo('Profile'); }}>
          <Image
            style={{ width: 35, height: 35, borderRadius: 17 }}
            source={profilePicture ? { uri: profilePicture } : require('../../../../assets/images/empty-profile/empty-profile.png')}
            resizeMethod="resize"
          />
        </CelButton>,
      "logout": <CelButton basic onPress={() => this.props.actions.logoutUser()}>Logout</CelButton>,
      "close": <CelButton basic onPress={() => { this.props.actions.navigateBack(); }}>Close</CelButton>, // TODO(sb):
      "cancel": <CelButton basic onPress={() => { this.setState({ activeSearch: false, searchValue: '' }); this.props.actions.updateFormField('search', "") }}>Cancel</CelButton>,
    }[rightType];
  }

  getStatusBarTextColor = (theme) => {
    const { message } = this.props

    if (message) return 'light-content';

    switch (theme) {
      case THEMES.LIGHT:
        return 'dark-content'
      case THEMES.DARK:
        return 'light-content'
      case THEMES.CELSIUS:
        return 'light-content'
      default:
        return 'light-content'
    }
  }

  getCenterContent = (sceneProps) => {
    const { title } = sceneProps;
    const style = CelHeadingStyle()
    return (
      <View style={style.center}>
        <CelText style={style.headerTitle} align="center" type="H3">{title || ""}</CelText>
      </View>
    );
  }

  getContent = () => {
    const { searchValue, activeSearch } = this.state;
    const scene = this.props.scene.descriptor

    const style = CelHeadingStyle()
    const paddings = stylesUtil.getPadding("15 20 15 20")
    const leftStyle = activeSearch ? [style.left, { flexDirection: 'row', flex: 2 }] : style.left;

    return (
      <View style={[style.content, paddings]}>
        <View style={leftStyle}>
          {this.getLeftContent(scene.options)}
          {activeSearch && (
            <View style={[{ width: '100%', justifyContent: 'center', alignSelf: 'center', marginLeft: 12 }]}>
              <CelInput autoFocus={activeSearch} basic margin="0 0 0 0" field="search" placeholder="Dialing code, country…" type='text' value={searchValue} />
            </View>
          )}
        </View>
        {!activeSearch && this.getCenterContent(scene.options)}
        <View style={style.right}>
          {this.getRightContent(scene.options)}
        </View>
      </View>
    )
  }

  render() {
    const scene = this.props.scene.descriptor;
    const { transparent } = scene.options
    const { theme } = this.props;
    const style = CelHeadingStyle()
    const statusBarColor = this.getStatusBarTextColor(theme);
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

export default testUtil.hookComponent(CelHeadingNew);
