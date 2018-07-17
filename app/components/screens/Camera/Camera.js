import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import { Content, Button } from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { Camera, Permissions } from 'expo';

import * as appActions from "../../../redux/actions";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";
import CameraStyle from "./Camera.styles";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import CelButton from "../../atoms/CelButton/CelButton";
import imageUtil from "../../../utils/image-util";

@connect(
  state => ({
    cameraField: state.ui.camera.cameraField,
    cameraHeading: state.ui.camera.cameraHeading,
    cameraCopy: state.ui.camera.cameraCopy,
    cameraType: state.ui.camera.cameraType,
    photo: state.ui.camera.photo,
    mask: state.ui.camera.mask,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CameraScreen extends Component {
  static propTypes = {
    cameraField: PropTypes.string,
    cameraHeading: PropTypes.string,
    cameraCopy: PropTypes.string,
    cameraType: PropTypes.oneOf(['front', 'back']),
    photo: PropTypes.string,
    mask: PropTypes.oneOf(['circle', 'document']),
    onSave: PropTypes.func,
  }

  static defaultProps = {
    cameraField: 'lastPhoto',
    cameraHeading: 'Take Photo',
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      hasCameraPermission: false,
      hasInitialPhoto: !!props.photo,
    };
  }


  async componentWillMount() {
    this.getCameraPermissions()
  }

  getCameraPermissions = async () => {
    let perm = await Permissions.getAsync(Permissions.CAMERA);

    if (perm.status !== 'granted') {
      perm = await Permissions.askAsync(Permissions.CAMERA);
    }

    this.setState({ hasCameraPermission: perm.status === 'granted' });
  }

  // lifecycle methods
  // event hanlders
  takeCameraPhoto = async () => {
    if (!this.camera) return;

    if (!this.state.hasCameraPermission) {
      return await this.getCameraPermissions;
    }

    const { actions, cameraType } = this.props;
    try {
      const quality = Camera.Constants.Type[cameraType] === Camera.Constants.Type.back ? 0.2 : 0.5;
      this.setState({ isLoading: true });

      const photo = await this.camera.takePictureAsync({
        quality,
        base64: true,
        skipProcessing: true,
      })

      const base64String = photo.base64.replace(/\s/g, "");

      actions.takeCameraPhoto(base64String);
      this.setState({ isLoading: false, hasInitialPhoto: false });
    } catch(err) {
      console.log(err);
      this.setState({ isLoading: false });
    }
  };

  savePhoto = () => {
    const { actions, cameraField, photo, navigation } = this.props;

    const onSave = navigation.getParam('onSave');

    if (onSave) {
      onSave(photo);
    } else {
      actions.updateFormField(cameraField, photo);
      actions.navigateBack();
    }
  }

  // rendering methods
  renderMask() {
    const { mask, photo } = this.props;

    const maskStyles = photo ? CameraStyle.maskImage : CameraStyle.maskImageTransparent;

    switch (mask) {
      case 'document':
        return <Image resizeMode="cover" source={require('../../../../assets/images/camera-mask-document.png')} style={maskStyles} />
      case 'circle':
        return <Image resizeMode="cover" source={require('../../../../assets/images/camera-mask-circle.png')} style={maskStyles} />
      default:
        return null
    }
  }
  renderCameraScreen() {
    const { cameraHeading, cameraType, actions, cameraCopy } = this.props;

    const mask = this.renderMask();

    return (
      <BasicLayout>
        <Camera
          ref={ref => { this.camera = ref; }}
          style={CameraStyle.camera}
          type={Camera.Constants.Type[cameraType]}
        >
          <View style={CameraStyle.androidWrapper}>
            <MainHeader
              backgroundColor="transparent"
              backButton
              right={(
                <TouchableOpacity
                  onPress={actions.flipCamera}>
                  <Image
                    source={require('../../../../assets/images/icons/camera-flip.png')}
                    style={CameraStyle.flipCameraImage}/>
                </TouchableOpacity>
              )}
            />
            <Content style={CameraStyle.content}>
              <View style={CameraStyle.view}>
                <Text style={CameraStyle.heading}>{ cameraHeading }</Text>

                <View style={CameraStyle.bottomSection}>
                  <Text style={[globalStyles.normalText, CameraStyle.cameraCopy]}>{ cameraCopy }</Text>
                  <CelButton
                    onPress={() => { this.takeCameraPhoto() }}
                    disabled={this.state.isLoading || !this.state.hasCameraPermission}
                    loading={this.state.isLoading}
                    white
                    margin="20 0 20 0"
                  >
                    Take Photo
                  </CelButton>
                </View>
              </View>
            </Content>

            { mask }
          </View>
        </Camera>
      </BasicLayout>
    );
  }

  renderConfirmScreen() {
    const { hasInitialPhoto } = this.state;
    const { cameraHeading, photo, actions } = this.props;

    const imageSource = imageUtil.getSource(photo);
    const mask = this.renderMask();

    return (
      <BasicLayout>
        <MainHeader
          backgroundColor="transparent"
          left={(
            <Button style={{width: 80}} title='Back' transparent onPress={hasInitialPhoto ? actions.navigateBack : actions.retakePhoto}>
              <Image
                source={require('../../../../assets/images/icons/Back.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}/>
              <Text style={CameraStyle.backBtn} uppercase={false}>Back</Text>
            </Button>
          )}
        />

        <Content style={CameraStyle.content}>

          <View style={CameraStyle.view}>
            <Text style={CameraStyle.heading}>{ cameraHeading }</Text>

            <View>
              <CelButton
                onPress={actions.retakePhoto}
                white
                inverse
              >
                Retake Photo
              </CelButton>
              <CelButton
                onPress={this.savePhoto}
                white
                margin="20 0 20 0"
              >
                Use Photo
              </CelButton>
            </View>
          </View>

        </Content>

        { Platform.OS === 'ios' ? mask : null }
        <Image source={imageSource} style={CameraStyle.cameraPhoto}/>
        { Platform.OS !== 'ios' ? mask : null }
      </BasicLayout>
    );
  }

  render() {
    const { photo } = this.props;
    return !photo ? this.renderCameraScreen() : this.renderConfirmScreen();
  }

}

export default CameraScreen;
