import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import _ from 'lodash';

import * as appActions from "../../../redux/actions";
import { STYLES } from "../../../config/constants/style";
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
class AddressInformation extends Component {
  constructor(props) {
    super(props);
    this.initForm();
    props.actions.getProfileInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { actions, lastCompletedCall, activeScreen, formData } = this.props;

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.UPDATE_USER_ADDRESS_INFO) {
      if (formData.country === "United States") {
        actions.navigateTo('TaxpayerID');
      } else {
        actions.navigateTo('VerifyProfile');
      }
    }

    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'AddressInformation') {
      this.initForm();
      actions.getProfileInfo();
    }
  }

  validateForm = () => {
    const { formData, actions } = this.props;
    const formErrors = {};

    if (!formData.street) formErrors.street = 'Street is required!';
    if (!formData.buildingNumber) formErrors.building_number = 'Building number is required!';
    if (!formData.flatNumber) formErrors.flat_number = 'Flat number is required!';
    if (!formData.city) formErrors.city = 'City is required!';
    if (!formData.zip) formErrors.zip = 'Zip / Postal code is required!';
    if (!formData.country) formErrors.country = 'Country is required!';
    if (formData.country === "United States" && !formData.state) formErrors.state = 'State is required!';

    if (!_.isEmpty(formErrors)) {
      actions.setFormErrors(formErrors);
    } else {
      return true;
    }
  }

  submitForm = () => {
    const { formData, actions } = this.props;
    const isFormValid = this.validateForm();
    let updatedUser;
    if (isFormValid === true) {
      updatedUser = {
        street: formData.street,
        building_number: formData.buildingNumber,
        flat_number: formData.flatNumber,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
        state: formData.country === "United States" ? formData.state : ""
      }
      actions.updateProfileAddressInfo(updatedUser);
    }
  }

  initForm = () => {
    const { actions, user } = this.props;

    if (user) {
      actions.initForm({
        street: user.street,
        buildingNumber: user.building_number,
        flatNumber: user.flat_number,
        city: user.city,
        state: user.state,
        zip: user.zip,
        country: user.country ? user.country : user.citizenship
      })
    }
  }
  // rendering methods
  render() {
    const { formData, callsInProgress, formErrors } = this.props;

    const isUpdatingProfileInfo = apiUtil.areCallsInProgress([API.UPDATE_USER_ADDRESS_INFO], callsInProgress);
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Address Information' }}
        background={STYLES.PRIMARY_BLUE}
      >

        <CelForm margin="30 0 35 0" disabled={isUpdatingProfileInfo}>
          <CelInput value={formData.street} error={formErrors.street} field="street" labelText="Street" autoCapitalize="sentences" />
          <CelInput value={formData.buildingNumber} error={formErrors.building_number} field="buildingNumber" labelText="Building number" autoCapitalize="sentences" />
          <CelInput value={formData.flatNumber} error={formErrors.flat_number} field="flatNumber" labelText="Flat number" autoCapitalize="sentences" />
          <CelInput value={formData.city} error={formErrors.city} field="city" labelText="City" autoCapitalize="sentences" />
          <CelSelect error={formErrors.state} field="state" type="state" labelText="State" value={formData.state} hide={formData.country !== "United States"} />
          <CelInput value={formData.zip} error={formErrors.zip} field="zip" labelText="ZIP / Postal Code" autoCapitalize="sentences" />
          <CelSelect error={formErrors.country} field="country" type="country" labelText="Country" value={formData.country} />
        </CelForm>

        <CelButton
          white
          onPress={this.submitForm}
          loading={isUpdatingProfileInfo}
          disabled={isUpdatingProfileInfo}
          iconRight="IconArrowRight"
          margin="0 0 0 0"
        >
          Your Taxpayer ID
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default AddressInformation;
