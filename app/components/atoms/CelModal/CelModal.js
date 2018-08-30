import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableOpacity} from 'react-native';
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

  closeModal = () => {
    console.log(this.props);
    this.props.actions.closeModal();
  }

  render() {
    const { openedModal, name } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent
        visible={openedModal === name}
      >
        <View style={CelModalStyle.backdrop} />
        <View style={CelModalStyle.wrapper}>
          <View style={CelModalStyle.modal}>
            <TouchableOpacity style={CelModalStyle.closeBtn} onPress={this.closeModal}>
              <Icon name='xIcon' height='20' width='20' viewBox="0 0 1000 1000" fill={'#3D4853'}/>
            </TouchableOpacity>
            <View>
              { this.props.children }
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default CelModal;
