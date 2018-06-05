import React, {Component} from 'react';
import { Text } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES} from "../../../config/constants/style";
import { CAMERA_COPY } from "../../../config/constants/common";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import CameraInput from "../../atoms/CameraInput/CameraInput";
import CelPhoneInput from "../../molecules/CelPhoneInput/CelPhoneInput";
import CelForm from "../../atoms/CelForm/CelForm";

import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

@connect(
  state => ({
    formData: state.ui.formData,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class VerifyProfile extends Component {
  // lifecycle methods
  componentDidMount() {
    this.initForm();
  }

  // event hanlders
  validateForm = () => {
    const { formData, showMessage } = this.props;

    if (!formData.documentType) return showMessage('error', 'Document Type is required!');
    if (!formData.front) return showMessage('error', 'Front side photo is required!');
    if (!formData.back && formData.documentType !== 'passport') return showMessage('error', 'Back side photo is required!');
    if (!formData.cellphone) return showMessage('error', 'Cell phone is required!');

    return true;
  }

  submitForm = () => {
    const { formData, verifyProfile } = this.props;
    const isFormValid = this.validateForm();

    if (isFormValid === true) {
      verifyProfile({
        cellphone: formData.cellphone,
      })
    }
  }

  initForm = () => {
    const { initForm, user } = this.props;
    initForm({
      cellphone: user.cellphone,
    })
  }
  // rendering methods
  render() {
    const { formData, callsInProgress } = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.UPDATE_USER_PERSONAL_INFO], callsInProgress);

    return (
      <SimpleLayout
        animatedHeading={{ text: 'Verify Profile'}}
        background={STYLES.PRIMARY_BLUE}
        bottomNavigation={false}
      >
        <Text style={[globalStyles.normalText, { color: 'white' }]}>
          Please take a photo of your ID or passport to confirm your identity.
        </Text>

        <CelForm margin="30 0 35 0" disabled={isLoading}>
          <CelSelect field="documentType" type="document" labelText="Document Type" value={formData.documentType}/>

          <Separator margin="15 0 15 0">TAKE PHOTOS</Separator>

          <CameraInput mask="document" labelTextActive="Front side of the document" labelTextInactive="Front side photo" value={formData.front} field="front" cameraCopy={CAMERA_COPY.DOCUMENT} />
          { formData.documentType !== 'passport' ? (
            <CameraInput mask="document" labelTextActive="Back side of the document" labelTextInactive="Back side photo" value={formData.back} field="back" cameraCopy={CAMERA_COPY.DOCUMENT} />
          ) : null }

          <Separator margin="20 0 15 0">PHONE</Separator>

          <CelPhoneInput labelText="Phone Number" field="cellphone" value={formData.cellphone} />
        </CelForm>

        <CelButton
          onPress={this.submitForm}
          iconRight="IconArrowRight"
          loading={isLoading}
          disabled={isLoading}
          white
          margin="0 0 60 0"
        >
          Verify phone number
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default VerifyProfile;
