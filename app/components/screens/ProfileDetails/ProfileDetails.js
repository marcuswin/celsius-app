import React, {Component} from 'react';
import { Text } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import {STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import CelDatepicker from "../../molecules/CelDatepicker/CelDatepicker";
import CelForm from "../../atoms/CelForm/CelForm";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

@connect(
  state => ({
    formData: state.ui.formData,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
    // kyc: state.kyc.kyc,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.initForm();
  }

  componentWillReceiveProps(nextProps) {
    const { navigateTo, lastCompletedCall } = this.props;

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.UPDATE_USER_PERSONAL_INFO) {
      navigateTo('VerifyProfile');
    }
  }

  validateForm = () => {
    const { formData, showMessage } = this.props;

    if (!formData.title) return showMessage('error', 'Title is required!');
    if (!formData.firstName) return showMessage('error', 'First Name Name is required!');
    if (!formData.lastName) return showMessage('error', 'Last Name is required!');
    if (!formData.dateOfBirth) return showMessage('error', 'Date of Birth is required!');
    if (!formData.citizenship) return showMessage('error', 'Citizenship is required!');
    if (!formData.gender) return showMessage('error', 'Gender is required!');

    return true;
  }

  submitForm = () => {
    const { formData, updateProfileInfo } = this.props;
    const isFormValid = this.validateForm();

    if (isFormValid === true) {
      const updatedUser = {
        title: formData.title.value,
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        citizenship: formData.citizenship.name,
        gender: formData.gender.value,
      }

      updateProfileInfo(updatedUser);
    }
  }

  initForm = () => {
    const { initForm, user } = this.props;

    if (user) {
      initForm({
        title: user.title,
        firstName: user.first_name,
        lastName: user.last_name,
        dateOfBirth: user.date_of_birth,
        citizenship: user.citizenship,
        gender: user.gender,
      })
    }
  }
  // rendering methods
  render() {
    const { formData } = this.props;

    const isUpdatingProfileInfo = apiUtil.areCallsInProgress([API.UPDATE_USER_PERSONAL_INFO], this.props.callsInProgress);

    return (
      <SimpleLayout
        animatedHeading={{ text: 'Profile Details'}}
        background={STYLES.PRIMARY_BLUE}
        bottomNavigation={false}
      >
        <Text style={[globalStyles.normalText, { color: 'white' }]}>
          Please provide us with the information below to get started.
        </Text>

        <CelForm margin="30 0 35 0" disabled={isUpdatingProfileInfo}>
          <CelSelect field="title" type="title" labelText="Title" value={formData.title} />
          <CelInput value={formData.firstName} field="firstName" labelText="First Name" autoCapitalize="sentences" />
          <CelInput value={formData.middleName} field="middleName" labelText="Middle Name (optional)" autoCapitalize="sentences" />
          <CelInput value={formData.lastName} field="lastName" labelText="Last Name" autoCapitalize="sentences" />

          <CelDatepicker labelText="Date of birth" field="dateOfBirth" format="Do MMM YYYY" value={formData.dateOfBirth} />

          <CelSelect field="citizenship" type="country" labelText="Citizenship" value={formData.citizenship} />
          <CelSelect field="gender" type="gender" labelText="Gender" value={formData.gender} />
        </CelForm>

        <CelButton
          white
          onPress={this.submitForm}
          loading={isUpdatingProfileInfo}
          disabled={isUpdatingProfileInfo}
          iconRight="IconArrowRight"
          margin="0 0 60 0"
        >
          Verify your profile
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default ProfileDetails;
