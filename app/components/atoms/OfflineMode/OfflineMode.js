import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../redux/actions";
import OfflineModeStyle from "./OfflineMode.styles";
import { GLOBAL_STYLE_DEFINITIONS as globalStyle } from "../../../config/constants/style";


@connect(
  state => ({
    connected: state.ui.internetConnected
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class OfflineMode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    return (
      <View style={OfflineModeStyle.background}>
        <Image source={require("../../../../assets/images/OfflineMode/deer-tangled3x.png")} style={OfflineModeStyle.image}/>
        <Text style={[globalStyle.heading, OfflineModeStyle.header]}>There's no internet connection</Text>
        <Text style={[globalStyle.normalText, OfflineModeStyle.explanation]}>Please, make sure that your Wi-Fi or Cellular data is turned on, then <Text style={{fontFamily: 'agile-book'}}>try again</Text>.</Text>
      </View>
    );
  }
}

export default OfflineMode;
