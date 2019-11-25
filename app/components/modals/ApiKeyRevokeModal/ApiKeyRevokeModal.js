import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
import ApiKeyRevokeModalStyle from "./ApiKeyRevokeModal.styles";
import { MODALS } from "../../../constants/UI";

const ApiKeyRevokeModal = props => {
  const style = ApiKeyRevokeModalStyle(props.theme);
  const { handleModal, closeModal } = props;
  return (
    <InfoModal
      style={style.container}
      name={MODALS.API_KEY_REVOKE_MODAL}
      heading={"Are you sure you want to revoke your API key?"}
      yesCopy={"Revoke"}
      onYes={handleModal}
      noCopy={"Cancel"}
      onNo={closeModal}
      noButtonStyle={"red"}
      yesButtonPosition={"left"}
      noButtonPosition={"right"}
    />
  );
};

export default ApiKeyRevokeModal;
