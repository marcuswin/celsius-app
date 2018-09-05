import React, {Component} from 'react';
import { Platform, TouchableNativeFeedback, TouchableHighlight } from 'react-native';

class CelTouchable extends Component {
  render() {
    const {children, ...props} = this.props;

    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback {...props}>
          {children}
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableHighlight underlayColor="transparent" {...props}>
        {children}
      </TouchableHighlight>
    );
  }
}

export default CelTouchable;
