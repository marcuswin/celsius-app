import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Text, View, Icon} from 'native-base';
import {Image, Modal, TouchableOpacity} from 'react-native';
import {Camera, Permissions} from 'expo';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import CameraStyles from './Camera.styles';
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from "../../../redux/actions";

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
    const { takeCameraPhoto, toggleCamera, photoName, qualityBack, camera } = this.props;

    const quality = camera === Camera.Constants.Type.back && qualityBack ? qualityBack : 1;

    this.camera.takePictureAsync({
      quality,
      base64: true,
    }).then(photo => {
      takeCameraPhoto(photoName, photo.base64);
      toggleCamera();
    }).catch(console.log);
  };


  render() {
    const {isCameraOpen, flipCamera, camera, photoName, toggleCamera} = this.props;

    return (
      <Modal visible={isCameraOpen} onRequestClose={() => null}>
        <View style={{flex: 1}}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{flex: 1}}
            faceDetectionLandmarks={Camera.Constants.FaceDetection.Landmarks.all}
            type={camera}>
            <View style={{ height: 70 }}>
              <Button title='Back' transparent onPress={toggleCamera} style={CameraStyles.backButton}>
                <Icon style={CameraStyles.backArrow} name='arrow-back'/>
                <Text style={CameraStyles.backButtonText}>Back</Text>
              </Button>

              <TouchableOpacity
                style={CameraStyles.flipCamera}
                onPress={flipCamera}>
                <Image
                  source={require('../../../../assets/images/icons/camera-flip.png')}
                  style={CameraStyles.flipCameraImage}/>
              </TouchableOpacity>
            </View>

            <View style={CameraStyles.headingWrapper}>
              <Text style={CameraStyles.heading}>{ photoName.split('_').join(' ') }</Text>
            </View>

            <View style={CameraStyles.takePictureButton}>
              <CelButton onPress={() => this.takePicture()} title={'Take a Photo'}/>
            </View>
          </Camera>
        </View>
      </Modal>
    );
  }
}

export default CameraModal;
