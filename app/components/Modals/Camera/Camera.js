import React, {Component} from 'react';
import {Button, Text, View, Icon} from 'native-base';
import {Image, Modal, TouchableOpacity} from 'react-native';
import {Camera, Permissions} from 'expo';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import CameraStyles from './styles';
import {PrimaryButton} from "../../Buttons/Button/Button";
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

  };

  static defaultProps = {
    photoName: '',
  };

  constructor() {
    super();

    this.state = {
      hasCameraPermission: null,
    };
  }

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  takePicture = async () => {
    const { takeCameraPhoto, toggleCamera, photoName } = this.props;

    this.camera.takePictureAsync({
      base64: true,
    }).then(photo => {
      takeCameraPhoto(photoName, `data:image/png;base64,${photo.base64}`);
      toggleCamera();
    }).catch(console.log);
  };


  render() {
    const {isCameraOpen, flipCamera, camera, photoName, toggleCamera} = this.props;

    return (
      <Modal visible={isCameraOpen}>
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
              <PrimaryButton onPress={() => this.takePicture()} title={'Take a Photo'}/>
            </View>
          </Camera>
        </View>
      </Modal>
    );
  }
}

export default CameraModal;
