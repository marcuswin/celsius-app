import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';
import CelInput from '../../atoms/CelInput/CelInput';
import Card from '../../atoms/Card/Card';
import STYLES from '../../../constants/STYLES';
import Icon from '../../atoms/Icon/Icon';
import Separator from '../../atoms/Separator/Separator';
// import CelSelect from '../../molecules/CelSelect/CelSelect';
import IconButton from '../../organisms/IconButton/IconButton';
import { navigateTo } from '../../../redux/actions';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';

@connect(
  state => ({
    user: state.user.profile,
    profilePicture: state.user.profile.profile_picture
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Profile extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "Your profile",
    right: "settings"
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  logoutUser = async () => {
    const { actions } = this.props;
    await actions.logoutUser();
  }

  render() {
    const { profilePicture, user } = this.props;
    return (
      <RegularLayout>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, borderColor: STYLES.COLORS.WHITE }}
            source={profilePicture ? { uri: profilePicture } : require('../../../../assets/images/empty-profile/empty-profile.png')}
            resizeMethod="resize"
          />
          <View style={{ marginLeft: 20 }}>
            <CelText type="H2">{user.first_name}</CelText>
            <CelText type="H2">{user.last_name}</CelText>
            <TouchableOpacity >
              <CelText onPress={() => {actions.navigateTo('ProfilePhoto')}} color={STYLES.COLORS.CELSIUS_BLUE} margin="10 0 0 0">Change avatar</CelText>
            </TouchableOpacity>
          </View>
        </View>

        <IconButton icon="Refer">Refer your friends</IconButton>
        <IconButton margin="0 0 20 0" icon="Settings">Enter a promo code</IconButton>
        <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY} />
        <IconButton icon="Settings">Achievements</IconButton>
        <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY} />
        <CelInput margin="20 0 20 0" disabled type="text" field="email" placeholder="E-mail" value={user.email} />

        {/* <CelSelect type="phone" disabled value={user.cellphone} /> */}

        <CelText>To make changes on your profile,</CelText>
        <CelButton basic onPress={() => { }} color={STYLES.COLORS.CELSIUS_BLUE}>contact our support.</CelButton>

        <Card>
          <CelText align="center" type="H3">Let’s talk!</CelText>
          <CelText align="center">We would love to hear from you. Do not hasitate to reach us out!</CelText>
          <TouchableOpacity onPress={() => { }}>
            <Icon name="telegram" fill={STYLES.COLORS.CELSIUS_BLUE} />
            <CelText align="center" color={STYLES.COLORS.CELSIUS_BLUE} weight="500">Join our Telegram</CelText>
          </TouchableOpacity>
        </Card>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Profile);
