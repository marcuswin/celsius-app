import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Share, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  () => ({
    // map state to props
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TransactionOptionsModal extends Component {
  static propTypes = {
    link: PropTypes.string,
    hash: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  shareLink = () => Share.share({ message: `Click on the link to claim your crypto ${ this.props.link }` });
  openLink = () => {
    this.props.actions.claimTransfer(this.props.hash);
    this.props.actions.closeModal();
  }
  // rendering methods
  render() {
    return (
      <CelModal name={MODALS.TRANSACTION_OPTIONS}>
        <View>
          <Text style={[globalStyles.largeHeading, { marginBottom: 10 }]}>Link to your transaction</Text>
          <Text style={[globalStyles.normalText, { textAlign: "center" }]}>
            To bring your money back you can discard the transaction before someone accepts it, or you can send the link to someone else
          </Text>

          <CelButton
            margin="20 0 20 0"
            onPress={this.shareLink}
          >
            Send to someone else
          </CelButton>
          <CelButton
            margin="0 0 20 0"
            inverse
            onPress={this.openLink}
          >
            Refund transaction
          </CelButton>
        </View>
      </CelModal>
    );
  }
}

export default TransactionOptionsModal;
