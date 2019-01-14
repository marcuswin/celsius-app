import React, {Component} from 'react';
import { Text, View, Image } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import { MODALS } from "../../../config/constants/common";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import CelModal from "../../atoms/CelModal/CelModal";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    referralLink: state.branch.registeredLink,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ReferralReceivedModal extends Component {
  closeAndGoToSignup = () => {
    const { actions } = this.props;

    actions.closeModal();
    actions.navigateTo('SignupOne');
  }
  render() {
    const { referralLink } = this.props;

    if (!referralLink) return null;

    let text;
    if (referralLink.referred_award_trigger === 'first-deposit') {
      text = 'To see it in your wallet, please sign up, verify your profile and make a first deposit.';
    } else {
      text = 'To see it in your wallet, please sign up and verify your profile.';
    }

    return (
      <CelModal name={MODALS.REFERRAL_RECEIVED_MODAL}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../../assets/images/hodl-bear.png') } style={{ width: 120, height: 120, borderRadius: 60 }} />
        </View>

        <Text style={[globalStyles.largeHeading, { marginTop: 15, marginBottom: 10 }]}>Welcome to Celsius!</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
          You have been referred by { referralLink.owner ? referralLink.owner.display_name : '' } and received
          <Text style={[globalStyles.normalText, globalStyles.boldText]}> { referralLink.referred_award_amount } { referralLink.referred_award_coin } </Text>
          as a reward. { text }
        </Text>

        <CelButton
          onPress={this.closeAndGoToSignup}
          margin="30 0 0 0"
        >
          Sign Up
        </CelButton>
      </CelModal>
    );
  }
}

export default ReferralReceivedModal;
