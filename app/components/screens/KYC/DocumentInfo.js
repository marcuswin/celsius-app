import React, {Component} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, Text, View} from 'native-base';
import {bindActionCreators} from 'redux';
import * as _ from 'lodash';

import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import {AnimatedHeading} from '../../molecules/AnimatedHeading/AnimatedHeading';
import {Message} from '../../atoms/Message/Message';
import {Separator} from '../../atoms/Separator/Separator';
import Styles from "./Forms.styles";
import * as actions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";
import {PrimaryButton} from "../../atoms/Buttons/Button/Button";
import {DOCUMENT_TYPE, KEYBOARD_TYPE, CAMERA_PHOTOS} from "../../../config/constants/common";
import SelectModal from "../../organisms/SelectModal/SelectModal";
import PrimaryInput from "../../atoms/Inputs/PrimaryInput";
import CameraInput from "../../atoms/Inputs/CameraInput";
import CameraModal from "../../organisms/Camera/Camera";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

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
        front: props.user.front,
        back: props.user.back,
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
          documentType: this.state.documentInfo.documentType || nextProps.user.document_type,
          front: nextProps.user.front,
          back: nextProps.user.back,
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
    const { user } = this.props;
    const { documentInfo } = this.state;

    if (!documentInfo.documentType) return 'Document Type is Required';
    if (!user.frontUrl && !documentInfo.front) return 'Image of front side is Required';
    if (!user.backUrl && !documentInfo.back && documentInfo.documentType !== 'passport') return 'Image of back side is Required';
    if (!user.selfieUrl && !documentInfo.selfie) return 'Selfie image is Required';

    return false;
  }

  render() {
    const { callsInProgress, cancelLoanRequest, user } = this.props;
    const { documentInfo, modalVisible } = this.state;
    const { documentType } = documentInfo;

    const documentLabel = this.getDocumentLabel(documentType);
    const isLoading = apiUtil.areCallsInProgress([API.CREATE_USER_DOCUMENTS], callsInProgress);

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader
          {...this.props}
          backButton
          customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}
          cancelBtn
          onCancel={() => cancelLoanRequest()}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Verify profile'}/>

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
            <Text style={Styles.description}>As the last step, please take pictures of your preffered identification document and photo of yourself.</Text>

            <Form style={{paddingTop: 40}}>
              <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                <PrimaryInput
                  clickable
                  onPress={() => this.setState({modalVisible: true})}
                  labelText={'Document Type'}
                  keyboardType={KEYBOARD_TYPE.DEFAULT}
                  value={documentLabel}/>
              </TouchableOpacity>

              { documentType ? <Separator customWrapperStyle={{ paddingTop: 30, paddingBottom: 15 }}>TAKE PHOTOS</Separator> : null }
              { documentType ? (
                <CameraInput
                  labelTextActive={'Front side photo'}
                  labelTextInactive={'Front side of the document'}
                  value={documentInfo.front || user.frontUrl}
                  photoName={CAMERA_PHOTOS.DOCUMENT_FRONT}
                />
              ) : null }
              { documentType && documentType !== 'passport' ? (
                <CameraInput
                  labelTextActive={'Back side photo'}
                  labelTextInactive={'Back side of the document'}
                  value={documentInfo.back || user.backUrl}
                  photoName={CAMERA_PHOTOS.DOCUMENT_BACK}
                />
              ) : null }
              { documentType ? (
                <CameraInput
                  labelTextActive={'Take a Selfie'}
                  labelTextInactive={'Selfie'}
                  value={documentInfo.selfie || user.selfieUrl}
                  photoName={CAMERA_PHOTOS.SELFIE}
                />
              ) : null }

              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={() => this.onSubmit()}
                  title={'Finish application'}/>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default DocumentInfoScreen;
