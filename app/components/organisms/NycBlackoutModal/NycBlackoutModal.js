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
// const currentTimestamp = moment.utc(Date.now());
// const NycBlackoutTimestamp = moment.utc(new Date('12-10-2018'));
// const days = (NycBlackoutTimestamp.diff(currentTimestamp) / 86400000) + 1;

@connect(
  state => ({
    user: state.users.user,
    formData: state.ui.formData,
    openedModal: state.ui.openedModal,
    appSettings: state.users.appSettings,
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
    const currentTimestamp = moment.utc(Date.now());
    let NycBlackoutTimestamp;
    let days;
    if (user && user.blocked_at) {
      NycBlackoutTimestamp = moment.utc(new Date(user.blocked_at));
      days = NycBlackoutTimestamp.diff(currentTimestamp, "days") + 1;
    }

    if (user.state === "New York" && days && days < 1) {
      Linking.openURL("mailto:app@celsius.network");
    } else if (user.state === "New York") {
      actions.closeModal();
    } else {
      actions.navigateTo("Profile");
      actions.closeModal();
    }
  };


  render() {
    const { actions, user, openedModal } = this.props;
    const currentTimestamp = moment.utc(Date.now());
    let NycBlackoutTimestamp;
    let days;
    if (user && user.blocked_at) {
      NycBlackoutTimestamp = moment.utc(new Date(user.blocked_at));
      days = NycBlackoutTimestamp.diff(currentTimestamp, "days") + 1;
    }

    let disabled = false;
    let heading;
    let additionalText;

    if (!user) {
      return null;
    }

    if (!openedModal || openedModal !== MODALS.NYC_BLACKOUT ) {
      return null
    }

    if ( user.state === "New York" && days && days < 1 ) {
      heading = "We apologize for any inconvenience, but due to local laws and regulations, we are unable to work with New York state residents at this time.";
      additionalText = "Please contact app@celsius.network.";
      disabled = true;
      actions.updateUserAppSettings({ declineAccess: true });
    } else if (user.state === "New York") {
      heading = "We apologize for any inconvenience, but due to local laws and regulations, we are unable to work with New York state residents at this time.";
      additionalText = `Please withdraw your funds within ${days} day(s) or contact app@celsius.network for support.`;
      actions.updateUserAppSettings({ declineAccess: true });
    } else if (user.citizenship === "United States" || user.country === "United States") {
      heading =  "Hey! We're missing some important info from you!";
      additionalText = "Please complete your profile.";
      actions.updateUserAppSettings({ declineAccess: true });
      disabled = true;
    } else {
      heading =  "Hey! We're missing some important info from you!";
      additionalText = "Please complete your profile.";
      actions.updateUserAppSettings({ declineAccess: false });
      disabled = true;
    }


    return (
      <CelModal
        name={MODALS.NYC_BLACKOUT}
        shouldRenderCloseButton={!disabled}
      >
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
      </CelModal>
    );
  }
}

export default NycBlackoutModal;
