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
class LoanCancelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigate = () => {
    const { actions } = this.props;
    actions.navigateTo("KYCVerifyID");
    actions.closeModal();
  };

  render() {
    return (
      <InfoModal
        color={STYLES.COLORS.DARK_BACKGROUND}
        name={MODALS.LOAN_CANCEL_MODAL}
        heading={"You Are About To Cancel Your Loan Request"}
        paragraphs={[
          "By doing this you won’t be receiving any funds and your loan status will change to canceled.",
        ]}
        buttonStyleYes={"cancel"}
        yesCopy={"Cancel Loan Request"}
        onYes={this.navigate}
      />
    );
  }
}

export default LoanCancelModal;
