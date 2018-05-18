import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Form, View} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {countries} from "country-data";
import isEqual from "lodash/isEqual";
import isNil from 'lodash/isNil' 
import has from 'lodash/has' 

import * as actions from "../../../redux/actions";
import PrimaryInput from "../../atoms/Inputs/PrimaryInput";
import CelButton from "../../atoms/CelButton/CelButton";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import SelectCountry from '../../organisms/SelectCountry/SelectCountry';
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

import {STYLES} from "../../../config/constants/style";
import Icon from "../../atoms/Icon/Icon";

import { actions as mixpanelActions } from '../../../services/mixpanel' 



const pageCalls = [API.UPDATE_USER, API.REGISTER_USER_FACEBOOK, API.REGISTER_USER_GOOGLE, API.REGISTER_USER_TWITTER]

@connect(
  state => ({
    userLocation: state.users.userLocation,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    lastCompletedCall: state.api.lastCompletedCall,
    agreedToTermsOfUse: state.users.agreedToTermsOfUse,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class SignupTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        firstName: props.user && props.user.first_name ? props.user.first_name : '',
        email: props.user && props.user.email ? props.user.email : '',
        lastName: props.user && props.user.last_name ? props.user.last_name : '',
        country: props.userLocation ? countries[props.userLocation].name : '',
        countryAlpha3: props.userLocation ? countries[props.userLocation].alpha3 : '',
      },
    };

    // binders
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.setCountry = this.setCountry.bind(this);
  }

  componentDidMount() { 
    const userIdTypes = { 
      facebook_id: 'Facebook', 
      twitter_id: 'Twitter', 
      google_id: 'Google', 
      id: 'email', 
    } 
 
    const { user } = this.props; 
    const userIds = Object.keys(user) 
      .filter(key => has(userIdTypes, key)) 
      .reduce((obj, key) => { 
        if (!isNil(user[key])) {
          // eslint-disable-next-line
          obj[key] = user[key]; 
        } 
        return obj; 
      }, {}); 
 
    const id = userIds[Object.keys(userIds)[0]] 
 
    mixpanelActions.createAlias(id) 
  } 

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { user, navigateTo } = this.props;

    if (pageCalls.indexOf(this.props.lastCompletedCall) === -1 && pageCalls.indexOf(nextProps.lastCompletedCall) !== -1) {
      navigateTo('Home', true);
    }

    if (!isEqual(user, nextProps.user)) {
      this.setState({
        formData: {
          firstName: nextProps.user && nextProps.user.first_name ? nextProps.user.first_name : '',
          email: nextProps.user && nextProps.user.email ? nextProps.user.email : '',
          lastName: nextProps.user && nextProps.user.last_name ? nextProps.user.last_name : '',
          country: nextProps.userLocation ? countries[nextProps.userLocation].name : '',
          countryAlpha3: nextProps.userLocation ? countries[nextProps.userLocation].alpha3 : '',
        },
      })
    }
  }

  // event hanlders
  onSubmit() {
    const { formData } = this.state;
    const { user, updateUser, registerUserTwitter, registerUserFacebook, registerUserGoogle } = this.props;

    // update user
    if (user && user.id) {
      updateUser(formData);
    }

    // register twitter user
    if (user && user.twitter_id) {
      registerUserTwitter({...user, ...formData});
    }

    // register facebook user
    if (user && user.facebook_id) {
      registerUserFacebook({...user, ...formData});
    }

    // register google user
    if (user && user.google_id) {
      registerUserGoogle({...user, ...formData});
    }
  }

  onChangeField = (fieldName, text) => {
    if (fieldName === 'firstName' || fieldName === 'lastName') {
      if (!/\d/.test(text)) {
        this.setState({ formData: { ...this.state.formData, [fieldName]: text }});
      }
    } else {
      this.setState({ formData: { ...this.state.formData, [fieldName]: text }});
    }

  };

  setCountry = (country) => {
    this.setState({
      formData: {
        ...this.state.formData,
        country: country ? country.name || this.state.country : '',
        countryAlpha3: country ? country.alpha3 || this.state.countryAlpha3 : '',
      }
    });
  };

  // rendering methods
  render() {
    const { formData } = this.state;
    const { firstName, lastName, email, country } = formData;
    const { user, callsInProgress, navigateTo, toggleTermsOfUse, agreedToTermsOfUse } = this.props;

    const isLoading = apiUtil.areCallsInProgress(pageCalls, callsInProgress);

    return (
      <SimpleLayout
        animatedHeading={{ text: 'Just a few more details…' }}
        bottomNavigation={ false }
        background={STYLES.PRIMARY_BLUE}
      >
        <View>
          <Form>
            <PrimaryInput
              labelText="First Name"
              value={firstName}
              autoCapitalize={'sentences'}
              onChange={text => this.onChangeField('firstName', text)}/>
            <PrimaryInput
              labelText="Last Name"
              value={lastName}
              autoCapitalize={'sentences'}
              onChange={text => this.onChangeField('lastName', text)}/>
            {user && (user.facebook_id || user.google_id || user.twitter_id) ?
              <PrimaryInput
                labelText="Email"
                value={email}
                onChange={text => this.onChangeField('email', text)}
              />
            : null}

            <SelectCountry setCountry={this.setCountry} country={country} />

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
          </Form>

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
