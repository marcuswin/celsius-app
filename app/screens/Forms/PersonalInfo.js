import React, {Component} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, View} from 'native-base';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-native-datepicker'
import * as _ from 'lodash'

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import {Message} from '../../components/Message/Message';
import Styles from "./styles";
import * as actions from "../../redux/actions";
import {STYLES} from "../../config/constants/style";
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import {GENDER, KEYBOARD_TYPE, PERSON_TITLE} from "../../config/constants/common";
import SelectModal from "../../components/Modals/SelectModal/SelectModal";
import {PrimaryButton} from "../../components/Buttons/Button/Button";

@connect(
  state => ({
    nav: state.nav,
    personalInfo: state.users.personalInfo
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class PersonalInfoScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      // TODO(fj): create an object for personalInfo. This is confusing...
      title: props.personalInfo.title,
      firstName: props.personalInfo.firstName,
      lastName: props.personalInfo.lastName,
      middleName: props.personalInfo.middleName,
      dateOfBirth: props.personalInfo.dateOfBirth,
      motherMaidenName: props.personalInfo.motherMaidenName,
      gender: props.personalInfo.gender,
      socialSecurityNumber: props.personalInfo.socialSecurityNumber,
      genderModalVisible: false,
      titleModalVisible: false,
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    const {personalInfo} = this.props;

    if (!_.isEqual(personalInfo, nextProps.personalInfo)) {
      this.setState({isLoading: false});
    }
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    const {createUserPersonalInfo, showMessage} = this.props;
    const {
      title,
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      motherMaidenName,
      gender,
      socialSecurityNumber,
    } = this.state;

    const error = this.validateForm();

    if (!error) {
      this.setState({isLoading: true});

      createUserPersonalInfo({
        title,
        firstName,
        lastName,
        middleName,
        dateOfBirth,
        motherMaidenName,
        gender,
        socialSecurityNumber
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
      socialSecurityNumber,
    } = this.state;

    if (!firstName) return 'First name is required!';
    if (!lastName) return 'Last name is required!';
    if (!dateOfBirth) return 'Date of Birth is required!';
    if (!socialSecurityNumber) return 'Social security number is required!';
  };

  closeModal = (type, value) => {
    if (value) {
      if (type === 'genderModalVisible') {
        this.setState({gender: value.label})
      } else {
        this.setState({title: value.label})
      }
    }

    const state = {};
    state[type] = false;
    this.setState(state)
  };

  render() {
    const {
      firstName,
      lastName,
      middleName,
      dateOfBirth,
      gender,
      title,
      motherMaidenName,
      socialSecurityNumber,
      genderModalVisible,
      titleModalVisible,
      isLoading,
    } = this.state;

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} backButton customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Personal Info'}/>

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

            <SelectModal
              visible={titleModalVisible}
              items={PERSON_TITLE}
              modalTitle={'Title'}
              onClose={(value) => this.closeModal('titleModalVisible', value)}/>

            <Form>
              <TouchableOpacity onPress={() => this.setState({titleModalVisible: true})}>
                <PrimaryInput
                  clickable
                  onPress={() => this.setState({titleModalVisible: true})}
                  labelText={'Title'}
                  keyboardType={KEYBOARD_TYPE.DEFAULT}
                  value={title}
                  onChange={(text) => this.setState({title: text})}/>
              </TouchableOpacity>

              <PrimaryInput
                labelText={'First Name *'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={firstName}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({firstName: text})}/>

              <PrimaryInput
                labelText={'Last Name *'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={lastName}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({lastName: text})}/>

              <PrimaryInput
                labelText={'Middle Name'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={middleName}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({middleName: text})}/>

              <TouchableOpacity onPress={() => this.datePicker.onPressDate()}>
                <PrimaryInput
                  labelText={'Date of Birth *'}
                  clickable
                  onPress={() => this.datePicker.onPressDate()}
                  keyboardType={KEYBOARD_TYPE.DEFAULT}
                  value={dateOfBirth}/>
              </TouchableOpacity>

              <PrimaryInput
                labelText={'Mother\'s Maiden Name'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={motherMaidenName}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({motherMaidenName: text})}/>

              <TouchableOpacity onPress={() => this.setState({genderModalVisible: true})}>
                <PrimaryInput
                  clickable
                  onPress={() => this.setState({genderModalVisible: true})}
                  labelText={'Gender'}
                  keyboardType={KEYBOARD_TYPE.DEFAULT}
                  value={gender}
                  onChange={(text) => this.setState({gender: text})}/>
              </TouchableOpacity>

              <PrimaryInput
                labelText={'Social Security Number *'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={socialSecurityNumber}
                onChange={(text) => this.setState({socialSecurityNumber: text})}/>

              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
                  onPress={this.onSubmit}
                  title={'Next'}/>
              </View>
            </Form>

            <DatePicker
              ref={(datePicker) => {
                this.datePicker = datePicker;
              }}
              style={{opacity: 0, height: 0, width: 0, position: 'absolute', top: -111111}}
              customStyles={{alignItems: 'left', borderWidth: 0}}
              date={this.state.dateOfBirth}
              mode="date"
              placeholder={'Date of Birth'}
              showIcon={false}
              format="MM/DD/YYYY"
              confirmBtnText="Ok"
              cancelBtnText="Cancel"
              onDateChange={(date) => {
                this.setState({dateOfBirth: date})
              }}
            />

          </View>
        </Content>
      </Container>
    );
  }
}

export default PersonalInfoScreen;
