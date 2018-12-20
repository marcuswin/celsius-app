import React, {Component} from 'react';
import { Image, Linking, Text, View } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import NoKycStyle from "./NoKyc.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import { KYC_STATUSES, TRANSFER_STATUSES } from "../../../config/constants/common";
import Icon from "../../atoms/Icon/Icon";
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";
import testUtil from "../../../utils/test-util";
import { analyticsEvents } from "../../../utils/analytics-util";

@connect(
  state => ({
    kycStatus: state.users.user.kyc ? state.users.user.kyc.status : KYC_STATUSES.collecting,
    kycErrors: state.users.user.kyc ? state.users.user.kyc.errors : [],
    activeScreen: state.nav.routes[state.nav.index].routeName,
    user: state.users.user,
    allTransfers: state.transfers.transfers,
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
   props.actions.getAllTransfers(TRANSFER_STATUSES.claimed);
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { activeScreen, actions } = this.props;

    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'Home') {
      actions.getKYCStatus();
      actions.getAllTransfers(TRANSFER_STATUSES.claimed);
    }
  }
  // event hanlders
  // rendering methods
  renderInfoBubble = () => {
    const { allTransfers, actions } = this.props;
    const claimedTransfers = getClaimedTransfers(allTransfers);

    if (claimedTransfers && claimedTransfers.length > 1) {
      return (
        <InfoBubble
          color="gray"
          margin={"22 0 25 0"}
          renderContent={(textStyles) => (
            <View>
              <Text style={[textStyles, { textAlign: 'center' } ]}>
                You have several transactions on-hold.
                <Text onPress={() => actions.navigateTo('TransactionsOnHold')} style={[textStyles, { textDecorationLine: 'underline' }]}>
                  See all transactions
                </Text>
              </Text>
            </View>
          )}
        />
      )
    }

    if (claimedTransfers && claimedTransfers.length) {
      return (
        <InfoBubble
          color="gray"
          margin={"22 0 25 0"}
          renderContent={(textStyles) => (
            <View>
              <Text style={[textStyles, { textAlign: 'center' } ]}>
                Verify your profile now to get your crypto.
              </Text>
            </View>
          )}
        />
      )
    }
  }

  renderPending() {
    const {animatedHeading} = this.state;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
        mainHeader={{backButton: false}}
        ref={testUtil.generateTestHook(this, 'NoKyc.screen')}
      >
        { this.renderInfoBubble() }
        <Image source={require('../../../../assets/images/bear-happyKYC3x.png')} style={[NoKycStyle.image]}/>
        <Text style={NoKycStyle.textThree}>
          Profile verification status:
        </Text>
        <View style={[NoKycStyle.statusWrapper, {marginTop: 5}]}>
          <View style={NoKycStyle.circleYellow}/>
          <Text style={NoKycStyle.yellowText}>In progress</Text>
        </View>
        <Text style={[NoKycStyle.textTwo, {marginTop: 10, marginBottom: 30}]}>
          While you're waiting for your profile verification to finish(usually within 24 hours), you can look around or join our Telegram.
        </Text>

        <View style={{marginBottom: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Icon name='TelegramIcon' height='25' width='25' viewBox="0 0 32 32" fill={'rgba(65, 86, 166, 0.6)'} />
          <CelButton onPress={() => Linking.openURL('https://t.me/CelsiusNetwork')}
                     transparent
                     color="blue"
                     size="medium"
                     margin="0 0 0 0"
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
        { this.renderInfoBubble() }
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
          margin='20 50 0 50'
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
        { this.renderInfoBubble() }
        <Image source={require('../../../../assets/images/illuNoKYC3x.png')} style={[NoKycStyle.image, {resizeMode: "contain"}]}/>
        <Text style={NoKycStyle.textOne} ref={testUtil.generateTestHook(this, 'NoKyc.screen')}>
          This is where you'll be able to add, send and receive coins
        </Text>
        <Text style={[NoKycStyle.textTwo,{marginTop: 10}]}>
          But first, please verify your identity to unlock all of the Celsius wallet features. Verification usually takes less than 24 hours - we'll send you a notification once you've passed.
        </Text>
        <CelButton
          ref={testUtil.generateTestHook(this, 'NoKyc.VerifyProfile')}
          onPress={() => {
            analyticsEvents.navigation('verifyProfile');
            actions.navigateTo('ProfileDetails')
          }}
          margin='0 50 0 50'
        >
          Verify profile
        </CelButton>
        <CelButton
          transparent
          onPress={() => actions.navigateTo('CryptoForPeople')}
          color="blue"
          size="small"
          margin="0 0 0 0"
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

export default testUtil.hookComponent(NoKyc);


function getClaimedTransfers(allTransfers) {
  if (!allTransfers) return [];
  const transfers = [];

  Object.keys(allTransfers).forEach(t => {
    if (allTransfers[t].status === 'claimed') transfers.push(allTransfers[t]);
  })

  return transfers
}
