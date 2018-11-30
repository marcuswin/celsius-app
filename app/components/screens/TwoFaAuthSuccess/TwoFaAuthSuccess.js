import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import TwoFaAuthSuccessStyle from "./TwoFaAuthSuccess.styles";
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../atoms/CelButton/CelButton";


@connect(
  () => ({
    // map state to props
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TwoFaAuthSuccess extends Component {
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
    const { actions } = this.props;

    const logoutButton = () => (

      <TouchableOpacity onPress={actions.logoutUser}>
        <Text style={[{
          color: "white",
          paddingLeft: 5,
          textAlign: "right",
          opacity: 0.8,
          marginTop: 2,
          fontSize: FONT_SCALE * 18,
          fontFamily: "agile-medium"
        }]}>Log out</Text>
      </TouchableOpacity>
    );

    return (
      <SimpleLayout
        mainHeader={{ backButton: true, right: logoutButton() }}
        animatedHeading={{ text: "Success!" }}
        background={STYLES.GRAY_1}
        bottomNavigation
      >
        <View style={{ alignItems: "center" }}>
          <Image resizeMode={"contain"}
            style={TwoFaAuthSuccessStyle.image}
            source={require("../../../../assets/images/authSuccess3x.png")} />
          <Text style={[globalStyles.heading, { marginTop: 25 }]}>You have successfully turned Two-Factor Verification on</Text>
          <Text style={[globalStyles.normalText, { textAlign: "center" }]}>You will now be asked for a verification code, every time you want to login or make a transaction.</Text>
        </View>

        <CelButton
          onPress={() => actions.navigateTo("TwoFaWelcome")}
          margin={"40 60 0 60"}
        >
          Done
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default TwoFaAuthSuccess;
