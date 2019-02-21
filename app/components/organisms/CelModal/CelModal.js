import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { BlurView } from 'expo';

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelModalStyle from "./CelModal.styles";
import Icon from '../../atoms/Icon/Icon';

import UI from "../../../constants/UI";
// import { BlurView, VibrancyView,  } from 'react-native-blur';
// import { Button } from 'native-base';

@connect(
  state => ({
    openedModal: state.ui.openedModal,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelModal extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(UI.MODALS)).isRequired,
    shouldRenderCloseButton: PropTypes.bool,
    picture: PropTypes.number,
  };
  static defaultProps = {
    shouldRenderCloseButton: true,
    picture: null,
  }

  getTintColor = () => {
    const { theme } = this.props;
    return {
      'light': 'light', 
      'dark': 'dark',
      'celsius': 'dark',
    }[theme]
  }

  renderImage = () => {
    const { picture } = this.props;
    const style = CelModalStyle();

    if (!picture) return null;
    return (
      <View style={style.imageWrapper}>
        <Image source={picture} style={[style.modalImage]} />
      </View>
    );
  }

  render() {
    const { openedModal, name, actions, shouldRenderCloseButton, children } = this.props;
    const style = CelModalStyle();

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
          { this.renderImage() }

          <View style={style.modal}>
            <ScrollView style={style.contentWrapper}>
              { children }
            </ScrollView>

            {shouldRenderCloseButton ?
              <TouchableOpacity style={style.closeBtn} onPress={() => actions.closeModal()}>
                <Icon name='Close' height='20' width='20' viewBox="0 0 1000 1000" fill={'#3D4853'} />
              </TouchableOpacity> : null
            }
          </View>
        </View>
      </Modal>
    );
  }
}

export default testUtil.hookComponent(CelModal);
