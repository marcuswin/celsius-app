import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelText from "../../atoms/CelText/CelText";
import CelModal from "../CelModal/CelModal";
import { THEMES } from "../../../constants/UI";
import InfoModalStyle from "./InfoModal.styles";

const InfoModal = props => {
  const {
    name,
    picture,
    pictureDimensions,
    heading,
    paragraphs,
    onYes,
    yesCopy,
  } = props;

  const style = InfoModalStyle();
  return (
    <CelModal
      name={name}
      picture={picture}
      pictureDimensions={pictureDimensions}
    >
      <View style={style.modalWrapper}>
        <View>
          <CelText
            margin={"0 40 15 40"}
            align="center"
            type="H2"
            weight="bold"
            theme={THEMES.LIGHT}
          >
            {heading}
          </CelText>

          {paragraphs &&
            paragraphs.map(paragraph => (
              <CelText
                margin={"0 25 25 25"}
                align="center"
                type="H4"
                weight={"300"}
                key={paragraph}
                theme={THEMES.LIGHT}
              >
                {paragraph}
              </CelText>
            ))}
        </View>

        <View style={style.buttonWrapper}>
          {yesCopy ? (
            <CelModalButton onPress={onYes}>{yesCopy}</CelModalButton>
          ) : null}
        </View>
      </View>
    </CelModal>
  );
};

InfoModal.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string,
  picture: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.number,
  ]),
  pictureDimensions: PropTypes.instanceOf(Object),
  paragraphs: PropTypes.instanceOf(Array),
  yesCopy: PropTypes.string,
  onYes: PropTypes.func,
};

export default InfoModal;
