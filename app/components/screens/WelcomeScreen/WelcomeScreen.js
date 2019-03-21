import React, { Component } from 'react';
import { View, Image } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from '../../../redux/actions';
import testUtil from "../../../utils/test-util";

import WelcomeScreenStyle from "./WelcomeScreen.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';

@connect(
  null,
  dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)
class WelcomeScreen extends Component {
  static propTypes = {};
  static defaultProps = {}


  render() {
    const style = WelcomeScreenStyle();

    return (
      <RegularLayout>
        <View style={style.wrapper}>
          <Image
            source={require('../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png')} style={{ height: 160, resizeMode: 'contain', marginTop: 120, }}
          />
          <CelText weight='bold' align='center' type='H1' style={style.title}>Welcome to Celisus</CelText>
          <CelText weight="light" align='center' style={style.subtitle}>A new way to earn, borrow, and pay on the blockchain. Let’s bring the next 100M people into Crypto, together.</CelText>
          <CelButton style={style.button} onPress={actions.navigateTo('Home')}>Join Celsius</CelButton>
          <CelText>Already have an account</CelText>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WelcomeScreen);
