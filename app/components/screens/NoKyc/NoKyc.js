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
    kycErrors: state.users.user.kyc ? state.users.user.kyc.errors : [],
    activeScreen: state.nav.routes[state.nav.index].routeName,
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
   }

   props.getKYCStatus();
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { activeScreen, getKYCStatus } = this.props;

    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'Home') {
      getKYCStatus();
    }
  }
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
        <Image source={require('../../../../assets/images/bear-happyKYC3x.png')} style={[NoKycStyle.image]}/>
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
          While you're waiting for your profile verification to finish, add coins to track in your portfolio. This may take up to 24 hours.</Text>
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
    const {navigateTo, kycErrors} = this.props;
    const {animatedHeading} = this.state;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
        mainHeader={{backButton: false}}
      >
        <Image source={require('../../../../assets/images/bear-NoKYC3x.png')} style={[NoKycStyle.image, {marginTop: 5 }]}/>
        <Text style={[NoKycStyle.textThree, {marginTop: -5}]}>
          Profile verification status:
        </Text>
        <View style={[NoKycStyle.statusWrapper, {marginBottom: 20}]}>
          <View style={NoKycStyle.circleRed}/>
          <Text style={NoKycStyle.redText}>Rejected</Text>
        </View>
        <Text style={[NoKycStyle.textOne, { marginBottom: 10}]}>
          Profile verification failed
        </Text>
        { kycErrors.map(e => (
          <Text key={e} style={[NoKycStyle.textTwo, { marginTop: 5, marginBottom: 0 }]}>{ e }</Text>
        )) }
        <Text style={[NoKycStyle.textTwo, { marginTop: 10, marginBottom: 0 }]}>
          Please, go through the KYC process again, or contact <Text onPress={()=> Linking.openURL('mailto:hello@celsius.network')} style={NoKycStyle.textButton}>Celsius support.</Text>
        </Text>
        <CelButton
          onPress={() => navigateTo('ProfileDetails')}
          margin='20 50 30 50'
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
        <Image source={require('../../../../assets/images/bear-NoKYC3x.png')} style={NoKycStyle.image}/>
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
      case KYC_STATUSES.rejected:
        return this.renderRejected();
      case KYC_STATUSES.collecting:
      default:
        return this.renderNotStarted();
    }
  }
}

export default NoKyc;
