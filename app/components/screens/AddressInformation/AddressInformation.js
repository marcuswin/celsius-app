import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import _ from 'lodash';

import * as appActions from "../../../redux/actions";
import {STYLES } from "../../../config/constants/style";
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
      if(formData.country === "United States") {
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

    if (!formData.addressLine1) formErrors.address_line_1 = 'Address line 1 is required!';
    if (!formData.addressLine2) formErrors.address_line_2 = 'Address line 2 is required!';
    if (!formData.city) formErrors.city = 'City is required!';
    if (!formData.zip) formErrors.zip = 'Zip / Postal code is required!';
    if (!formData.country) formErrors.country = 'Country is required!';
    if(formData.country === "United States" && !formData.state) formErrors.state = 'State is required!';

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
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        zip: formData.zip,
        country: formData.country
      }
      if(formData.country === "United States") {
        updatedUser.state = formData.state
      }
      actions.updateProfileAddressInfo(updatedUser);
    }
  }

  initForm = () => {
    const { actions, user } = this.props;

    if (user) {
      actions.initForm({
        addressLine1: user.address_line_1,
        addressLine2: user.address_line_2,
        city: user.city,
        zip: user.zip,
        country: user.country ? user.country : user.citizenship
      })
    }
  }
  // rendering methods
  render() {
    const { formData, callsInProgress, formErrors } = this.props;

    const isUpdatingProfileInfo = apiUtil.areCallsInProgress([API.UPDATE_USER_ADDRESS_INFO], callsInProgress);
console.log(formData.country)
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Address Information'}}
        background={STYLES.PRIMARY_BLUE}
      >

        <CelForm margin="30 0 35 0" disabled={isUpdatingProfileInfo}>
          <CelInput value={formData.addressLine1} error={formErrors.address_line_1} field="addressLine1" labelText="Address line 1" autoCapitalize="sentences" />
          <CelInput value={formData.addressLine2} error={formErrors.address_line_2} field="addressLine2" labelText="Address line 2" autoCapitalize="sentences" />
          <CelInput value={formData.city} error={formErrors.city} field="city" labelText="City" autoCapitalize="sentences" />
          {formData.country === "United States" ? 
            <CelSelect error={formErrors.state} field="state" type="state" labelText="State" value={formData.state} />
          :null}
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
