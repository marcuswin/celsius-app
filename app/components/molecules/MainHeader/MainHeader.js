import React, {Component} from 'react';
import { Button, Header, Left, Right, Text } from 'native-base';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import {Image, TouchableOpacity} from 'react-native';
import {SECURITY_STORAGE_AUTH_KEY} from 'react-native-dotenv'
import {deleteSecureStoreKey} from "../../../utils/expo-storage";

import HeaderStyle from './MainHeader.styles';
import * as actions from "../../../redux/actions";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    nav: state.nav
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class MainHeader extends Component {

  static propTypes = {
    right: PropTypes.element,
    rightLink: PropTypes.instanceOf(Object),
    left: PropTypes.element,
    backButton: PropTypes.bool,
    backgroundColor: PropTypes.string,
    onCancel: PropTypes.func,
  };

  constructor() {
    super();

    this.state = {};

    this.setHeaderHeight = this.setHeaderHeight.bind(this);
    this.onPressBackButton = this.onPressBackButton.bind(this);
    this.renderLeft = this.renderLeft.bind(this);
    this.renderRight = this.renderRight.bind(this);
  }

  onPressBackButton() {
    const { navigateBack } = this.props;
    navigateBack();
  }


  setHeaderHeight(e) {
    const {setHeaderHeight} = this.props;
    const {height} = e.nativeEvent.layout;
    setHeaderHeight(height);
  }

  renderLeft() {
    const { left, backButton } = this.props;

    if (backButton) {
      return (
        <Button style={{width: 80}} title='Back' transparent onPress={this.onPressBackButton}>
          <Image
            source={require('../../../../assets/images/icons/Back.png')}
            style={{height: 20, width: 20, resizeMode: 'contain'}}/>
          <Text style={HeaderStyle.backButtonText}>Back</Text>
        </Button>
      );
    }

    return left;
  }

  renderRight() {
    const { right, rightLink, navigateTo } = this.props;

    if (right) {
      return right;
    }

    if (rightLink) {
      return (
        <Button transparent onPress={() => navigateTo(rightLink.screen)}>
          <Text style={[HeaderStyle.backButtonText, { textAlign: 'right' }]}>{ rightLink.text }</Text>
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
        const {nav} = this.props;
        const route = nav.routes[0].routeName;

        if (route !== 'Welcome' && route !== 'Login' && route !== 'Register') {
          navigateTo('Home', true);
        }

        const dev = false; // TODO (djs): temp
        if (dev) {
          deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
        }
      }}>
        <Image
          source={require('../../../../assets/images/icons/celsius_symbol_white.png')}
          style={HeaderStyle.logo}/>
      </TouchableOpacity>
    );
  }

  render() {
    const {right, left, backButton, customStyle} = this.props;

    return (
      <Header style={[HeaderStyle.header, customStyle]} onLayout={this.setHeaderHeight}>
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
