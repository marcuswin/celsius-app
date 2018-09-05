import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Text } from "react-native";

import * as appActions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";

// import TodayRatesModalStyle from "./TodayRatesModal.styles";

@connect(
  state => ({
    appSettings: state.users.appSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TodayRatesModal extends Component {

  toggleRatesModal = () => {
    const { actions, appSettings: { showTodayRatesModal } } = this.props;

    actions.updateUserAppSettings({
      showTodayRatesModal: !showTodayRatesModal,
    })
  };

  render() {
    const { appSettings: { showTodayRatesModal } } = this.props;

    return (
      <CelModal name={MODALS.TODAY_RATES_MODAL}>
        <Text>Today is a good day</Text>
        <Text>Current state: {showTodayRatesModal ? 'true' : 'false'}</Text>
        <Text onPress={this.toggleRatesModal}>Toggle this</Text>
      </CelModal>
    )
  }
}

export default TodayRatesModal;
