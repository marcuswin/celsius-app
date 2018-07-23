import React, {Component} from 'react';
import { Image, Linking, Text, View } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import NoKycStyle from "./NoKyc.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import { KYC_STATUSES } from "../../../config/constants/common";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    kycStatus: state.users.user.kyc ? state.users.user.kyc.status : KYC_STATUSES.collecting,
    kycErrors: state.users.user.kyc ? state.users.user.kyc.errors : [],
    activeScreen: state.nav.routes[state.nav.index].routeName,
    user: state.users.user,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class NoKyc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedHeading: {
        text: `Welcome \n${props.user.first_name}!`
      },
   }

   props.actions.getKYCStatus();
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { activeScreen, actions } = this.props;

    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'Home') {
      actions.getKYCStatus();
    }
  }
  // event hanlders
  // rendering methods

  renderPending() {
    const {actions} = this.props;
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
        <View style={[NoKycStyle.statusWrapper, {marginTop: 5}]}>
          <View style={NoKycStyle.circleYellow}/>
          <Text style={NoKycStyle.yellowText}>In progress</Text>
        </View>
        <Text style={[NoKycStyle.textTwo, {marginTop: 10}]}>
          While you're waiting for your profile verification to finish(usually within 24 hours), you can add coins to watch in your portfolio or join our Telegram.</Text>
        <CelButton
          onPress={() => actions.navigateTo('ManagePortfolio')}
          margin='0 50 0 50'
        >
          Visit portfolio
        </CelButton>

        <View style={{marginBottom: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Icon name='TelegramIcon' height='25' width='25' viewBox="0 0 32 32" fill={'rgba(65, 86, 166, 0.6)'} />
          <CelButton onPress={() => Linking.openURL('https://t.me/CelsiusNetwork')}
                     transparent
                     color="blue"
                     size="medium"
                     margin="0 0 5 0"
                     inverse
          >Join our Telegram</CelButton>
        </View>

      </SimpleLayout>
    )
  }

  renderRejected() {
    const {actions, kycErrors} = this.props;
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
          onPress={() => actions.navigateTo('ProfileDetails')}
          margin='20 50 30 50'
        >
          Verify Again
        </CelButton>
      </SimpleLayout>
    )
  }

  renderNotStarted() {
    const {actions} = this.props;
    const {animatedHeading} = this.state;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
        mainHeader={{backButton: false}}
      >
        <Image source={require('../../../../assets/images/wallet-emptystate-ftux3x.png')} style={NoKycStyle.image}/>
        <Text style={NoKycStyle.textOne}>
          This is where you'll be able to add, send and receive coins
        </Text>
        <Text style={[NoKycStyle.textTwo,{marginTop: 10}]}>
          But first, please verify your identity to unlock all of the Celsius wallet features. Verification usually takes less than 24 hours - we'll send you a notification once you've passed.
        </Text>
        <CelButton
          onPress={() => actions.navigateTo('ProfileDetails')}
          margin='0 50 0 50'
        >
          Verify profile
        </CelButton>
        <CelButton
          transparent
          onPress={() => actions.navigateTo('CryptoForPeople')}
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
