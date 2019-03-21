import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import React, { Component } from 'react';
import { Image, TouchableOpacity, View, Linking } from 'react-native';

import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelInput from '../../atoms/CelInput/CelInput';
import Card from '../../atoms/Card/Card';
import STYLES from '../../../constants/STYLES';
import Icon from '../../atoms/Icon/Icon';
import Separator from '../../atoms/Separator/Separator';
// import CelSelect from '../../molecules/CelSelect/CelSelect';
import IconButton from '../../organisms/IconButton/IconButton';

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
    const { profilePicture, user, actions } = this.props;
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
            <TouchableOpacity onPress={() => actions.navigateTo('ChangeAvatar')}>
              <CelText color={STYLES.COLORS.CELSIUS_BLUE} margin="10 0 0 0">Change avatar</CelText>
            </TouchableOpacity>
          </View>
        </View>

        <IconButton icon="Refer">Refer your friends</IconButton>
        <IconButton margin="0 0 20 0" icon="Settings">Enter a promo code</IconButton>
        <Separator />
        <IconButton icon="Settings">Achievements</IconButton>
        <Separator />
        <CelInput margin="20 0 20 0" disabled type="text" field="email" placeholder="E-mail" value={user.email} />
        <CelInput margin="0 0 20 0" disabled type="text" field="phone" placeholder="Phone number" value={user.cellphone} />

        {/* <CelSelect type="phone" disabled value={user.cellphone} /> */}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <CelText>To make changes on your profile, <CelText color={STYLES.COLORS.CELSIUS_BLUE} onPress={() => Linking.openURL("mailto:app@celsius.network")}>contact our support.</CelText></CelText>
        </View>

        <Card close>
          <CelText align="center" type="H3" weight="500" margin="0 0 10 0">Let’s talk!</CelText>
          <CelText align="center" type='H4' weight="200" margin="0 0 10 0">We would love to hear from you. Do not hasitate to reach us out!</CelText>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => Linking.openURL('https://t.me/CelsiusNetwork')}>
            <Icon name="Telegram" fill={STYLES.COLORS.CELSIUS_BLUE} width="21" style={{ marginRight: 10 }} />
            <CelText align="center" color={STYLES.COLORS.CELSIUS_BLUE} weight="500" type='H4'>Join our Telegram</CelText>
          </TouchableOpacity>
        </Card>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Profile);
