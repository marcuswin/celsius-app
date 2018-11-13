import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import _ from 'lodash';

import * as appActions from "../../../redux/actions";
import { STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import CelForm from "../../atoms/CelForm/CelForm";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

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

    if (!formData.title) formErrors.title = 'Title is required!';
    if (!formData.firstName) formErrors.first_name = 'First Name is required!';
    if (!formData.lastName) formErrors.last_name = 'Last Name is required!';
    if (!formData.dateOfBirth) {
      formErrors.day = 'Date of Birth is required!';
      formErrors.month = 'Date of Birth is required!';
      formErrors.year = 'Date of Birth is required!';
    }
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
    const { actions, user } = this.props;
    const date = user.date_of_birth.split('-');
    if (user) {
      actions.initForm({
        title: user.title,
        firstName: user.first_name,
        middleName: user.middle_name,
        lastName: user.last_name,
        dateOfBirth: user.date_of_birth,
        citizenship: user.citizenship,
        gender: user.gender,
        companyName: user.company_name,
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
      >
        <Text style={[globalStyles.normalText, { color: 'white' }]}>
          Please provide us with the information below to get started.
        </Text>

        <CelForm margin="30 0 35 0" disabled={isUpdatingProfileInfo}>
          <CelSelect error={formErrors.title} field="title" type="title" labelText="Title" value={formData.title} />
          <CelInput value={formData.firstName} error={formErrors.first_name} field="firstName" labelText="First Name" autoCapitalize="sentences" />
          <CelInput value={formData.middleName} error={formErrors.middle_name} field="middleName" labelText="Middle Name (optional)" autoCapitalize="sentences" />
          <CelInput value={formData.lastName} error={formErrors.last_name} field="lastName" labelText="Last Name" autoCapitalize="sentences" />

          <Text style={[globalStyles.normalText, { color: 'white', marginBottom: 10, marginTop: 5 }]}>
            Date of birth
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CelSelect error={formErrors.date_of_birth} field="month" type="month" labelText="Month" value={formData.month} flex margin={"0 15 15 0"} />
            <CelSelect error={formErrors.date_of_birth} field="day" type="day" labelText="Day" value={formData.day} flex margin={"0 15 15 0"} />
            <CelSelect error={formErrors.date_of_birth} field="year" type="year" labelText="Year" value={formData.year} flex margin={"0 0 15 0"} />
          </View>

          <CelSelect error={formErrors.citizenship} field="citizenship" type="country" labelText="Citizenship" value={formData.citizenship} />
          <CelSelect error={formErrors.gender} field="gender" type="gender" labelText="Gender" value={formData.gender} />
          <CelInput value={formData.companyName} error={formErrors.company_name} field="companyName" labelText="Company Name (optional)" autoCapitalize="sentences" />
        </CelForm>

        <CelButton
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

export default ProfileDetails;
