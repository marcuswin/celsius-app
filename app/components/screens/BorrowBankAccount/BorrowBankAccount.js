import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { View } from 'react-native'

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import BorrowBankAccountStyle from "./BorrowBankAccount.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
import CelInput from '../../atoms/CelInput/CelInput'
import CelSelect from '../../molecules/CelSelect/CelSelect'

@connect(
  state => ({
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowBankAccount extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "BorrowBankAccount Screen",
        left: "back",
        right: "profile"
      }
    };
  }

  render() {
    const { header } = this.state;
    const { formData } = this.props;
    // const style = BorrowBankAccountStyle();

    return (
      <RegularLayout header={header}>
        <ProgressBar steps={6} currentStep={5}/>
        <CelText weight='300' type='H4' margin={'30 0 30 0'} style={{alignSelf: 'flex-start'}}>Provide us with your bank account details:</CelText>

        <CelInput placeholder='Bank name' field={'bankName'} value={formData.bankName}/>
        <CelInput placeholder='ACH ABA Number' field={'achNumber'} value={formData.achNumber}/>

        <CelText weight='300' type='H4' style={{alignSelf: 'flex-start'}} margin={'0 0 10 0'}>Account type:</CelText>

        <CelSelect
          items={[{label: 'test', value: '14'},{label: 'test2', value: '214'}]}
          field={'selectedAccountType'}
          labelText={'Account type'}
          value={formData.selectedAccountType}
        />
        <CelInput placeholder='Your bank account number' field={'bankAccountNumber'} value={formData.bankAccountNumber}/>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <CelButton onPress={() => ({})} iconRight="IconArrowRight">
            Confirm your loan
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowBankAccount);
