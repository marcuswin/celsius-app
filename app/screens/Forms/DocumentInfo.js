import React, {Component} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, Text, View} from 'native-base';
import {bindActionCreators} from 'redux';
import * as _ from 'lodash';
import {Col, Grid} from 'react-native-easy-grid';

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import {Message} from '../../components/Message/Message';
import Styles from "./styles";
import * as actions from "../../redux/actions";
import {STYLES} from "../../config/constants/style";
import {PrimaryButton} from "../../components/Buttons/Button/Button";
import {DOCUMENT_TYPE, KEYBOARD_TYPE} from "../../config/constants/common";
import SelectModal from "../../components/Modals/SelectModal/SelectModal";
import PrimaryInput from "../../components/Inputs/PrimaryInput/PrimaryInput";
import CameraModal from "../../components/Modals/Camera/Camera";
import Icon from "../../components/Icons/Icon";

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
      frontSide: '',
      backSide: '',
      selfie: '',
      modalVisible: false,
      isLoading: false,
      disabledButton: false,
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

  closeCameraModal = (data) => {
    this.setState({
      cameraModalVisible: false,
      image: data || this.state.image,
    });
  };

  renderBackSide = () => (
      <TouchableOpacity onPress={() => this.setState({cameraModalVisible: true})}>
        <View style={Styles.fakeInputWrapper}>
          <Grid style={{height: 50}}>
            <Col style={{justifyContent: 'center'}}>
              <Text style={Styles.fakeInputText}>Back side</Text>
            </Col>
            <Col style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <Icon name='CameraIcon' height='25' width='25' viewBox="0 0 32 32" fill={'#fff'}
                    style={{opacity: 0.5}}/>
            </Col>
          </Grid>
        </View>
      </TouchableOpacity>
    );

  renderPhotoItems = () => {
    const {documentType} = this.state;

    if (documentType) {
      return (
        <View>
          <TouchableOpacity onPress={() => this.setState({cameraModalVisible: true})}>
            <View style={Styles.fakeInputWrapper}>
              <Grid style={{height: 50}}>
                <Col style={{justifyContent: 'center'}}>
                  <Text style={Styles.fakeInputText}>Front side</Text>
                </Col>
                <Col style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Icon name='CameraIcon' height='25' width='25' viewBox="0 0 32 32" fill={'#fff'}
                        style={{opacity: 0.5}}/>
                </Col>
              </Grid>
            </View>
          </TouchableOpacity>

          {documentType.bothSides ? this.renderBackSide() : null}

          <TouchableOpacity onPress={() => this.setState({cameraModalVisible: true})}>
            <View style={Styles.fakeInputWrapper}>
              <Grid style={{height: 50}}>
                <Col style={{justifyContent: 'center'}}>
                  <Text style={Styles.fakeInputText}>Selfie</Text>
                </Col>
                <Col style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Icon name='CameraIcon' height='25' width='25' viewBox="0 0 32 32" fill={'#fff'}
                        style={{opacity: 0.5}}/>
                </Col>
              </Grid>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  };

  render() {
    const {
      documentType,
      modalVisible,
      isLoading,
      disabledButton,
      cameraModalVisible
    } = this.state;

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

        <CameraModal
          visible={cameraModalVisible}
          onClose={(value) => this.closeCameraModal(value)}
        />

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

              {this.renderPhotoItems()}

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
