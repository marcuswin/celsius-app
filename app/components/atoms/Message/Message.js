import React, { Component } from "react";
import { Text, View } from "native-base";
import { TouchableOpacity, Animated, Easing } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import MessageStyle from "./Message.styles";
import * as appActions from "../../../redux/actions";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    message: state.ui.message,
    connected: state.ui.internetConnected,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Message extends Component {

  constructor() {
    super();
    this.state = {
      opacity: new Animated.Value(0.3),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {message} = this.props;
    const {opacity} = this.state;

    if (!message && nextProps.message) {
      Animated.timing(
        opacity,
        {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.linear
        }
      ).start();
    }
  }


  render() {
    const { message, connected, actions } = this.props;
    const {opacity} = this.state;

    if (!message && connected) return null;
    let containerStyles;
    let textStyles;
    let circleStyles;
    let messageIcon;

    if (!connected) {
      containerStyles = [MessageStyle.container, MessageStyle.neutral];
      textStyles = [MessageStyle.text, MessageStyle.neutralText];
    } else {
      containerStyles = [MessageStyle.container, MessageStyle[message.type || "error"]];
      circleStyles = MessageStyle[`${message.type}Circle` || "errorCircle"];
      textStyles = MessageStyle.text;
      messageIcon = message.type === "success" ?
        <Icon
          name={"SuccessIcon"}
          width='15'
          height='15'
          fill={"white"}
          stroke={"white"}
          viewBox="0 -2 16 16"
        /> : <Icon
          name={"ErrorIcon"}
          width='15'
          height='15'
          fill={"white"}
          stroke={"white"}
          viewBox="0 0 15 15"
        />;
    }

    if (!connected) {
      return (
        <View style={containerStyles}>
          <Text style={textStyles}>
            There's no internet connection. Please, make sure that your Wi-Fi or Cellular Data is turned on, then try
            again.
          </Text>
        </View>
      );
    }

    if (!message.text) return null;

    return (
      <Animated.View style={[containerStyles, {opacity}]}>
        <View style={MessageStyle.messageWrapper}>
          <View style={circleStyles}>
            {messageIcon}
          </View>
          <Text style={textStyles}>
            {message.text}
          </Text>
        </View>
        <TouchableOpacity onPress={() => actions.clearMessage()}>
          <Icon name='xIcon' height='17' width='17' viewBox="0 0 1000 1000" fill={"#545F8D"}/>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default Message;
