import React, { Component } from "react";
import { View, Modal, StyleSheet, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BlurView } from "expo-blur";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import { MODALS } from "../../../constants/UI";
import CelModalStyle from "./CelModal.styles";
import Icon from "../../atoms/Icon/Icon";
import { heightPercentageToDP } from "../../../utils/styles-util";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelModal extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(MODALS)).isRequired,
    hasCloseButton: PropTypes.bool,
    picture: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number,
    ]),
    pictureDimensions: PropTypes.instanceOf(Object),
    maxHeight: PropTypes.string,
  };
  static defaultProps = {
    hasCloseButton: true,
    picture: null,
    pictureDimensions: {},
    maxHeight: "60%",
  };

  renderPicture = () => {
    const { picture, pictureDimensions } = this.props;
    const style = CelModalStyle();
    const pictureStyle = [style.pictureStyle, pictureDimensions];

    return (
      <View style={style.pictureWrapper}>
        <Image source={picture} style={pictureStyle} resizeMode="contain" />
      </View>
    );
  };

  renderClose = () => {
    const { actions } = this.props;
    const style = CelModalStyle();

    return (
      <TouchableOpacity
        style={style.closeBtn}
        onPress={() => {
          actions.closeModal();
        }}
      >
        <Icon
          name="Close"
          height="15"
          width="15"
          viewBox="0 0 1000 1000"
          fill={"#3D4853"}
          marginTop={20}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {
      openedModal,
      name,
      actions,
      children,
      picture,
      hasCloseButton,
      maxHeight,
    } = this.props;
    const style = CelModalStyle();

    return (
      <Modal
        animationType="fade"
        transparent
        onRequestClose={() => actions.closeModal()}
        visible={openedModal === name}
      >
        <View style={style.wrapper}>
          <View
            style={[
              style.modal,
              { maxHeight: heightPercentageToDP(maxHeight) },
            ]}
          >
            <View style={{ height: picture || hasCloseButton ? 50 : 0 }}>
              {!!hasCloseButton && this.renderClose()}
              {!!picture && this.renderPicture()}
            </View>
            {children}
          </View>
          <BlurView
            tint={"dark"}
            intensity={100}
            style={StyleSheet.absoluteFill}
          >
            <TouchableOpacity
              style={style.outsideCloseModal}
              onPress={() => {
                actions.closeModal();
              }}
            />
          </BlurView>
        </View>
      </Modal>
    );
  }
}

export default CelModal;
