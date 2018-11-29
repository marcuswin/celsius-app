import React, { Component } from "react";
import { Image, Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import NycBlackoutModalStyle from "./NycBlackoutModal.styles";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";
import CelButton from "../../atoms/CelButton/CelButton";

// TODO(ns): determine starting and ending date
const currentTimestamp = moment.utc(Date.now());
const NycBlackoutTimestamp = moment.utc("2018-12-02T04:40:00+0000");

@connect(
  state => ({
    user: state.users.user,
    formData: state.ui.formData,
    openedModal: state.ui.openedModal,
  }),
  dispatch => ({ dispatch, actions: bindActionCreators(appActions, dispatch) })
)
class NycBlackoutModal extends Component {
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

  click = () => {
    const { actions, user } = this.props;

    if (user.state === "New York" || currentTimestamp.isAfter(NycBlackoutTimestamp)) {
      Linking.openURL("mailto:app@celsius.network");
    } else {
      actions.navigateTo("Profile");
      actions.closeModal();
    }
  };


  render() {
    const { actions, user, openedModal } = this.props;

    let cancelDisabled = false;
    let heading;
    let additionalText;

    if (!user) {
      return null;
    }

    if (openedModal !== MODALS.NYC_BLACKOUT) {
      return null
    }

    if (currentTimestamp.isAfter(NycBlackoutTimestamp)) {
      heading = user.state === "New York" ? "We apologize for any inconvenience, but due to local laws and regulations, we are unable to work with New York state residents at this time." : "Looks like we’re missing some information from you.";
      additionalText = user.state === "New York" ? "Please contact app@celsius.network." : "Please contact app@celsius.network to gain access back to your account.";
      cancelDisabled = true;
      actions.updateUserAppSettings({ declineAccess: true });
    } else if (user.state === "New York") {
      heading = "We apologize for any inconvenience, but due to local laws and regulations, we are unable to work with New York state residents at this time.";
      additionalText = "Please withdraw your funds within seven days or contact app@celsius.network for support.";
      cancelDisabled = true;
      actions.updateUserAppSettings({ declineAccess: false });
    } else {
      heading = user.country === "United States" ? "Hey there! To comply with federal laws and regulations, please press continue to enter your residential address and Social Security Number." :
        "Hey! We're missing some important info from you!";
      additionalText = user.country !== "United States" ? "Please complete this within 7 days to avoid a freeze on your account." :
        "Please complete your profile.";
      actions.updateUserAppSettings({ declineAccess: false });
    }

    return (
      <CelModal name={MODALS.NYC_BLACKOUT}>Se
        <View style={NycBlackoutModalStyle.modalWrapper}>
          <Image style={NycBlackoutModalStyle.image}
                 source={require("../../../../assets/images/diane-with-laptop3x.png")}/>
          <Text style={[NycBlackoutModalStyle.heading]}>{heading}</Text>
          <Text style={NycBlackoutModalStyle.explanation}>{additionalText}</Text>
        </View>
        <CelButton
          onPress={() => this.click()}
        >
          Continue
        </CelButton>
        <CelButton
          onPress={() => actions.closeModal()}
          white
          disabled={cancelDisabled}
        >
          Cancel
        </CelButton>
      </CelModal>
    );
  }
}

export default NycBlackoutModal;
