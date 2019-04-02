import React from 'react';
import PropTypes from 'prop-types';
import { Share, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import CelText from '../CelText/CelText';

const ShareButton = (props) => {
  const { shareText, title, name = 'Share' } = props;

  return (
    <TouchableOpacity onPress={() => Share.share({ message: shareText, title, name })}>
      <CelText>{name}</CelText>
    </TouchableOpacity>
  )
}

ShareButton.propTypes = {
  shareText: PropTypes.string.isRequired,
  title: PropTypes.string,
};

ShareButton.defaultProps ={
  title: ''
};


export default testUtil.hookComponent(ShareButton);
