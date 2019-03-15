import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Camera, Permissions, ImageManipulator, ImagePicker } from 'expo';

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CameraScreenStyle from "./CameraScreen.styles";
import Icon from '../../atoms/Icon/Icon';
import STYLES from '../../../constants/STYLES';
import API from '../../../constants/API';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';
import CelText from '../../atoms/CelText/CelText';

const { height, width } = Dimensions.get('window');

@connect(
  state => ({
    cameraType: state.camera.cameraType,
    cameraRollLastPhoto: state.camera.cameraRollPhotos[0],
    photo: state.camera.photo,
    cameraField: state.camera.cameraField,
    cameraHeading: state.camera.cameraHeading,
    cameraCopy: state.camera.cameraCopy,
    mask: state.camera.mask
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
    mask: 'circle'
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      header: params && params.header || null,
      transparent: true
    }
  };

  static defaultProps = {
    cameraField: 'lastPhoto',
    cameraHeading: 'Take Photo',
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      hasCameraPermission: false,
      hasCameraRollPermission: false,
      hasInitialPhoto: !!props.photo,
      header: null
    };
  }

  async componentWillMount() {
    const { actions } = this.props;
    actions.setFabType('hide');
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
    const { actions, mask } = this.props;
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [STYLES.imageSizes[mask].width, STYLES.imageSizes[mask].height],
    });
    if (result.cancelled) {
      return;
    }
    actions.takeCameraPhoto(result);
  };

  takePhoto = async () => {
    if (!this.camera) return;

    const { actions, mask } = this.props;
    try {
      this.setState({ isLoading: true });
      actions.startApiCall(API.TAKE_CAMERA_PHOTO)
      if (!this.state.hasCameraPermission) {
        return await this.getCameraPermissions();
      }
      const photo = await this.camera.takePictureAsync();


      const resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{
          resize: {
            width, height
          }
        },
        {
          crop: {
            originX: (width - STYLES.imageSizes[mask].width) / 2,
            originY: height / 2 - STYLES.imageSizes[mask].height / 2,
            width: STYLES.imageSizes[mask].width,
            height: STYLES.imageSizes[mask].height
          }
        }],
        { compress: 0.95, format: "jpg" }
      );

      actions.takeCameraPhoto(resizedPhoto);
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


  renderMask = () => {
    const { mask, cameraHeading, cameraCopy } = this.props;

    switch (mask) {
      case 'document':
        return (
          <View style={{ alignSelf: 'center', flex: 1, justifyContent: 'center', width: '100%' }}>
            <View style={{ backgroundColor: "rgba(241,239,238,0.6)", flex: 1 }} />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ backgroundColor: "rgba(241,239,238,0.6)", flex: 1 }} />
              <Image source={require('../../../../assets/images/mask/card-mask-transparent.png')} style={{ width: 300, height: 183, alignSelf: 'center' }} />
              <View style={{ backgroundColor: "rgba(241,239,238,0.6)", flex: 1 }} />
            </View>
            <View style={{ backgroundColor: "rgba(241,239,238,0.6)", flex: 1 }} />
          </View>
        )
      case 'circle':
        return (
          <View style={{ alignSelf: 'center', flex: 1, justifyContent: 'center', width: '100%' }}>
            <View style={{ backgroundColor: "rgba(241,239,238,0.6)", flex: 1 }}>
              <SafeAreaView style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>
                <CelText weight="700" type='H1' align='center' style={{ alignSelf: 'flex-end', flex: 1 }}>{cameraHeading}</CelText>
              </SafeAreaView>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ backgroundColor: "rgba(241,239,238,0.6)", flex: 1 }} />
              <Image source={require('../../../../assets/images/mask/circle-mask.png')} style={{ width: STYLES.imageSizes[mask].width, height: STYLES.imageSizes[mask].height, alignSelf: 'center' }} />
              <View style={{ backgroundColor: "rgba(241,239,238,0.6)", flex: 1 }} />
            </View>
            <View style={{ backgroundColor: "rgba(241,239,238,0.6)", flex: 1 }}>
              <View style={{ width: STYLES.imageSizes[mask].width, alignSelf: 'center', marginTop: 20 }}>
                <CelText weight='300' type='H4' align='center'>{cameraCopy}</CelText>
              </View>
            </View>
          </View>
        )
      default:
        return null
    }
  }

  renderCameraScreen() {
    const { cameraType, actions, cameraRollLastPhoto } = this.props;
    const style = CameraScreenStyle();
    const Mask = this.renderMask;

    return (
      <Camera
        ref={ref => { this.camera = ref; }}
        style={style.camera}
        type={Camera.Constants.Type[cameraType]}
      >
        <Mask />
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
      </Camera>
    );
  }

  renderConfirmScreen = () => {
    const { cameraHeading, photo, actions, mask } = this.props;
    // navigation.setParams({
    //   header: props => <CelHeading {...props} />,
    // })

    return (
      <RegularLayout fabType='hide'>
        <View style={{ alignSelf: 'center', flex: 1, justifyContent: 'center', width: '100%' }}>
          <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>
              <CelText weight="700" type='H1' align='center' style={{ alignSelf: 'flex-end', flex: 1 }}>{cameraHeading}</CelText>
            </SafeAreaView>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }} />
            <Image
              resizeMode="cover"
              source={photo}
              style={{
                width: STYLES.imageSizes[mask].width,
                height: STYLES.imageSizes[mask].height, borderWidth: 5,
                borderColor: STYLES.COLORS.WHITE,
                borderRadius: mask === 'circle' ? STYLES.imageSizes[mask].width / 2 : 0,
                backgroundColor: '#F1EFEE'
              }}
            />
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ width: STYLES.imageSizes[mask].width, alignSelf: 'center', marginTop: 20 }}>
              <CelButton
                ref={testUtil.generateTestHook(this, 'CameraScreen.retakePhoto')}
                onPress={actions.retakePhoto}
                white
                inverse
              >
                Retake Photo
  </CelButton>
              <CelButton
                ref={testUtil.generateTestHook(this, 'CameraScreen.usePhoto')}
                onPress={this.savePhoto}
                white
                margin="20 0 20 0"
              >
                Use Photo
  </CelButton>
            </View>
          </View>
        </View>
      </RegularLayout>
    )
  }

  render() {
    const { photo } = this.props;
    return !photo ? this.renderCameraScreen() : this.renderConfirmScreen();
  }

}

export default testUtil.hookComponent(CameraScreen);