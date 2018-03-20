import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from "native-base";

import HeadingStyle from './styles';

class Heading extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    containerCustomStyles: PropTypes.instanceOf(Object),
    textCustomStyles: PropTypes.instanceOf(Object),
  };

  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    const { text, containerCustomStyles, textCustomStyles } = this.props;

    return (
      <View style={[HeadingStyle.container, containerCustomStyles]}>
        <Text style={[HeadingStyle.text, textCustomStyles]}>
          { text }
        </Text>
      </View>
    );
  }
}

export { Heading };
