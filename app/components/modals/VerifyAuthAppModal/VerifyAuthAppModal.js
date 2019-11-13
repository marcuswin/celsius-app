import React from "react";
import { View } from "react-native";

import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModal from "../CelModalNew/CelModalNew";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import VerifyAuthAppModalStyle from "./VerifyAuthAppModal.styles";

const VerifyAuthAppModal = props => {
  const { onVerify } = props;
  const style = VerifyAuthAppModalStyle();
  return (
    <CelModal
      name={MODALS.VERIFY_AUTHAPP_MODAL}
      picture={require("../../../../assets/images/email-sent.png")}
      pictureDimensions={{ width: 40, height: 40 }}
    >
      <View style={style.wrapper}>
        <CelText type="H2" align="center" weight="bold">
          Check your Email!
        </CelText>
        <CelText
          type="H5"
          align="center"
          weight="extra-light"
          margin={"10 5 0 5"}
        >
          To complete your Two-Factor verification request follow the email
          instructions.
        </CelText>
        <CelModalButton onPress={onVerify}>Go To Wallet</CelModalButton>
      </View>
    </CelModal>
  );
};

export default VerifyAuthAppModal;
