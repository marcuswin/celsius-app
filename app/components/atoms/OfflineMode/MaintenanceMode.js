import React, { Component } from "react";
import { Image, Text, View } from "react-native";

import { GLOBAL_STYLE_DEFINITIONS as globalStyle } from "../../../config/constants/style";
import OfflineModeStyle from "./OfflineMode.styles";

class MaintenanceMode extends Component {
  render() {
    return (
      <View style={OfflineModeStyle.background}>
        <Image source={require("../../../../assets/images/OfflineMode/maintenance-hippo3x.png")} style={OfflineModeStyle.image}/>
        <Text style={[globalStyle.heading, OfflineModeStyle.header]}>We are under maintenance</Text>
        <Text style={[globalStyle.normalText, OfflineModeStyle.explanation]}>We should be back shortly. Thank you for your patience!</Text>
      </View>
    );
  }
}

export default MaintenanceMode;
