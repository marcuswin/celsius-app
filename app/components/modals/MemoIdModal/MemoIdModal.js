import React from "react";
import { ScrollView } from "react-native";

import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import CelModal from "../CelModal/CelModal";
import { heightPercentageToDP } from "../../../utils/styles-util";

const MemoIdModal = props => {
  const { closeModal, coin } = props;
  return (
    <CelModal name={MODALS.MEMO_ID_MODAL}>
      <ScrollView style={{ maxHeight: heightPercentageToDP("60%") }}>
        <CelText align="center" type="H2" margin="0 25 32 25" weight="bold">
          {coin === "EOS" ? `EOS (EOS) Memo ID` : `Stellar (XLM) Memo ID`}
        </CelText>
        <CelText align="center" type="H4" margin="0 25 24 25">
          Memo ID is used to determine what account a given transaction should
          be assigned and credited to.
        </CelText>
        <CelText align="center" type="H4" margin="0 25 24 25">
          {`Quoting the Memo ID with the ${
            coin === "EOS" ? "EOS" : "Stellar"
          } wallet address ensures that your
        transaction is uniquely identified and processed successfully.`}
        </CelText>
        <CelText align="center" type="H4" margin="0 25 24 25">
          Exchanges require Memo ID, so please make sure to provide it, or you
          risk losing your money.
        </CelText>

        <CelButton margin={"0 0 20 0"} onPress={closeModal}>
          Got it
        </CelButton>
      </ScrollView>
    </CelModal>
  );
};

export default MemoIdModal;
