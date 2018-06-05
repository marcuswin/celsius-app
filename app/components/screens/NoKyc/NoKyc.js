import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
// import {} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import NoKycStyle from "./NoKyc.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../../components/atoms/CelButton/CelButton";



@connect(
  state => ({
    kycStatus: state.users.kycStatus,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class NoKyc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedHeading: {
        text: 'Wallet',
        subheading: 'Send and receive coins'
      },
    // binders
   }
  }

  // lifecycle methods
  // event hanlders
  // rendering methods

  renderPending() {
    const {animatedHeading} = this.state;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
        mainHeader={{backButton: false}}
      >
        <Image source={require('../../../../assets/images/wallet-girl3x.png')} style={[NoKycStyle.image]}/>
        <Text style={NoKycStyle.textOne}>
          Add, send and receive coins to your Celsius wallet
        </Text>
        <Text style={NoKycStyle.textTwo}>
          To be able to use your wallet and all of its features, please wait for your profile to be verified.
        </Text>
          <Text style={NoKycStyle.textThree}>
            Profile verification status:
          </Text>
        <View style={NoKycStyle.statusWrapper}>
          <View style={NoKycStyle.circleYellow}/>
          <Text style={NoKycStyle.yellowText}>Pending</Text>
        </View>
      </SimpleLayout>
    )
  }

  renderRejected() {
    const {animatedHeading} = this.state;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
        mainHeader={{backButton: false}}
      >
        <Image source={require('../../../../assets/images/phone_doggirl3x.png')} style={[NoKycStyle.image, {marginTop: 10}]}/>
        <Text style={NoKycStyle.textOne}>
          Profile verification failed
        </Text>
        <Text style={[NoKycStyle.textTwo, {marginBottom: 20}]}>
          Document photo is in a low-resolution and not readable enough. Please, go through the KYC process again.
        </Text>
        <Text style={NoKycStyle.textThree}>
          Profile verification status:
        </Text>
        <View style={[NoKycStyle.statusWrapper, {marginBottom: 20}]}>
          <View style={NoKycStyle.circleRed}/>
          <Text style={NoKycStyle.redText}>Rejected</Text>
        </View>
        <CelButton
          onPress={console.log}
          margin='0 50 30 50'

        >
          Verify Again
        </CelButton>
      </SimpleLayout>
    )
  }

  renderNotStarted() {
    const {navigateTo} = this.props;
    const {animatedHeading} = this.state;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
        mainHeader={{backButton: false}}
      >
        <Image source={require('../../../../assets/images/wallet-girl3x.png')} style={NoKycStyle.image}/>
        <Text style={NoKycStyle.textOne}>
          Add, send and receive coins to your Celsius wallet
        </Text>
        <Text style={NoKycStyle.textTwo}>
          To be able to use your wallet and all of its features, please verify your profile first.
        </Text>
        <CelButton
          onPress={() => navigateTo('ProfileDetails')}
          margin='0 50 0 50'
        >
          Verify profile
        </CelButton>
        <CelButton
          transparent
          onPress={() => navigateTo('CryptoForPeople')}
          color="blue"
          size="small"
          margin="15 0 15 0"
          inverse
        >
          Learn more about Celsius
        </CelButton>
      </SimpleLayout>
    )
  }


  render() {
    const { kycStatus } = this.props;

    switch (kycStatus) {
      case 'pending':
        return this.renderPending();
      case 'rejected':
        return this.renderRejected();
      case 'not_started':
      default:
        return this.renderNotStarted();
    }
  }
}

export default NoKyc;
