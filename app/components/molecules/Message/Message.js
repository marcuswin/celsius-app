import React, { Component } from "react";
import { Animated, Easing, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import MessageStyle from "./Message.styles";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    style: MessageStyle(state.ui.theme),
    message: state.ui.message
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Message extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0.3)
    };
  }

  componentWillReceiveProps(nextProps) {
    const { message } = this.props;
    const { opacity } = this.state;

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

  getIcon = () => {
    const { message } = this.props;

    switch (message.type) {
      case "info":
        return { name: "Close", fill: STYLES.COLORS.CELSIUS_BLUE, viewBox: "0 0 1000 1000" };
      case "warning":
        return { name: "Close", fill: STYLES.COLORS.ORANGE, viewBox: "0 0 1000 1000" };
      case "error":
        return { name: "Close", fill: STYLES.COLORS.RED, viewBox: "0 0 1000 1000" };
      case "sucess":
      default:
        return { name: "Close", fill: STYLES.COLORS.GREEN, viewBox: "0 0 1000 1000" };
    }
  };

  render() {
    const { style, message, actions } = this.props;
    if (!message || !message.text) return null;

    const icon = this.getIcon();

    return (
      <Animated.View style={style[`${message.type}Container`]}>
        <View style={style.circle}>
          <Icon {...icon} height='10' width='10' viewBox={icon.viewBox} />
        </View>
        <View style={{ width: "65%" }}>
          <CelText color="white">
            {message.text}
          </CelText>
        </View>
        <TouchableOpacity onPress={() => actions.clearMessage()} style={style.closeButton}>
          <Icon name="Close" height="17" width="17" viewBox="0 0 1000 1000" fill="#FFFFFF"/>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default testUtil.hookComponent(Message);
