import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {View, Content, Text} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
import ProfileImageStyle from "./ProfileImage.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import Link from '../../atoms/Link/Link';
import CameraModal from "../../organisms/Camera/Camera";

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
  () => ({
  // map state to props
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class ProfileImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
      activeImage: require('../../../../assets/images/cat-avatar.jpg'),
    };
    // binders

  }

  // lifecycle methods
  // event hanlders
  // rendering methods


  // renderItem = ({index}) => {
  //   return (
  //       <View>
  //         <Image style={ProfileImageStyle.image} source={images[index]} />
  //       </View>
  //   );
  // };


  render() {
    return (
        <SimpleLayout
          mainHeader={{ backButton: false}}
          showAvatar
        >
          <CameraModal/>

          <Content style={ProfileImageStyle.content}>
            <View>
              <Link style={ProfileImageStyle.link}>Take a picture</Link>
              <Text style={ProfileImageStyle.text}>Or choose from one of the below:</Text>
            </View>

            <View style={ProfileImageStyle.viewWrapper}>

              { images.map((image) => <TouchableOpacity style={ProfileImageStyle.button}>
                <Image key={Math.random()} source={image} style={ProfileImageStyle.image} />
              </TouchableOpacity>) }

            </View>

            <View>
              <CelButton
                color="blue"
              >Change avatar</CelButton>
            </View>
          </Content>
        </SimpleLayout>
    );
  }
}

export default ProfileImage;
