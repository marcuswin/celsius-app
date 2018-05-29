import React, {Component} from 'react';
import { Text } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import {STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
// import ProfileDetailsStyle from "./ProfileDetails.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import Separator from "../../atoms/Separator/Separator";
import CelDatepicker from "../../molecules/CelDatepicker/CelDatepicker";
import CelForm from "../../atoms/CelForm/CelForm";

@connect(
  state => ({
    formData: state.ui.formData,
    user: state.users.user,
    // kyc: state.kyc.kyc,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class ProfileDetails extends Component {
  componentDidMount() {
    this.initForm();
  }

  validateForm = () => {
    const { formData, showMessage } = this.props;

    if (!formData.firstName) showMessage('error', 'First Name is required!');
  }

  submitForm = () => {
    const { formData } = this.props;
    console.log(formData);
    this.validateForm();
  }

  initForm = () => {
    const { initForm, user } = this.props;
    initForm({
      firstName: user.first_name,
      lastName: user.last_name,
      country: {
        name: user.country
      }
    })
  }
  // rendering methods
  render() {
    const { formData } = this.props;
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Profile Details'}}
        background={STYLES.PRIMARY_BLUE}
        bottomNavigation={false}
      >
        <Text style={[globalStyles.normalText, { color: 'white' }]}>
          Please provide us with the information below to get started.
        </Text>

        <CelForm>
          <CelSelect field="title" type="title" labelText="Title" value={formData.title ? formData.title.label : undefined} />
          <CelInput value={formData.firstName} field="firstName" labelText="First Name"/>
          <CelInput value={formData.middleName} field="middleName" labelText="Middle Name"/>
          <CelInput value={formData.lastName} field="lastName" labelText="Last Name"/>

          <CelDatepicker
            labelText="Date of birth"
            field="dateOfBirth"
            format="Do MMM YYYY"
            value={formData.dateOfBirth}
          />

          <CelSelect field="citizenship" type="country" labelText="Citizenship" value={formData.citizenship ? formData.citizenship.name : undefined} />
          <CelSelect field="gender" type="gender" labelText="Gender" value={formData.gender ? formData.gender.label : undefined} />

          <Separator margin="40 0 15 0">ADDRESS INFO</Separator>

          <CelSelect field="country" type="country" labelText="Country" value={formData.country ? formData.country.name : undefined} />
          <CelInput value={formData.city} field="city" labelText="City"/>
          <CelInput value={formData.street} field="street" labelText="Street"/>
          <CelInput value={formData.zip} field="zip" labelText="ZIP Code"/>
        </CelForm>

        <CelButton
          white
          onPress={this.submitForm}
          iconRight="IconArrowRight"
          margin="35 0 60 0"
        >
          Verify your profile
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default ProfileDetails;
