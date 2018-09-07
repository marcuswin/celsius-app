import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import CelModalStyle from "./CelModal.styles";
import Icon from "../Icon/Icon";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelModal extends Component {
  static propTypes = {
    name: PropTypes.string,
  }

  render() {
    const { openedModal, name, actions, modalStyle, contentStyle } = this.props;

    const additionalModalStyle = modalStyle || {};

    const additionalScrollStyle = contentStyle || {};

    return (
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => actions.closeModal()}
        visible={openedModal === name}
      >
        <View style={CelModalStyle.backdrop} />
        <View style={CelModalStyle.wrapper}>
          <View style={[CelModalStyle.modal, additionalModalStyle]}>
            <TouchableOpacity style={CelModalStyle.closeBtn} onPress={() => actions.closeModal()}>
              <Icon name='xIcon' height='20' width='20' viewBox="0 0 1000 1000" fill={'#3D4853'}/>
            </TouchableOpacity>
            <ScrollView style={[CelModalStyle.scrollView, additionalScrollStyle]}>
              { this.props.children }
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

export default CelModal;
