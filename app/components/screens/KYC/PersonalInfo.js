import React, {Component} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, View, Text} from 'native-base';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-native-datepicker'
import * as _ from 'lodash'
import moment from 'moment';

import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import {AnimatedHeading} from '../../molecules/AnimatedHeading/AnimatedHeading';
import {Message} from '../../atoms/Message/Message';
import Styles from "./Forms.styles";
import * as actions from "../../../redux/actions";
import API from "../../../config/constants/API";
import {STYLES} from "../../../config/constants/style";
import PrimaryInput from "../../atoms/Inputs/PrimaryInput";
import {GENDER, KEYBOARD_TYPE} from "../../../config/constants/common";
import SelectModal from "../../organisms/SelectModal/SelectModal";
import {PrimaryButton} from "../../atoms/Buttons/Button/Button";
import apiUtil from "../../../utils/api-util";
import SelectCountryModal from "../../organisms/SelectCountryModal/SelectCountryModal";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    lastCompletedCall: state.api.lastCompletedCall,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class PersonalInfoScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      personalInfo: {
        firstName: props.user.first_name || '',
        lastName: props.user.last_name || '',
        dateOfBirth: props.user.date_of_birth || '',
        gender: props.user.gender || '',
        cellphone: props.user.cellphone || '',
        email: props.user.email || '',
        citizenship: props.user.citizenship || '',
      },
      genderModalVisible: false,
      citizenshipModalVisible: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    const {getUserPersonalInfo} = this.props;
    getUserPersonalInfo();
  }

  componentWillReceiveProps = (nextProps) => {
    const {user, lastCompletedCall, navigateTo} = this.props;

    if (!_.isEqual(user, nextProps.user)) {
      this.setState({
        personalInfo: {
          firstName: nextProps.user.first_name || '',
          lastName: nextProps.user.last_name || '',
          dateOfBirth: nextProps.user.date_of_birth || '',
          gender: nextProps.user.gender || '',
          cellphone: nextProps.user.cellphone || '',
          email: nextProps.user.email || '',
          citizenship: nextProps.user.citizenship || '',
        },
      });
    }

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.CREATE_USER_PERSONAL_INFO) {
      navigateTo('AddressInfo');
    }

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.CANCEL_LOAN_REQUEST) {
      navigateTo('Home');
    }
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    const {createUserPersonalInfo, showMessage} = this.props;
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      cellphone,
      email,
      citizenship
    } = this.state.personalInfo;

    const error = this.validateForm();

    if (!error) {
      createUserPersonalInfo({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        cellphone,
        email,
        citizenship
      });
    } else {
      showMessage('error', error);
    }
  };

  validateForm = () => {
    const {
      firstName,
      lastName,
      dateOfBirth,
      cellphone,
      gender,
      email,
      citizenship
    } = this.state.personalInfo;

    if (!firstName) return 'First name is required!';
    if (!lastName) return 'Last name is required!';
    if (!dateOfBirth) return 'Date of Birth is required!';
    if (!cellphone) return 'Phone number is required!';
    if (!email) return 'Email is required!';
    if (!citizenship) return 'Citizenship is required!';
    if (!gender) return 'Gender is required!';
  };

  closeModal = (type, value) => {
    if (value) {
      if (type === 'genderModalVisible') {
        this.updateField('gender', value.label)
      } else {
        this.updateField('citizenship', value.name)
      }
    }

    const state = {};
    state[type] = false;
    this.setState(state)
  };

  updateField(field, text) {
    this.setState({
      personalInfo: {
        ...this.state.personalInfo,
        [field]: text,
      }
    })
  }

  render() {
    const {callsInProgress, cancelLoanRequest} = this.props;
    const {personalInfo, genderModalVisible, citizenshipModalVisible} = this.state;
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      cellphone,
      email,
      citizenship
    } = personalInfo;

    const isLoading = apiUtil.areCallsInProgress([API.CREATE_USER_PERSONAL_INFO], callsInProgress);

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
          text={'Loan Request'}/>

        <Message/>

        <Content
          bounces={false}
          style={Styles.content}
          onScroll={this.onScroll}>
          <View pointerEvents={isLoading ? 'none' : null} style={isLoading ? Styles.disabledForm : null}>
            <SelectModal
              visible={genderModalVisible}
              items={GENDER}
              modalTitle={'Gender'}
              onClose={(value) => this.closeModal('genderModalVisible', value)}/>

            <SelectCountryModal
              visible={citizenshipModalVisible}
              modalTitle={'Citizenship'}
              onClose={(value) => this.closeModal('citizenshipModalVisible', value)}/>

            <Text style={Styles.description}>
              Let’s finish your profile first. Please provide us with missing information or edit current ones.
            </Text>

            <Form style={{paddingTop: 28}}>
              <PrimaryInput
                labelText={'First Name *'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={firstName}
                autoCapitalize={'words'}
                onChange={(text) => this.updateField('firstName', text)}/>

              <PrimaryInput
                labelText={'Last Name *'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={lastName}
                autoCapitalize={'words'}
                onChange={(text) => this.updateField('lastName', text)}/>

              <PrimaryInput
                labelText={'Email *'}
                keyboardType={KEYBOARD_TYPE.EMAIL}
                value={email}
                onChange={(text) => this.updateField('email', text)}/>

              <PrimaryInput
                labelText={'Phone number *'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                placeholder={'+0000000000'}
                value={cellphone}
                onChange={(text) => this.updateField('cellphone', text)}/>

              <TouchableOpacity onPress={() => this.datePicker.onPressDate()}>
                <PrimaryInput
                  labelText={'Date of Birth *'}
                  clickable
                  onPress={() => this.datePicker.onPressDate()}
                  keyboardType={KEYBOARD_TYPE.DEFAULT}
                  value={moment(new Date(dateOfBirth)).format('DD/MM/YY')}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({genderModalVisible: true})}>
                <PrimaryInput
                  clickable
                  onPress={() => this.setState({genderModalVisible: true})}
                  labelText={'Gender *'}
                  keyboardType={KEYBOARD_TYPE.DEFAULT}
                  value={gender}
                  onChange={(text) => this.updateField('gender', text)}/>
              </TouchableOpacity>


              <TouchableOpacity onPress={() => this.setState({citizenshipModalVisible: true})}>
                <PrimaryInput
                  clickable
                  onPress={() => this.setState({citizenshipModalVisible: true})}
                  labelText={'Citizenship *'}
                  keyboardType={KEYBOARD_TYPE.DEFAULT}
                  value={citizenship}
                  onChange={(text) => this.updateField('citizenship', text)}/>
              </TouchableOpacity>


              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
                  onPress={this.onSubmit}
                  title={'Add address info'}
                />
              </View>
            </Form>

            <DatePicker
              ref={(datePicker) => {
                this.datePicker = datePicker;
              }}
              style={{opacity: 0, height: 0, width: 0, position: 'absolute', top: -111111}}
              customStyles={{alignItems: 'left', borderWidth: 0}}
              date={dateOfBirth}
              mode="date"
              placeholder={'Date of Birth'}
              showIcon={false}
              format="MM/DD/YYYY"
              confirmBtnText="Ok"
              cancelBtnText="Cancel"
              onDateChange={(date) => {
                this.updateField('dateOfBirth', new Date(date))
              }}
            />

          </View>
        </Content>
      </Container>
    );
  }
}

export default PersonalInfoScreen;
