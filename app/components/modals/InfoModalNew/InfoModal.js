import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import CelModal from "../../modals/CelModalNew/CelModalNew";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelText from "../../atoms/CelText/CelText";

const InfoModal = props => {
  const {
    name,
    picture,
    pictureDimensions,
    heading,
    paragraphs,
    onYes,
    yesCopy,
    color,
    noCopy,
    onNo,
    buttonStyleNo,
    buttonStyleYes,
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
            color={color}
          >
            {paragraph}
          </CelText>
        ))}
      <View>
        {noCopy && onNo ? (
          <CelModalButton onPress={onNo} buttonStyle={buttonStyleNo}>
            {noCopy}
          </CelModalButton>
        ) : null}

        {yesCopy && onYes ? (
          <CelModalButton onPress={onYes} buttonStyle={buttonStyleYes}>
            {yesCopy}
          </CelModalButton>
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
  noCopy: PropTypes.string,
  onNo: PropTypes.func,
  color: PropTypes.string,
  buttonStyleNo: PropTypes.string,
  buttonStyleYes: PropTypes.string,
};

export default InfoModal;
