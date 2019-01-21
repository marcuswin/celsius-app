import React, { Component } from 'react';
import { Text, View, Image, Clipboard, Share } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import { MODALS } from "../../../config/constants/common";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
    user: state.user.profile,
  }),
  dispatch => ({
    actions: bindActionCreators(appActions, dispatch),
    dispatch,
  }),
)
class ReferralModal extends Component {
  componentWillReceiveProps(nextProps) {
    const { actions, user, openedModal } = nextProps;
    if (this.props.openedModal !== MODALS.REFERRAL_MODAL && openedModal === MODALS.REFERRAL_MODAL && !user.individual_referral_link) {
      // TODO(fj): replace with getBranchIndividualLink
      actions.createBranchIndividualLink();
    }
  }

  copyLink = (link) => {
    Clipboard.setString(link);
  };

  // rendering methods
  render() {
    const { user } = this.props;

    if (!user.individual_referral_link) return null;

    const shareCopy = `${user.first_name} invites you to join Celsius. If you click on the link below, both of you will get 10 CEL! ${user.individual_referral_link}`

    return (
      <CelModal name={MODALS.REFERRAL_MODAL}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../../assets/images/frenchy.png')} style={{ width: 120, height: 120 }} />
        </View>

        <Text style={[globalStyles.largeHeading, { marginTop: 15, marginBottom: 10 }]}>Refer your friends</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
          Invite your friends to join Celsius and we will send you both 10 CEL when they join.
        </Text>

        <CelButton
          onPress={() => Share.share({ message: shareCopy })}
        >
          Share a unique link
        </CelButton>
      </CelModal>
    );
  }
}

export default ReferralModal;
