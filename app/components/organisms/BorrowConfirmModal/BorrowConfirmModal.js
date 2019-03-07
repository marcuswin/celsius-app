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

let fakeFormData = {
  coin: 'ETH',
  amountCollateralUSD: 50,
  amountCollateralCrypto: 0.5,
  ltv: { percent: 0.33, interest: 0.0695 },
  loanAmount: '20',
  termOfLoan: 18,
  monthlyPayment: 75,
  bankInfo: { id: 'idofbank'},
};

const BorrowConfirmModal = ({
  formData,
  onConfirm
}) => {
  fakeFormData = {
    ...formData,
    ...fakeFormData,
  }
  return (
    <CelModal name={MODALS.BORROW_CONFIRM}>
      <View>
        <CelText type="H2" weight="bold" align="center" margin="0 0 6 0">Confirm your loan</CelText>
        <CelText type="H4" weight="300" align="center">By initiating loan you will lock your collateral and initiate a wire transfer of { formatter.usd(fakeFormData.loanAmount, { precission: 0 }) } to your bank account.</CelText>

        <Separator margin="22 0 22 0"/>
        <CelText align="center">You are about to borrow</CelText>
        <CelText align="center" type="H1" weight="600">{ formatter.usd(fakeFormData.loanAmount, { precission: 0 }) }</CelText>

        <Separator margin="30 0 16 0"/>
        <CelText type="H6" weight="300">Collateral</CelText>
        <CelText type="H6" weight="500">{ formatter.crypto(fakeFormData.amountCollateralCrypto, fakeFormData.coin) }</CelText>
        <CelText type="H6" weight="300">{ formatter.usd(fakeFormData.amountCollateralUSD) }</CelText>

        <Separator margin="16 0 16 0"/>
        <CelText type="H6" weight="300">Term of loan</CelText>
        <CelText type="H6" weight="500">{ fakeFormData.termOfLoan } months</CelText>

        <Separator margin="16 0 16 0"/>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ maxWidth: '45%', paddingHorizontal: 10 }}>
            <CelText type="H3" weight="600" align="center">{ formatter.percentage(fakeFormData.ltv.interest) }%</CelText>
            <CelText type="H6" weight="300" align="center">Annual interest rate</CelText>
          </View>

          <Separator vertical/>

          <View style={{ width: '45%', paddingHorizontal: 5 }}>
            <CelText type="H3" weight="600" align="center">{ formatter.usd(fakeFormData.monthlyPayment) }</CelText>
            <CelText type="H6" weight="300" align="center">Monthly interest payment</CelText>
          </View>
        </View>

        <Separator margin="16 0 22 0"/>
        <CelText type="H4" align="center">By applying for a loan you agree to our</CelText>
        <CelText type="H4" align="center">Terms of Service</CelText>

        <CelButton onPress={() => onConfirm(formData)} margin="22 0 0 0">Initiate loan</CelButton>
      </View>
    </CelModal>
  )
}

BorrowConfirmModal.propTypes = {
  formData: PropTypes.instanceOf(Object),
  onConfirm: PropTypes.func.isRequired,
}

export default testUtil.hookComponent(BorrowConfirmModal);
