import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import WelcomeStyle from "./Welcome.styles";
import CelText from '../../atoms/CelText/CelText';
import CelButton from '../../atoms/CelButton/CelButton';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';

@connect(
  () => ({
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Welcome extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "Welcome Screen",
  });

  render() {
    const { actions } = this.props
    // const style = WelcomeStyle();
    
    return (
      <RegularLayout>
        <CelText>Hello Welcome</CelText>

        <CelButton onPress={() => actions.navigateTo('RegisterInitial')} margin="20 0 20 0">Register</CelButton>
        <CelButton onPress={() => actions.navigateTo('Login')}>Login</CelButton>
        <CelButton onPress={() => actions.navigateTo('KYC')} margin="20 0 20 0">KYC</CelButton>
        <CelButton onPress={() => actions.navigateTo('WelcomeScreen')} margin="20 0 20 0">Welcome Screen</CelButton>

      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Welcome);
