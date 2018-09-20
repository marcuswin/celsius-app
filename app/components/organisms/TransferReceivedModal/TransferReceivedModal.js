import React, {Component} from 'react';
import { Text, View, Image } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import { KYC_STATUSES, MODALS } from "../../../config/constants/common";
import CelButton from "../../atoms/CelButton/CelButton";
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";
import formatter from "../../../utils/formatter";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
    user: state.users.user,
    currencyRatesShort: state.generalData.currencyRatesShort,
    transfers: state.transfers.transfers,
    branchHashes: state.transfers.branchHashes,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TransferReceivedModal extends Component {
  closeAndGoToSignup = () => {
    const { actions, user } = this.props;
    actions.closeModal();
    actions.navigateTo(!user ? 'SignupOne' : 'ProfileDetails');
  }
  closeAndGoToWallet = () => {
    const { actions } = this.props;
    actions.closeModal();
    actions.navigateTo('Home');
  }
  // rendering methods
  renderVerified = () => {
    const { transfers, currencyRatesShort, branchHashes } = this.props;
    const transfer = transfers[branchHashes[0]];
    const amountUsd = currencyRatesShort[transfer.coin.toLowerCase()] * transfer.amount;

    return (
      <CelModal name={MODALS.TRANSFER_RECEIVED}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={{ uri: transfer.from.profile_picture }} style={{ width: 120, height: 120, borderRadius: 60 }} />
        </View>

        <Text style={[globalStyles.largeHeading, { marginTop: 15, marginBottom: 10 }]}>Congrats!</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
          Your friend { transfer.from.name } just sent you
          <Text style={[globalStyles.normalText, globalStyles.boldText]}> { formatter.usd(amountUsd) } </Text>
          worth of { transfer.coin }. You can see it now in your wallet.
        </Text>

        <CelButton
          onPress={this.closeAndGoToWallet}
          margin="30 0 0 0"
        >
          Go to wallet
        </CelButton>
      </CelModal>
    );
  }

  renderUnverified = () => {
    const { transfers, currencyRatesShort, branchHashes, user } = this.props;
    const transfer = transfers[branchHashes[0]];
    const amountUsd = currencyRatesShort[transfer.coin.toLowerCase()] * transfer.amount;
    return (
      <CelModal name={MODALS.TRANSFER_RECEIVED}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={{ uri: transfer.from.profile_picture }} style={{ width: 120, height: 120, borderRadius: 60 }} />
        </View>

        <Text style={[globalStyles.largeHeading, { marginTop: 15, marginBottom: 10 }]}>Welcome!</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
          Your friend { user ? transfer.from.name : '' } have sent you
          <Text style={[globalStyles.normalText, globalStyles.boldText]}> { formatter.usd(amountUsd) } </Text>
          worth of { transfer.coin }. To see it in your wallet, please sign up and verify your profile.
        </Text>

        <InfoBubble
          color="gray"
          renderContent={(textStyles) => (
            <View>
              <Text style={textStyles}>
                If you don't finish the signup process within 7 days of Andrea sending you crypto, it will be returned to them.
              </Text>
            </View>
          )}
        />
        <CelButton onPress={this.closeAndGoToSignup}>
          { !this.props.user ? 'Sign up'  : 'Verify profile' }
        </CelButton>
      </CelModal>
    )
  };

  render() {
    const { user, branchHashes, transfers } = this.props;
    const transfer = transfers[branchHashes[0]];
    if (transfer) {
      return (transfer && user && user.kyc && user.kyc.status === KYC_STATUSES.passed) ? this.renderVerified() : this.renderUnverified();
    }

    return null;
  }
}

export default TransferReceivedModal;
