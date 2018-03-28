import React, {Component} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, Text, View} from 'native-base';
import {bindActionCreators} from 'redux';
import * as _ from 'lodash';

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import {Message} from '../../components/Message/Message';
import Styles from "./styles";
import * as actions from "../../redux/actions";
import {STYLES} from "../../config/constants/style";
import {PrimaryButton} from "../../components/Buttons/Button/Button";
import {DOCUMENT_TYPE, KEYBOARD_TYPE, CAMERA_PHOTOS} from "../../config/constants/common";
import SelectModal from "../../components/Modals/SelectModal/SelectModal";
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import CameraInput from "../../components/Inputs/CameraInput";
import CameraModal from "../../components/Modals/Camera/Camera";

@connect(
  state => ({
    nav: state.nav,
    documentInfo: state.users.documentInfo
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class DocumentInfoScreen extends Component {
  constructor() {
    super();

    this.state = {
      documentType: '',
      modalVisible: false,
      isLoading: false,
      cameraModalVisible: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const {documentInfo} = this.props;

    if (!_.isEqual(documentInfo, nextProps.documentInfo)) {
      this.setState({isLoading: false, disabledButton: false});
    }
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    console.log('Document info on submit')
  };

  closeModal = (data) => {
    this.setState({
      modalVisible: false,
      documentType: data || this.state.documentType,
    });
  };

  render() {
    const {
      documentType,
      modalVisible,
      isLoading,
      disabledButton,
    } = this.state;
    const { documentInfo } = this.props;

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} backButton customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Document Info'}/>

        <Message/>

        <SelectModal
          visible={modalVisible}
          items={DOCUMENT_TYPE}
          modalTitle={'Document Type'}
          onClose={(value) => this.closeModal(value)}/>

        <CameraModal />

        <Content
          bounces={false}
          style={Styles.content}
          onScroll={this.onScroll}>
          <View pointerEvents={isLoading ? 'none' : null} style={isLoading ? Styles.disabledForm : null}>
            <Text style={Styles.description}>
              Please choose your preferred document type for profile verification. Take a picture of both front and back
              side of the document, as well as photo of yourself.
            </Text>

            <Form style={{paddingTop: 40}}>
              <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                <PrimaryInput
                  clickable
                  onPress={() => this.setState({modalVisible: true})}
                  labelText={'Document Type'}
                  keyboardType={KEYBOARD_TYPE.DEFAULT}
                  value={documentType.label || null}/>
              </TouchableOpacity>

              { documentType && documentType.value === 'driving_licence' ? (
                <CameraInput
                  labelText={'Front Side'}
                  value={documentInfo.drivingLicenseFront}
                  photoName={CAMERA_PHOTOS.DRIVING_LICENSE_FRONT}
                />
              ) : null }
              { documentType && documentType.value === 'driving_licence' ? (
                <CameraInput
                  labelText={'Back Side'}
                  value={documentInfo.drivingLicenseBack}
                  photoName={CAMERA_PHOTOS.DRIVING_LICENSE_BACK}
                />
              ) : null }
              { documentType && documentType.value === 'driving_licence' ? (
                <CameraInput
                  labelText={'Selfie'}
                  value={documentInfo.selfie}
                  photoName={CAMERA_PHOTOS.SELFIE}
                />
              ) : null }

              { documentType && documentType.value === 'national_identity_card' ? (
                <CameraInput
                  labelText={'Front Side'}
                  value={documentInfo.idFront}
                  photoName={CAMERA_PHOTOS.ID_FRONT}
                />
              ) : null }
              { documentType && documentType.value === 'national_identity_card' ? (
                <CameraInput
                  labelText={'Back Side'}
                  value={documentInfo.idBack}
                  photoName={CAMERA_PHOTOS.ID_BACK}
                />
              ) : null }
              { documentType && documentType.value === 'national_identity_card' ? (
                <CameraInput
                  labelText={'Selfie'}
                  value={documentInfo.selfie}
                  photoName={CAMERA_PHOTOS.SELFIE}
                />
              ) : null }

              { documentType && documentType.value === 'passport' ? (
                <CameraInput
                  labelText={'Passport'}
                  value={documentInfo.passport}
                  photoName={CAMERA_PHOTOS.PASSPORT}
                />
              ) : null }
              { documentType && documentType.value === 'passport' ? (
                <CameraInput
                  labelText={'Selfie'}
                  value={documentInfo.selfie}
                  photoName={CAMERA_PHOTOS.SELFIE}
                />
              ) : null }

              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
                  disabled={disabledButton}
                  onPress={() => this.onSubmit()}
                  title={'Next'}/>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default DocumentInfoScreen;
