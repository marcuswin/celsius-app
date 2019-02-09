import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Constants} from 'expo';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import ProfileImageStyle from "./ProfileImage.styles";
import CelButton from '../../atoms/CelButton/CelButton';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import ImageHeading from "../../atoms/ImageHeading/ImageHeading";
import API from "../../../constants/API";
import apiUtil from "../../../utils/api-util";
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";

const {API_URL} = Constants.manifest.extra;

const images = [
  { url: `${API_URL.replace('/api/v1', '')}/profile-images/avatar/avatar-bear.jpg` },
  { url: `${API_URL.replace('/api/v1', '')}/profile-images/avatar/avatar-cat.jpg` },
  { url: `${API_URL.replace('/api/v1', '')}/profile-images/avatar/avatar-deer.jpg` },
  { url: `${API_URL.replace('/api/v1', '')}/profile-images/avatar/avatar-hippo.jpg` },
  { url: `${API_URL.replace('/api/v1', '')}/profile-images/avatar/avatar-monkey.jpg` },
  { url: `${API_URL.replace('/api/v1', '')}/profile-images/avatar/avatar-mouse-girl.jpg` },
  { url: `${API_URL.replace('/api/v1', '')}/profile-images/avatar/avatar-monkey-girl.jpg` },
  { url: `${API_URL.replace('/api/v1', '')}/profile-images/avatar/avatar-girl-dog.jpg` },
  { url: `${API_URL.replace('/api/v1', '')}/profile-images/avatar/avatar-sheep.jpg` },
];

@connect(
  state => ({
    profilePicture: state.user.profile.profile_picture,
    profileImage: state.forms.formData.profileImage,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ProfileImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeImage: props.profilePicture,
    };
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { actions, lastCompletedCall, profileImage } = this.props;

    // set image after camera
    if (nextProps.profileImage !== profileImage) {
      this.setState({ activeImage: nextProps.profileImage });
    }

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.UPLOAD_PLOFILE_IMAGE) {
      actions.navigateTo('Profile');
    }
  }

  // event hanlders
  setActiveImage = (image) => {
    this.setState({ activeImage: image.url });
  }

  updateProfilePicture = () => {
    const { activeImage } = this.state;
    const { actions } = this.props;
    actions.updateProfilePicture(activeImage);
  }

  goToCamera = () => {
    const { actions } = this.props;

    actions.activateCamera({
      cameraField: 'profileImage',
      cameraHeading: 'Profile photo',
      cameraCopy: 'Please center your face in the circle and take a selfie, to use as your profile photo.',
      cameraType: 'front',
      mask: 'circle',
      onSave: this.saveProfileImage,
    })
  }

  saveProfileImage = (photo) => {
    const { actions } = this.props;

    actions.updateProfilePicture(photo);
    actions.updateFormField('profileImage', photo);
    actions.navigateTo('Profile');
  }

  // rendering methods
  renderImages = (image) => {
    const { activeImage } = this.state;
    const viewStyles = [ProfileImageStyle.imageWrapper];
    if (image.url === activeImage) viewStyles.push(ProfileImageStyle.activeImage);
    const imageStyles = ProfileImageStyle.image;

    return (
      <TouchableOpacity key={images.indexOf(image)} style={ProfileImageStyle.button} onPress={() => this.setActiveImage(image)}>
        <View style={viewStyles}>
          <Image source={{ uri: image.url }} style={imageStyles} />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { activeImage, callsInProgress } = this.state;

    const isLoading = apiUtil.areCallsInProgress([API.UPLOAD_PLOFILE_IMAGE], callsInProgress);

    return (
        <BasicLayout bottomNavigation>
          <MainHeader backButton />
          <ImageHeading image={activeImage}/>

          <CelScreenContent>
            <CelButton
              onPress={this.goToCamera}
              transparent
              color="blue"
              size="small"
              margin="0 0 10 0"
              inverse
            >
              Take photo
            </CelButton>

            <Text style={ProfileImageStyle.text}>Or choose from one of the below:</Text>

            <View style={ProfileImageStyle.viewWrapper}>
              { images.map(this.renderImages) }
            </View>

            <CelButton onPress={this.updateProfilePicture} margin="0 40 0 40" loading={isLoading}>Change avatar</CelButton>
          </CelScreenContent>
        </BasicLayout>
    );
  }
}

export default ProfileImage;
