import React, { Component } from 'react';
import testUtil from "../../../utils/test-util";
import CelModal from "../CelModal/CelModal";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";

class SsnModal extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {actions} = this.props;
    return (
      <CelModal
        name={MODALS.SSN_MODAL}
      >
        <CelText type="H2" weight="bold" align={"center"} margin={"0 0 20 0"}>You chose not to enter your SSN</CelText>
        <CelText type={"H4"} align={"left"} weight='300' margin={"0 0 20 0"}>Your deposits will not earn interest until this portion of your profile is updated. This can be completed at any time.</CelText>

        <CelButton
          onPress={() => {
            actions.navigateTo('KYCVerifyID');
            actions.closeModal()
          }}
        >
          Continue
        </CelButton>
      </CelModal>
    );
  }
}

export default testUtil.hookComponent(SsnModal);
