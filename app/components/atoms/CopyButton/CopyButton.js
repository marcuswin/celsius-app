import React from 'react';
import PropTypes from 'prop-types';
import { Clipboard, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import CelText from '../CelText/CelText';

const CopyButton = (props) => {
  // To do add propTypes
  const { copyText, onCopy, text='Copy',color } = props;
  

  return (
    <TouchableOpacity onPress={() => {Clipboard.setString(copyText); onCopy()}}>
        <CelText color={color}>{text}</CelText>
    </TouchableOpacity>
  )
}

CopyButton.propTypes = {
  copyText: PropTypes.string.isRequired,
  onCopy: PropTypes.func
};

CopyButton.defaultProps ={
  onCopy: () => {}
};

export default testUtil.hookComponent(CopyButton);
