import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {View} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {countries} from "country-data";
import isEqual from "lodash/isEqual";
import isNil from 'lodash/isNil'
import has from 'lodash/has'

import * as actions from "../../../redux/actions";
import CelButton from "../../atoms/CelButton/CelButton";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

import {STYLES} from "../../../config/constants/style";
import Icon from "../../atoms/Icon/Icon";

import { actions as mixpanelActions } from '../../../services/mixpanel'
import CelInput from "../../atoms/CelInput/CelInput";
import CelForm from "../../atoms/CelForm/CelForm";
import CelSelect from "../../molecules/CelSelect/CelSelect";

const pageCalls = [API.UPDATE_USER, API.REGISTER_USER_FACEBOOK, API.REGISTER_USER_GOOGLE, API.REGISTER_USER_TWITTER]

@connect(
  state => ({
    userLocation: state.users.userLocation,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
    agreedToTermsOfUse: state.users.agreedToTermsOfUse,
    formData: state.ui.formData,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class SignupTwo extends Component {
  componentDidMount() {
    const { user, initForm, userLocation } = this.props;

    const userIdTypes = {
      facebook_id: 'Facebook',
      twitter_id: 'Twitter',
      google_id: 'Google',
      id: 'email',
    }

    const userIds = Object.keys(user)
      .filter(key => has(userIdTypes, key))
      .reduce((obj, key) => {
        if (!isNil(user[key])) {
          // eslint-disable-next-line
          obj[key] = user[key];
        }
        return obj;
      }, {});

    const id = userIds[Object.keys(userIds)[0]];
    mixpanelActions.createAlias(id);

    initForm({
      firstName: user && user.first_name ? user.first_name : undefined,
      email: user && user.email ? user.email : undefined,
      lastName: user && user.last_name ? user.last_name : undefined,
      country: userLocation ? countries[userLocation].name : undefined,
    })
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { user, navigateTo, initForm } = this.props;

    if (pageCalls.indexOf(this.props.lastCompletedCall) === -1 && pageCalls.indexOf(nextProps.lastCompletedCall) !== -1) {
      navigateTo('Home', true);
    }


    if (!isEqual(user, nextProps.user)) {
      initForm({
        firstName: nextProps.user && nextProps.user.first_name ? nextProps.user.first_name : undefined,
        email: nextProps.user && nextProps.user.email ? nextProps.user.email : undefined,
        lastName: nextProps.user && nextProps.user.last_name ? nextProps.user.last_name : undefined,
        country: nextProps.userLocation ? countries[nextProps.userLocation] : undefined,
      })
    }
  }

  // event hanlders
  onSubmit = () => {
    const { formData, user, updateUser, registerUserTwitter, registerUserFacebook, registerUserGoogle } = this.props;

    const data = { ...formData};
    data.country = formData.country;
    data.countryAlpha3 = countries.all.filter(c => c.name === formData.country)[0].alpha3;

    // update user
    if (user && user.id) {
      updateUser(data);
    }

    // register twitter user
    if (user && user.twitter_id) {
      registerUserTwitter({...user, ...data});
    }

    // register facebook user
    if (user && user.facebook_id) {
      registerUserFacebook({...user, ...data});
    }

    // register google user
    if (user && user.google_id) {
      registerUserGoogle({...user, ...data});
    }
  }

  // rendering methods
  render() {
    const { formData, user, callsInProgress, navigateTo, toggleTermsOfUse, agreedToTermsOfUse } = this.props;
    const { firstName, lastName, email, country } = formData;

    const isLoading = apiUtil.areCallsInProgress(pageCalls, callsInProgress);

    return (
      <SimpleLayout
        animatedHeading={{ text: 'Just a few more details…' }}
        bottomNavigation={ false }
        background={STYLES.PRIMARY_BLUE}
      >
        <View>
          <CelForm disabled={isLoading}>
            <CelInput
              field="firstName"
              labelText="First Name"
              value={firstName}
              autoCapitalize={'sentences'}
            />
            <CelInput
              field="lastName"
              labelText="Last Name"
              value={lastName}
              autoCapitalize={'sentences'}
            />
            {user && (user.facebook_id || user.google_id || user.twitter_id) ?
              <CelInput
                field="email"
                labelText="Email"
                value={email}
              />
            : null}

            <CelSelect field="country" labelText="Country" type="country" value={country} />

            <View style={{ justifyContent: 'space-between', flexDirection:'row' }}>
              <CelCheckbox
                label="I agree to Terms of Use"
                value={agreedToTermsOfUse}
                onChange={toggleTermsOfUse}
              />

              <TouchableOpacity onPress={() => navigateTo('TermsOfUse')}>
                <Icon name="QuestionMarkCircle" fill='#FFFFFF' heigh="24" width="24" viewBox="0 0 30 30" style={{ opacity: 0.5 }}/>
              </TouchableOpacity>
            </View>
          </CelForm>

          <View style={{marginTop: 40, paddingBottom: 100}}>
            <CelButton
              disabled={!agreedToTermsOfUse || !formData.firstName || !formData.lastName || !formData.email || !formData.country}
              onPress={this.onSubmit}
              loading={ isLoading }
              white
              iconRight="IconArrowRight"
            >
              I'm done
            </CelButton>
          </View>
        </View>
      </SimpleLayout>
    );
  }
}

export default SignupTwo;
