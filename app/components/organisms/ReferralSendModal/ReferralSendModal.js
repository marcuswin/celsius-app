import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../../redux/actions'
import Separator from "../../atoms/Separator/Separator";

import testUtil from '../../../utils/test-util'

// import ReferralReceivedModalStyle from "./ReferralReceivedModal.styles";
import CelModal from '../CelModal/CelModal'
import { MODALS } from '../../../constants/UI'
import CelText from '../../atoms/CelText/CelText'
import CelButton from '../../atoms/CelButton/CelButton'
import CopyButton from "../../atoms/CopyButton/CopyButton";
import ShareButton from "../../atoms/ShareButton/ShareButton";
import ReferralSendModalStyle from './ReferralSendModal.styles';

@connect(
  state => ({
    referralLink: state.branch.registeredLink,
    openedModal: state.ui.openedModal,
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ReferralSendModal extends Component {

  static propTypes = {
    text: PropTypes.string,
    code: PropTypes.string,
  };
  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      // string: propTypes.string
    };
  }

  componentWillReceiveProps(nextProps) {
    const { actions, user, openedModal } = nextProps;
    if (this.props.openedModal !== MODALS.REFERRAL_SEND_MODAL && openedModal === MODALS.REFERRAL_SEND_MODAL && !user.individual_referral_link) {
      actions.getBranchIndividualLink();
    }
  }

  // getSlug = (link) => link.split("/")[link.split("/").length - 1];


  render() {
    const { actions, user} = this.props;
    const style = ReferralSendModalStyle();

    const slug = user.individual_referral_link;

    // console.log(user.individual_referral_link)

    return (
      <CelModal name={MODALS.REFERRAL_SEND_MODAL}
        picture={require('../../../../assets/images/illustrations-v3/Dog/profile-dog.png')}

      >
        <CelText type="H3" weight="bold" align={"center"}>Refer your friends!</CelText>

        <CelText align={"center"} weight='300' style={style.explanation}>Use your unique promo code or link to invite your friends to Celsius. You’ll both receive up to <CelText weight='600'>$20 </CelText>when they join*!</CelText>

        <View style={style.copyShareWrapper}>
          <CelText align={"center"} weigth={"400"} type={"H4"}>{slug}</CelText>
          <Separator margin={"20 0 0 0"} />
          <View style={style.copyShareButtonsWrapper}>
            <CopyButton copyText={slug} onCopy={() => actions.showMessage("success", "Promo code key copied to clipboard!")} />
            <Separator vertical />
            <ShareButton shareText={slug} />
          </View>
        </View>

        <CelText align={"center"} style={style.explanation}>*$10 in BTC distributed after initial deposit of $1,000 or more in the first five days. Additional $10 bonus distributed after keeping $1,000 or more for 90 days. Wallet balance value is based on time of deposit. </CelText>

        <CelButton
          onPress={() => actions.navigateTo("WalletLanding")}
          margin="15 0 15 0"
        >
          Share a unique link
        </CelButton>
      </CelModal>
    );
  }
}
export default testUtil.hookComponent(ReferralSendModal)
