import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'native-base';
import {Image, Modal, TouchableOpacity} from 'react-native';
import {Camera, Permissions} from 'expo';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import CameraStyles from './Camera.styles';
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from "../../../redux/actions";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";

@connect(
  state => ({
    isCameraOpen: state.ui.camera.isOpen,
    photoName: state.ui.camera.photoName,
    camera: state.ui.camera.camera,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class CameraModal extends Component {
  static propTypes = {
    cameraType: PropTypes.oneOf(['front', 'back']),
    qualityBack: PropTypes.number,
  };

  static defaultProps = {
    photoName: '',
    cameraType: 'back',
  };

  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      isLoading: false,
    };
  }

  async componentWillMount() {
    const { camera, cameraType, flipCamera } = this.props;
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});

    if (camera !== Camera.Constants.Type[cameraType]) {
      flipCamera()
    }
  }

  takePicture = async () => {
    const { takeCameraPhoto, toggleCamera, photoName, camera } = this.props;

    const quality = camera === Camera.Constants.Type.back ? 0.2 : 0.5;
    this.setState({ isLoading: true });

    this.camera.takePictureAsync({
      quality,
      base64: true,
      skipProcessing: true,
    }).then(photo => {
      this.setState({ isLoading: false });
      takeCameraPhoto(photoName, photo.base64);
      toggleCamera();
    }).catch(console.log);
  };


  render() {
    const {isCameraOpen, flipCamera, camera, photoName} = this.props;

    return (
      <Modal visible={isCameraOpen} onRequestClose={() => null}>
        <View style={{flex: 1}}>
          <Camera
            ref={ref => { this.camera = ref; }}
            style={CameraStyles.camera}
            faceDetectionLandmarks={Camera.Constants.FaceDetection.Landmarks.all}
            type={camera}>

            <View style={CameraStyles.androidWrapper}>
              <MainHeader
                backgroundColor="transparent"
                backButton
                right={(
                  <TouchableOpacity
                    onPress={flipCamera}>
                    <Image
                      source={require('../../../../assets/images/icons/camera-flip.png')}
                      style={CameraStyles.flipCameraImage}/>
                  </TouchableOpacity>
                )}
              />

              <View style={CameraStyles.headingWrapper}>
                <Text style={CameraStyles.heading}>{ photoName.split('_').join(' ') }</Text>
              </View>

              <View style={CameraStyles.takePictureButton}>
                <CelButton
                  disabled={this.state.isLoading}
                  loading={this.state.isLoading}
                  white
                  iconRight="IconArrowRight"
                  margin="0 0 30 0"
                  onPress={this.takePicture}>
                  Take Photo
                </CelButton>
              </View>
            </View>
          </Camera>
        </View>
      </Modal>
    );
  }
}

export default CameraModal;
