import React, {Component} from 'react';
import { Text } from 'react-native';
import { Form } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
// import VerifyProfileStyle from "./VerifyProfile.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES} from "../../../config/constants/style";
import { CAMERA_COPY } from "../../../config/constants/common";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import CameraInput from "../../atoms/CameraInput/CameraInput";

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
    const { formData, submitForm } = this.props;
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Verify Profile'}}
        background={STYLES.PRIMARY_BLUE}
        bottomNavigation={false}
      >
        <Text style={[globalStyles.normalText, { color: 'white' }]}>
          Please take a photo of your ID or passport to confirm your identity.
        </Text>

        <Form>
          <CelSelect field="documentType" type="document" labelText="Document Type" value={formData.documentType ? formData.documentType.label : undefined }/>

          <Separator>TAKE PHOTOS</Separator>

          <CameraInput labelTextActive="Front side of the document" labelTextInactive="Front side photo" value={formData.front} field="front" cameraCopy={CAMERA_COPY.DOCUMENT} />
          <CameraInput labelTextActive="Back side of the document" labelTextInactive="Back side photo" value={formData.back} field="back" cameraCopy={CAMERA_COPY.DOCUMENT} />
          <CameraInput labelTextActive="Selfie" cameraType="front" labelTextInactive="Take a selfie" value={formData.selfie} field="selfie" cameraCopy={CAMERA_COPY.SELFIE} />
          <Separator>PHONE</Separator>
        </Form>

        <CelButton
          onPress={() => submitForm('VERIFY_PROFILE')}
          iconRight="IconArrowRight"
          white
        >
          Verify phone number
        </CelButton>


      </SimpleLayout>
    );
  }
}

export default VerifyProfile;
