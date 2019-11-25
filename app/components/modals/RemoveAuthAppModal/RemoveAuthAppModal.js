import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
import RemoveAuthAppModalStyle from "./RemoveAuthAppModal.styles";
import { MODALS } from "../../../constants/UI";
import { closeModal } from "../../../redux/ui/uiActions";

const RemoveAuthAppModal = props => {
  const style = RemoveAuthAppModalStyle(props.theme);
  const { removeTwoFactor } = props;
  return (
    <InfoModal
      style={style.container}
      name={MODALS.REMOVE_AUTHAPP_MODAL}
      heading={"Remove Auth App"}
      paragraphs={[
        "If you remove authentication application you will lose a second step of verification. Are you sure you want to proceed?",
      ]}
      yesCopy={"Remove"}
      onYes={removeTwoFactor}
      noCopy={"Cancel"}
      onNo={closeModal}
      noButtonStyle={"red"}
      yesButtonPosition={"left"}
      noButtonPosition={"right"}
    />
  );
};

export default RemoveAuthAppModal;
