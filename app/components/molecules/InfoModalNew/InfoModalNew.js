import React, { Component } from "react";
import { Animated, Modal } from "react-native";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// import * as appActions from "../../../redux/actions";
// import InfoModalNewStyle from "./InfoModalNew.styles";
import CelText from "../../atoms/CelText/CelText";
import ContactSupport from "../../atoms/ContactSupport/ContactSupport";
import CelButton from "../../atoms/CelButton/CelButton";
import { MODALS } from "../../../constants/UI";
// import CelModal from '../../organisms/CelModal/CelModal';

// @connect(
//   state => ({

//   }),
//   dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
// )
class InfoModalNew extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(MODALS)).isRequired,
    shouldRenderCloseButton: PropTypes.bool,
    picture: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number,
    ]),
    header: PropTypes.bool,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    marginTop: PropTypes.number,
    height: PropTypes.number,
    noScroll: PropTypes.bool,
    onClose: PropTypes.func,
    padding: PropTypes.string,
    onBackdropPress: PropTypes.func,
    pictureCircle: PropTypes.bool,
    content: PropTypes.instanceOf(Array),
    index: PropTypes.number,
    modalInfo: PropTypes.instanceOf(Array),
    modalType: PropTypes.string,
  };
  static defaultProps = {
    shouldRenderCloseButton: true,
    picture: null,
    header: false,
    noScroll: false,
    pictureCircle: false,
    // marginTop: heightPercentageToDP("15%"),
    // height: heightPercentageToDP("65%"),
    modalInfo: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      xOffset: new Animated.Value(0),
    };
  }

  render() {
    // const style = InfoModalNewStyle();
    const {
      name,
      actions,
      picture,
      heading,
      paragraphs,
      onYes,
      yesCopy,
      onNo,
      noCopy,
      support,
      children,
      openedModal,
    } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent
        onRequestClose={() => actions.closeModal()}
        visible={openedModal === name}
      >
        <CelText
          margin={picture ? "50 0 15 0" : "20 0 15 0"}
          align="center"
          type="H2"
          weight="bold"
        >
          {heading}
        </CelText>

        {paragraphs &&
          paragraphs.map(paragraph => (
            <CelText
              margin="5 0 15 0"
              align="center"
              type="H4"
              weight={"300"}
              key={paragraph}
            >
              {paragraph}
            </CelText>
          ))}

        {children}

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
      </Modal>
    );
  }
}

export default InfoModalNew;
