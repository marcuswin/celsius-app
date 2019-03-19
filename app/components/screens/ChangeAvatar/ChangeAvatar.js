import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity} from 'react-native';
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


// const images = [
//   { img = require('../../assets/images/illustrations-v3/Cat/profile-cat.png') },
//   { img =  require('../../assets/images/illustrations-v3/Deer/profile-deer.png') },
//   { img =  require('../../assets/images/illustrations-v3/Diane/profile-diane.png') },
//   { img =  require('../../assets/images/illustrations-v3/Dog/profile-dog.png') },
//   { img =  require('../../assets/images/illustrations-v3/Fox/profile-fox.png') },
//   { img =  require('../../assets/images/illustrations-v3/Hyppo/profile-hyppo.png') },
//   { img =  require('../../assets/images/illustrations-v3/Monkey boy/profile-monkeyboy.png') },
//   { img =  require('../../assets/images/illustrations-v3/Monkey girl/profile-monkeygirl.png') },
//   { img =  require('../../assets/images/illustrations-v3/Shark/profile-shark.png') },
//   { img =  require('../../assets/images/illustrations-v3/Sheep/profile-sheep.png') },
//   { img =  require('../../assets/images/illustrations-v3/Unicorn/profile-unicorn.png') },
// ];

const images = [
  { img: ('../../assets/images/illustrations-v3/Cat/profile-cat.png') },
]
@connect(
  state => ({
    profilePicture: state.user.profile.profile_picture
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
    };
  }

  // event hanlders
  setActiveImage = (image) => {
    this.setState({ activeImage: image.img });
  }

  saveProfileImage = (photo) => {
    const { actions } = this.props;

    actions.updateProfilePicture(photo);
    actions.updateFormField('profileImage', photo);
    actions.navigateTo('Profile');
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

  // renderImage = (images) => {
  //   const style = ChangeAvatarStyle()

  //   return (
  //     <View style={[style.imageBorder, flex= 1, flexDirection= 'row']} >
  //       <Image style={style.image} source={images.img} />
  //       { images.map(this.images) }
  //     </View>
  //   );
  // };

  updateProfilePicture = () => {
    const { activeImage } = this.state;
    const { actions } = this.props;
    actions.updateProfilePicture(activeImage);
  }

  renderImages = (image) => {
    const { activeImage } = this.state;
    const viewStyles = [ChangeAvatarStyle.imageWrapper];
    if (image.img === activeImage) viewStyles.push(ChangeAvatarStyle.activeImage);
    const imageStyles = ChangeAvatarStyle.image;

    return (
      <TouchableOpacity key={images.indexOf(image)} onPress={() => this.setActiveImage(image)}>
        <View>
          <Image source={{ uri: image.img }}
            style={imageStyles}
          />
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    const { profilePicture } = this.props;

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
          <View >
            {/* {images.map(this.renderImages)} */}
          </View>
          <CelButton> Change avatar </CelButton>
        </ScrollView>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(ChangeAvatar);
