import React, { Component } from "react";
import { View, List, Body, ListItem, Content, Text } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {countries} from "country-data";
import userService from '../../../services/users-service';
import countriesService from '../../../services/countries-service'


import SelectCountry from '../../organisms/SelectCountry/SelectCountry';
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import PrimaryInput from "../../atoms/Inputs/PrimaryInput";
import * as actions from "../../../redux/actions";
import CelButton from '../../atoms/CelButton/CelButton';
import { STYLES } from "../../../config/constants/style";

// import AvatarDefaultImage from "../../../../assets/images/Headshot-cat.jpg";

// const styles = StyleSheet.create({
//   image: {
//     height: 200,
//     width: 200,
//     borderRadius: 200 / 2,
//     top: -50,
//     zIndex: 99999,
//     position: 'absolute',
//   }
// });

// todo object

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    loanRequest: state.loanRequests.loanRequest,
    callsInProgress: state.api.callsInProgress,
    history: state.api.history,
    lastCompletedCall: state.api.lastCompletedCall,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class ProfileScreen extends Component {

  componentDidMount() {
    countriesService.get();
    userService.getPersonalInfo();
  }

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  handleUserInfoChange = (key, value) => {
    this.props.updateUserPersonalInfo(key, value)
  };

  onSubmit = () => {
    console.log('submit')
  };

  render() {
    console.log('this props', this.props.user.country)
    const { user, navigateTo } = this.props;
    return (
      <SimpleLayout
        mainHeader={{ backButton: false}}
      >
      <Content bounces={false} onScroll={this.onScroll}>
        <PrimaryInput type="secondary" labelText="First name" value={user.first_name} onChange={this.handleUserInfoChange.bind(this, 'first_name')} />
        <PrimaryInput type="secondary" labelText="Last name" value={user.last_name} onChange={this.handleUserInfoChange.bind(this, 'last_name')}  />
        <PrimaryInput type="secondary" labelText="E-mail" value={user.email} keyboardType='email-address' onChange={this.handleUserInfoChange.bind(this, 'email')} />
        <SelectCountry setCountry={this.handleUserInfoChange.bind(this, 'country')} country={user.country} />
        <PrimaryInput type="secondary" labelText="Phone number" value ={this.props.phone} />
        <View style={{marginTop: 40, marginBottom: 30}}>
          <CelButton
            onPress={() => this.navigateTo('ChangePassword')}
            iconRight={false}
            title={'Change password'}
          />
        </View>
        <View style={{marginBottom: 30}}>
        <CelButton
          onPress={this.onSubmit}
          iconRight={false}
          title={'Save changes'}
        />
        </View>
      </Content>
    </SimpleLayout>
    )
  }
}

export default ProfileScreen;
