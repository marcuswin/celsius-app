import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, View} from 'native-base';
import {bindActionCreators} from 'redux';
import * as _ from 'lodash';

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import {Message} from '../../components/Message/Message';
import Styles from "./styles";
import * as actions from "../../redux/actions";
import {STYLES} from "../../config/constants/style";
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import {KEYBOARD_TYPE} from "../../config/constants/common";
import {PrimaryButton} from "../../components/Buttons/Button/Button";
import API from "../../config/constants/API";
import apiUtil from "../../utils/api-util";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    loanRequest: state.loanRequests.loanRequest,
    callsInProgress: state.api.callsInProgress,
    history: state.api.history,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class BankAccountInfoScreen extends Component {
  static defaultProps = {
    loanRequest: {},
  }

  constructor(props) {
    super();

    this.state = {
      bankInfo: {
        name: props.user.bank_name,
        routingNumber: props.user.bank_routing_number,
        accountNumber: props.user.bank_account_number,
      },
      loanRequest: {
        purposeOfLoan: props.loanRequest.loan_purpose,
        note: props.loanRequest.note,
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    const {getUserBankInfo, loanRequest, getLoanRequest } = this.props;
    getUserBankInfo();
    if (!loanRequest.id) getLoanRequest();
  }

  componentWillReceiveProps = (nextProps) => {
    const {user, loanRequest, navigateTo } = this.props;

    if (!_.isEqual(user, nextProps.user)) {
      this.setState({
        bankInfo: {
          name: nextProps.user.bank_name,
          routingNumber: nextProps.user.bank_routing_number,
          accountNumber: nextProps.user.bank_account_number,
        },
      });
    }

    if (!_.isEqual(loanRequest, nextProps.loanRequest)) {
      this.setState({
        loanRequest: {
          purposeOfLoan: nextProps.loanRequest.loan_purpose,
          note: nextProps.loanRequest.note,
        },
      });
    }

    if (
      nextProps.activeScreen === 'BankAccountInfo' &&
      [`${API.CREATE_USER_BANK_INFO}_SUCCESS`, `${API.CREATE_LOAN_REQUEST_INFO}_SUCCESS`].indexOf(nextProps.history[0]) !== -1 &&
      [`${API.CREATE_USER_BANK_INFO}_SUCCESS`, `${API.CREATE_LOAN_REQUEST_INFO}_SUCCESS`].indexOf(nextProps.history[1]) !== -1
    ) {
      navigateTo('DocumentInfo');
    }
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    const {createUserBankInfo, showMessage, createLoanRequestInfo} = this.props;
    const {
      bankInfo,
      loanRequest,
    } = this.state;
    const {
      name,
      routingNumber,
      accountNumber,
    } = bankInfo;
    const {
      purposeOfLoan,
      note,
    } = loanRequest;

    const error = this.validateForm();

    if (!error) {
      createUserBankInfo({
        name,
        routingNumber,
        accountNumber,
      });

      createLoanRequestInfo(this.props.loanRequest.id, {
        purposeOfLoan,
        note,
      })
    } else {
      showMessage('error', error);
    }
  };

  validateForm = () => {
    const {
      bankInfo,
      loanRequest,
    } = this.state;
    const {
      name,
      routingNumber,
      accountNumber,
    } = bankInfo;
    const {
      purposeOfLoan,
    } = loanRequest;

    if (!name) return 'Bank name is required!';
    if (!routingNumber) return 'Routing number is required!';
    if (!accountNumber) return 'Account number is required!';
    if (!purposeOfLoan) return 'Purpose of loan is required!';
  };

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

  render() {
    const { callsInProgress } = this.props;
    const { bankInfo, loanRequest } = this.state;
    const { name, routingNumber, accountNumber } = bankInfo;
    const { purposeOfLoan, note } = loanRequest;

    const isLoading = apiUtil.areCallsInProgress([API.CREATE_USER_BANK_INFO, API.CREATE_LOAN_REQUEST_INFO], callsInProgress);

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} backButton customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Bank Info'}/>

        <Message/>

        <Content
          bounces={false}
          style={Styles.content}
          onScroll={this.onScroll}>
          <View pointerEvents={isLoading ? 'none' : null} style={isLoading ? Styles.disabledForm : null}>
            <Form>
              <PrimaryInput
                labelText={'Bank Name *'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={name}
                onChange={(text) => this.updateBankField('name', text)}/>

              <PrimaryInput
                labelText={'Routing number *'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={routingNumber}
                autoCapitalize={'words'}
                onChange={(text) => this.updateBankField('routingNumber', text)}/>

              <PrimaryInput
                labelText={'Account number *'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={accountNumber}
                autoCapitalize={'words'}
                onChange={(text) => this.updateBankField('accountNumber', text)}/>

              <PrimaryInput
                labelText={'Purpose of Loan *'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={purposeOfLoan}
                onChange={(text) => this.updateLoanField('purposeOfLoan', text)}/>

              <PrimaryInput
                labelText={'Note'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={note}
                multiline
                onChange={(text) => this.updateLoanField('note', text)}/>

              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
                  onPress={this.onSubmit}
                  title={'Next'}/>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default BankAccountInfoScreen;
