import React, { Component } from "react";
import { Modal, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { BlurView } from "expo-blur";
import * as appActions from "../../../redux/actions";
import InfoModalNewStyle from "./InfoModalNew.styles";
import CelText from "../../atoms/CelText/CelText";
import ContactSupport from "../../atoms/ContactSupport/ContactSupport";
import CelButton from "../../atoms/CelButton/CelButton";
import { MODALS } from "../../../constants/UI";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InfoModalNew extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(MODALS)).isRequired,
    hasCloseButton: PropTypes.bool,
    picture: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number,
    ]),
    scrollable: PropTypes.bool,
    heading: PropTypes.string,
    paragraphs: PropTypes.instanceOf(Array),
    support: PropTypes.bool,
    yesCopy: PropTypes.string,
    onYes: PropTypes.func,
    noCopy: PropTypes.string,
    onNo: PropTypes.func,
  };
  static defaultProps = {
    hasCloseButton: true,
    picture: null,
  };

  // constructor(props) {
  //   super(props);
  // }

  renderPicture = () => {
    const { picture } = this.props;
    const style = InfoModalNewStyle();

    return (
      <View style={style.pictureWrapper}>
        <Image
          source={picture}
          style={style.pictureStyle}
          resizeMode="contain"
        />
      </View>
    );
  };

  renderClose = () => {
    const { actions } = this.props;
    const style = InfoModalNewStyle();

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
      paragraphs,
      heading,
      yesCopy,
      onYes,
      noCopy,
      onNo,
      support,
    } = this.props;
    const style = InfoModalNewStyle();

    return (
      <Modal
        animationType="fade"
        transparent
        onRequestClose={() => actions.closeModal()}
        visible={openedModal === name}
      >
        <View style={style.wrapper}>
          <View style={style.modal}>
            {!!hasCloseButton && this.renderClose()}
            {!!picture && this.renderPicture()}
            <CelText
              margin={picture ? "50 0 15 0" : "20 0 15 0"}
              align="center"
              type="H2"
              weight="bold"
              color="back"
            >
              {heading}
            </CelText>
            {children}
            {paragraphs &&
              paragraphs.map(paragraph => (
                <CelText
                  margin="5 10 15 10"
                  align="center"
                  type="H4"
                  weight={"300"}
                  key={paragraph}
                  color="back"
                >
                  {paragraph}
                </CelText>
              ))}
            {yesCopy && onYes ? (
              <CelButton margin="10 0 10 0" onPress={onYes}>
                {yesCopy}
              </CelButton>
            ) : null}
            {noCopy && onNo ? (
              <CelButton margin="10 0 10 0" onPress={onNo} basic>
                {noCopy}
              </CelButton>
            ) : null}

            {support ? <ContactSupport align="left" /> : null}
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

export default InfoModalNew;
