import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import Icon from "../../atoms/Icon/Icon";
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles, FONT_SCALE } from "../../../config/constants/style";

const WalletInfoBubble = (props) => 
  <InfoBubble
    color="gray"
    renderContent={(textStyles) => (
      <View>
        <Text style={[textStyles, globalStyles.boldText, {marginBottom: 7, fontSize: FONT_SCALE * 18}]}>{props.title}</Text>
        <TouchableOpacity style={{position: 'absolute', top: 3, right: 0, opacity: .6}} onPress={props.onPressClose}>
          <Icon name='xIcon' height='11' width='11' viewBox="0 0 1000 1000" fill={'white'}/>
        </TouchableOpacity>
          {props.children}
      </View> 
    )}
  />

export default WalletInfoBubble;