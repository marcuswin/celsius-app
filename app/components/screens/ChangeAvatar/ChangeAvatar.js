import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';
import Separator from '../../atoms/Separator/Separator';
import STYLES from '../../../constants/STYLES';
import ChangeAvatarStyle from './ChangeAvatar.styles';

const images = [
  { url: require('../../../../assets/images/illustrations-v3/Cat/profile-cat.png') },
  { url: require('../../../../assets/images/illustrations-v3/Deer/profile-deer.png') },
  { url: require('../../../../assets/images/illustrations-v3/Diane/profile-diane.png') },
  { url: require('../../../../assets/images/illustrations-v3/Dog/profile-dog.png') },
  { url: require('../../../../assets/images/illustrations-v3/Fox/profile-fox.png') },
  { url: require('../../../../assets/images/illustrations-v3/Hyppo/profile-hyppo.png') },
  { url: require('../../../../assets/images/illustrations-v3/MonkeyBoy/profile-monkeyboy.png') },
  { url: require('../../../../assets/images/illustrations-v3/MonkeyGirl/profile-monkeygirl.png') },
  { url: require('../../../../assets/images/illustrations-v3/Shark/profile-shark.png') },
  { url: require('../../../../assets/images/illustrations-v3/Sheep/profile-sheep.png') },
  { url: require('../../../../assets/images/illustrations-v3/Unicorn/profile-unicorn.png') },
]
@connect(
  state => ({
    profilePicture: state.user.profile.profile_picture,

  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)


class ChangeAvatar extends Component {

  static propTypes = {
    // text: PropTypes.string

  };

  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "Change Avatar",
    right: "settings"
  });

  constructor(props) {
    super(props);

    this.state = {
      activeImage: props.profilePicture,

    }

  }




  // event hanlders
  setActiveImage = (imgSrc) => {
    this.setState({ activeImage: imgSrc.url });
  }

  updateProfilePicture = () => {
    // const { activeImage } = this.state;

  }

  goToCamera = () => {
    const { actions } = this.props;

    actions.activateCamera({
      cameraField: 'profileImage',
      cameraHeading: 'Profile photo',
      cameraCopy: 'Please center your face in the circle and take a selfie, to use as your profile photo.',
      cameraType: 'front',
      mask: 'circle'
    })
    actions.navigateTo("CameraScreen", { onSave: this.saveProfileImage, });
  }

  saveProfileImage = (photo) => {
    const { actions } = this.props;

    actions.updateProfilePicture(photo);
    actions.updateFormField('profileImage', photo);
    actions.navigateTo('Profile');
  }

  renderImage = (imgSrc) => {
    const style = ChangeAvatarStyle()
    const { activeImage } = this.state;
    const viewStyles = [style.imageWrapper];
    if (imgSrc.url === activeImage) viewStyles.push(style.activeImage);

    return (
      <TouchableOpacity key={images.indexOf(imgSrc)} style={style.avatar} onPress={() => this.setActiveImage(imgSrc)}>
        <View style={viewStyles}>
          <Image style={style.image} source={imgSrc.url} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { profilePicture } = this.props;
    // const { activeImage, callsInProgress } = this.state;

    const style = ChangeAvatarStyle()

    // const isLoading = apiUtil.areCallsInProgress([API.UPLOAD_PLOFILE_IMAGE], callsInProgress);

    return (
      <RegularLayout>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, borderColor: STYLES.COLORS.WHITE }}
            source={profilePicture ? { uri: profilePicture } : require('../../../../assets/images/empty-profile/empty-profile.png')}
            resizeMethod="resize"
          />
          <CelButton onPress={this.goToCamera} basic>Take a picture</CelButton>
        </View>
        <Separator text="OR CHOOSE ONE BELOW" />
        <ScrollView>
          <View style={style.imageBorder}>
            {images.map(this.renderImage)}
          </View>
          <View style={style.button}>
            <CelButton onPress={this.updateProfilePicture}> Change avatar </CelButton>
          </View>
        </ScrollView>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(ChangeAvatar);
