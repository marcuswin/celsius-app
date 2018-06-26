import React, {Component} from 'react';
import {Text, View} from "native-base";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import MessageStyle from './Message.styles';
import * as actions from "../../../redux/actions";

@connect(
  state => ({
    message: state.ui.message,
    connected: state.ui.internetConnected,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class Message extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { message, inverted, connected } = this.props;
    if (!message && connected) return null;
    let containerStyles;
    let textStyles;

    if (!connected) {
      containerStyles = [MessageStyle.container, MessageStyle.neutral];
      textStyles = [MessageStyle.text, MessageStyle.neutralText];
    } else if (inverted) {
      containerStyles = [MessageStyle.containerInverted, MessageStyle[`${message.type || 'error'}Inverted`]];
      textStyles = [MessageStyle.text, MessageStyle[`${message.type}Text`]];
    } else {
      containerStyles = [MessageStyle.container, MessageStyle[message.type || 'error']];
      textStyles = MessageStyle.text;
    }

    if (!connected) {
      return (
        <View style={containerStyles}>
          <Text style={textStyles}>
            There's no internet connection. Please, make sure that your Wi-Fi or Cellular Data is turned on, then try again.
          </Text>
        </View>
      )
    }

    if (!message.text) return null;

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
