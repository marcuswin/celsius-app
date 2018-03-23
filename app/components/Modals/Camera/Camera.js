import React, {Component} from 'react';
import {Button, Text, View, Icon} from 'native-base';
import {Image, Modal, TouchableOpacity, Vibration} from 'react-native';
import {Camera, Permissions, FileSystem} from 'expo';

import CameraStyles from './styles';
import {PrimaryButton} from "../../Buttons/Button/Button";

class CameraModal extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor() {
    super();

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
  }

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  flipCamera = () => {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  };

  takePicture = async () => {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        FileSystem.moveAsync({
          from: data.uri,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1,
          });
          Vibration.vibrate();
        });
      });
    }
  };


  render() {
    const {visible, animation, onClose} = this.props;

    return (
      <Modal animationType={animation}
             visible={visible}
             onRequestClose={() => onClose(null)}
      >
        <View style={{flex: 1}}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{flex: 1}}
            faceDetectionLandmarks={Camera.Constants.FaceDetection.Landmarks.all}
            type={this.state.type}>
            <View style={{height: 70, backgroundColor: 'transparent'}}>
              <Button title='Back' transparent onPress={() => onClose(null)} style={{position: 'absolute', left: 40, bottom: 0}}>
                <Icon style={CameraStyles.backArrow} name='arrow-back'/>
                <Text style={CameraStyles.backButtonText}>Back</Text>
              </Button>
              <TouchableOpacity
                style={{position: 'absolute', right: 40, bottom: 0}}
                onPress={() => this.flipCamera()}>
                <Image
                  source={require('../../../../assets/images/icons/camera-flip.png')}
                  style={CameraStyles.flipCamera}/>
              </TouchableOpacity>
            </View>
            <View style={{height: 100, width: '100%', backgroundColor: 'transparent', position: 'absolute', bottom: 0, paddingLeft: 40, paddingRight: 40, justifyContent: 'center'}}>
              <PrimaryButton
                onPress={() => this.takePicture()} title={'Take a Photo'}/>
            </View>
          </Camera>
        </View>
      </Modal>
    );
  }
}

export default CameraModal;
