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
        ssn: formData.ssn,
        itin: formData.itin,
        national_id: formData.nationalId
      }

      actions.updateProfileTaxpayerInfo(updatedUser);
    }
  }

  initForm = () => {
    const { actions, user, formData } = this.props;

    if (user) {
      actions.initForm({
        ssn: user.ssn,
        itin: user.itin,
        nationalId: user.national_id,
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
        animatedHeading={{ text: 'Taxpayer ID' }}
        background={STYLES.PRIMARY_BLUE}
      >

        <Text style={[globalStyles.normalText, { color: 'white' }]}>
          We require this information due to ani-money laundering (AML) regulations and background checks.
        </Text>
        <CelForm margin="30 0 35 0" disabled={isUpdatingProfileInfo}>
          {formData.country === "United States" ?
            <CelInput value={formData.ssn} error={formErrors.ssn} field="ssn" labelText="Social Security Number (SSN)" autoCapitalize="sentences" />
            :
            <React.Fragment>
              <CelInput value={formData.itin} error={formErrors.itin} field="itin" labelText="Taxpayer ID - ITIN (optional)" autoCapitalize="sentences" />
              <CelInput value={formData.nationalId} error={formErrors.national_id} field="nationalId" labelText="National ID Number (optional)" autoCapitalize="sentences" />
            </React.Fragment>
          }
        </CelForm>

        <CelButton
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

export default TaxpayerID;
