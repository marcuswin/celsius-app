import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelText from "../../atoms/CelText/CelText";
import CelModal from "../CelModal/CelModal";

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
  return (
    <CelModal
      name={name}
      picture={picture}
      pictureDimensions={pictureDimensions}
    >
      <CelText margin={"0 40 15 40"} align="center" type="H2" weight="bold">
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
          >
            {paragraph}
          </CelText>
        ))}
      <View>
        {yesCopy ? (
          <CelModalButton onPress={onYes}>{yesCopy}</CelModalButton>
        ) : null}
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
