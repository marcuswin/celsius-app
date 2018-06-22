import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Content} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import ProfileImageStyle from "./ProfileImage.styles";
import CelButton from '../../atoms/CelButton/CelButton';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import ImageHeading from "../../atoms/ImageHeading/ImageHeading";
import API from "../../../config/constants/API";
import apiUtil from "../../../utils/api-util";
import Message from "../../atoms/Message/Message";

const images = [
  {
    url: 'https://api.staging.celsius.network/profile-images/avatar/avatar-bear.jpg',
  },
  {
    url: 'https://api.staging.celsius.network/profile-images/avatar/avatar-cat.jpg',
  },
  {
    url: 'https://api.staging.celsius.network/profile-images/avatar/avatar-deer.jpg',
    gif: require('../../../../assets/images/App-Login-Animations_Deer.gif'),
  },
  {
    url: 'https://api.staging.celsius.network/profile-images/avatar/avatar-hippo.jpg',
    gif: require('../../../../assets/images/App-Login-Animations_Hippo.gif'),
  },
  {
    url: 'https://api.staging.celsius.network/profile-images/avatar/avatar-monkey.jpg',
  },
  {
    url: 'https://api.staging.celsius.network/profile-images/avatar/avatar-mouse-girl.jpg',
    gif: require('../../../../assets/images/App-Login-Animations_Squirelgirl.gif'),
  },
  {
    url: 'https://api.staging.celsius.network/profile-images/avatar/avatar-monkey-girl.jpg',
    gif: require('../../../../assets/images/App-Login-Animations_Monkey-Girl.gif'),
  },
  {
    url: 'https://api.staging.celsius.network/profile-images/avatar/avatar-girl-dog.jpg',
    gif: require('../../../../assets/images/App-Login-Animations_Doggirl.gif'),
  },
  {
    url: 'https://api.staging.celsius.network/profile-images/avatar/avatar-sheep.jpg',
    gif: require('../../../../assets/images/App-Login-Animations_Sheep.gif'),
  },
];

@connect(
  state => ({
    profilePicture: state.users.user.profile_picture,
    profileImage: state.ui.formData.profileImage,
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
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { navigateTo, lastCompletedCall, profileImage } = this.props;

    // set image after camera
    if (nextProps.profileImage !== profileImage) {
      this.setState({ activeImage: nextProps.profileImage });
    }

    if (lastCompletedCall !== nextProps.lastCompletedCall && nextProps.lastCompletedCall === API.UPLOAD_PLOFILE_IMAGE) {
      navigateTo('Profile');
    }
  }

  // event hanlders
  setActiveImage = (image) => {
    this.setState({ activeImage: image.url });
  }

  updateProfilePicture = () => {
    const { activeImage } = this.state;
    const { updateProfilePicture } = this.props;
    updateProfilePicture(activeImage);
  }

  goToCamera = () => {
    const { activateCamera } = this.props;

    activateCamera({
      cameraField: 'profileImage',
      cameraHeading: 'Profile photo',
      cameraCopy: 'Please center your face in the circle and take a selfie, to use as your profile photo.',
      cameraType: 'front',
      mask: 'circle',
    })
  }

  // rendering methods
  renderImages = (image) => {
    const { activeImage } = this.state;
    const viewStyles = [ProfileImageStyle.imageWrapper];
    if (image.url === activeImage) viewStyles.push(ProfileImageStyle.activeImage);
    const imageStyles = image.gif ? ProfileImageStyle.gif : ProfileImageStyle.image;

    return (
      <TouchableOpacity key={images.indexOf(image)} style={ProfileImageStyle.button} onPress={() => this.setActiveImage(image)}>
        <View style={viewStyles}>
          <Image source={image.gif || { uri: image.url }} style={imageStyles} />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { activeImage } = this.state;

    const isLoading = apiUtil.areCallsInProgress([API.UPLOAD_PLOFILE_IMAGE], this.props.callsInProgress);

    return (
        <BasicLayout bottomNavigation>
          <MainHeader backButton />
          <Message/>
          <ImageHeading image={activeImage}/>

          <Content>
            <CelButton
              onPress={this.goToCamera}
              transparent
              color="blue"
              size="small"
              margin="15 0 15 0"
              inverse
            >
              Take photo
            </CelButton>

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
