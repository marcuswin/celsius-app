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
import { MODALS, VERIFY_IDENTITY_TYPES } from "../../../config/constants/common";


@connect(
  state => ({
    user: state.users.user,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TwoFaWelcome extends Component {
  constructor() {
    super();

    this.state = {
      // initial state
    };
  }

  onPressBackButton = () => {
    const { actions } = this.props;
    actions.navigateTo('ProfileSettings');
  };

  // lifecycle methods
  // event hanlders
  // rendering methods
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  verificationCallback = (pin) => {
    const { actions } = this.props;

    actions.navigateTo('TwoFaAuthAppConfirmation', {
      pin
    });
  };

  enableTwoFactor = () => {
    const { actions, navigation } = this.props;

    const pin = navigation.getParam("pin");
    if (pin.length !== 4) {
      actions.navigateTo("VerifyIdentity", {
        verificationType: VERIFY_IDENTITY_TYPES.PIN,
        verificationCallback: this.verificationCallback,
      })
    } else {
      actions.navigateTo("TwoFaAuthAppConfirmation", {
        pin,
      });
    }
  };

  changeAuthApp = async () => {
    const { actions, navigation } = this.props;

    const pin = navigation.getParam("pin");

    await actions.disableTwoFactor(pin);

    actions.navigateTo("TwoFaAuthAppConfirmation", {
      pin,
    });
  };

  render() {
    const { actions, user, navigation } = this.props;

    const pin = navigation.getParam("pin");

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
        mainHeader={{
          backButton: true,
          onPressBackButton: this.onPressBackButton,
          right: logoutButton(),
        }}
        animatedHeading={{ text: "Setting up 2FA Verification" }}
        background={STYLES.GRAY_1}
        bottomNavigation
      >

        <Text style={[globalStyles.normalText, TwoFaWelcomeStyle.title]}>Please choose the method of security:</Text>

        <View style={TwoFaWelcomeStyle.authenticator}>
          <CelCustomButton
            onPress={this.enableTwoFactor}
            disabled={!!user.two_factor_enabled}
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
            activated={!!user.two_factor_enabled}
            onChangeButton={this.changeAuthApp}
            onCancel={() => actions.openModal(MODALS.REMOVE_AUTHAPP)}
          />
        </View>

        <RemoveTwoFaModal twoFactorCode={pin} />

      </SimpleLayout>
    );
  }
}

export default TwoFaWelcome;
