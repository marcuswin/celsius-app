import React from 'react';
import PropTypes from "prop-types";
import { View } from 'react-native';

import testUtil from "../../../utils/test-util";

// import BorrowConfirmModalStyle from "./BorrowConfirmModal.styles";
import CelModal from "../CelModal/CelModal";
import UI from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import formatter from "../../../utils/formatter";

const { MODALS } = UI

const BorrowConfirmModal = ({
  formData,
  onConfirm
}) => (
  <CelModal name={MODALS.BORROW_CONFIRM}>
    <View>
      <CelText type="H2" weight="bold" align="center" margin="0 0 6 0">Confirm your loan</CelText>
      <CelText type="H4" weight="300" align="center">By initiating loan you will lock your collateral and initiate a wire transfer of $10,000 to your bank account.</CelText>

      <Separator margin="22 0 22 0"/>
      <CelText align="center">You are about to borrow</CelText>
      <CelText align="center" type="H1" weight="600">{ formatter.usd(formData.loanAmount) }</CelText>

      <Separator margin="30 0 16 0"/>
      <CelText type="H6" weight="300">Collateral</CelText>
      <CelText type="H6" weight="500">0.12345678 BTC</CelText>
      <CelText type="H6" weight="300">$ 22,000.00</CelText>

      <Separator margin="16 0 16 0"/>
      <CelText type="H6" weight="300">Term of loan</CelText>
      <CelText type="H6" weight="500">12 months</CelText>

      <Separator margin="16 0 16 0"/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ maxWidth: '45%', paddingHorizontal: 10 }}>
          <CelText type="H3" weight="600" align="center">9%</CelText>
          <CelText type="H6" weight="300" align="center">Annual interest rate</CelText>
        </View>

        <Separator vertical/>

        <View style={{ width: '45%', paddingHorizontal: 5 }}>
          <CelText type="H3" weight="600" align="center">$ 75</CelText>
          <CelText type="H6" weight="300" align="center">Monthly interest payment</CelText>
        </View>
      </View>

      <Separator margin="16 0 22 0"/>
      <CelText type="H4" align="center">By applying for a loan you agree to our</CelText>
      <CelText type="H4" align="center">Terms of Service</CelText>

      <CelButton onPress={onConfirm} margin="22 0 0 0">Initiate loan</CelButton>
    </View>
  </CelModal>
)

BorrowConfirmModal.propTypes = {
  formData: PropTypes.instanceOf(Object),
  onConfirm: PropTypes.func,
}

export default testUtil.hookComponent(BorrowConfirmModal);
