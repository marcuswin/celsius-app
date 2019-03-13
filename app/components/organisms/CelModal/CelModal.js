import React, { Component } from "react";
import { View, Modal, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BlurView } from "expo";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelModalStyle from "./CelModal.styles";
import Icon from "../../atoms/Icon/Icon";

import { MODALS } from '../../../constants/UI'
import { heightPercentageToDP } from "../../../utils/styles-util";
import CelText from "../../atoms/CelText/CelText";

@connect(
  state => ({
    openedModal: state.ui.openedModal
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelModal extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(MODALS)).isRequired,
    shouldRenderCloseButton: PropTypes.bool,
    picture: PropTypes.number,
    header: PropTypes.bool,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    marginTop: PropTypes.number,
    height: PropTypes.number
  };
  static defaultProps = {
    shouldRenderCloseButton: true,
    picture: null,
    header: false,
    marginTop: heightPercentageToDP("15%"),
    height: heightPercentageToDP("65%")
  };

  getTintColor = () => {
    const { theme } = this.props;
    return {
      "light": "light",
      "dark": "dark",
      "celsius": "dark"
    }[theme];
  };

  renderImage = () => {
    const { picture } = this.props;
    const style = CelModalStyle();

    if (!picture) return null;
    return (
      <View style={style.imageWrapper}>
        <Image source={picture} style={[style.modalImage]} />
      </View>
    );
  };

  render() {
    const { openedModal, name, actions, shouldRenderCloseButton, children, header, primaryText, secondaryText, marginTop, height } = this.props;
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

          <View style={[style.wrapper]}>

            <View style={[style.modal, { marginTop, height }]}>
              {this.renderImage()}
              {shouldRenderCloseButton ?
                <TouchableOpacity style={style.closeBtn} onPress={() => actions.closeModal()}>
                  <Icon name='Close' height='20' width='20' viewBox="0 0 1000 1000" fill={"#3D4853"} />
                </TouchableOpacity> : null
              }
              {header ?
                <View style={style.modalHeadingWrapper}>
                  <CelText type={"H1"} style={style.mainHeadingText}>{primaryText}</CelText>
                  <CelText type={"H3"} style={style.secondaryHeadingText}>{secondaryText}</CelText>
                </View> : null
              }

              <ScrollView
                style={[style.contentWrapper, { marginTop: header ? heightPercentageToDP("15.3%") : 40 }]}
                showsVerticalScrollIndicator={false}
              >
                {children}
              </ScrollView>
            </View>
          </View>
        </Modal>
    );
  }
}

export default testUtil.hookComponent(CelModal);
