import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import InfoModal from "../InfoModalNew/InfoModal";
import { MODALS } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PrepaymentSuccesfulModal extends Component {
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
        name={MODALS.PREPAYMEN_SUCCESSFUL_MODAL}
        heading={"Successfully Prepayed 7 Months of Interest"}
        paragraphs={[
          "This means you don’t need to make any payments in the next 7 months! We will let you know when your interest payment resumes.",
        ]}
        noCopy={"Visit Loan Overview"}
        onNo={this.navigate}
        yesCopy={"Check Details"}
        onYes={this.navigate}
        buttonStyleNo={"white"}
      />
    );
  }
}

export default PrepaymentSuccesfulModal;
