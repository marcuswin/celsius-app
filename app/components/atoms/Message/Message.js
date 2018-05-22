import React, {Component} from 'react';
import {Text, View} from "native-base";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import MessageStyle from './Message.styles';
import * as actions from "../../../redux/actions";

@connect(
  state => ({
    message: state.ui.message,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class Message extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { message, inverted } = this.props;
    if (!message) return null;
    let containerStyles;
    let textStyles;

    if (inverted) {
      containerStyles = [MessageStyle.containerInverted, MessageStyle[`${message.type || 'error'}Inverted`]];
      textStyles = [MessageStyle.text, MessageStyle[`${message.type}Text`]];

    } else {
      containerStyles = [MessageStyle.container, MessageStyle[message.type || 'error']];
      textStyles = MessageStyle.text;
    }

    return (
      <View style={containerStyles}>
        <Text style={textStyles}>
          {message.text}
        </Text>
      </View>
    );
  }
}

export default Message;
