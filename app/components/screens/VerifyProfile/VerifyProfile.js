import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import _ from "lodash";
import { Col, Grid } from "react-native-easy-grid";
import testUtil from "../../../utils/test-util";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import { CAMERA_COPY } from "../../../config/constants/common";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import CameraInput from "../../atoms/CameraInput/CameraInput";
import CelPhoneInput from "../../molecules/CelPhoneInput/CelPhoneInput";
import CelForm from "../../atoms/CelForm/CelForm";
import Icon from "../../atoms/Icon/Icon";
import VerifyProfileStyle from "./VerifyProfile.styles";

import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

@connect(
  state => ({
    formData: state.ui.formData,
    formErrors: state.ui.formErrors,
    user: state.users.user,
    kycDocuments: state.users.kycDocuments,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
    kycDocTypes: state.generalData.kycDocTypes,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class VerifyProfile extends Component {
  // lifecycle methods

  componentWillMount() {
    const { actions } = this.props;
    actions.getKYCDocTypes();
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.getKYCDocuments();
    this.initForm();
  }

  componentDidUpdate(prevProps) {
    const { kycDocuments } = this.props;

    if (kycDocuments && !prevProps.kycDocuments) {
      this.initForm();
    }
  }

  // event hanlders
  validateForm = () => {
    const { formData, actions } = this.props;
    const formErrors = {};

    if (!formData.documentType) formErrors.document_type = 'Document Type is required!';
    if (!formData.front) formErrors.front = 'Front side photo is required!';
    if (!formData.back && formData.documentType !== 'passport') formErrors.back = 'Back side photo is required!';
    if (!formData.cellphone) formErrors.cellphone = 'Cell phone is required!';

    if (!_.isEmpty(formErrors)) {
      actions.setFormErrors(formErrors);
    } else {
      return true;
    }
  }

  submitForm = () => {
    const { actions } = this.props;
    const isFormValid = this.validateForm();

    if (isFormValid === true) {
      actions.verifyKYCDocs();
    }
  }

  initForm = () => {
    const { actions, user, kycDocuments, formData } = this.props;
    if (kycDocuments) {
      actions.initForm({
        ...formData,
        cellphone: user.cellphone,
        documentType: kycDocuments.type ? kycDocuments.type : 'passport',
        front: kycDocuments.front ? kycDocuments.front : undefined,
        back: kycDocuments.back ? kycDocuments.back : undefined,
      })
    } else {
      actions.initForm({
        ...formData,
        cellphone: user.cellphone,
        documentType: undefined,
        front: undefined,
        back: undefined,
      })
    }
  }

  selectDocumentType = async (type) => {
    const { actions } = this.props;

    actions.updateFormField("documentType", type);
  }
  // rendering methods
  render() {
    const { formData, formErrors, callsInProgress, user, kycDocTypes } = this.props;

    let isLoading = false;
    let docs;

    if (kycDocTypes) {
      isLoading = apiUtil.areCallsInProgress([API.UPDATE_USER_PERSONAL_INFO, API.START_KYC, API.CREATE_KYC_DOCUMENTS], callsInProgress);
      docs = mapDocs(kycDocTypes[user.citizenship]);
    }

    return (
      <SimpleLayout
        animatedHeading={{ text: 'Verify Profile' }}
        background={STYLES.PRIMARY_BLUE}
      >
        <Text style={[globalStyles.normalText, { color: 'white' }]}>
          Please take a photo of your ID or passport to confirm your identity.
        </Text>
        {formData.documentType ?
          <View>
            <CelForm margin="30 0 35 0" disabled={isLoading}>

              {docs && <Grid>
                {docs.map(document =>
                  <Col key={document.value} style={VerifyProfileStyle.centeredColumn}>
                    <TouchableOpacity ref={testUtil.generateTestHook(this, `VerifyProfile.${document.value}`)} onPress={() => this.selectDocumentType(document.value)}>
                      <View
                        style={formData.documentType === document.value ? VerifyProfileStyle.documentViewWrapperSelected : VerifyProfileStyle.documentViewWrapper}>
                        <Icon name={document.icon.name} width="38" height="29" viewBox={document.icon.viewBox} />
                        <View style={VerifyProfileStyle.documentTypeWrapper}>
                          <Text style={VerifyProfileStyle.documentTypeName}>{document.label}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Col>
                )}
              </Grid>
              }

              <Separator margin="15 0 15 0">TAKE PHOTOS</Separator>

              <CameraInput mask="document" labelTextActive="Front side of the document" labelTextInactive="Front side photo" value={formData.front} error={formErrors.front} field="front" cameraCopy={CAMERA_COPY.DOCUMENT} />
              {formData.documentType !== 'passport' ? (
                <CameraInput mask="document" labelTextActive="Back side of the document" labelTextInactive="Back side photo" value={formData.back} error={formErrors.back} field="back" cameraCopy={CAMERA_COPY.DOCUMENT} />
              ) : null}

              <Separator margin="20 0 15 0">PHONE</Separator>

              <CelPhoneInput labelText="Phone Number" error={formErrors.cellphone} field="cellphone" value={formData.cellphone} />
            </CelForm>

            <CelButton
              ref={testUtil.generateTestHook(this, 'VerifyProfile.verify')}
              onPress={this.submitForm}
              iconRight="IconArrowRight"
              loading={isLoading}
              disabled={isLoading}
              white
              margin="0 0 0 0"
            >
              {user.cellphone !== formData.cellphone || !user.cellphone_verified ? 'Verify phone number' : 'Start KYC'}
            </CelButton>
          </View> : null}
      </SimpleLayout>
    );
  }
}

function mapDocs(docs) {
  const kycDocs = [];

  if (!docs) return [{ value: 'passport', label: 'Passport', icon: { name: 'Passport', viewBox: '0 0 38 30' } }];
  if (docs.identity_card) kycDocs.push({ value: 'identity_card', label: 'National ID card', icon: { name: 'IDcard', viewBox: '0 0 38 30' } });
  if (docs.passport) kycDocs.push({ value: 'passport', label: 'Passport', icon: { name: 'Passport', viewBox: '0 0 38 30' } });
  if (docs.driving_licence) kycDocs.push({ value: 'driving_licence', label: "Driver's license", icon: { name: 'DrivingLicense', viewBox: '0 0 42 29' } });

  return kycDocs;
}

export default testUtil.hookComponent(VerifyProfile);
