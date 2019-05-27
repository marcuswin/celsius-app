import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { MODALS } from "../../../constants/UI";

import CelButton from "../../atoms/CelButton/CelButton"
import CelModal from "../CelModal/CelModal";
import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import KycRejectedModalStyle from "./KycRejectedModal.styles";
import CelText from '../../atoms/CelText/CelText';
// import ContactSupport from '../../atoms/ContactSupport/ContactSupport';

@connect(
  state => ({
    kycReasons: state.user.profile.kyc.rejectionReasons,

  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class KycRejectedModal extends Component {

  static propTypes = {

  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderErrors = () => {
    const { kycReasons } = this.props
    const err = kycReasons.map((reason, key) => (

      <CelText key={key} margin={"0 0 20 0"}>
        {reason}
      </CelText>

    ))
    return err
    
  }

  render() {
    const { actions } = this.props
    // const style = KycRejectedModalStyle();
    // const RenderedErrors = this.renderErrors();

    return (
      <CelModal
        name={MODALS.KYC_REJECTED_MODAL}
      >
        <CelText type="H2" weight="bold" align={"center"} margin={"0 0 20 0"}>Identity verification failed</CelText>
        {this.renderErrors()}

        {/* <ContactSupport align='left' style={{ paddingRight: 10 }} /> */}

        <CelButton
          onPress={() => { actions.navigateTo('KYCProfileDetails') }}
        >
          Verify identity again
    </CelButton>
      </CelModal>
    );
  }
}

export default testUtil.hookComponent(KycRejectedModal);
