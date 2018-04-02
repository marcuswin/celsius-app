import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, View, Button, Text} from 'native-base';
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
    lastCompletedCall: state.api.lastCompletedCall,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class ContactInfoScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      contactInfo: {
        cellPhone: props.user.cellphone,
        otherPhones: props.user.other_phone_number,
        email: props.user.email,
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    const {getUserContactInfo} = this.props;
    getUserContactInfo();
  }

  componentWillReceiveProps = (nextProps) => {
    const {user, lastCompletedCall, navigateTo} = this.props;

    if (!_.isEqual(user, nextProps.user)) {
      this.setState({
        contactInfo: {
          cellPhone: nextProps.user.cellphone,
          otherPhones: nextProps.user.other_phone_number,
          email: nextProps.user.email,
        }
      });
    }

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.CREATE_USER_CONTACT_INFO) {
      navigateTo('BankAccountInfo');
    }
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    const {createUserContactInfo, showMessage} = this.props;
    const {
      cellPhone,
      otherPhones,
      email,
    } = this.state.contactInfo;

    const error = this.validateForm();

    if (!error) {
      createUserContactInfo({
        cellPhone,
        otherPhones,
        email,
      });
    } else {
      showMessage('error', error);
    }
  };

  validateForm = () => {
    const {
      cellPhone,
      email,
    } = this.state.contactInfo;

    if (!cellPhone) return 'Cell phone is required!';
    if (!email) return 'Email is required!';
  };

  updateField(field, text) {
    this.setState({
      contactInfo: {
        ...this.state.contactInfo,
        [field]: text,
      }
    })
  }

  render() {
    const { callsInProgress, cancelLoanRequest } = this.props;
    const { contactInfo } = this.state;

    const {
      cellPhone,
      otherPhones,
      email,
    } = contactInfo;

    const isLoading = apiUtil.areCallsInProgress([API.CREATE_USER_CONTACT_INFO], callsInProgress);

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} backButton customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Contact Info'}/>

        <Message/>

        <Content
          bounces={false}
          style={Styles.content}
          onScroll={this.onScroll}>
          <View pointerEvents={isLoading ? 'none' : null} style={isLoading ? Styles.disabledForm : null}>
            <Form>
              <PrimaryInput
                labelText={'Cell Phone *'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={cellPhone}
                onChange={(text) => this.updateField('cellPhone', text)}/>

              <PrimaryInput
                labelText={'Other phones'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={otherPhones}
                autoCapitalize={'words'}
                onChange={(text) => this.updateField('otherPhones', text)}/>

              <PrimaryInput
                labelText={'Email *'}
                keyboardType={KEYBOARD_TYPE.EMAIL}
                value={email}
                autoCapitalize={'words'}
                onChange={(text) => this.updateField('email', text)}/>

              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
                  onPress={this.onSubmit}
                  title={'Next'}/>
              </View>

              <View>
                <Button
                  block
                  style={{ marginBottom: 50 }}
                  transparent
                  onPress={ cancelLoanRequest }
                >
                  <Text style={{ color: '#EF461A' }}>Cancel Loan Request</Text>
                </Button>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ContactInfoScreen;
