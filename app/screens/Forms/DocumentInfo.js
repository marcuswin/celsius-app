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
import apiUtil from "../../utils/api-util";
import API from "../../config/constants/API";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    lastCompletedCall: state.api.lastCompletedCall,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class DocumentInfoScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      documentInfo: {
        documentType: props.user.document_type,
        front: props.user.document_front,
        back: props.user.document_back,
        selfie: props.user.selfie,
      },
      modalVisible: false,
      isLoading: false,
      cameraModalVisible: false,
    };
  }

  componentDidMount() {
    this.props.getUserDocuments();
  }

  componentWillReceiveProps = (nextProps) => {
    const {user, lastCompletedCall, navigateTo} = this.props;

    if (!_.isEqual(user, nextProps.user)) {
      this.setState({
        documentInfo: {
          documentType: this.state.documentInfo.documentType,
          front: nextProps.user.document_front,
          back: nextProps.user.document_back,
          selfie: nextProps.user.selfie,
        },
      })
    }

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.CREATE_USER_DOCUMENTS) {
      navigateTo('ThankYou');
    }
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    const { showMessage, createUserDocuments } = this.props;

    const error = this.validateForm();
    if (!error) {
      createUserDocuments(this.state.documentInfo);
    } else {
      showMessage('error', error)
    }
  };

  getDocumentLabel(documentType) {
    const activeDocument = DOCUMENT_TYPE.filter(dt => dt.value === documentType);
    return activeDocument.length ? activeDocument[0].label : null;
  }

  closeModal = (data) => {
    const {documentInfo} = this.state;
    this.setState({
      modalVisible: false,
      documentInfo: {
        ...documentInfo,
        documentType: data ? data.value : documentInfo.documentType,
      }
    });
  };

  validateForm() {
    const { documentInfo } = this.state;

    if (!documentInfo.documentType) return 'Document Type is Required';
    if (!documentInfo.front) return 'Image of front side is Required';
    if (!documentInfo.back && documentInfo.documentType !== 'passport') return 'Image of back side is Required';
    if (!documentInfo.selfie) return 'Selfie image is Required';

    return false;
  }

  render() {
    const { callsInProgress } = this.props;
    const { documentInfo, modalVisible } = this.state;
    const { documentType } = documentInfo;

    const documentLabel = this.getDocumentLabel(documentType);
    const isLoading = apiUtil.areCallsInProgress([API.CREATE_USER_DOCUMENTS], callsInProgress);

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
                  value={documentLabel}/>
              </TouchableOpacity>

              { documentType ? (
                <CameraInput
                  labelText={'Front Side'}
                  value={documentInfo.front}
                  photoName={CAMERA_PHOTOS.DOCUMENT_FRONT}
                />
              ) : null }
              { documentType && documentType !== 'passport' ? (
                <CameraInput
                  labelText={'Back Side'}
                  value={documentInfo.back}
                  photoName={CAMERA_PHOTOS.DOCUMENT_BACK}
                />
              ) : null }
              { documentType ? (
                <CameraInput
                  labelText={'Selfie'}
                  value={documentInfo.selfie}
                  photoName={CAMERA_PHOTOS.SELFIE}
                />
              ) : null }

              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
                  disabled={isLoading}
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
