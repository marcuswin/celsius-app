import React, {Component} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, View, Text} from 'native-base';
import {bindActionCreators} from 'redux';
import * as _ from 'lodash';

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import {Message} from '../../components/Message/Message';
import Styles from "./styles";
import * as actions from "../../redux/actions";
import {STYLES} from "../../config/constants/style";
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import {KEYBOARD_TYPE, PURPOSE_OF_LOAN} from "../../config/constants/common";
import {PrimaryButton} from "../../components/Buttons/Button/Button";
import API from "../../config/constants/API";
import apiUtil from "../../utils/api-util";
import {Separator} from "../../components/Separator/Separator";
import SelectModal from "../../components/Modals/SelectModal/SelectModal";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    loanRequest: state.loanRequests.loanRequest,
    callsInProgress: state.api.callsInProgress,
    history: state.api.history,
    lastCompletedCall: state.api.lastCompletedCall,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class LoanDetailsScreen extends Component {
  static defaultProps = {
    loanRequest: {},
  };

  constructor(props) {
    super();

    this.state = {
      formData: {
        name: props.user.bank_name,
        routingNumber: props.user.bank_routing_number,
        accountNumber: props.user.bank_account_number,
        purposeOfLoan: props.loanRequest.loan_purpose,
        publicWalletAddress: props.loanRequest.public_wallet_address,
        socialSecurityNumber: props.loanRequest.ssn,
        sourceOfFunds: props.loanRequest.source_of_funds,
        note: props.loanRequest.note,
      },
      modalVisible: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    const {getLoanDetails} = this.props;
    getLoanDetails();
  }

  componentWillReceiveProps = (nextProps) => {
    const {user, navigateTo, lastCompletedCall} = this.props;

    if ((!_.isEqual(user, nextProps.user) && nextProps.user) || nextProps.loanRequest) {
      this.setState({
        formData: {
          name: nextProps.user.bank_name,
          routingNumber: nextProps.user.bank_routing_number,
          accountNumber: nextProps.user.bank_account_number,
          purposeOfLoan: nextProps.loanRequest.loan_purpose,
          publicWalletAddress: nextProps.loanRequest.public_wallet_address,
          socialSecurityNumber: nextProps.loanRequest.ssn,
          sourceOfFunds: nextProps.loanRequest.source_of_funds,
          note: nextProps.loanRequest.note,
        },
      });
    }

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.CREATE_LOAN_DETAILS) {
      navigateTo('DocumentInfo');
    }
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    const {showMessage, createLoanDetails, loanRequest} = this.props;
    const {formData} = this.state;

    const error = this.validateForm();

    if (!error) {
      createLoanDetails(loanRequest.id, formData);
    } else {
      showMessage('error', error);
    }
  };

  validateForm = () => {
    const { formData } = this.state;

    const {
      name,
      routingNumber,
      accountNumber,
      purposeOfLoan,
      socialSecurityNumber,
      sourceOfFunds,
      publicWalletAddress
    } = formData;

    if (!name) return 'Bank name is required!';
    if (!routingNumber) return 'Routing number is required!';
    if (!accountNumber) return 'Account number is required!';
    if (!purposeOfLoan) return 'Purpose of loan is required!';
    if (!socialSecurityNumber) return 'Social security number is required!';
    if (!sourceOfFunds) return 'Source of funds is required!';
    if (!publicWalletAddress) return 'Public Wallet address is required!';
  };

  updateField(field, text) {
    this.setState({
      formData: {
        ...this.state.formData,
        [field]: text,
      }
    })
  }

  updateBankField(field, text) {
    this.setState({
      bankInfo: {
        ...this.state.bankInfo,
        [field]: text,
      }
    })
  }

  updateLoanField(field, text) {
    this.setState({
      loanRequest: {
        ...this.state.loanRequest,
        [field]: text,
      }
    })
  }

  closeModal = (type, value) => {
    if (value) {
      this.updateField('purposeOfLoan', value.value)
    }

    this.setState({modalVisible: false})
  };

  render() {
    const {callsInProgress, cancelLoanRequest} = this.props;
    const {formData, modalVisible} = this.state;
    const {name, routingNumber, accountNumber, purposeOfLoan, note, sourceOfFunds, socialSecurityNumber, publicWalletAddress} = formData;

    const isLoading = apiUtil.areCallsInProgress([API.CREATE_LOAN_DETAILS], callsInProgress);

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader
          {...this.props}
          backButton
          customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}
          cancelBtn
          onCancel={() => cancelLoanRequest()}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Loan details'}/>

        <Message/>

        <Content
          bounces={false}
          style={Styles.content}
          onScroll={this.onScroll}>
          <View pointerEvents={isLoading ? 'none' : null} style={isLoading ? Styles.disabledForm : null}>

            <SelectModal
              visible={modalVisible}
              items={PURPOSE_OF_LOAN}
              modalTitle={'Purpose'}
              onClose={(value) => this.closeModal('modalVisible', value)}/>

            <Text style={Styles.description}>
              Here’s the information we need from you in order to place and review your loan request.
            </Text>

            <Form style={{paddingTop: 28}}>

              <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                <PrimaryInput
                  clickable
                  onPress={() => this.setState({modalVisible: true})}
                  labelText={'Purpose of Loan *'}
                  keyboardType={KEYBOARD_TYPE.DEFAULT}
                  value={purposeOfLoan}
                  onChange={(text) => this.updateField('purposeOfLoan', text)}/>
              </TouchableOpacity>

              <PrimaryInput
                labelText={'Source of funds *'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={sourceOfFunds}
                onChange={(text) => this.updateField('sourceOfFunds', text)}/>

              <PrimaryInput
                labelText={'Social security number *'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={socialSecurityNumber}
                onChange={(text) => this.updateField('socialSecurityNumber', text)}/>

              <PrimaryInput
                labelText={'Public wallet address *'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={publicWalletAddress}
                onChange={(text) => this.updateField('publicWalletAddress', text)}/>

              <Separator customWrapperStyle={{paddingTop: 37, paddingBottom: 16}}>Bank Details</Separator>

              <PrimaryInput
                labelText={'Bank Name *'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={name}
                onChange={(text) => this.updateField('name', text)}/>

              <PrimaryInput
                labelText={'Account number *'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={accountNumber}
                autoCapitalize={'words'}
                onChange={(text) => this.updateField('accountNumber', text)}/>

              <PrimaryInput
                labelText={'Routing number *'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={routingNumber}
                autoCapitalize={'words'}
                onChange={(text) => this.updateField('routingNumber', text)}/>

              <PrimaryInput
                labelText={'Optional note'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={note}
                multiline
                onChange={(text) => this.updateField('note', text)}/>

              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
                  onPress={this.onSubmit}
                  title={'Verify your profile'}/>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default LoanDetailsScreen;
