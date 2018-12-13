import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import moment from 'moment';
import _ from 'lodash';

import * as appActions from "../../../redux/actions";
import { STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import ProfileDetailsStyle from './ProfileDetails.styles';
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import CelForm from "../../atoms/CelForm/CelForm";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";
import testUtil from "../../../utils/test-util";

@connect(
  state => ({
    formData: state.ui.formData,
    formErrors: state.ui.formErrors,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.initForm();
    props.actions.getProfileInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { actions, lastCompletedCall, activeScreen } = this.props;

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.UPDATE_USER_PERSONAL_INFO) {
      actions.navigateTo('AddressInformation');
    }

    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'ProfileDetails') {
      this.initForm();
      actions.getProfileInfo();
    }
  }

  validateForm = () => {
    const { formData, actions } = this.props;
    const formErrors = {};
    const date = moment(`${formData.year}-${formData.month}-${formData.day}`, "YYYY-MM-DD");
    const dateHasValue = formData.month && formData.day && formData.year;
    const isValidDate = date.isValid();
    const isAdult = moment().diff(date, 'years', false) >= 18;

    if (!formData.title) formErrors.title = 'Title is required!';
    if (!formData.firstName) formErrors.first_name = 'First Name is required!';
    if (!formData.lastName) formErrors.last_name = 'Last Name is required!';
    if (!formData.month) formErrors.dateOfBirth = formErrors.month = 'Date of Birth is required!';
    if (!formData.day) formErrors.dateOfBirth = formErrors.day = 'Date of Birth is required!';
    if (!formData.year) formErrors.dateOfBirth = formErrors.year = 'Date of Birth is required!';
    if (dateHasValue && !isValidDate) formErrors.dateOfBirth = formErrors.month = formErrors.day = formErrors.year = 'Date of Birth not valid!';
    if (dateHasValue && isValidDate && !isAdult) formErrors.dateOfBirth = formErrors.month = formErrors.day = formErrors.year = 'You must be at least 18 years old to use Celsius application.';
    if (!formData.citizenship) formErrors.citizenship = 'Citizenship is required!';
    if (!formData.gender) formErrors.gender = 'Gender is required!';

    if (!_.isEmpty(formErrors)) {
      actions.setFormErrors(formErrors);
    } else {
      return true;
    }
  }

  submitForm = () => {
    const { formData, actions } = this.props;
    const isFormValid = this.validateForm();
    if (isFormValid === true) {
      const updatedUser = {
        title: formData.title,
        first_name: formData.firstName,
        last_name: formData.lastName,
        middle_name: formData.middleName,
        date_of_birth: `${formData.month}/${formData.day}/${formData.year}`,
        citizenship: formData.citizenship,
        gender: formData.gender,
        company_name: formData.companyName,
      }

      actions.updateProfileInfo(updatedUser);
    }
  }

  initForm = () => {
    const { actions, user, formData } = this.props;
    let date;
    if( formData.date_of_birth) {
      date = formData.date_of_birth.split('-');
    } else if(user.date_of_birth) {
      date =  user.date_of_birth.split('-');
    } else {
      date = ['', '', ''];
    }

    if (user) {
      actions.initForm({
        ...formData,
        title: formData.title || user.title,
        firstName: formData.first_name || user.first_name,
        middleName: formData.middle_name || user.middle_name,
        lastName: formData.last_name || user.last_name,
        dateOfBirth: formData.date_of_birth || user.date_of_birth,
        citizenship: formData.citizenship || user.citizenship,
        gender: formData.gender || user.gender,
        companyName: formData.company_name || user.company_name,
        month: date[1],
        day: date[2],
        year: date[0],
      })
    }
  }
  
  // rendering methods
  render() {
    const { formData, callsInProgress, formErrors } = this.props;
    const isUpdatingProfileInfo = apiUtil.areCallsInProgress([API.UPDATE_USER_PERSONAL_INFO], callsInProgress);
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Profile Details' }}
        background={STYLES.PRIMARY_BLUE}
        ref={testUtil.generateTestHook(this, 'ProfileDetails.screen')}
      >
        <Text style={[globalStyles.normalText, { color: 'white' }]}>
          Please provide us with the information below to get started.
        </Text>

        <CelForm margin="30 0 35 0" disabled={isUpdatingProfileInfo}>
          <CelSelect ref={testUtil.generateTestHook(this, `ProfileDetails.title`)} error={formErrors.title} field="title" type="title" labelText="Title" value={formData.title} />
          <CelInput value={formData.firstName} error={formErrors.first_name} field="firstName" labelText="First Name" autoCapitalize="sentences" />
          <CelInput value={formData.middleName} error={formErrors.middle_name} field="middleName" labelText="Middle Name (optional)" autoCapitalize="sentences" />
          <CelInput value={formData.lastName} error={formErrors.last_name} field="lastName" labelText="Last Name" autoCapitalize="sentences" />

          <Text style={[globalStyles.normalText, ProfileDetailsStyle.dateOfBirthText]}>
            Date of birth
          </Text>
          <View style={ProfileDetailsStyle.dateOfBirthContainer}>
            <View style={ProfileDetailsStyle.dateOfBirthInnerContainer}>
              <CelSelect onlyError error={formErrors.month} field="month" type="month" labelText="Month" value={formData.month} flex={1.4} margin={"0 15 2 0"} />
              <CelSelect onlyError error={formErrors.day} field="day" type="day" labelText="Day" value={formData.day} flex={1.1} margin={"0 15 2 0"} />
              <CelSelect onlyError error={formErrors.year} field="year" type="year" labelText="Year" value={formData.year} flex={1} margin={"0 0 2 0"} />
            </View>
            {formErrors.dateOfBirth ? <Text style={globalStyles.errorText}>* {formErrors.dateOfBirth}</Text> : null}
          </View>

          <CelInput value={formData.companyName} error={formErrors.company_name} field="companyName" labelText="Company Name (optional)" autoCapitalize="sentences" />
          <CelSelect ref={testUtil.generateTestHook(this, 'ProfileDetails.Citizenship is required!')} error={formErrors.citizenship} field="citizenship" type="country" labelText="Citizenship" value={formData.citizenship} />
          <CelSelect ref={testUtil.generateTestHook(this, 'ProfileDetails.Gender is required!')} error={formErrors.gender} field="gender" type="gender" labelText="Gender" value={formData.gender} />
        </CelForm>

        <CelButton
          ref={testUtil.generateTestHook(this, 'ProfileDetails.addYourAddress')}
          white
          onPress={this.submitForm}
          loading={isUpdatingProfileInfo}
          disabled={isUpdatingProfileInfo}
          iconRight="IconArrowRight"
          margin="0 0 0 0"
        >
          Add your Address
        </CelButton>
      </SimpleLayout>

    );
  }
}

export default testUtil.hookComponent(ProfileDetails);

