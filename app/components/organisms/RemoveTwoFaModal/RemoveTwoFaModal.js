import React, {Component} from 'react';
import { View, Text } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";
import CelButton from "../../atoms/CelButton/CelButton";
import RemoveTwoFaModalStyle from "./RemoveTwoFaModal.styles";

@connect(
  () => ({
  // map state to props
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class RemoveTwoFaModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
      modalVisible: false,
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    return (
      <CelModal name={MODALS.REMOVE_AUTHAPP}>
        <View>
          <Text style={[RemoveTwoFaModalStyle.heading]}>Remove Auth App</Text>
          <Text style={[RemoveTwoFaModalStyle.text]}>If you remove authentication application you will lose a second step of verification. Are you sure you want to proceed?</Text>
          <View>
          <CelButton
            onPress={() => console.log("L")}
            margin={"20 0 20 0"}
          >
            Remove
          </CelButton>
            <CelButton
              onPress={() => this.props.actions.closeModal()}
              inverse
              transparent
            >
              Cancel
            </CelButton>
          </View>
        </View>
      </CelModal>
    );
  }
}

export default RemoveTwoFaModal;
