import React, { Component } from 'react';
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
import UI from '../../../constants/UI'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

@connect(
  state => ({
    formData: state.forms.formData,
    bankAccountInfo: state.user.bankAccountInfo
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
        title: "Link bank account",
        left: "back",
        right: "info",
        onInfo: () => props.actions.showMessage('warning', 'Not implemented yet!'),
      },
      isLoading: true
    };
  }

  async componentDidMount() {
    const { actions } = this.props;

    this.setState({isLoading: true})
    await actions.getLinkedBankAccount();

    const { bankAccountInfo } = this.props;
    // Prepopulate from if there is linked account
    if (bankAccountInfo) {
      actions.updateFormField('bankName', bankAccountInfo.bank_name)
      actions.updateFormField('bankRoutingNumber', bankAccountInfo.bank_routing_number)
      actions.updateFormField('selectedAccountType', bankAccountInfo.account.type)
      actions.updateFormField('bankAccountNumber', bankAccountInfo.account.bank_account_number)
    }

    this.setState({isLoading: false})
  }

  nextStep = () => {
    const { actions } = this.props;
    actions.navigateTo('VerifyProfile', { onSuccess: () => actions.openModal(UI.MODALS.BORROW_CONFIRM)});
  }

  render() {
    const { header, isLoading} = this.state;
    const { formData } = this.props;
    // const style = BorrowBankAccountStyle();
    if (isLoading) return <LoadingScreen header={header} />

    return (
      <RegularLayout header={header}>
        <ProgressBar steps={6} currentStep={5}/>
        <CelText weight='300' type='H4' margin={'30 0 30 0'} style={{alignSelf: 'flex-start'}}>Provide us with your bank account details:</CelText>

        <CelInput placeholder='Bank name' field={'bankName'} value={formData.bankName}/>
        <CelInput placeholder='ACH ABA Number' field={'achNumber'} value={formData.bankRoutingNumber}/>

        <CelText weight='300' type='H4' style={{alignSelf: 'flex-start'}} margin={'0 0 10 0'}>Account type:</CelText>

        <CelSelect
          items={[{label: 'Checking', value: 'Checking'},{label: 'test2', value: 'test2'}]}
          field={'selectedAccountType'}
          labelText={'Account type'}
          value={formData.selectedAccountType}
        />
        <CelInput placeholder='Your bank account number' field={'bankAccountNumber'} value={formData.bankAccountNumber}/>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <CelButton iconRight="IconArrowRight" onPress={this.nextStep}>
            Confirm your loan
          </CelButton>
        </View>

      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowBankAccount);
