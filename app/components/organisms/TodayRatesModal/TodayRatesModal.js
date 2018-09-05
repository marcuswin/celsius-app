import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Text, View } from "react-native";

import * as appActions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";
import CurrencyInterestRateInfoTable from "../CurrencyInterestRateInfoTable/CurrencyInterestRateInfoTable";
import CelButton from "../../atoms/CelButton/CelButton";
import CelTouchable from "../../atoms/CelTouchable/CelTouchable";

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
    const { actions, appSettings: { showTodayRatesModal } } = this.props;

    return (
      <CelModal name={MODALS.TODAY_RATES_MODAL}>
        <Text>Today is a good day</Text>
        <Text>Current state: {showTodayRatesModal ? 'true' : 'false'}</Text>
        <CurrencyInterestRateInfoTable style={{marginVertical: 30,}}/>
        <CelButton onPress={() => actions.closeModal()} size="small">
          Go to wallet
        </CelButton>
        <CelTouchable onPress={this.toggleRatesModal}>
          <View>
            <Text>Don't show this on open</Text>
          </View>
        </CelTouchable>
      </CelModal>
    )
  }
}

export default TodayRatesModal;
