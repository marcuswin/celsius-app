import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as appActions from '../../../redux/actions';
import testUtil from "../../../utils/test-util";

import WelcomeStyle from "./Welcome.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';

@connect(
  () => ({
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Welcome extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    headerSameColor: false,
    transparent: true
  })

  render() {
    const style = WelcomeStyle();
    const { actions } = this.props
    return (
      <RegularLayout>
        <View style={style.wrapper}>
          <Image
            source={require('../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png')} style={{ height: 140, resizeMode: 'contain' }}
          />
          <CelText weight='bold' align='center' type='H1' style={style.title}>Welcome to Celisus</CelText>
          <CelText weight="light" align='center' style={style.subtitle}>A new way to earn, borrow, and pay on the blockchain. Let’s bring the next 100M people into Crypto, together.</CelText>
          <CelButton style={style.button} onPress={() => actions.navigateTo('RegisterInitial')}>Join Celsius</CelButton>
          <TouchableOpacity onPress={() => actions.navigateTo('Login')}><CelText>Already have an account</CelText></TouchableOpacity>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Welcome);
