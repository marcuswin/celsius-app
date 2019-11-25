import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
import MemoIdModalStyle from "./MemoIdModal.styles";
import { MODALS } from "../../../constants/UI";

const MemoIdModal = props => {
  const style = MemoIdModalStyle(props.theme);
  const { closeModal, coin } = props;
  return (
    <InfoModal
      style={style.container}
      name={MODALS.MEMO_ID_MODAL}
      heading={coin === "EOS" ? `EOS (EOS) Memo ID` : `Stellar (XLM) Memo ID`}
      paragraphs={[
        " Memo ID is used to determine what account a given transaction should be  assigned and credited to.",
        `Quoting the Memo ID with the ${
          coin === "EOS" ? "EOS" : "Stellar"
        } wallet address ensures that your transaction is uniquely identified and processed successfully.`,
        "Exchanges require Memo ID, so please make sure to provide it, or you risk losing your money.",
      ]}
      yesCopy={"Got it"}
      onYes={closeModal}
    />
  );
};

export default MemoIdModal;
