import React, {Component} from 'react';
import {Text, View} from "native-base";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import MessageStyle from './styles';
import * as actions from "../../redux/actions";

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
    const {message} = this.props;
    if (!message) return null;

    return (
      <View style={[MessageStyle.container, MessageStyle[message.type]]}>
        <Text style={MessageStyle.text}>
          {message.text}
        </Text>
      </View>
    );
  }
}

export {Message};
