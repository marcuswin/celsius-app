import React, { Component } from "react";
import { Constants } from 'expo';
import { TouchableOpacity, Text, Linking, StyleSheet } from "react-native";
import { View } from 'native-base';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import _ from 'lodash';
import isEqual from "lodash/isEqual";
import { hook } from 'cavy';

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import * as appActions from "../../../redux/actions";
import CelButton from '../../atoms/CelButton/CelButton';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import ImageHeading from "../../atoms/ImageHeading/ImageHeading";
import CelInput from "../../atoms/CelInput/CelInput";
import CelPhoneInput from "../../molecules/CelPhoneInput/CelPhoneInput";
import CelForm from "../../atoms/CelForm/CelForm";
import Icon from "../../atoms/Icon/Icon";
import { COLORS, FONT_SCALE } from "../../../config/constants/style";
import ReferralModal from "../../organisms/ReferralModal/ReferralModal";
import { MODALS } from "../../../config/constants/common";
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";

const { revisionId } = Constants.manifest;

// eslint-disable-next-line
const getError = (errors, field, def = null) => {
  return _.get(errors, [field, 'msg'], def)
};

const ProfileStyle = StyleSheet.create({
  appVersionText: {
    textAlign: 'center',
    color: COLORS.gray,
  },
});

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    error: state.users.error,
    callsInProgress: state.api.callsInProgress,
    history: state.api.history,
    lastCompletedCall: state.api.lastCompletedCall,
    formData: state.ui.formData,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ProfileScreen extends Component {
  componentDidMount() {
    const { user, actions } = this.props;
    actions.getProfileInfo();

    actions.initForm({
      firstName: user && user.first_name ? user.first_name : undefined,
      email: user && user.email ? user.email : undefined,
      lastName: user && user.last_name ? user.last_name : undefined,
      cellphone: user && user.cellphone ? user.cellphone : undefined,
    })
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { user, actions } = this.props;

    if (!isEqual(user, nextProps.user)) {
      actions.initForm({
        firstName: nextProps.user && nextProps.user.first_name ? nextProps.user.first_name : undefined,
        email: nextProps.user && nextProps.user.email ? nextProps.user.email : undefined,
        lastName: nextProps.user && nextProps.user.last_name ? nextProps.user.last_name : undefined,
        cellphone: nextProps.user && nextProps.user.cellphone ? nextProps.user.cellphone : undefined,
      })
    }
  }

  onSubmit = () => {
    const { formData, actions } = this.props;

    actions.updateProfileInfo({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      cellphone: formData.cellphone,
    })
  };

  handleUserNameChange = (field, text) => {
    const { actions } = this.props;
    // prevent user to insert numbers in first name or last name field
    if (/\d/.test(text)) return;
    actions.updateFormField(field, text);
  };

  render() {
    const { user, formData, actions, callsInProgress, error } = this.props;
    const isLoadingProfileInfo = apiUtil.areCallsInProgress([API.GET_USER_PERSONAL_INFO], callsInProgress);

    return (
      <BasicLayout bottomNavigation>
        <MainHeader
          right={(
            <TouchableOpacity
            ref={this.props.generateTestHook('ProfileScreen.LogOut')}
            onPress={actions.logoutUser}>
              <Text 
                style={[{
                color: 'white',
                paddingLeft: 5,
                textAlign: 'right',
                opacity: 0.8,
                marginTop: 2,
                fontSize: FONT_SCALE * 21,
                fontFamily: 'agile-medium',
              }]}>Log out</Text>
            </TouchableOpacity>
          )}
        />
        <ImageHeading image={user.profile_picture} />

        <CelScreenContent>
          <CelButton
            onPress={() => actions.navigateTo('ProfileImage')}
            transparent
            color="blue"
            size="small"
            margin="0 0 10 0"
            inverse
          >
            Change avatar
          </CelButton>

          <CelButton
            inverse
            margin="0 0 20 0"
            onPress={() => actions.openModal(MODALS.REFERRAL_MODAL)}
          >
            Refer your friends
          </CelButton>

          <CelForm disabled={isLoadingProfileInfo}>
            <CelInput
              theme="white"
              labelText={getError(error, 'first_name', "First name")}
              value={formData.firstName}
              field="firstName"
              onChange={this.handleUserNameChange}
              editable={false}
              autoCapitalize={'sentences'}
            />
            <CelInput
              theme="white"
              labelText={getError(error, 'last_name', "Last name")}
              value={formData.lastName}
              field="lastName"
              onChange={this.handleUserNameChange}
              editable={false}
              autoCapitalize={'sentences'}
            />
            <CelInput
              theme="white"
              labelText="E-mail"
              value={formData.email}
              keyboardType='email-address'
              editable={false}
              field="email"
            />
            <CelPhoneInput
              theme="white"
              labelText={getError(error, 'cellphone', "Phone number")}
              field="cellphone"
              editable={false}
              value={formData.cellphone}
            />
          </CelForm>

          { !user.facebook_id && !user.google_id && !user.twitter_id ? (
            <View style={{marginTop: 40, marginBottom: 30}}>
              <CelButton
                onPress={() => actions.navigateTo('ChangePassword')}
                color="blue"
              >Change password</CelButton>
            </View>
          ) : null}

          <View style={{marginBottom: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Icon name='TelegramIcon' height='25' width='25' viewBox="0 -4 32 32" fill={'rgba(65, 86, 166, 0.6)'} />
            <CelButton
              onPress={() => Linking.openURL('https://t.me/CelsiusNetwork')}
              transparent
              color="blue"
              size="medium"
              inverse
            >
              Join our Telegram
            </CelButton>
          </View>

          <View>
            <CelButton
              onPress={() => actions.navigateTo('TermsOfUse')}
              transparent
              color="blue"
              size="small"
              margin="0 0 0 0"
              inverse
            >
              See Terms of Use
            </CelButton>
          </View>
          {!!revisionId && <View style={{marginTop: 10,}}>
            <Text style={ProfileStyle.appVersionText}>App Version - {revisionId}</Text>
          </View>}
        </CelScreenContent>
        <ReferralModal />
      </BasicLayout>
    )
  }
}

// export default ProfileScreen;
const TestHook = hook(ProfileScreen)
export default TestHook;