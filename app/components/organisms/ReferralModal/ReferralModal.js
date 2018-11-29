import React, { Component } from 'react';
import { Text, View, Image, Clipboard } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import { BRANCH_LINKS, MODALS } from "../../../config/constants/common";
import CelButton from "../../atoms/CelButton/CelButton";
import ShareCopy from '../ShareCopy/ShareCopy';

@connect(
  state => ({
    openedModal: state.ui.openedModal,
    referralLink: state.branch.createdLinks.filter(bl => bl.linkType === BRANCH_LINKS.INDIVIDUAL_REFERRAL)[0],
  }),
  dispatch => ({
    actions: bindActionCreators(appActions, dispatch),
    dispatch,
  }),
)
class ReferralModal extends Component {
  componentWillReceiveProps(nextProps) {
    const { actions, referralLink, openedModal } = nextProps;
    if (this.props.openedModale !== MODALS.REFERRAL_MODAL && openedModal === MODALS.REFERRAL_MODAL && !referralLink) {
      actions.createBranchReferralLink();
    }
  }

  copyLink = (link) => {
    Clipboard.setString(link);
  };

  // rendering methods
  render() {
    const { actions, referralLink } = this.props;

    if (!referralLink) return null;
    const { url } = referralLink;

    return (
      <CelModal name={MODALS.REFERRAL_MODAL}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../../assets/images/frenchy.png')} style={{ width: 120, height: 120 }} />
        </View>

        <Text style={[globalStyles.largeHeading, { marginTop: 15, marginBottom: 10 }]}>Refer your friends</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
          Invite your friends to join Celsius with the link below.
        </Text>

        <View style={{ marginTop: 30, marginBottom: 35 }}>
          <ShareCopy displayValue={url} theme={'white'} link />
        </View>

        <CelButton onPress={() => actions.closeModal()}>Done</CelButton>
      </CelModal>
    );
  }
}

export default ReferralModal;
