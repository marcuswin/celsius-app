import React, {Component} from 'react';
import { Text, View, Image } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import { MODALS } from "../../../config/constants/common";
import CelButton from "../../atoms/CelButton/CelButton";
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
    user: state.users.user,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TransferReceivedModal extends Component {
  closeAndGoToSignup = () => {
    const { actions } = this.props;
    actions.closeModal();
    actions.navigateTo('SignupOne');
  }
  // rendering methods
  renderLoggedInUser = () => {
    const { actions } = this.props;
    return (
      <CelModal name={MODALS.TRANSFER_RECEIVED}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../../assets/images/frenchy.png')} style={{ width: 120, height: 120 }} />
        </View>

        <Text style={[globalStyles.largeHeading, { marginTop: 15, marginBottom: 10 }]}>Congrats!</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
          Your friend Andrea Collins just sent you $2,500 worth of ETH. You can see it now in your wallet.
        </Text>

        <CelButton
          onPress={() => actions.closeModal()}
          margin="30 0 0 0"
        >
          Go to wallet
        </CelButton>
      </CelModal>
    );
  }

  renderNewUser = () => (
    <CelModal name={MODALS.TRANSFER_RECEIVED}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../../../../assets/images/frenchy.png')} style={{ width: 120, height: 120 }} />
      </View>

      <Text style={[globalStyles.largeHeading, { marginTop: 15, marginBottom: 10 }]}>Welcome!</Text>

      <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
        Your friend Andrea Collins have sent you
        <Text style={[globalStyles.normalText, globalStyles.boldText]}> $2,500 </Text>
        worth of ETH. To see it in your wallet, please sign up and verify your profile.
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
      <CelButton onPress={this.closeAndGoToSignup}>Sign up</CelButton>
    </CelModal>
  );

  render() {
    const { user } = this.props;
    return user ? this.renderLoggedInUser() : this.renderNewUser();
  }
}

export default TransferReceivedModal;
