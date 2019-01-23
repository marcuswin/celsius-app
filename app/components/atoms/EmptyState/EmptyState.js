import React from "react";
import { View, Text, Image } from "react-native";
import store from '../../../redux/store';
import EmptyStateStyle from "./EmptyState.styles";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import { isBlacklistedCountry, isBlacklistedState } from "../../../utils/user-util";


const EmptyState = (props) => {

  let title;
  let text;
  let coloredStyle = {};
  const { user } = store.getState().users;

  if (props.color) {
    coloredStyle = { color: props.color }
  }

  const place = !!isBlacklistedState(user.state) || !!isBlacklistedCountry(user.country);

  switch (props.purpose) {
    case "NycBlackout":
      title = place ? "We apologize for any inconvenience, but due to local laws and regulations, we are unable to work with residents from this region at this time." : "Looks like we’re missing some information from you.";
      text = place ? "Please contact app@celsius.network." : "Please contact app@celsius.network to gain access back to your account.";
      break;
    case "Compliance":
      title = "Feature blocked";
      text = props.text
      break;
    default:
      title = "From here you can pay your friends back with crypto";
      text = "To send your favorite coins to your favorite people, please verify your identity first."
  }

  return (
    <View style={EmptyStateStyle.wrapper}>
      <Image source={require("../../../../assets/images/deerTransactionHistory.png")}
        style={[EmptyStateStyle.image, { resizeMode: "contain" }]} />

      <Text style={[globalStyles.heading, { marginRight: 40, marginLeft: 40 }, coloredStyle]}>
        {title}
      </Text>

      <Text style={[globalStyles.normalText, { textAlign: "center", marginRight: 40, marginLeft: 40 }, coloredStyle]}>
        {text}
      </Text>
    </View>
  );
};

export default EmptyState;
