import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import DestinationTagExplanationModalStyle from "./DestinationTagExplanationModal.styles";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";

import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class DestinationTagExplanationModal extends Component {

  render() {
    const {actions} = this.props;
    return (
      <CelModal name={MODALS.DESTINATION_TAG_MODAL}>
        <View style={DestinationTagExplanationModalStyle.wrapper}>
          <Text style={DestinationTagExplanationModalStyle.title}>Destination Tag for XRP</Text>
          <Text style={DestinationTagExplanationModalStyle.explanation}>Ripple (XRP) transactions require destination tags as an additional infromation.</Text>
          <Text style={DestinationTagExplanationModalStyle.explanation}>The Destination Tag is used to determine what account a given transaction should be assigned and
            credited
            to.</Text>
          <Text style={DestinationTagExplanationModalStyle.explanation}>Quoting the tag along with the Ripple wallet address ensures that your transaction is uniquely
            identified
            and processed successfully.</Text>
          <CelButton
            onPress={() => actions.closeModal()}
          >
            Got it
          </CelButton>
        </View>
      </CelModal>
    );
  }
}

export default DestinationTagExplanationModal;
