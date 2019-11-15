import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import InfoModal from "../InfoModalNew/InfoModal";
import { MODALS } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";
import STYLES from "../../../constants/STYLES";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BecameCelMemberModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigate = () => {
    const { actions } = this.props;
    actions.navigateTo("Deposit");
    actions.closeModal();
  };

  navigateNo = () => {
    const { actions } = this.props;
    actions.navigateTo("LoyaltyProgram");
    actions.closeModal();
  };

  render() {
    return (
      <InfoModal
        name={MODALS.BECAME_CEL_MEMBER_MODAL}
        picture={require("../../../../assets/images/illustrations-v3/stamp3x.png")}
        color={STYLES.COLORS.DARK_BACKGROUND}
        heading={"Congrats! You Have Earned 1 CEL Token!"}
        paragraphs={[
          "This CEL token allows you to take advantage of Celsius' products. Without any CEL you will be unable to earn, borrow, or pay, so keep HODLing!",
        ]}
        noCopy={"Learn about the CEL Loyalty Program"}
        onNo={this.navigateNo}
        buttonStyleNo={"white"}
        yesCopy={"Deposit coins"}
        onYes={this.navigate}
      />
    );
  }
}

export default BecameCelMemberModal;
