import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Camera, Permissions, ImageManipulator, ImagePicker } from 'expo';

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CameraScreenStyle from "./CameraScreen.styles";
import Icon from '../../atoms/Icon/Icon';
import STYLES from '../../../constants/STYLES';

@connect(
  state => ({
    cameraType: state.camera.cameraType,
    cameraRollLastPhoto: state.camera.cameraRollPhotos[0]
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

  static navigationOptions = () => ({
    header: null,
    // transparent: true,
    // title:'test'
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      hasCameraPermission: false,
      hasCameraRollPermission: false,
      hasInitialPhoto: !!props.photo,
    };
  }

  async componentWillMount() {
    await this.getCameraPermissions();
    await this.getCameraRollPermissions();
  }

  getCameraPermissions = async () => {
    const { actions } = this.props;
    let perm = await Permissions.getAsync(Permissions.CAMERA);

    if (perm.status !== 'granted') {
      perm = await Permissions.askAsync(Permissions.CAMERA);
    }

    if (perm.status === 'granted') {
      this.setState({ hasCameraPermission: perm.status === 'granted' });
    } else {
      actions.showMessage('warning', 'It looks like you denied Celsius app access to your camera. Please enable it in your phone settings.')
      actions.navigateBack();
    }
  }

  getCameraRollPermissions = async () => {
    const { actions, cameraRollLastPhoto } = this.props;
    let perm = await Permissions.getAsync(Permissions.CAMERA_ROLL);

    if (perm.status !== 'granted') {
      perm = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    if (perm.status === 'granted') {
      if (!cameraRollLastPhoto) actions.getCameraRollPhotos();
      this.setState({ hasCameraPermission: perm.status === 'granted' });
    } else {
      actions.showMessage('warning', 'It looks like you denied Celsius app access to your camera roll. Please enable it in your phone settings.')
    }
  }

  pickImage = async () => {
    const { actions } = this.props;
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (result.cancelled) {
      return;
    }
    actions.takeCameraPhoto(result.base64.replace(/\n|\r/g, ""));
  };

  takePhoto = async () => {
    if (!this.camera) return;

    const { actions } = this.props;
    try {

      this.setState({ isLoading: true });
      if (!this.state.hasCameraPermission) {
        return await this.getCameraPermissions();
      }
      const photo = await this.camera.takePictureAsync();
      const resizedPhoto = await ImageManipulator.manipulate(
        photo.uri,
        [{ resize: { height: 3500 } }],
        { compress: 0.95, format: "jpg", base64: true }
      );

      const base64String = resizedPhoto.base64.replace(/\s/g, "");

      actions.takeCameraPhoto(base64String);
      this.setState({ isLoading: false, hasInitialPhoto: false });
    } catch (err) {
      // logger.log(err);
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

  render() {
    const { cameraType, actions, cameraRollLastPhoto } = this.props;
    const style = CameraScreenStyle();

    return (
      <Camera
        ref={ref => { this.camera = ref; }}
        style={style.camera}
        type={Camera.Constants.Type[cameraType]}
      >
        <SafeAreaView style={{ position: 'absolute', bottom: 0, backgroundColor: STYLES.COLORS.WHITE, width: '100%' }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={this.pickImage}>
              {cameraRollLastPhoto && (
                <Image source={{ uri: cameraRollLastPhoto.node.image.uri }} resizeMode="cover" style={{ width: 50, height: 50 }} />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1 }} ref={testUtil.generateTestHook(this, 'CameraScreen.takePhoto')} onPress={this.takePhoto}>
              <Icon name="Shutter" fill={STYLES.COLORS.DARK_GRAY_OPACITY} width="60" height="60" />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onPress={actions.flipCamera}>
              <Icon style={{ alignSelf: 'flex-end' }} name="Swap" width="35" fill={"#3D4853"} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Camera >
    );
  }
}

export default testUtil.hookComponent(CameraScreen);
