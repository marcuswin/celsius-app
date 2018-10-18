import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
import TwoFaAuthorizationStyle from "./TwoFaAuthorization.styles";
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import Separator from "../../atoms/Separator/Separator";

@connect(
  () => ({
    // map state to props
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TwoFaAuthorization extends Component {
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
          fontSize: FONT_SCALE * 21,
          fontFamily: "agile-medium"
        }]}>Log out</Text>
      </TouchableOpacity>
    );


    return (
      <SimpleLayout
        mainHeader={{ backButton: true, right: logoutButton() }}
        animatedHeading={{ text: "2FA Verification" }}
        background={STYLES.GRAY_1}
        bottomNavigation
      >

        <View style={TwoFaAuthorizationStyle.wrapper}>

          <View>
            <Text style={[globalStyles.heading, TwoFaAuthorizationStyle.heading]}>Protect your account!</Text>
            <Text style={[globalStyles.normalText, { marginTop: 15 }]}>
              Add an extra layer of security to prevent the risk of an unwanted access to your account, even if your
              login information is compromised.
            </Text>
            <Separator margin={"30 0 30 0"}/>
          </View>

          <View style={TwoFaAuthorizationStyle.imageTextWrapper}>
            <Image resizeMode={"contain"}
                   style={TwoFaAuthorizationStyle.image}
                   source={require("../../../../assets/images/security_dog3x.png")}/>
            <View style={TwoFaAuthorizationStyle.textWrapper}>
              <Text style={[globalStyles.normalText, TwoFaAuthorizationStyle.imageText]}>
                To secure your account and transactions you can use either SMS, Authentication apps or biometrics.
              </Text>
            </View>
          </View>

          <CelButton
            onPress={() => actions.navigateTo("LoginPasscode")}
          >
            Get started
          </CelButton>
        </View>
      </SimpleLayout>
    );
  }
}

export default TwoFaAuthorization;
