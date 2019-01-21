import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import _ from 'lodash';

import * as appActions from "../../../redux/actions";
import { STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import CelForm from "../../atoms/CelForm/CelForm";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";
import testUtil from "../../../utils/test-util";

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TaxpayerID extends Component {
  constructor(props) {
    super(props);
    this.initForm();
    props.actions.getProfileInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { actions, lastCompletedCall, activeScreen } = this.props;

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.UPDATE_USER_TAXPAYER_INFO) {
      actions.navigateTo('VerifyProfile');
    }

    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'TaxpayerID') {
      this.initForm();
      actions.getProfileInfo();
    }
  }

  validateForm = () => {
    const { formData, actions } = this.props;
    const formErrors = {};

    if (formData.country === "United States" && !formData.ssn) formErrors.ssn = 'ssn is required!';

    if (formData.country === "United States" && formData.ssn) {
      const regex = /^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$|^(?!(000|666|9))\d{3}(?!00)\d{2}(?!0000)\d{4}$/;
      if (!regex.exec(formData.ssn)) formErrors.ssn = 'ssn is not valid!';
    }

    if (!_.isEmpty(formErrors)) {
      actions.setFormErrors(formErrors);
    } else {
      return true;
    }
  }

  submitForm = () => {
    const { user, actions, formData } = this.props;
    const isFormValid = this.validateForm();

    if (isFormValid === true) {
      const updatedUser = {
        ssn: formData.ssn || user.ssn,
        itin: formData.itin || user.itin,
        national_id: formData.national_id || user.national_id
      }

      actions.updateProfileTaxpayerInfo(updatedUser);
    }
  }

  initForm = () => {
    const { actions, user, formData } = this.props;
    if (user) {
      actions.initForm({
        ...formData,
        ssn: formData.ssn || user.ssn,
        itin: formData.itin || user.itin,
        national_id: formData.national_id || user.national_id,
        country: formData.country || user.country,
      })
    }
  }
  // rendering methods
  render() {
    const { formData, callsInProgress, formErrors } = this.props;
    const isUpdatingProfileInfo = apiUtil.areCallsInProgress([API.UPDATE_USER_TAXPAYER_INFO], callsInProgress);

    return (
      <SimpleLayout
        ref={testUtil.generateTestHook(this, `TaxpayerID.screen`)}
        animatedHeading={{ text: 'Taxpayer ID' }}
        background={STYLES.PRIMARY_BLUE}
      >

        <Text style={[globalStyles.normalText, { color: 'white' }]}>
          We require this information due to anti-money laundering (AML) regulations and background checks.
        </Text>
        <CelForm margin="30 0 35 0" disabled={isUpdatingProfileInfo}>
          {formData.country === "United States" ?
            <CelInput  value={formData.ssn} error={formErrors.ssn} field="ssn" labelText="Social Security Number (SSN)" autoCapitalize="sentences" />
            :
            <React.Fragment>
              <CelInput value={formData.itin} error={formErrors.itin} field="itin" labelText="Taxpayer ID - ITIN (optional)" autoCapitalize="sentences" />
              <CelInput value={formData.national_id} error={formErrors.national_id} field="national_id" labelText="National ID Number" autoCapitalize="sentences" />
            </React.Fragment>
          }
        </CelForm>

        <CelButton
          ref={testUtil.generateTestHook(this, `TaxpayerID.verifyYourProfile`)}
          white
          onPress={this.submitForm}
          loading={isUpdatingProfileInfo}
          disabled={isUpdatingProfileInfo}
          iconRight="IconArrowRight"
          margin="0 0 0 0"
        >Verify your profile
            </CelButton>
      </SimpleLayout>
    );
  }
}

export default testUtil.hookComponent(TaxpayerID);
