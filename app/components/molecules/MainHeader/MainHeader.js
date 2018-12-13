import React, { Component } from 'react';
import { Button, Header, Left, Right, Text } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { Image, SafeAreaView, TouchableOpacity } from "react-native";

import HeaderStyle from './MainHeader.styles';
import * as appActions from "../../../redux/actions";
import Icon from "../../atoms/Icon/Icon";
import {STYLES} from "../../../config/constants/style";
import testUtil from "../../../utils/test-util";

@connect(
  state => ({
    nav: state.nav,
    message: state.ui.message,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class MainHeader2 extends Component {
  static propTypes = {
    right: PropTypes.element,
    rightLink: PropTypes.instanceOf(Object),
    left: PropTypes.element,
    backButton: PropTypes.bool,
    onPressBackButton: PropTypes.func,
    backgroundColor: PropTypes.string,
    onCancel: PropTypes.func,
    homeButton: PropTypes.bool,
  };

  static defaultProps = {
    backgroundColor: STYLES.PRIMARY_BLUE,
  };

  onPressBackButton = () => {
    const { actions, onPressBackButton } = this.props;
    if (onPressBackButton) {
      return onPressBackButton();
    }

    actions.navigateBack();
  }


  renderLeft = () => {
    const { left, backButton } = this.props;

    if (backButton) {
      return (
        <TouchableOpacity ref={testUtil.generateTestHook(this, `MainHeader.BackButton`)} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} title='Back' transparent onPress={this.onPressBackButton}>
          <Icon
            name='IconChevronLeft'
            height='20' width='20' fill="rgba(255,255,255,0.5)" viewBox="0 0 22 19"
          />
          <Text style={HeaderStyle.backButtonText} uppercase={false}>Back</Text>
        </TouchableOpacity>
      );
    }

    return left;
  }

  renderRight = () => {
    const { right, rightLink, onCancel, homeButton, actions, activeScreen } = this.props;

    if (right) {
      return right;
    }

    if (rightLink) {
      return (
        <Button ref={testUtil.generateTestHook(this, `MainHeader.RightLink`)} transparent onPress={() => actions.navigateTo(rightLink.screen, true)}>
          <Text style={[HeaderStyle.backButtonText, { textAlign: 'right' }]} uppercase={false}>{ rightLink.text }</Text>
        </Button>
      );
    }

    if (onCancel) {
      return (
        <TouchableOpacity style={{ opacity: .6 }} onPress={onCancel}>
          <Icon name='xIcon' height='20' width='20' viewBox="0 0 1000 1000" fill={'white'} />
        </TouchableOpacity>
      );
    }

    if (homeButton) {
      return (
        <TouchableOpacity onPress={() => {
          if (activeScreen !== 'Welcome' && activeScreen !== 'Login' && activeScreen !== 'Register') {
            actions.navigateTo('Home', true);
          }
        }}>
          <Image
            source={require('../../../../assets/images/icons/celsius_symbol_white.png')}
            style={HeaderStyle.logo} />
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const { right, left, backButton, backgroundColor } = this.props;

    const styles = {
      backgroundColor,
    }

    return (
      <SafeAreaView style={[styles]}>
        <Header style={[HeaderStyle.header]} iosBarStyle="light-content">
          <Left>
            {this.renderLeft(left, backButton)}
          </Left>
          <Right>
            {this.renderRight(right)}
          </Right>
        </Header>
      </SafeAreaView>
    );
  }
}
const MainHeader = testUtil.hookComponent(MainHeader2);
export {MainHeader};
// export default testUtil.hookComponent(MainHeader);

