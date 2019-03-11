import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { View } from 'react-native'
import _ from 'lodash'

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import BorrowBankAccountStyle from "./BorrowBankAccount.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
import CelInput from '../../atoms/CelInput/CelInput'
import CelSelect from '../../molecules/CelSelect/CelSelect'
import { MODALS } from '../../../constants/UI'
import { BANK_ACCOUNT_TYPE } from '../../../constants/DATA'
import { showMessage } from '../../../redux/ui/uiActions'
import store from '../../../redux/store';

@connect(
  state => ({
    userProfile: state.user.profile,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    bankAccountInfo: state.user.bankAccountInfo
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowBankAccount extends Component {

  static navigationOptions = () => ({
    title: "Link bank account",
    right: "info",
    onInfo: () => store.dispatch(showMessage('warning', 'Not implemented yet!'))
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  linkBankAccount = async () => {
    const { actions, formData } = this.props
    const isAmerican = this.isAmerican()
    // const isFormValid = this.validateBankInfoAccountForm();
    const isFormValid = true

    if (isFormValid) {
      const bankAccountInfo = {
        bank_name: formData.bankName,
        bank_routing_number: formData.bankRoutingNumber,
        account_type: formData.selectedAccountType,
        bank_account_number: formData.bankAccountNumber,
        currency: formData.currencyType,
        swift: formData.swift,
        iban: formData.iban,
      }

      if (isAmerican) {
        delete bankAccountInfo.currency
        delete bankAccountInfo.swift
        delete bankAccountInfo.iban
      } else {
        delete bankAccountInfo.bank_account_number
      }

      this.setState({isLoading: true})
      await actions.linkBankAccount(bankAccountInfo)
      this.setState({isLoading: false})

      actions.navigateTo('VerifyProfile', {onSuccess: () => actions.openModal(MODALS.BORROW_CONFIRM)})
    }
  }

  isAmerican = () => {
    const { userProfile } = this.props
    return userProfile.country === 'United States'
  }

  validateBankInfoAccountForm = () => {
    const { formData, actions } = this.props
    const formErrors = {}

    if (!formData.bankName) formErrors.bankName = "Bank name is required!"
    if (!formData.bankRoutingNumber) formErrors.bankRoutingNumber = "Bank routing number is required!"
    if (!formData.selectedAccountType) formErrors.selectedAccountType = "Account type is required!"

    if (this.isAmerican()) {
      if (!formData.bankAccountNumber) formErrors.bankAccountNumber = "Bank account number is required!"
    } else {
      if (!formData.currencyType) formErrors.currencyType = "Currency is required!"
      if (!formData.swift) formErrors.swift = "SWIFT is required!"
      if (!formData.iban) formErrors.iban = "IBAN is required!"
    }

    if (!_.isEmpty(formErrors)) {
      actions.setFormErrors(formErrors);
    } else {
      return true;
    }
  };

  render() {
    const { isLoading } = this.state
    const { formData, formErrors } = this.props
    const isAmerican = this.isAmerican()
    const bankRoutingNumberPlaceholder = isAmerican ? 'ACH ABA Number' : 'ABA Number'

    return (
      <RegularLayout>
        <ProgressBar steps={6} currentStep={5}/>
        <CelText weight='300' type='H4' margin={'30 0 30 0'} style={{alignSelf: 'flex-start'}}>Provide us with your bank account details:</CelText>

        <CelInput placeholder='Bank name' field={'bankName'} value={formData.bankName} error={formErrors.bankName}/>
        <CelInput placeholder={bankRoutingNumberPlaceholder} field={'bankRoutingNumber'} value={formData.bankRoutingNumber} error={formErrors.bankRoutingNumber}/>

        <CelText weight='300' type='H4' style={{alignSelf: 'flex-start'}} margin={'0 0 10 0'}>Account type:</CelText>

        <CelSelect
          items={BANK_ACCOUNT_TYPE}
          field={'selectedAccountType'}
          labelText={'Account type'}
          value={formData.selectedAccountType}
          error={formErrors.selectedAccountType}
        />

        {!isAmerican && <CelInput placeholder='Currency' field={'currencyType'} value={formData.currencyType} error={formErrors.currencyType}/>}
        {!isAmerican && <CelInput placeholder='SWIFT' field={'swift'} value={formData.swift} error={formErrors.swift}/>}
        {!isAmerican && <CelInput placeholder='IBAN' field={'iban'} value={formData.iban} error={formErrors.iban}/>}

        {isAmerican && <CelInput placeholder='Your bank account number' field={'bankAccountNumber'} value={formData.bankAccountNumber} error={formErrors.bankAccountNumber}/>}

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <CelButton iconRight="IconArrowRight" onPress={this.linkBankAccount} loading={isLoading}>
            Confirm your loan
          </CelButton>
        </View>

      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowBankAccount);
