import React, { Component } from "react";
import { View, Content } from 'native-base';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import _ from 'lodash';
import isEqual from "lodash/isEqual";

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import Link from '../../atoms/Link/Link';
import * as actions from "../../../redux/actions";
import CelButton from '../../atoms/CelButton/CelButton';
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import ImageHeading from "../../atoms/ImageHeading/ImageHeading";
import Message from "../../atoms/Message/Message";
import CelInput from "../../atoms/CelInput/CelInput";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import CelForm from "../../atoms/CelForm/CelForm";


// eslint-disable-next-line
const getError = (errors, field, def = null) => {
  return _.get(errors, [field, 'msg'], def)
};

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
  dispatch => bindActionCreators(actions, dispatch),
)
class ProfileScreen extends Component {
  componentDidMount() {
    const { user, getLoggedInBorrower, initForm } = this.props;
    getLoggedInBorrower();

    initForm({
      firstName: user && user.first_name ? user.first_name : undefined,
      email: user && user.email ? user.email : undefined,
      lastName: user && user.last_name ? user.last_name : undefined,
      country: user && user.country ? user.country : undefined,
      cellphone: user && user.cellphone ? user.cellphone : undefined,
    })
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { user, initForm } = this.props;

    if (!isEqual(user, nextProps.user)) {
      initForm({
        firstName: nextProps.user && nextProps.user.first_name ? nextProps.user.first_name : undefined,
        email: nextProps.user && nextProps.user.email ? nextProps.user.email : undefined,
        lastName: nextProps.user && nextProps.user.last_name ? nextProps.user.last_name : undefined,
        country: nextProps.user && nextProps.user.country ? nextProps.user.country : undefined,
        cellphone: nextProps.user && nextProps.user.cellphone ? nextProps.user.cellphone : undefined,
      })
    }
  }

  onSubmit = () => {
    const { formData, updateProfileInfo } = this.props;

    updateProfileInfo({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      cellphone: formData.cellphone,
      country: formData.country,
    })
  };

  handleUserNameChange = (field, text) => {
    // prevent user to insert numbers in first name or last name field
    if (/\d/.test(text)) return;
    this.props.updateFormField(field, text);
  };

  render() {
    const { user, formData, navigateTo } = this.props;
    const isUpdatingProfileInfo = apiUtil.areCallsInProgress([API.UPDATE_USER_PERSONAL_INFO], this.props.callsInProgress);
    const isLoadingProfileInfo = apiUtil.areCallsInProgress([API.GET_USER_PERSONAL_INFO], this.props.callsInProgress);
    /* eslint-disable */
    return (
      <BasicLayout bottomNavigation>
        <MainHeader />
        <Message />
        <ImageHeading image={user.profile_picture} />

        <Content style={{ paddingLeft: 40, paddingRight: 40 }}>
          <CelButton
            onPress={() => navigateTo('ProfileImage')}
            transparent
            color="blue"
            size="small"
            margin="5 0 25 0"
            inverse
          >
            Change avatar
          </CelButton>

          <CelForm disabled={isLoadingProfileInfo}>
            <CelInput
              theme="white"
              labelText={getError(this.props.error, 'first_name', "First name")}
              value={formData.firstName}
              field="firstName"
              onChange={this.handleUserNameChange}
              autoCapitalize={'sentences'}
            />
            <CelInput
              theme="white"
              labelText={getError(this.props.error, 'last_name', "Last name")}
              value={formData.lastName}
              field="lastName"
              onChange={this.handleUserNameChange}
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
            <CelSelect
              theme="white"
              type="country"
              labelText="Country"
              field="country"
              value={formData.country}
            />
            <CelInput
              theme="white"
              labelText={getError(this.props.error, 'cellphone', "Phone number")}
              value={formData.cellphone}
              field="cellphone"
            />
          </CelForm>

          <View style={{marginTop: 40, marginBottom: 30}}>
            <CelButton
              onPress={() => navigateTo('ChangePassword')}
              color="blue"
            >
              Change password
            </CelButton>
          </View>

          <View style={{marginBottom: 30}}>
            <CelButton
              loading={isUpdatingProfileInfo}
              disabled={isLoadingProfileInfo}
              onPress={this.onSubmit}
              color="green"
            >
              Save changes
            </CelButton>
          </View>
          <View style={{marginBottom: 30}}>
            <Link onPress={() => navigateTo('TermsOfUse')}>See Terms of Service</Link>
          </View>
        </Content>
      </BasicLayout>
    )
    /* eslint-enable */
  }
}

export default ProfileScreen;
