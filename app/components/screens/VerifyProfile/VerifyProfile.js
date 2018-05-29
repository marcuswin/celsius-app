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

@connect(
  state => ({
    formData: state.ui.formData,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class VerifyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const { formData } = this.props;
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Verify Profile'}}
        background={STYLES.PRIMARY_BLUE}
        bottomNavigation={false}
      >
        <Text style={[globalStyles.normalText, { color: 'white' }]}>
          Please take a photo of your ID or passport to confirm your identity.
        </Text>

        <CelForm margin="30 0 35 0">
          <CelSelect field="documentType" type="document" labelText="Document Type" value={formData.documentType ? formData.documentType.label : undefined }/>

          <Separator margin="15 0 15 0">TAKE PHOTOS</Separator>

          <CameraInput mask="document" labelTextActive="Front side of the document" labelTextInactive="Front side photo" value={formData.front} field="front" cameraCopy={CAMERA_COPY.DOCUMENT} />
          { formData.documentType && formData.documentType.bothSides ? (
            <CameraInput mask="document" labelTextActive="Back side of the document" labelTextInactive="Back side photo" value={formData.back} field="back" cameraCopy={CAMERA_COPY.DOCUMENT} />
          ) : null }
          <CameraInput mask="circle" labelTextActive="Selfie" cameraType="front" labelTextInactive="Take a selfie" value={formData.selfie} field="selfie" cameraCopy={CAMERA_COPY.SELFIE} />

          <Separator margin="20 0 15 0">PHONE</Separator>

          <CelPhoneInput labelText="Phone Number" field="phone" />
        </CelForm>

        <CelButton
          onPress={() => console.log(this.props.formData)}
          iconRight="IconArrowRight"
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
