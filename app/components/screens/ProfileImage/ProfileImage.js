import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Content} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {CAMERA_PHOTOS} from "../../../config/constants/common";
import * as actions from "../../../redux/actions";
import ProfileImageStyle from "./ProfileImage.styles";
import CelButton from '../../atoms/CelButton/CelButton';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import ImageHeading from "../../atoms/ImageHeading/ImageHeading";
import CameraModal from "../../organisms/Camera/Camera";
import API from "../../../config/constants/API";
import apiUtil from "../../../utils/api-util";

const images = [
  require('../../../../assets/images/bear-avatar.jpg'),
  require('../../../../assets/images/cat-avatar.jpg'),
  require('../../../../assets/images/deer-avatar.jpg'),
  require('../../../../assets/images/hippo-avatar.jpg'),
  require('../../../../assets/images/monkey-avatar.jpg'),
  require('../../../../assets/images/mouse-girl-avatar.jpg'),
  require('../../../../assets/images/monkey-girl-avatar.jpg'),
  require('../../../../assets/images/girl-dog-avatar.jpg'),
  require('../../../../assets/images/sheep-avatar.jpg'),
];

@connect(
  state => ({
    profilePicture: state.users.user.profile_picture,
    lastPhoto: state.ui.camera.lastPhoto,
    lastPhotoName: state.ui.camera.lastPhotoName,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class ProfileImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeImage: props.profilePicture,
    };
    // binders
    this.setActiveImage = this.setActiveImage.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.updateProfilePicture = this.updateProfilePicture.bind(this);
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { navigateTo, lastCompletedCall } = this.props;

    // set image after camera
    if (nextProps.lastPhotoName === CAMERA_PHOTOS.PROFILE_PICTURE) {
      console.log(nextProps);
      this.setState({ activeImage: nextProps.lastPhoto });
    }

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.UPLOAD_PLOFILE_IMAGE) {
      navigateTo('Profile');
    }
  }

  // event hanlders
  setActiveImage(image) {
    this.setState({ activeImage: image });
  }

  updateProfilePicture() {
    const { activeImage } = this.state;
    const { updateProfilePicture } = this.props;
    updateProfilePicture(activeImage);
  }

  // rendering methods
  renderImages(image) {
    const { activeImage } = this.state;
    const imageStyles = [ProfileImageStyle.image];
    if (image === activeImage) imageStyles.push(ProfileImageStyle.activeImage);

    return (
      <TouchableOpacity key={images.indexOf(image)} style={ProfileImageStyle.button} onPress={() => this.setActiveImage(image)}>
        <Image source={image} style={imageStyles} />
      </TouchableOpacity>
    )
  }

  render() {
    const { toggleCamera } = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.UPLOAD_PLOFILE_IMAGE], this.props.callsInProgress);
    return (
        <BasicLayout bottomNavigation>
          <MainHeader backButton />
          <ImageHeading image={this.state.activeImage}/>

          <Content>
            <CelButton
              onPress={() => toggleCamera(CAMERA_PHOTOS.PROFILE_PICTURE)}
              transparent
              color="blue"
              size="small"
              margin="15 0 15 0"
              inverse
            >
              Take photo
            </CelButton>

            <CameraModal cameraType="front" />

            <Text style={ProfileImageStyle.text}>Or choose from one of the below:</Text>

            <View style={ProfileImageStyle.viewWrapper}>
              { images.map(this.renderImages) }
            </View>

            <CelButton onPress={this.updateProfilePicture} margin="0 40 0 40" loading={isLoading}>Change avatar</CelButton>
          </Content>
        </BasicLayout>
    );
  }
}

export default ProfileImage;
