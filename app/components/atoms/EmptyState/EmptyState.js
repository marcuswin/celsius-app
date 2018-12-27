// TODO(fj): maybe make this a screen with props?
// TODO(fj): optional header and bottom navigation?

import React from "react";
import { View, Text, Image } from "react-native";
import store from '../../../redux/store';
import EmptyStateStyle from "./EmptyState.styles";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";


const EmptyState = (props) => {

  let title;
  let text;
  const { user } = store.getState().users;

  switch (props.purpose) {
    case "NycBlackout":
      title = user.state === "New York" ? "We apologize for any inconvenience, but due to local laws and regulations, we are unable to work with New York state residents at this time." : "Looks like we’re missing some information from you.";
      text = user.state === "New York" ? "Please contact app@celsius.network." : "Please contact app@celsius.network to gain access back to your account.";
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
