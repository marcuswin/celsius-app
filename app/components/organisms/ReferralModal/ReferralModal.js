import React, { Component } from "react";
import { Text, View, Image, Share } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import { MODALS } from "../../../config/constants/common";
import CelButton from "../../atoms/CelButton/CelButton";
import ShareCopy from "../ShareCopy/ShareCopy";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
    user: state.users.user,
  }),
  dispatch => ({
    actions: bindActionCreators(appActions, dispatch),
    dispatch
  })
)
class ReferralModal extends Component {
  componentWillReceiveProps(nextProps) {
    const { actions, user, openedModal } = nextProps;
    if (this.props.openedModal !== MODALS.REFERRAL_MODAL && openedModal === MODALS.REFERRAL_MODAL && !user.individual_referral_link) {
      actions.getBranchIndividualLink();
    }
  }

  getSlug = (link) => link.split("/")[link.split("/").length - 1];

  // rendering methods
  render() {
    const { user } = this.props;

    if (!user.individual_referral_link) return null;

    const shareCopy = `${user.first_name} invites you to join Celsius. If you click on the link below, both of you will get a reward! ${user.individual_referral_link}`;
    const slug = this.getSlug(user.individual_referral_link);
    const shareCodeCopy = `${user.first_name} invites you to join Celsius. If you enter ${slug} on registration, both of you will get a reward!`;

    return (
      <CelModal name={MODALS.REFERRAL_MODAL}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image source={require("../../../../assets/images/frenchy.png")} style={{ width: 120, height: 120 }}/>
        </View>

        <Text style={[globalStyles.largeHeading, { marginTop: 15, marginBottom: 10 }]}>
          Friends with Benefits
        </Text>

        <Text style={[globalStyles.normalText, { textAlign: "center" }]}>
          Use your unique promo code or link to invite friends to Celsius. You’ll both receive up to $20 when they join*!
        </Text>

        <View style={{ marginTop: 20 }}>
          <ShareCopy
            displayValue={slug}
            copyShareValue={shareCodeCopy}
          />
        </View>

        <CelButton
          margin="20 0 20 0"
          onPress={() => Share.share({ message: shareCopy })}
        >
          Share a unique link
        </CelButton>


        <Text style={[globalStyles.normalText, { textAlign: "center" }]}>
          *$10 in BTC distributed after initial deposit of $1,000 or more. Additional $10 bonus distributed after keeping $1,000 or more for 90 days. Wallet balance value is based on time of deposit.
        </Text>

      </CelModal>
    );
  }
}

export default ReferralModal;
