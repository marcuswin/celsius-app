import React from 'react';
import PropTypes from 'prop-types';
import { Clipboard, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import CelText from '../CelText/CelText';

const CopyButton = (props) => {
  const { copyText } = props;

  return (
    <TouchableOpacity onPress={() => Clipboard.setString(copyText)}>
        <CelText>Copy</CelText>
    </TouchableOpacity>
  )
}

CopyButton.propTypes = {
  copyText: PropTypes.string.isRequired
};

CopyButton.defaultProps ={

};

export default testUtil.hookComponent(CopyButton);
