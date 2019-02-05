import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Image, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelModalStyle from "./CelModal.styles";
import CelButton from '../../atoms/CelButton/CelButton';
import Icon from '../../atoms/Icon/Icon';
// import { BlurView, VibrancyView,  } from 'react-native-blur';
import { BlurView } from 'expo';
// import { Button } from 'native-base';

@connect(
  state => ({
    style: CelModalStyle(state.ui.theme),
    modalMenuOpen: state.ui.modalMenuOpen
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelModal extends Component {

  static propTypes = {
    name: PropTypes.string,
    shouldRenderCloseButton: PropTypes.bool,
    picture: PropTypes.oneOf(['hurra', 'hurra1'])
  };
  static defaultProps = {
    shouldRenderCloseButton: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true
    };
  }

  getText = () => {

    return {
    }
  }

  getTintColor = () => {
    const { theme } = this.props;

    return {
      'light': 'light',
      'dark': 'dark',
      'celsius': 'dark',
    }[theme]
  }

  getImage = () => {
    const { picture, style } = this.props;
    return {
      'hurra': <Image source={require('../../../../assets/images/modals/PolarBearFistUp.png')} style={[style.modalImage]} />,
      'hurra1': <Image />,
    }[picture]
  }

  render() {
    const { openedModal, name, actions, picture, modalStyle, contentStyle, shouldRenderCloseButton, style } = this.props;
    const MainImage = this.getImage;
    const tintColor = this.getTintColor();
    return (
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => actions.closeModal()}
        visible={openedModal === name}
      >

        <BlurView tint={tintColor} intensity={100} style={StyleSheet.absoluteFill} />
        <View style={style.wrapper}>
          <View>
            {/* <Image source={require('../../../../assets/images/frenchy.png')} style={[style.modalImage]} /> */}
            {!!picture && <MainImage />}
            <View style={style.modal}>
              {shouldRenderCloseButton ?
                <TouchableOpacity style={style.closeBtn} onPress={() => actions.closeModal()}>
                  <Icon name='Close' height='20' width='20' viewBox="0 0 1000 1000" fill={'#3D4853'} />
                </TouchableOpacity> : null
              }
              <ScrollView horizontal={true}>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',


                }}>
                   <Animated.View 
              key={1}
              style={{ height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
            />
                  <Text>Child 1</Text>
                  <Text>Child 2</Text>
                  <Text>Child 3</Text>
                </View>
              </ScrollView>
              <View >
                <CelButton>Continue</CelButton>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default testUtil.hookComponent(CelModal);
