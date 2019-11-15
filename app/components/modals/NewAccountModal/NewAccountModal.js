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
class NewAccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigate = () => {
    const { actions } = this.props;
    actions.closeModal();
  };

  render() {
    return (
      <InfoModal
        name={MODALS.NEW_ACCOUNT_MODAL}
        picture={require("../../../../assets/images/checkmark-circle.png")}
        color={STYLES.COLORS.DARK_BACKGROUND}
        heading={"Congrats On Creating a New Account!"}
        paragraphs={[
          `Don’t forget that you can enter your invitation code from REWARDS SECTION before you make your first deposit.`,
        ]}
        yesCopy={"Done"}
        onYes={this.navigate}
      />
    );
  }
}

export default NewAccountModal;
