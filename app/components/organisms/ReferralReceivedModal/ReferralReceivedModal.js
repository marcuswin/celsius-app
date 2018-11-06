import React, {Component} from 'react';
import { Text } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import { BRANCH_LINKS, MODALS } from "../../../config/constants/common";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import CelModal from "../../atoms/CelModal/CelModal";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    referralLink: state.branch.allLinks.find(bl => bl.link_type === BRANCH_LINKS.COMPANY_REFERRAL),
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

    return (
      <CelModal name={MODALS.REFERRAL_RECEIVED_MODAL}>
        <Text style={[globalStyles.largeHeading, { marginTop: 15, marginBottom: 10 }]}>Welcome to Celsius!</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
          You have been referred by { referralLink.company_name } and received
          <Text style={[globalStyles.normalText, globalStyles.boldText]}> { referralLink.referred_award_amount } { referralLink.referred_award_coin } </Text>
          as a reward. To see it in your wallet, please sign up and verify your profile.
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
