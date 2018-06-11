import React, {Component} from 'react';
import { Image, Linking, Text, View } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import NoKycStyle from "./NoKyc.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import { KYC_STATUSES } from "../../../config/constants/common";

@connect(
  state => ({
    kycStatus: state.users.user.kyc ? state.users.user.kyc.status : KYC_STATUSES.collecting,
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
    const {navigateTo} = this.props;
    const {animatedHeading} = this.state;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
        mainHeader={{backButton: false}}
      >
        <Image source={require('../../../../assets/images/wallet-girl3x.png')} style={[NoKycStyle.image]}/>
        <Text style={NoKycStyle.textThree}>
          Profile verification status:
        </Text>
        <Text style={NoKycStyle.textOne}>
          Add, send and receive coins to your Celsius wallet
        </Text>
        <Text style={NoKycStyle.textTwo}>
          To be able to use your wallet and all of its features, please wait for your profile to be verified.
        </Text>
        <View style={NoKycStyle.statusWrapper}>
          <View style={NoKycStyle.circleYellow}/>
          <Text style={NoKycStyle.yellowText}>In progress</Text>
        </View>
        <Text style={[NoKycStyle.textTwo]}>
          While waiting for your profile verification to finish, add coins to track in your portfolio.</Text>
        <CelButton
          onPress={() => navigateTo('ManagePortfolio')}
          margin='0 50 30 50'
        >
          Visit portfolio
        </CelButton>

      </SimpleLayout>
    )
  }

  renderRejected() {
    const {navigateTo} = this.props;
    const {animatedHeading} = this.state;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
        mainHeader={{backButton: false}}
      >
        <Image source={require('../../../../assets/images/wallet-bear3x.png')} style={[NoKycStyle.image, {marginTop: 5 }]}/>
        <Text style={[NoKycStyle.textThree, {marginTop: -5}]}>
          Profile verification status:
        </Text>
        <View style={[NoKycStyle.statusWrapper, {marginBottom: 20}]}>
          <View style={NoKycStyle.circleRed}/>
          <Text style={NoKycStyle.redText}>Rejected</Text>
        </View>
        <Text style={[NoKycStyle.textOne]}>
          Profile verification failed
        </Text>
        <Text style={[NoKycStyle.textTwo, {marginBottom: 20, marginTop: 10}]}>
          Document photo is in a low-resolution and not readable enough. Please, go through the KYC process again, or contact <Text onPress={()=> Linking.openURL('mailto:hello@celsius.network')} style={NoKycStyle.textButton}>Celsius support.</Text>
        </Text>
        <CelButton
          onPress={() => navigateTo('ProfileDetails')}
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
        <Text style={[NoKycStyle.textTwo,{marginTop: 10}]}>
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
          margin="0 0 15 0"
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
      case KYC_STATUSES.pending:
      case KYC_STATUSES.sending:
      case KYC_STATUSES.sent:
        return this.renderPending();
      case KYC_STATUSES.failed:
        return this.renderRejected();
      case KYC_STATUSES.collecting:
      default:
        return this.renderNotStarted();
    }
  }
}

export default NoKyc;
