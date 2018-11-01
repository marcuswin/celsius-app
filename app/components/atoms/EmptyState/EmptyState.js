import React from "react";
import { View, Text, Image, Platform } from "react-native";
import EmptyStateStyle from "./EmptyState.styles";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";


const EmptyState = (props) => {

  let title;
  let text;

  switch (props.screen) {
    case "SelectCoin":
      title = "From here you can pay your friends back with crypto";
      text = Platform.os === 'ios' ?
        "To send your favorite coins to your favorite people, please verify your identity first." :
        "This feature is coming to Android soon!";
      break;
    default:
      title = "From here you can pay your friends back with crypto";
      text = "To send your favorite coins to your favorite people, please verify your identity first."
  }

  return (
    <View style={EmptyStateStyle.wrapper}>
      <Image source={require("../../../../assets/images/deerTransactionHistory.png")}
             style={[EmptyStateStyle.image, { resizeMode: "contain" }]}/>

      <Text style={[globalStyles.heading, { marginRight: 40, marginLeft: 40 }]}>
        {title}
      </Text>

      <Text style={[globalStyles.normalText, { textAlign: "center", marginRight: 40, marginLeft: 40 }]}>
        {text}
      </Text>

    </View>
  );
};

export default EmptyState;
