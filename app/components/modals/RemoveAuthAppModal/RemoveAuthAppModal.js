import React, { Component } from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
import RemoveAuthAppModalStyle from "./RemoveAuthAppModal.styles";
import { MODALS } from "../../../constants/UI";

class RemoveAuthAppModal extends Component {
  removeTwoFactor = async () => {
    const { actions } = this.props;
    await actions.closeModal();

    actions.navigateTo("VerifyProfile", {
      onSuccess: actions.disableTwoFactor,
    });
  };

  render() {
    const { actions } = this.props;
    const style = RemoveAuthAppModalStyle();
    return (
      <InfoModal
        style={style.container}
        name={MODALS.REMOVE_AUTHAPP_MODAL}
        heading={"Remove Auth App"}
        paragraphs={[
          "If you remove authentication application you will lose a second step of verification. Are you sure you want to proceed?",
        ]}
        yesCopy={"Remove"}
        onYes={this.removeTwoFactor}
        noCopy={"Cancel"}
        onNo={actions.closeModal}
        noButtonStyle={"red"}
        yesButtonPosition={"left"}
        noButtonPosition={"right"}
      />
    );
  }
}

export default RemoveAuthAppModal;
