import React, {Component} from 'react';
import { Button, Header, Left, Right, Text } from 'native-base';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import {Image, TouchableOpacity} from 'react-native';

import HeaderStyle from './MainHeader.styles';
import * as actions from "../../../redux/actions";
import Icon from "../../atoms/Icon/Icon";
import {STYLES} from "../../../config/constants/style";

@connect(
  state => ({
    nav: state.nav,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class MainHeader extends Component {
  static propTypes = {
    right: PropTypes.element,
    rightLink: PropTypes.instanceOf(Object),
    left: PropTypes.element,
    backButton: PropTypes.bool,
    onPressBackButton: PropTypes.func,
    backgroundColor: PropTypes.string,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    backgroundColor: STYLES.PRIMARY_BLUE,
  };

  constructor() {
    super();

    this.state = {};

    this.onPressBackButton = this.onPressBackButton.bind(this);
    this.renderLeft = this.renderLeft.bind(this);
    this.renderRight = this.renderRight.bind(this);
  }

  onPressBackButton() {
    const { navigateBack, onPressBackButton } = this.props;
    if (onPressBackButton) {
      return onPressBackButton();
    }

    navigateBack();
  }


  renderLeft() {
    const { left, backButton } = this.props;

    if (backButton) {
      return (
        <Button style={{width: 80}} title='Back' transparent onPress={this.onPressBackButton}>
          <Image
            source={require('../../../../assets/images/icons/Back.png')}
            style={{height: 20, width: 20, resizeMode: 'contain'}}/>
          <Text style={HeaderStyle.backButtonText} uppercase={false}>Back</Text>
        </Button>
      );
    }

    return left;
  }

  renderRight() {
    const { right, rightLink, navigateTo, activeScreen } = this.props;

    if (right) {
      return right;
    }

    if (rightLink) {
      return (
        <Button transparent onPress={() => navigateTo(rightLink.screen)}>
          <Text style={[HeaderStyle.backButtonText, { textAlign: 'right' }]} uppercase={false}>{ rightLink.text }</Text>
        </Button>
      );
    }

    if (this.props.onCancel) {
      return (
        <TouchableOpacity style={{opacity: .6}} onPress={this.props.onCancel}>
          <Icon name='xIcon' height='20' width='20' viewBox="0 0 1000 1000" fill={'white'}/>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => {
        if (activeScreen !== 'Welcome' && activeScreen !== 'Login' && activeScreen !== 'Register') {
          navigateTo('Home', true);
        }
      }}>
        <Image
          source={require('../../../../assets/images/icons/celsius_symbol_white.png')}
          style={HeaderStyle.logo}/>
      </TouchableOpacity>
    );
  }

  render() {
    const {right, left, backButton, backgroundColor} = this.props;

    const styles = {
      backgroundColor,
    }

    return (
      <Header style={[HeaderStyle.header, styles]} iosBarStyle="light-content">
        <Left>
          {this.renderLeft(left, backButton)}
        </Left>
        <Right>
          {this.renderRight(right)}
        </Right>
      </Header>
    );
  }
}

export {MainHeader};
