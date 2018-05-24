import React, {Component} from 'react';
import { Text } from 'react-native';
import { Form } from 'native-base';
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

@connect(
  state => ({
    formData: state.ui.formData,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class ProfileDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    // binders
  }

  // lifecycle methods
  // event hanlders
  updateVal = (text) => {
    this.setState({ val: text });
  }
  // rendering methods
  render() {
    const { formData, submitForm } = this.props;
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Profile Details'}}
        background={STYLES.PRIMARY_BLUE}
        bottomNavigation={false}
      >
        <Text style={[globalStyles.normalText, { color: 'white' }]}>
          Please provide us with the information below to get started.
        </Text>

        <Form>
          <CelInput value={formData.firstName} field="firstName" labelText="First Name"/>
          <CelInput value={formData.lastName} field="lastName" labelText="Last Name"/>
          <CelSelect field="citizenship" type="country" labelText="Citizenship" value={formData.citizenship ? formData.citizenship.name : undefined} />
          <CelSelect field="gender" type="gender" labelText="Gender" value={formData.gender ? formData.gender.label : undefined} />

          <Separator margin="40 0 15 0">ADDRESS INFO</Separator>

          <CelSelect field="country" type="country" labelText="Country" value={formData.country ? formData.country.name : undefined} />
          <CelInput value={formData.city} field="city" labelText="City"/>
          <CelInput value={formData.street} field="street" labelText="Street"/>
          <CelInput value={formData.zip} field="zip" labelText="ZIP Code"/>
        </Form>

        <CelButton
          white
          onPress={() => submitForm('PROFILE_DETAILS')}
          iconRight="IconArrowRight"
        >
          Verify your profile
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default ProfileDetails;
