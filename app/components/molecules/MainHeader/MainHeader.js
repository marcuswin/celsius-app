import React, {Component} from 'react';
import {
  Body, Button, Header, Left, Right, Text,
  Title,
} from 'native-base';
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
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)
class MainHeader extends Component {

  static propTypes = {
    right: PropTypes.element,
    headerTitle: PropTypes.string,
    left: PropTypes.element,
    backButton: PropTypes.bool,
    backgroundColor: PropTypes.string,
    cancelBtn: PropTypes.bool,
    onCancel: PropTypes.func,
  };

  constructor() {
    super();

    this.state = {};

    this.setHeaderHeight = this.setHeaderHeight.bind(this);
    this.onPressBackButton = this.onPressBackButton.bind(this);
  }

  onPressBackButton() {
    this.props.navigation.goBack();
  }


  setHeaderHeight(e) {
    const {setHeaderHeight} = this.props;
    const {height} = e.nativeEvent.layout;
    setHeaderHeight(height);
  }

  renderLeft(leftSide, backButton) {
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

    return leftSide;
  }

  renderRight(rightSide) {
    if (rightSide) {
      return rightSide;
    }

    if (this.props.cancelBtn) {
      return (
        <TouchableOpacity style={{opacity: .6}} onPress={this.props.onCancel}>
          <Icon name='xIcon' height='20' width='20' viewBox="0 0 1000 1000" fill={'white'}/>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => {
        deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      }}>
        <Image
          source={require('../../../../assets/images/icons/celsius_symbol_white.png')}
          style={HeaderStyle.logo}/>
      </TouchableOpacity>
    );
  }

  render() {
    const {headerTitle, right, left, backButton, customStyle} = this.props;

    return (
      <Header style={[HeaderStyle.header, customStyle]} onLayout={this.setHeaderHeight}>
        <Left>
          {this.renderLeft(left, backButton)}
        </Left>
        <Body>
        <Title style={HeaderStyle.headerTitle}>{headerTitle}</Title>
        </Body>
        <Right>
          {this.renderRight(right)}
        </Right>
      </Header>
    );
  }
}

export {MainHeader};
