import React, {Component} from 'react';
import {Form, View} from 'native-base';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {TouchableOpacity, Platform} from 'react-native';
import {countries} from "country-data";
import CheckBox from 'react-native-checkbox';

import SelectCountryModal from '../../../components/Modals/SelectCountryModal/SelectCountryModal';
import PrimaryInput from "../../../components/Inputs/PrimaryInput";
import {PrimaryButton} from "../../../components/Buttons/Button/Button";
import * as actions from "../../../redux/actions";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

@connect(
  state => ({
    userLocation: state.users.userLocation,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    dimensions: state.ui.dimensions,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class Step2 extends Component {
  static propTypes = {
    onNextStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super();

    this.state = {
      firstName: props.user && props.user.first_name ? props.user.first_name : '',
      email: props.user && props.user.email ? props.user.email : '',
      lastName: props.user && props.user.last_name ? props.user.last_name : '',
      country: props.userLocation ? countries[props.userLocation].name : '',
      countryAlpha3: props.userLocation ? countries[props.userLocation].alpha3 : '',
      modalVisible: false,
      accredited: true
    };
  }

  onChangeField = (field, text) => {
    this.setState({[field]: text})
  };

  onSubmit = () => {
    const {onNextStep} = this.props;
    const {firstName, lastName, country, email, countryAlpha3} = this.state;

    onNextStep({firstName, lastName, country, email, countryAlpha3 })
  };

  getViewHeight = () => {
    const {dimensions, user} = this.props;

    const minHeight = user.facebook_id || user.google_id || user.twitter_id ? 500 : 450;

    return Math.max(dimensions.screenHeight - dimensions.header - dimensions.animatedHeader, minHeight);

  };

  setCountry = (country) => {
    this.setState({
      modalVisible: false,
      country: country.name || this.state.country,
      countryAlpha3: country.alpha3 || this.state.countryAlpha3,
    });
  };

  render() {
    const {callsInProgress, user} = this.props;
    const {firstName, lastName, country, email, modalVisible, accredited} = this.state;

    const isLoading = apiUtil.areCallsInProgress([API.UPDATE_USER], callsInProgress);

    return (
      <View style={{height: this.getViewHeight(), justifyContent: 'space-between'}}>
        <Form style={{marginTop: 34}}>
          <PrimaryInput
            labelText="First Name"
            value={firstName}
            onChange={text => this.onChangeField('firstName', text)}/>
          <PrimaryInput
            labelText="Last Name"
            value={lastName}
            onChange={text => this.onChangeField('lastName', text)}/>
          {user.facebook_id || user.google_id || user.twitter_id ?
            <PrimaryInput
              labelText="Email"
              value={email}
              onChange={text => this.onChangeField('email', text)}/> : null}

          <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
            <PrimaryInput
              clickable
              labelText="Country" value={country}
              onChange={text => this.onChangeField('country', text)}
              onPress={() => this.setState({modalVisible: true})}/>
          </TouchableOpacity>

          <SelectCountryModal
            visible={modalVisible}
            onClose={(countryData) => this.setCountry(countryData)}/>

          <CheckBox
            label={`I'm an Accredited Investor`}
            checked={accredited}
            labelStyle={{color: '#ffffff', fontSize: 16, fontWeight: '300', fontFamily: 'agile-light'}}
            checkboxStyle={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              resizeMode: 'center',
              height: 36,
              width: 36,
              borderRadius: 5
            }}
            checkedImage={Platform.OS === 'ios' ? require('../../../../assets/images/icons/icon-check.png') : require('../../../../assets/images/icons/icon-check2x.png')}
            uncheckedImage={require('../../../../assets/images/icons/transparent.png')}
            onChange={() => {
              this.setState({accredited: !this.state.accredited})
            }}
          />
        </Form>

        <View style={{marginTop: 40, paddingBottom: 100}}>
          <PrimaryButton
            disabled={!this.state.accredited}
            onPress={() => this.onSubmit()} title="I’m done"
            loading={isLoading}/>
        </View>
      </View>
    );
  }
}

export default Step2;
