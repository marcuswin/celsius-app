import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import MemoIdExplanationModalStyle from "./MemoIdExplanationModal.styles";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";

import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class MemoIdExplanationModal extends Component {

  render() {
    const { actions } = this.props;
    return (
      <CelModal name={MODALS.MEMO_ID_MODAL}>
        <View style={MemoIdExplanationModalStyle.wrapper}>
          <Text style={MemoIdExplanationModalStyle.title}>Stellar (XLM) Memo ID</Text>
          <Text style={MemoIdExplanationModalStyle.explanation}>Memo ID is used to determine what account a given transaction should be assigned and credited to.</Text>
          <Text style={MemoIdExplanationModalStyle.explanation}>Quoting the Memo ID with the Stellar wallet address ensures that your transaction is uniquely identified and processed successfully.</Text>
          <Text style={MemoIdExplanationModalStyle.explanation}>Exchanges require Memo ID, so please make sure to provide it, or you risk losing your money.</Text>
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

export default MemoIdExplanationModal;
