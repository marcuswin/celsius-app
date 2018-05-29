import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { Camera } from 'expo';
import isBase64 from "is-base64";

import * as actions from "../../../redux/actions";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";
import CameraStyle from "./Camera.styles";
// import CameraStyles from "../../organisms/Camera/Camera.styles";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import CelButton from "../../atoms/CelButton/CelButton";
import CameraStyles from "../../organisms/Camera/Camera.styles";

@connect(
  state => ({
    cameraField: state.ui.camera.cameraField,
    cameraHeading: state.ui.camera.cameraHeading,
    cameraCopy: state.ui.camera.cameraCopy,
    cameraType: state.ui.camera.cameraType,
    photo: state.ui.camera.photo,
    mask: state.ui.camera.mask,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class CameraScreen extends Component {
  static propTypes = {
    cameraField: PropTypes.string,
    cameraHeading: PropTypes.string,
    cameraCopy: PropTypes.string,
    cameraType: PropTypes.oneOf(['front', 'back']),
    photo: PropTypes.string,
    mask: PropTypes.oneOf(['circle', 'document']),
  }

  static defaultProps = {
    cameraField: 'lastPhoto',
    cameraHeading: 'Take Photo',
  }

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  takePicture = async () => {
    const { takeCameraPhoto } = this.props;

    // TODO: fix quality? Entity too large error on device
    // const quality = cameraType === Camera.Constants.Type.back && qualityBack ? qualityBack : 1;

    this.camera.takePictureAsync({
      quality: 0.2,
      base64: true,
    }).then(photo => {
      takeCameraPhoto(photo.base64);
    }).catch(console.log);
  };

  savePhoto = () => {
    const { navigateBack, updateFormField, cameraField, photo } = this.props;
    updateFormField(cameraField, photo);
    navigateBack();
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
    const { cameraHeading, cameraType, flipCamera, cameraCopy } = this.props;

    const mask = this.renderMask();

    return (
      <BasicLayout>
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={{flex: 1}}
          type={Camera.Constants.Type[cameraType]}
        >
          { mask }

          <MainHeader
            backgroundColor="transparent"
            backButton
            right={(
              <TouchableOpacity
                // style={CameraStyles.flipCamera}
                onPress={flipCamera}>
                <Image
                  source={require('../../../../assets/images/icons/camera-flip.png')}
                  style={CameraStyles.flipCameraImage}/>
              </TouchableOpacity>
            )}
          />
          <Content style={CameraStyle.content}>
            <View style={CameraStyle.view}>
              <Text style={CameraStyle.heading}>{ cameraHeading }</Text>

              <View style={CameraStyle.bottomSection}>
                <Text style={[globalStyles.normalText, CameraStyle.cameraCopy]}>{ cameraCopy }</Text>
                <CelButton
                  onPress={this.takePicture}
                  white
                  margin="20 0 20 0"
                >
                  Take Photo
                </CelButton>
              </View>
            </View>
          </Content>

        </Camera>
      </BasicLayout>
    );
  }

  renderConfirmScreen() {
    const { cameraHeading, flipCamera, photo, retakePhoto } = this.props;

    let imageSource;
    // check if base64
    if (isBase64(photo)) imageSource = { uri: `data:image/png;base64,${photo}` };
    // check if url
    if (photo && photo.includes('https://')) imageSource = { uri: photo };
    // check if url
    if (!isNaN(photo)) imageSource = photo ;

    const mask = this.renderMask();

    return (
      <BasicLayout>
        <MainHeader
          backgroundColor="transparent"
          backButton
          right={(
            <TouchableOpacity
              // style={CameraStyles.flipCamera}
              onPress={flipCamera}>
              <Image
                source={require('../../../../assets/images/icons/camera-flip.png')}
                style={CameraStyles.flipCameraImage}/>
            </TouchableOpacity>
          )}
        />

        <Content style={CameraStyle.content}>

          <View style={CameraStyle.view}>
            <Text style={CameraStyle.heading}>{ cameraHeading }</Text>

            <View>
              <CelButton
                onPress={retakePhoto}
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
                Save Photo
              </CelButton>
            </View>
          </View>

        </Content>

        { mask }
        <Image source={imageSource} style={CameraStyle.cameraPhoto}/>
      </BasicLayout>
    );
  }

  render() {
    const { photo } = this.props;
    return !photo ? this.renderCameraScreen() : this.renderConfirmScreen();
  }

}

export default CameraScreen;
