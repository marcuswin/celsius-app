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
import testUtil from "../../../utils/test-util";
import { FORBIDEN_COUNTRIES } from "../../../config/constants/common";

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
    const { actions, lastCompletedCall, activeScreen } = this.props;

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.UPDATE_USER_ADDRESS_INFO) {
      actions.navigateTo('TaxpayerID');
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
    if (!formData.city) formErrors.city = 'City is required!';
    if (!formData.zip) formErrors.zip = 'Zip / Postal code is required!';
    if (!formData.country) formErrors.country = 'Country is required!';
    if (formData.country === "United States" && !formData.state) formErrors.state = 'State is required!';
    if (FORBIDEN_COUNTRIES.indexOf(formData.state) !== -1 ) formErrors.state = "We can't work with people from this region!";

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
        state: formData.state,
      }
      actions.updateProfileAddressInfo(updatedUser);
    }
  }

  initForm = () => {
    const { actions, user, formData } = this.props;

    if (user) {
      actions.initForm({
        ...formData,
        street: formData.street || user.street,
        buildingNumber: formData.buildingNumber || user.building_number,
        flatNumber: formData.flatNumber || user.flat_number,
        city: formData.city || user.city,
        state: formData.state || user.state,
        zip: formData.zip || user.zip,
        country: user.country ? (formData.country || user.country) : (formData.country || formData.citizenship || user.citizenship)
      })
    }
  }

  // rendering methods
  render() {
    const { formData, callsInProgress, formErrors } = this.props;

    const isUpdatingProfileInfo = apiUtil.areCallsInProgress([API.UPDATE_USER_ADDRESS_INFO], callsInProgress);
    return (
      <SimpleLayout
        ref={testUtil.generateTestHook(this, `AddressInformation.screen`)}
        animatedHeading={{ text: 'Address Information' }}
        background={STYLES.PRIMARY_BLUE}
      >

        <CelForm margin="30 0 35 0" disabled={isUpdatingProfileInfo}>
          <CelSelect ref={testUtil.generateTestHook(this, `AddressInformation.country`)} error={formErrors.country} field="country" type="country" labelText="Country" value={formData.country} />
          {formData.country === "United States" ?
            <CelSelect ref={testUtil.generateTestHook(this, `AddressInformation.state`)} error={formErrors.state} field="state" type="state" labelText="State" value={formData.state} />
            : null}
          <CelInput {...this.props} testSelector={'AddressInformation.city'} value={formData.city} error={formErrors.city} field="city" labelText="City" autoCapitalize="sentences" />
          <CelInput ref={testUtil.generateTestHook(this, `AddressInformation.zip`)} value={formData.zip} error={formErrors.zip} field="zip" labelText="ZIP / Postal Code" autoCapitalize="sentences" />
          <CelInput ref={testUtil.generateTestHook(this, `AddressInformation.street`)} value={formData.street} error={formErrors.street} field="street" labelText="Street" autoCapitalize="sentences" />
          <CelInput ref={testUtil.generateTestHook(this, `AddressInformation.buildingNumber`)} value={formData.buildingNumber} error={formErrors.building_number} field="buildingNumber" labelText="Building number" autoCapitalize="sentences" />
          <CelInput ref={testUtil.generateTestHook(this, `AddressInformation.flatNumber`)} value={formData.flatNumber} error={formErrors.flat_number} field="flatNumber" labelText="Flat number" autoCapitalize="sentences" />
        </CelForm>

        <CelButton
          ref={testUtil.generateTestHook(this, `AddressInformation.yourTaxpayerID`)}
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

export default testUtil.hookComponent(AddressInformation);
