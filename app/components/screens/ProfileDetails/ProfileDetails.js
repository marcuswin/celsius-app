import React, {Component} from 'react';
// import {} from 'react-native';
import { Form } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";
// import ProfileDetailsStyle from "./ProfileDetails.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import CelSelect from "../../molecules/CelSelect/CelSelect";

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
        <Form>
          <CelSelect field="gender" type="gender" labelText="gender" value={formData.gender} />
          <CelInput value={formData.firstName} field="firstName" labelText="First Name"/>
          <CelInput value={formData.lastName} field="lastName" labelText="Last Name"/>
          <CelInput value={formData.city} field="city" labelText="City"/>
          <CelInput value={formData.street} field="street" labelText="Street"/>
          <CelInput value={formData.zip} field="zip" labelText="ZIP Code"/>
          <CelInput type="password" value={formData.password} field="password" labelText="Yo Yo Yo"/>
        </Form>

        <CelButton
          white
          onPress={() => submitForm('PROFILE_DETAILS', formData)}
        >
          Verify yout profile
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default ProfileDetails;
