import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
import TwoFaWelcomeStyle from "./TwoFaWelcome.styles";
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelCustomButton from "../../atoms/CelCustomButton/CelCustomButton";
import RemoveTwoFaModal from "../../organisms/RemoveTwoFaModal/RemoveTwoFaModal";
import { MODALS } from "../../../config/constants/common";


@connect(
  () => ({
    // map state to props
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TwoFaWelcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
      authActivated: true,
      modalVisible: false,
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { authActivated } = this.state;
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
        animatedHeading={{ text: "Setting up 2FA Verification" }}
        background={STYLES.GRAY_1}
        bottomNavigation
      >

        <Text style={[globalStyles.normalText, TwoFaWelcomeStyle.title]}>Please choose the method of security:</Text>

        <View style={TwoFaWelcomeStyle.authenticator}>
          <CelCustomButton
            onPress={() => actions.navigateTo("TwoFaAuthAppConfirmation")}
            size={"large"}
            iconLeft={"LockIcon"}
            iconLeftColor={"white"}
            iconLeftHeight={"40"}
            iconRight={"IconChevronRight"}
            iconRightColor={STYLES.PRIMARY_BLUE}
            iconRightHeight={"15"}
            title={"Auth app"}
            titleColor={STYLES.PRIMARY_BLUE}
            explanation={"Install a Google Authenticator or Authy to generate security codes."}
            explanationColor={STYLES.GRAY_2}
            activated={authActivated}
            onCancel={() => actions.openModal(MODALS.REMOVE_AUTHAPP)}
          />
        </View>

        <RemoveTwoFaModal/>

      </SimpleLayout>
    );
  }
}

export default TwoFaWelcome;
