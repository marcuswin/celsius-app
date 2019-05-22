import React from 'react';
import PropTypes from 'prop-types'

import testUtil from "../../../utils/test-util";
import CelModal from "../../organisms/CelModal/CelModal";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";

const InfoModal = (props) => {
  const { name, heading, paragraphs, onYes, yesCopy, onNo, noCopy } = props
  return (
    <CelModal name={name}>
      <CelText margin="20 0 15 0" align="center" type="H2" weight='bold'>{heading}</CelText>

      {paragraphs && paragraphs.map(paragraph => (
        <CelText margin="5 0 15 0" align="center" type="H4" weight={"300"} key={paragraph}>{paragraph}</CelText>
      ))}

      { yesCopy && onYes ? (
        <CelButton margin="10 0 10 0" onPress={onYes}>{yesCopy}</CelButton>
      ) : null}

      { noCopy && onNo ? (
        <CelButton margin="10 0 10 0" onPress={onNo} basic>{noCopy}</CelButton>
      ) : null}
    </CelModal>
  )
}

InfoModal.propTypes = {
  name: PropTypes.string,
  heading: PropTypes.string,
  paragraphs: PropTypes.instanceOf(Array),
  yesCopy: PropTypes.string,
  onYes: PropTypes.func,
  noCopy: PropTypes.string,
  onNo: PropTypes.func,
}

export default testUtil.hookComponent(InfoModal);
