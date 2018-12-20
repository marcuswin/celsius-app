import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import GenerateApiKeyModalStyle from "./GenerateApiKeyModal.styles";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";
import CelButton from "../../atoms/CelButton/CelButton";
import ShareCopy from "../ShareCopy/ShareCopy";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
    apiKey: state.apiKeys.lastGeneratedKey
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class GenerateApiKeyModal extends Component {
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
    const { actions, apiKey } = this.props;

    return (
      <CelModal name={MODALS.GENERATE_API_KEY}>
        <View>
          <Text style={[globalStyles.largeHeading, { textAlign: "left" }]}>
            Your API key successfully generated
          </Text>
          <Text style={[GenerateApiKeyModalStyle.explanation, GenerateApiKeyModalStyle.textAlignment]}>Please note that the key won’t be fully readable after you close this modal. We suggest you copy the key, and store it somewhere safe.</Text>
          <View style={GenerateApiKeyModalStyle.shareCopyView}>
            <ShareCopy displayValue={apiKey} />
          </View>
          <CelButton
            onPress={() => { actions.closeModal(); actions.navigateTo('ApiAuthorization') }}
            margin={"30 0 0 0"}
          >
            Done
          </CelButton>
        </View>
      </CelModal>
    );
  }
}

export default GenerateApiKeyModal;
