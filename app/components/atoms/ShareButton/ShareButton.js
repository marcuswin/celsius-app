import React from 'react';
import PropTypes from 'prop-types';
import { Share, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import CelText from '../CelText/CelText';

const ShareButton = (props) => {
  const { shareText, title } = props;

  return (
    <TouchableOpacity onPress={() => Share.share({ message: shareText, title })}>
      <CelText>Share</CelText>
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
